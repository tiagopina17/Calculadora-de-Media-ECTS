// server.js
const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve Firebase config endpoint
app.get('/firebase-config', (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "estudopedia-b50eb.firebaseapp.com",
    projectId: "estudopedia-b50eb",
    storageBucket: "estudopedia-b50eb.firebasestorage.app",
    messagingSenderId: "544051131094",
    appId: "1:544051131094:web:7b8aeaa2ab184614440f77",
    measurementId: "G-HH7CXSJ5NG"
  });
});

// Start server on port 3000
