export function getContactConfig(env) {
  return {
    resendApiKey: required(env.RESEND_API_KEY, 'RESEND_API_KEY'),
    mailFrom: required(env.MAIL_FROM, 'MAIL_FROM'),
    mailToInfo: required(env.MAIL_TO_INFO || env.CONTACT_ROUTE_INFO, 'MAIL_TO_INFO'),
    mailToInternal: env.MAIL_TO_INTERNAL || env.CONTACT_ROUTE_INTERNAL || '',
    mailReplyFallback: env.MAIL_REPLY_FALLBACK || env.MAIL_TO_INFO || env.CONTACT_ROUTE_INFO || '',
    defaultRoute: env.CONTACT_DEFAULT_ROUTE || 'info',
    honeypotField: env.CONTACT_HONEYPOT_FIELD || 'website',
    uploadMaxFiles: intFromEnv(env.CONTACT_UPLOAD_MAX_FILES, 4),
    uploadMaxFileSizeBytes: numberFromEnv(env.CONTACT_UPLOAD_MAX_FILE_SIZE_MB, 3.5) * 1024 * 1024,
    uploadMaxTotalSizeBytes: numberFromEnv(env.CONTACT_UPLOAD_MAX_TOTAL_SIZE_MB, 14) * 1024 * 1024,
    uploadAllowedTypes: listFromEnv(
      env.CONTACT_UPLOAD_ALLOWED_TYPES,
      ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'image/heic', 'image/heif']
    ),
    uploadLinkTtlSeconds: intFromEnv(env.CONTACT_UPLOAD_LINK_TTL_SECONDS, 259200),
    downloadTokenSecret: env.DOWNLOAD_TOKEN_SECRET || '',
    attachmentMaxFiles: intFromEnv(env.CONTACT_ATTACHMENT_MAX_FILES, intFromEnv(env.CONTACT_UPLOAD_MAX_FILES, 4)),
    attachmentMaxFileSizeBytes: numberFromEnv(env.CONTACT_ATTACHMENT_MAX_FILE_SIZE_MB, numberFromEnv(env.CONTACT_UPLOAD_MAX_FILE_SIZE_MB, 3.5)) * 1024 * 1024,
    attachmentMaxTotalSizeBytes: numberFromEnv(env.CONTACT_ATTACHMENT_MAX_TOTAL_SIZE_MB, numberFromEnv(env.CONTACT_UPLOAD_MAX_TOTAL_SIZE_MB, 14)) * 1024 * 1024
  };
}

export function getRouteRecipients(config, requestedRoute) {
  const route = String(requestedRoute || config.defaultRoute || 'info').toLowerCase();
  if (route === 'internal' && config.mailToInternal) {
    return [config.mailToInternal];
  }
  const recipients = [config.mailToInfo];
  if (route === 'both' && config.mailToInternal) {
    recipients.push(config.mailToInternal);
  }
  return recipients.filter(Boolean);
}

function required(value, key) {
  if (!value) throw new Error(`Missing required env: ${key}`);
  return value;
}

function intFromEnv(value, fallback) {
  const parsed = Number.parseInt(String(value ?? fallback), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function numberFromEnv(value, fallback) {
  const parsed = Number.parseFloat(String(value ?? fallback));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function listFromEnv(value, fallback) {
  if (!value) return fallback;
  return String(value)
    .split(',')
    .map(item => item.trim().toLowerCase())
    .filter(Boolean);
}
