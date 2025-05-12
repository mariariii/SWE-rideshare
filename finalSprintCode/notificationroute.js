const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.post('/api/send-notification', async (req, res) => {
    const { token, title, body } = req.body;
    const message = {
      notification: { title, body },
      token: token //should change token to one in flutter app
    };
    try {
      await admin.messaging().send(message);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
  