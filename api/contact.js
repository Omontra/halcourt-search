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

    const textBody = [
      `Name: ${name || 'N/A'}`,
      `Email: ${email}`,
      `Phone: ${phone || 'N/A'}`,
      '',
      message
    ].join('\n');

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `New contact form submission${name ? ` from ${name}` : ''}`,
      text: textBody
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form send error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
};



