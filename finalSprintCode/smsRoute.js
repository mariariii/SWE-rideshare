const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const verificationCodes = {}; // In-memory store: { phone: { code, expiresAt } }

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}

// Send verification code
router.post('/send-sms-code', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number required' });

  const code = generateCode();
  verificationCodes[phone] = { code, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 min expiry

  const response = await fetch('https://textbelt.com/text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `phone=${encodeURIComponent(phone)}&message=Your verification code is ${code}&key=${process.env.TEXTBELT_KEY || 'textbelt'}`
  });
  const data = await response.json();

  if (data.success) {
    res.json({ success: true, message: 'Code sent' });
  } else {
    res.status(500).json({ success: false, message: data.message });
  }
});

// Verify code
router.post('/verify-sms-code', (req, res) => {
  const { phone, code } = req.body;
  const record = verificationCodes[phone];
  if (!record) return res.status(400).json({ error: 'No code sent to this number' });
  if (Date.now() > record.expiresAt) return res.status(400).json({ error: 'Code expired' });
  if (record.code !== code) return res.status(400).json({ error: 'Invalid code' });

  delete verificationCodes[phone];
  res.json({ success: true, message: 'Phone verified' });
});

module.exports = router;
