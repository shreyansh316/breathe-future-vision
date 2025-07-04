import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/aakaashsetu';
    
    // In a real environment, we'd log the URI securely (e.g. masking password)
    console.log('Attempting MongoDB connection...');
    
    const conn = await mongoose.connect(mongoUri, {
      // mongoose 6+ defaults to true for most connection options
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.warn('Backend is running, but database writes will fail until a connection is established.');
    // Do not process.exit(1) yet, as we want the server to fallback gracefully for demo purposes
  }
};
