export async function sendContactMail({ config, to, replyTo, subject, html, text }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: config.mailFrom,
      to,
      reply_to: replyTo || config.mailReplyFallback,
      subject,
      html,
      text
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend send failed (${response.status}): ${details}`);
  }

  return response.json();
}
