const { Resend } = require('resend');
const Sentry = require('@sentry/node');

// Initialize Sentry for error tracking
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.VERCEL_ENV || 'development',
    tracesSampleRate: 0.1,
  });
}

// In-memory rate limiter (best-effort on serverless — instances don't share state
// and cold starts reset the Map, but it still catches rapid-fire from a warm instance)
const submissions = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_SUBMISSIONS = 3;

function checkRateLimit(identifier) {
  const now = Date.now();
  const userSubmissions = submissions.get(identifier) || [];
  const recentSubmissions = userSubmissions.filter(time => now - time < RATE_LIMIT_WINDOW);

  if (recentSubmissions.length >= MAX_SUBMISSIONS) {
    return false;
  }

  recentSubmissions.push(now);
  submissions.set(identifier, recentSubmissions);
  return true;
}

// Allowed origins for this form
const ALLOWED_ORIGINS = [
  'https://www.halcourtsearch.com',
  'https://halcourtsearch.com',
];

// Input length limits
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;
const MAX_MESSAGE_LENGTH = 5000;

// Minimum time (ms) between page load and submission to be considered human
const MIN_SUBMISSION_TIME = 3000;

/**
 * Verify Cloudflare Turnstile token
 */
async function verifyTurnstile(token, ip) {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      remoteip: ip,
    }),
  });
  const result = await response.json();
  return result.success === true;
}

/**
 * Validate email format (RFC 5322 simplified)
 */
function isValidEmail(email) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return re.test(email) && email.includes('.');
}

/**
 * Check Origin/Referer header against allowed domains
 */
function isAllowedOrigin(req) {
  // Skip origin check in development
  if (process.env.VERCEL_ENV === 'development') return true;

  const origin = req.headers['origin'] || '';
  const referer = req.headers['referer'] || '';

  if (origin && ALLOWED_ORIGINS.includes(origin)) return true;
  if (referer && ALLOWED_ORIGINS.some(o => referer.startsWith(o))) return true;

  return false;
}

/**
 * HTML-escape user input
 */
function safe(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char]);
}

/**
 * Contact form handler
 * Expects JSON: { name, email, phone, message, bot-field, cf-turnstile-response, _loadedAt }
 * Environment: RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, TURNSTILE_SECRET_KEY
 */
module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // --- Origin check ---
  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // --- Rate limiting (best-effort) ---
  const ip = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const {
    name = '',
    email = '',
    phone = '',
    message = '',
    'bot-field': botField = '',
    'cf-turnstile-response': turnstileToken = '',
    '_loadedAt': loadedAt = '',
  } = req.body || {};

  // --- Honeypot check ---
  if (botField) {
    return res.status(200).json({ success: true }); // Silent fail — don't reveal to bots
  }

  // --- Input length limits ---
  if (name.length > MAX_NAME_LENGTH || email.length > MAX_EMAIL_LENGTH ||
      phone.length > MAX_PHONE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: 'Input exceeds maximum length' });
  }

  // --- Required fields ---
  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  // --- Email format validation ---
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }

  // --- Timing check (reject suspiciously fast submissions) ---
  if (loadedAt) {
    const elapsed = Date.now() - parseInt(loadedAt, 10);
    if (elapsed < MIN_SUBMISSION_TIME) {
      return res.status(400).json({ error: 'Please take a moment to fill in the form' });
    }
  }

  // --- Turnstile CAPTCHA verification ---
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn('TURNSTILE_SECRET_KEY not set — skipping CAPTCHA verification');
  } else {
    if (!turnstileToken) {
      return res.status(400).json({ error: 'Please complete the verification check' });
    }
    try {
      const valid = await verifyTurnstile(turnstileToken, ip);
      if (!valid) {
        return res.status(400).json({ error: 'Verification failed. Please try again.' });
      }
    } catch (err) {
      console.error('Turnstile verification error:', err);
      // Fail open for availability — other checks still protect the form
    }
  }

  // --- Email service check ---
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL || !process.env.CONTACT_TO_EMAIL) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const submittedAt = new Date().toISOString();

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

    if (process.env.SENTRY_DSN) {
      Sentry.captureException(error, {
        tags: { function: 'contact-form' },
        extra: { email, hasName: !!name },
      });
      await Sentry.flush(2000);
    }

    return res.status(500).json({ error: 'Failed to send message' });
  }
};
