// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');


const supabase = require('./supabaseClient');


// Import your classes
const User = require('./user');
const Ride = require('./ride');
const Payment = require('./payment');
const Report = require('./report');
const Car = require('./car');
const Admin = require('./admin');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json()); // To parse JSON request bodies


// Example: Store users in-memory for now
const users = [];


// --- API ROUTES ---
app.get('/', (req, res) => {
   res.send('✅ AUC Rideshare server is running!');
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
            }
        ]);

    if (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({ error: 'Failed to register user' });
    }

    res.status(201).json({ message: 'User registered successfully', user: data[0] });
});





// 2. Request a ride
app.post('/api/request-ride/:aucId', (req, res) => {
   const user = users.find(u => u.aucId === parseInt(req.params.aucId));
   if (!user) return res.status(404).json({ error: 'User not found' });


   try {
       const ride = user.requestRide();
       res.status(201).json({ message: 'Ride requested', ride });
   } catch (err) {
       res.status(400).json({ error: err.message });
   }
});


// Add more APIs here...


// Start the server
app.listen(PORT, () => {
   console.log(`🚗 Server is running on http://localhost:${PORT}`);
});



