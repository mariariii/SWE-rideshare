const express = require('express');
const router = express.Router();
const supabase = require('./supabaseClient');

// Update user rating
router.put('/update-rating', async (req, res) => {
  const { userId, newRating } = req.body;
  
  // Validate rating
  if (newRating < 1 || newRating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ rating: newRating })
    .eq('auc_id', userId)
    .select();

  if (error) {
    return res.status(500).json({ error: 'Failed to update rating' });
  }

  res.status(200).json({ 
    message: 'Rating updated successfully',
    user: data[0]
  });
});

// Get user rating
router.get('/:userId/rating', async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from('profiles')
    .select('rating')
    .eq('auc_id', userId)
    .single();

  if (error) {
    return res.status(500).json({ error: 'Failed to fetch rating' });
  }

  res.status(200).json({ rating: data.rating });
});

module.exports = router;
