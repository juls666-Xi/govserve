const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Auth route (simple stub)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Dummy validation for local testing
  if (email === 'user@example.com' && password === 'password123') {
    return res.json({ message: 'Login successful', user: { email } });
  }

  return res.status(401).json({ message: 'Invalid email or password.' });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'GovServe API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});