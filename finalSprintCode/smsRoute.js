const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(require('./sms-verification-52e87-firebase-adminsdk-fbsvc-34afd357f1.json'))
});

const verificationCodes = {}; // In-memory store: { phone: { code, expiresAt } }

// Send verification code
router.post('/send-sms-code', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number required' });

  try {
    // Format phone number to E.164 format if not already
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    
    // Create a custom token for the phone number
    const customToken = await admin.auth().createCustomToken(formattedPhone);
    
    // In a real implementation, you would use this token with Firebase Client SDK
    // For now, we'll simulate the verification process
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes[formattedPhone] = { 
      code, 
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 min expiry
    };

    // For testing, we'll return both the token and code
    res.json({ 
      success: true, 
      message: 'Verification process started',
      token: customToken,
      code: code // Only for testing! Remove in production
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to start verification process' 
    });
  }
});

// Verify code
router.post('/verify-sms-code', async (req, res) => {
  const { phone, code } = req.body;
  const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
  const record = verificationCodes[formattedPhone];
  
  if (!record) return res.status(400).json({ error: 'No code sent to this number' });
  if (Date.now() > record.expiresAt) return res.status(400).json({ error: 'Code expired' });
  if (record.code !== code) return res.status(400).json({ error: 'Invalid code' });

  try {
    // In a real implementation, you would verify the Firebase ID token here
    delete verificationCodes[formattedPhone];
    res.json({ success: true, message: 'Phone verified' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to verify phone number' 
    });
  }
});

module.exports = router;
