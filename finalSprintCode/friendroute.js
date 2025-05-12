const express = require('express');
const router = express.Router();
const supabase = require('./supabaseClient');

// send friend request
router.post('/friends/send', async (req, res) => {
  const { senderId, receiverId } = req.body;

  const { data, error } = await supabase
    .from('request')
    .insert({
      sender_id: senderId,
      receiver_id: receiverId,
      status: 'Pending',
      sent_at: new Date().toISOString()
    })
    .select();

  if (error) {
    console.error('❌ Error sending friend request:', error);
    return res.status(500).json({ error: 'Failed to send request' });
  }

  res.status(200).json({ message: 'Friend request sent', request: data[0] });
});

module.exports = router;

//view pending friend requests
router.get('/friends/requests/:receiverId', async (req, res) => {
  const { receiverId } = req.params;

  try {
    const { data, error } = await supabase
      .from('request')
      .select('*')
      .eq('receiver_id', receiverId)
      .eq('status', 'Pending');

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'No pending requests found' });
    }

    res.status(200).json({ requests: data });
  } catch (error) {
    console.error('❌ Error fetching requests:', error);
    return res.status(500).json({ error: 'Failed to fetch friend requests' });
  }
});

//Accept friend request
router.post('/friends/accept', async (req, res) => {
  const { requestId } = req.body;

  const { data, error } = await supabase
    .from('request')
    .update({ status: 'Accepted' })
    .eq('id', requestId)
    .eq('status', 'Pending')
    .select();

  if (error || !data.length) {
    console.error('❌ Error accepting friend request:', error);
    return res.status(400).json({ error: 'Failed to accept request' });
  }

  res.status(200).json({ message: 'Friend request accepted', request: data[0] });
});

//Decline friend request
router.post('/friends/decline', async (req, res) => {
  const { requestId } = req.body;

  const { data, error } = await supabase
    .from('request')
    .update({ status: 'Declined' })
    .eq('id', requestId)
    .eq('status', 'Pending')
    .select();

  if (error || !data.length) {
    console.error('❌ Error declining friend request:', error);
    return res.status(400).json({ error: 'Failed to decline request' });
  }

  res.status(200).json({ message: 'Friend request declined', request: data[0] });
});

