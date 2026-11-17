require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/auth');
const guestRoutes = require('./routes/guests');
const voteRoutes = require('./routes/votes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/votes', voteRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Pizza Party API is running 🍕' });
});

// ✅ Frontend static fayllarini serve qilish
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// Barcha qolgan so'rovlarni index.html ga yo'naltirish
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🍕 Server running on http://localhost:${PORT}`);
});
