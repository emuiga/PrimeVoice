// Contact form handler using Resend
// IMPORTANT: Your "from" domain must be verified in your Resend dashboard.
// Visit https://resend.com/domains and add primevoicemedia.co.ke
// Until verified, use onboarding@resend.dev (sends to your Resend account email only).
// `to` is the Resend account owner's email (primevoicemedia@gmail.com) — sandbox mode only
// allows sending to that address. Switch to other recipients once a domain is verified.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, subject, message } = body

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return Response.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      // Replace with noreply@primevoicemedia.co.ke once domain is verified in Resend
      from: 'Prime Voice Media <onboarding@resend.dev>',
      to: ['primevoicemedia@gmail.com'],
      reply_to: email,
      subject: `New enquiry${subject ? `: ${subject}` : ''} — from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#FF5A1F;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;width:140px;">Name</td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Project Type</td><td>${subject ? escapeHtml(subject) : 'Not specified'}</td></tr>
          </table>
          <hr style="margin:16px 0;border:none;border-top:1px solid #eee;" />
          <h3 style="color:#1A0A2E;">Message</h3>
          <p style="line-height:1.6;color:#444;">${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
          <hr style="margin:16px 0;border:none;border-top:1px solid #eee;" />
          <p style="color:#999;font-size:12px;">Sent via primevoicemedia.co.ke contact form</p>
        </div>
      `,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    console.error('Resend error:', err)
    return Response.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return Response.json({ success: true })
}
