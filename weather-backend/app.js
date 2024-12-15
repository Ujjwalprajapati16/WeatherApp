import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Utils/database.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Weather App API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
