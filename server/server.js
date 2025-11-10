import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

// Import database connection
import connectDB from './config/database.js';

// Import routes
import authRoutes from './routes/auth.js';
import childRoutes from './routes/children.js';
import vaccinationRoutes from './routes/vaccinations.js';
import clinicRoutes from './routes/clinics.js';
import appointmentRoutes from './routes/appointments.js';
import messageRoutes from './routes/messages.js';
import reminderRoutes from './routes/reminders.js';
import aiRoutes from './routes/ai.js';

// Import middleware
import errorHandler from './middleware/errorHandler.js';

// Import socket handlers
import { setupSocketHandlers } from './utils/socketHandlers.js';

// Import sample data (for development)
import { sampleClinics } from './data/clinics.js';
import Clinic from './models/Clinic.js';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// Socket.io setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// Initialize sample data (development only)
const initializeSampleData = async () => {
  try {
    const clinicCount = await Clinic.countDocuments();
    if (clinicCount === 0) {
      console.log('📝 Initializing sample clinic data...');
      await Clinic.insertMany(sampleClinics);
      console.log('✅ Sample clinics added');
    }
  } catch (error) {
    console.error('❌ Error initializing sample data:', error);
  }
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/children', childRoutes);
app.use('/api/vaccinations', vaccinationRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/ai', aiRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'VaxTrack API is running!', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  });
});

// Setup socket handlers
setupSocketHandlers(io);

// Make io accessible to routes
app.set('io', io);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'API endpoint not found' 
  });
});

// Start server
httpServer.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Client URL: ${process.env.CLIENT_URL}`);
  
  // Initialize sample data after server starts
  if (process.env.NODE_ENV === 'development') {
    await initializeSampleData();
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down server gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});