import { getContactConfig, getRouteRecipients } from '../_lib/contact-config.js';
import { signDownloadToken } from '../_lib/contact-security.js';
import { sendContactMail } from '../_lib/contact-mail.js';

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8'
};

export async function onRequestPost(context) {
  try {
    const config = getContactConfig(context.env);
    const formData = await context.request.formData();
    const honeypotValue = String(formData.get(config.honeypotField) || '').trim();
    if (honeypotValue) {
      return json({ ok: true }, 200);
    }

    const payload = readPayload(formData);
    validatePayload(payload);

    const files = formData.getAll('attachments').filter(item => item instanceof File && item.size > 0);
    validateFiles(files, config);

    const uploadResults = await uploadFiles({
      files,
      bucket: context.env.CONTACT_UPLOADS,
      request: context.request,
      secret: config.downloadTokenSecret,
      ttlSeconds: config.uploadLinkTtlSeconds
    });

    const recipients = getRouteRecipients(config, payload.route);
    const subject = buildSubject(payload);
    const { html, text } = buildMailContent(payload, uploadResults);

    await sendContactMail({
      config,
      to: recipients,
      replyTo: payload.email,
      subject,
      html,
      text
    });

    return json({
      ok: true,
      message: 'Ihre Anfrage wurde erfolgreich versendet.'
    }, 200);
  } catch (error) {
    const status = error.statusCode || 500;
    return json({
      ok: false,
      message: status >= 500 ? 'Die Anfrage konnte gerade nicht versendet werden. Bitte versuchen Sie es erneut.' : error.message
    }, status);
  }
}

function readPayload(formData) {
  return {
    name: String(formData.get('name') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    mileage: String(formData.get('mileage') || '').trim(),
    vin: String(formData.get('vin') || '').trim(),
    hsnTsn: String(formData.get('hsn_tsn') || '').trim(),
    problem: String(formData.get('problem') || '').trim(),
    route: String(formData.get('route') || '').trim(),
    privacyAccepted: String(formData.get('privacy') || '').length > 0
  };
}

function validatePayload(payload) {
  if (!payload.name) throw badRequest('Bitte geben Sie Ihren Namen an.');
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) throw badRequest('Bitte geben Sie eine gültige E-Mail-Adresse an.');
  if (!payload.phone) throw badRequest('Bitte geben Sie Ihre Telefonnummer an.');
  if (!payload.vin) throw badRequest('Bitte geben Sie die Fahrgestellnummer an.');
  if (!payload.problem) throw badRequest('Bitte beschreiben Sie Ihr Anliegen.');
  if (!payload.privacyAccepted) throw badRequest('Bitte bestätigen Sie die Datenschutzerklärung.');
}

function validateFiles(files, config) {
  if (files.length > config.uploadMaxFiles) {
    throw badRequest(`Bitte laden Sie maximal ${config.uploadMaxFiles} Dateien hoch.`);
  }

  let totalSize = 0;
  for (const file of files) {
    totalSize += file.size;
    if (file.size > config.uploadMaxFileSizeBytes) {
      throw badRequest(`Die Datei „${file.name}“ ist größer als ${Math.round(config.uploadMaxFileSizeBytes / 1024 / 1024)} MB.`);
    }
    const type = resolveFileType(file);
    if (!config.uploadAllowedTypes.includes(type)) {
      throw badRequest(`Der Dateityp von „${file.name}“ wird nicht unterstützt.`);
    }
  }

  if (totalSize > config.uploadMaxTotalSizeBytes) {
    throw badRequest(`Die Gesamtgröße der Dateien darf ${Math.round(config.uploadMaxTotalSizeBytes / 1024 / 1024)} MB nicht überschreiten.`);
  }
}

