# Cloudflare Pages + Worker + R2 Setup

## 1. Voraussetzungen

- Cloudflare Pages Projekt auf dieses Repository zeigen lassen
- R2-Bucket mit dem Namen aus `wrangler.toml` anlegen
- Resend Domain `mail.teutomotoren.de` verifizieren

## 2. Secrets / Variablen

Diese Werte **nicht** committen, sondern in Cloudflare Pages / Wrangler als Secrets setzen:

- `RESEND_API_KEY`
- `MAIL_FROM`
- `MAIL_TO_INFO`
- `MAIL_TO_INTERNAL`
- `MAIL_REPLY_FALLBACK`
- `DOWNLOAD_TOKEN_SECRET`

Diese Werte können als normale Variablen gesetzt werden:

- `CONTACT_DEFAULT_ROUTE`
- `CONTACT_HONEYPOT_FIELD`
- `CONTACT_UPLOAD_MAX_FILES`
- `CONTACT_UPLOAD_MAX_FILE_SIZE_MB`
- `CONTACT_UPLOAD_MAX_TOTAL_SIZE_MB`
- `CONTACT_UPLOAD_ALLOWED_TYPES`
- `CONTACT_UPLOAD_LINK_TTL_SECONDS`

## 3. R2 Binding

Binding-Name im Projekt:

- `CONTACT_UPLOADS`

Bucket-Name in `wrangler.toml`:

- `teuto-contact-uploads`

## 4. Lokale Entwicklung

```bash
npm install
npm run cf:dev
```

Für lokale Secrets empfiehlt sich eine `.dev.vars` Datei im Projektroot.
Eine Vorlage liegt in:

- `.dev.vars.example`

Wichtig:
- `.env` wird von Cloudflare/Wrangler **nicht automatisch** für Functions verwendet
- lokal für `wrangler pages dev` solltest du die Werte in `.dev.vars` hinterlegen

## 5. API-Routen

- `POST /api/contact`
- `GET /api/uploads?token=...`

## 6. Upload-Flow

1. Formular sendet `multipart/form-data` an `/api/contact`
2. Function validiert Felder und Dateien
3. Dateien landen temporär in R2
4. Mail geht über Resend an STRATO-Postfächer
5. Mail enthält sichere temporäre Download-Links
