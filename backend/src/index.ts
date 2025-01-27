import express from "express";
import dotenv from 'dotenv';
import cors from "cors";

import authRoutes  from './routes/authRoutes';
import userRoutes  from './routes/userRoutes';

// Read environment variables
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

// Start listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});