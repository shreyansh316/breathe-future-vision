import mongoose, { Document, Schema } from 'mongoose';

export interface IAqiReading extends Document {
  city: string;
  state: string;
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  pm25: number;
  pm10: number;
  aqi: number;
  timestamp: Date;
}

const AqiReadingSchema: Schema = new Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  pm25: { type: Number, required: true },
  pm10: { type: Number, required: true },
  aqi: { type: Number, required: true },
  timestamp: { type: Date, required: true, default: Date.now }
}, {
  // Utilizing MongoDB Time-Series collection features via Mongoose 6+
  timeseries: {
    timeField: 'timestamp',
    metaField: 'city',
    granularity: 'hours'
  }
});

// Index for Geospatial queries
AqiReadingSchema.index({ location: '2dsphere' });

export default mongoose.model<IAqiReading>('AqiReading', AqiReadingSchema);
