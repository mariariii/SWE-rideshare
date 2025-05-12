const express = require('express');
const router = express.Router();
const supabase = require('./supabaseClient');


// 1. View Available Ride Requests (for drivers)
router.get('/available-rides', async (req, res) => {
  const { data, error } = await supabase
    .from('ride')
    .select('*')
    .eq('status', 'requested');

  if (error) {
    console.error('❌ Error fetching available rides:', error);
    return res.status(500).json({ error: 'Failed to fetch rides' });
  }

  res.status(200).json({ rides: data });
});

// 2. Accept a Ride
router.post('/accept-ride/:rideId', async (req, res) => {
  const { rideId } = req.params;
  const { driverId } = req.body;

  const { data, error } = await supabase
    .from('ride')
    .update({
      driver_id: driverId,
      status: 'accepted',
      accepted_at: new Date().toISOString(),
    })
    .eq('ride_id', rideId)
    .eq('status', 'requested')
    .select();

  if (error || !data.length) {
    console.error('❌ Error accepting ride:', error);
    return res.status(400).json({ error: 'Could not accept ride' });
  }

  res.status(200).json({ message: 'Ride accepted', ride: data[0] });
});
// 3. Cancel a Ride (by rider or driver)
router.post('/cancel-ride/:rideId', async (req, res) => {
  const { rideId } = req.params;


  const rideIdNumber = parseInt(rideId, 10);
  if (isNaN(rideIdNumber)) {
    return res.status(400).json({ error: 'Invalid ride ID' });
  }

  const { data, error } = await supabase
    .from('ride')
    .update({
      status: 'canceled',
      canceled_at: new Date().toISOString(),
    })
    .eq('ride_id', rideIdNumber) 
    .select();

  if (error || !data.length) {
    console.error('❌ Error canceling ride:', error);
    return res.status(400).json({ error: 'Could not cancel ride' });
  }

  res.status(200).json({ message: 'Ride canceled', ride: data[0] });
});

// 4. Complete a Ride
router.post('/complete-ride/:rideId', async (req, res) => {
  const { rideId } = req.params;

  const { data, error } = await supabase
    .from('ride')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
    })
    .eq('ride_id', rideId)
    .eq('status', 'accepted')
    .select();

    const { data: userData } = await supabase
    .from('profiles')
    .select('rating')
    .eq('auc_id', driverId);

    res.status(200).json({
    message: 'Ride completed',
    ride: data[0],
    driverRating: userData.rating
    });


  if (error || !data.length) {
    console.error('❌ Error completing ride:', error);
    return res.status(400).json({ error: 'Could not complete ride' });
  }

  res.status(200).json({ message: 'Ride completed', ride: data[0] });
});

module.exports = router;

