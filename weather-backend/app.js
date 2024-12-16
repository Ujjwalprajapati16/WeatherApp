import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/database.js';
import weatherRoutes from "./Routes/weatherRoutes.js";
import authRoutes from "./Routes/authRoutes.js"
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});

// Connect to database
connectDB();

//limiter
app.use('/api/weather', limiter);

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/auth', authRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Weather App API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
