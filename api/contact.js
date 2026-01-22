const { Resend } = require('resend');

/**
 * Contact form handler
 * Expects JSON: { name, email, phone, message }
 * Uses environment:
 * - RESEND_API_KEY
 * - CONTACT_FROM_EMAIL
 * - CONTACT_TO_EMAIL
 */
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name = '', email = '', phone = '', message = '' } = req.body || {};

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL || !process.env.CONTACT_TO_EMAIL) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const submittedAt = new Date().toISOString();

    const safe = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);

    const brand = {
      deepNavy: '#0F172A',
      navyBlue: '#1E2A5E',
      offWhite: '#F8FAFC',
      border: '#E2E8F0',
      slate: '#64748B'
    };

    const textBody = [
      'New contact form submission',
      '',
      `Name: ${name || 'N/A'}`,
      `Email: ${email}`,
      `Phone: ${phone || 'N/A'}`,
      `Submitted: ${submittedAt}`,
      '',
      message
    ].join('\n');

    const htmlBody = `
      <div style="margin:0; padding:24px; background:${brand.offWhite}; font-family: Arial, sans-serif; color:${brand.deepNavy};">
        <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid ${brand.border}; border-radius:12px; overflow:hidden;">
          <div style="padding:16px 20px; background:${brand.deepNavy};">
            <table role="presentation" style="border-collapse:collapse; width:100%;">
              <tr>
                <td style="vertical-align:middle;">
                  <div style="color:#ffffff; font-weight:700; font-size:16px;">Halcourt Search</div>
                </td>
                <td style="vertical-align:middle; text-align:right; color:#ffffff; font-size:12px; opacity:0.9;">
                  New enquiry
                </td>
              </tr>
            </table>
          </div>

          <div style="padding:20px;">
            <h2 style="margin:0 0 12px; font-size:18px; color:${brand.navyBlue};">Contact form submission</h2>

            <table role="presentation" style="border-collapse:collapse; width:100%; margin-top:8px;">
              <tr>
                <td style="padding:8px 0; width:140px; color:${brand.slate}; font-size:13px;"><strong>Name</strong></td>
                <td style="padding:8px 0; font-size:14px;">${safe(name || 'N/A')}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; width:140px; color:${brand.slate}; font-size:13px;"><strong>Email</strong></td>
                <td style="padding:8px 0; font-size:14px;">
                  <a href="mailto:${safe(email)}" style="color:${brand.navyBlue}; text-decoration:none;">${safe(email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0; width:140px; color:${brand.slate}; font-size:13px;"><strong>Phone</strong></td>
                <td style="padding:8px 0; font-size:14px;">${safe(phone || 'N/A')}</td>
              </tr>
              <tr>
                <td style="padding:8px 0; width:140px; color:${brand.slate}; font-size:13px;"><strong>Submitted</strong></td>
                <td style="padding:8px 0; font-size:14px;">${safe(submittedAt)}</td>
              </tr>
            </table>

            <div style="margin-top:16px; padding:14px; border:1px solid ${brand.border}; border-radius:10px; background:${brand.offWhite};">
              <div style="font-size:12px; color:${brand.slate}; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px;">
                Message
              </div>
              <div style="white-space:pre-wrap; font-size:14px; line-height:1.6;">${safe(message)}</div>
            </div>
          </div>

          <div style="padding:12px 20px; border-top:1px solid ${brand.border}; font-size:12px; color:${brand.slate};">
            Reply to this email to respond directly to the sender.
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `New contact form submission${name ? ` from ${name}` : ''}`,
      text: textBody,
      html: htmlBody
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form send error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
};



