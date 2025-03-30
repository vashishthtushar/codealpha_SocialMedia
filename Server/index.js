import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
const app = express();

// to serve images for public (public folder)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// MiddleWare
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', // Allow the React app
  credentials: true
}));

dotenv.config();

// Start server function
const startServer = () => {
  const PORT = process.env.PORT || 4000;
  try {
    // Try to start on the specified port
    app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
  } catch (error) {
    // If the port is busy, try another port
    const alternatePort = parseInt(PORT) + 1;
    console.log(`Port ${PORT} is busy, trying port ${alternatePort}...`);
    app.listen(alternatePort, () => console.log(`Server listening at ${alternatePort}`));
  }
};

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('Connected to MongoDB');
    startServer();
  } catch (error) {
    console.log('MongoDB Atlas connection error:', error);
    console.log('Trying to connect to local MongoDB...');
    
    try {
      // Try connecting to local MongoDB
      await mongoose.connect('mongodb://127.0.0.1:27017/socialmedia', { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
      });
      console.log('Connected to local MongoDB');
      startServer();
    } catch (localError) {
      console.log('Local MongoDB connection error:', localError);
      console.log('Starting server without database for demo purposes...');
      // Start server anyway for demo purposes
      startServer();
    }
  }
};

connectToMongoDB();

// uses of routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);