function resolveFileType(file) {
  const explicitType = (file.type || '').toLowerCase();
  if (explicitType) return explicitType;
  const name = String(file.name || '').toLowerCase();
  if (name.endsWith('.jpg') || name.endsWith('.jpeg')) return 'image/jpeg';
  if (name.endsWith('.png')) return 'image/png';
  if (name.endsWith('.webp')) return 'image/webp';
  if (name.endsWith('.pdf')) return 'application/pdf';
  if (name.endsWith('.heic')) return 'image/heic';
  if (name.endsWith('.heif')) return 'image/heif';
  return explicitType;
}

async function uploadFiles({ files, bucket, request, secret, ttlSeconds }) {
  if (!bucket) throw new Error('Missing R2 binding CONTACT_UPLOADS');
  if (!files.length) return [];

  const origin = new URL(request.url).origin;
  const now = Date.now();
  const results = [];

  for (const file of files) {
    const safeName = sanitizeFilename(file.name || 'upload');
    const key = `contact-uploads/${new Date(now).toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;
    await bucket.put(key, await file.arrayBuffer(), {
      httpMetadata: {
        contentType: file.type || 'application/octet-stream',
        contentDisposition: `inline; filename="${safeName}"`
      },
      customMetadata: {
        originalName: safeName,
        uploadedAt: String(now)
      }
    });

    const token = await signDownloadToken({
      key,
      name: safeName,
      type: file.type || 'application/octet-stream',
      exp: now + ttlSeconds * 1000
    }, secret);

    results.push({
      name: safeName,
      type: file.type || 'application/octet-stream',
      size: file.size,
      url: `${origin}/api/uploads?token=${encodeURIComponent(token)}`
    });
  }

  return results;
}

function buildSubject(payload) {
  const descriptor = payload.vin || payload.name || 'Neue Anfrage';
  return `Neue Anfrage – ${descriptor}`;
}

function buildMailContent(payload, uploads) {
  const fields = [
    ['Name', payload.name],
    ['E-Mail', payload.email],
    ['Telefon', payload.phone],
    ['Kilometerstand', payload.mileage || '—'],
    ['VIN', payload.vin],
    ['HSN/TSN', payload.hsnTsn || '—']
  ];

  const uploadHtml = uploads.length
    ? `<h3 style="margin:24px 0 10px;font-size:16px;">Hochgeladene Dateien</h3><ul style="padding-left:18px;margin:0;">${uploads.map(file => `<li style="margin:0 0 8px;"><a href="${escapeHtml(file.url)}">${escapeHtml(file.name)}</a> <span style="color:#888;">(${formatBytes(file.size)})</span></li>`).join('')}</ul>`
    : '<p style="margin:20px 0 0;color:#888;">Keine Dateien hochgeladen.</p>';

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111214;line-height:1.6;">
      <h2 style="margin:0 0 18px;">Neue Anfrage über teutomotoren.de</h2>
      <table style="border-collapse:collapse;width:100%;max-width:760px;">
        <tbody>
          ${fields.map(([label, value]) => `
            <tr>
              <td style="padding:8px 12px 8px 0;font-weight:700;vertical-align:top;">${escapeHtml(label)}</td>
              <td style="padding:8px 0;vertical-align:top;">${escapeHtml(value)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <h3 style="margin:24px 0 10px;font-size:16px;">Problembeschreibung</h3>
      <p style="margin:0;white-space:pre-line;">${escapeHtml(payload.problem)}</p>
      ${uploadHtml}
    </div>
  `;

  const text = [
    'Neue Anfrage über teutomotoren.de',
    '',
    ...fields.map(([label, value]) => `${label}: ${value}`),
    '',
    'Problembeschreibung:',
    payload.problem,
    '',
    uploads.length
      ? `Dateien:\n${uploads.map(file => `- ${file.name} (${formatBytes(file.size)}): ${file.url}`).join('\n')}`
      : 'Dateien: Keine'
  ].join('\n');

  return { html, text };
}

function sanitizeFilename(name) {
  return String(name)
    .normalize('NFKD')
    .replace(/[^\w.\-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'upload';
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function badRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function json(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: jsonHeaders
  });
}
