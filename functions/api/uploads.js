import { getContactConfig } from '../_lib/contact-config.js';
import { verifyDownloadToken } from '../_lib/contact-security.js';

export async function onRequestGet(context) {
  try {
    const config = getContactConfig(context.env);
    if (!context.env.CONTACT_UPLOADS) throw new Error('Missing R2 binding CONTACT_UPLOADS');

    const url = new URL(context.request.url);
    const token = url.searchParams.get('token');
    if (!token) return new Response('Missing token', { status: 400 });

    const payload = await verifyDownloadToken(token, config.downloadTokenSecret);
    const object = await context.env.CONTACT_UPLOADS.get(payload.key);
    if (!object) return new Response('Datei nicht gefunden', { status: 404 });

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('cache-control', 'private, max-age=60');
    headers.set('content-disposition', `attachment; filename="${payload.name}"`);

    return new Response(object.body, { headers });
  } catch (error) {
    const message = /expired/i.test(String(error.message)) ? 'Link abgelaufen' : 'Datei nicht verfügbar';
    const status = /expired/i.test(String(error.message)) ? 410 : 400;
    return new Response(message, { status });
  }
}
