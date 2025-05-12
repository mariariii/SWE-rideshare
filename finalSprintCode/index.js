require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const supabase = require('./supabaseClient');

// Route Imports
const rideRoutes = require('./rideroute');
const friendRoutes = require('./friendroute');
const locationRoutes = require('./locationroute');
const userRoutes = require('./userRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// HTTP Server for Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`🚨 Received ${req.method} ${req.url}`);
  next();
});

  
// 1. Register a new user
app.use((req, res, next) => {
   console.log(`🚨 Received request: ${req.method} ${req.url}`);
   next();
 });
 // Register user without using Supabase Auth UUID, but using `aucId`
app.post('/api/register', async (req, res) => {
    const { aucId, firstName, lastName, phoneNumber, isDriver } = req.body;

    // Check if aucId already exists in the profiles table
    const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('*')
        .eq('auc_id', aucId);

    if (checkError) {
        return res.status(500).json({ error: 'Error checking if user exists' });
    }

    if (existingUser.length > 0) {
        return res.status(400).json({ error: 'User with this aucId already exists' });
    }

    // Insert the user into the profiles table
    const { data, error } = await supabase
        .from('profiles')
        .insert([
            {
                auc_id: aucId,  // Use the aucId provided by the user as the primary key
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                is_driver: isDriver,
                is_banned: false,  // default value
                rating: 5.0
            }
        ]);

    if (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({ error: 'Failed to register user' });
    }

    res.status(201).json({ message: 'User registered successfully', user: data[0] });
});


app.post('/api/login', async (req, res) => {
    const { aucId, phoneNumber } = req.body;
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('auc_id', aucId)
            .eq('phone_number', phoneNumber)
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        if (!data) {
            return res.status(401).json({ error: 'Invalid AUC ID or phone number' });
        }

        // Use the correct field names from your database
        res.status(200).json({
            message: 'Login successful',
            user: {
                aucId: data.auc_id,
                firstName: data.first_name,
                lastName: data.last_name,
                isDriver: data.is_driver,
                isBanned: data.is_banned,
                rating: data.rating
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});



// 2. Request a ride
app.post('/api/request-ride', async (req, res) => {
    const { riderId } = req.body;
  
    if (!riderId) {
      return res.status(400).json({ error: 'Missing rider ID' });
    }
  
    const newRide = {
      rider_id: riderId,
      requested_at: new Date().toISOString(),
      status: 'requested'
    };
  
    console.log('➡️ Inserting ride:', newRide);
  
    const { data, error } = await supabase
      .from('ride')
      .insert([newRide])
      .select();
  
    if (error) {
      console.error('❌ Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to request ride' });
    }
  
    res.status(201).json({ message: '✅ Ride requested successfully', ride: data[0] });
  });
  


// Modular Routes
app.use('/api', [
    rideRoutes,
    friendRoutes,
    locationRoutes,
    userRoutes
  ]);
  
  // Real-time Socket.IO Handlers
  io.on('connection', (socket) => {
    console.log(`🚨 New connection: ${socket.id}`);
  
    socket.on('track-driver', (rideId) => {
      socket.join(rideId);
      console.log(`📌 Driver tracking ride ${rideId}`);
    });
  
    socket.on('driver-location', (data) => {
      io.to(data.rideId).emit('location-update', {
        lat: data.lat,
        lng: data.lng,
        address: data.address
      });
    });
  
    socket.on('disconnect', () => {
      console.log(`🚪 Connection closed: ${socket.id}`);
    });
  });

  
  // Start Server
  server.listen(PORT, () => {
    console.log(`🚗 Server running on http://localhost:${PORT}`);
  });