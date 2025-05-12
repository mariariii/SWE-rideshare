const express = require('express');
const router = express.Router();
const supabase = require('./supabaseClient');
const fetch = require('node-fetch');

// Live location tracking endpoint
router.post('/update-location', async (req, res) => {
  const { userId, lat, lng } = req.body;
  
  // 1. Store raw coordinates in Supabase
  const { data, error } = await supabase
    .from('locations')
    .upsert([{
      user_id: userId,
      coordinates: `POINT(${lng} ${lat})`,
      timestamp: new Date().toISOString()
    }]);

  // 2. Reverse geocode with Nominatim
  const nominatimResponse = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
  );
  const addressData = await nominatimResponse.json();

  // 3. Update users table with address
  await supabase
    .from('profiles')
    .update({ last_known_address: addressData.display_name })
    .eq('auc_id', userId);

  res.status(200).json({ 
    message: 'Location updated',
    address: addressData.display_name 
  });
});

module.exports = router;
