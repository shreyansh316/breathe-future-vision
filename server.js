require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const { Kafka } = require('kafkajs');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Phase 3: ML & Pipelines (Kafka Schema Registry Scaffold)
const kafka = new Kafka({
  clientId: 'vayurakshak-api',
  brokers: [process.env.KAFKA_BROKERS || 'kafka:9092']
});

class TelemetryStreamer {
  constructor() {
    this.producer = kafka.producer();
    this.isConnected = false;
    this.init();
  }

  async init() {
    try {
      await this.producer.connect();
      this.isConnected = true;
      console.log('[Kafka Streamer] Connected to telemetry broker cluster.');
    } catch (err) {
      console.warn('[Kafka Streamer] Warning: Kafka brokers offline. Running in direct-DB fallback mode.');
    }
  }

  async validateAndPublish(city, metrics) {
    // Scaffold: Strict Schema Validation (Point 182)
    // In production, this validates against an Avro schema registry
    if (typeof metrics.pm25 !== 'number' || typeof metrics.aqi !== 'number') {
      throw new Error("Invalid telemetry schema: Dropping malformed sensor packet.");
    }

    if (this.isConnected) {
      await this.producer.send({
        topic: 'sensor.telemetry.live',
        messages: [{ key: city, value: JSON.stringify(metrics) }]
      });
    }
  }
}

const telemetryStreamer = new TelemetryStreamer();

// Initialize Redis Client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('[Redis] Client Error', err));
redisClient.connect().then(() => console.log('[Redis] Connected safely to cache engine.')).catch(console.error);

// Initialize Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Configure CORS for credentials (cookies)
app.use(cors({
  origin: "http://localhost:5173", // Replace with exact frontend URL in production
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB Schema for Time-Series Telemetry
const pollutantLogSchema = new mongoose.Schema({
  city: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now, index: true },
  aqi: Number,
  pm25: Number,
  pm10: Number,
  temperature: Number,
  humidity: Number,
  status: String
});

const PollutantLog = mongoose.model('PollutantLog', pollutantLogSchema);

// Base mock data for initializing cities
const initialCityData = {
  "delhi": { aqi: 125, pm25: 45, pm10: 168, temperature: 34, humidity: 45, status: "Poor" },
  "jaipur": { aqi: 78, pm25: 23, pm10: 102, temperature: 32, humidity: 56, status: "Moderate" }
};

// State tracker to hold current values for fluctuations
let currentCityState = { ...initialCityData };

// Setup MongoDB Memory Server and Connect
async function startDatabase() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  
  await mongoose.connect(uri);
  console.log(`[MongoDB] Connected successfully to Memory Server at ${uri}`);
  
  // Initialize Database with some baseline data
  for (const city of Object.keys(initialCityData)) {
    await PollutantLog.create({
      city,
      ...initialCityData[city]
    });
  }
  
  startTelemetryEngine();
}

// WebSocket Connection
io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

// Autonomous Telemetry Engine
function startTelemetryEngine() {
  setInterval(async () => {
    let broadcastPayload = {};
    
    for (const city of Object.keys(currentCityState)) {
      const current = currentCityState[city];
      
      // Fluctuations
      current.aqi = Math.max(0, Math.round(current.aqi + (Math.random() * 4 - 2)));
      current.pm25 = Math.max(0, Math.round(current.pm25 + (Math.random() * 2 - 1)));
      current.pm10 = Math.max(0, Math.round(current.pm10 + (Math.random() * 4 - 2)));
      
      if (current.aqi <= 50) current.status = "Good";
      else if (current.aqi <= 100) current.status = "Moderate";
      else if (current.aqi <= 150) current.status = "Unhealthy for Sensitive Groups";
      else if (current.aqi <= 200) current.status = "Poor";
      else current.status = "Severe";
      
      // Save the new reading to MongoDB Time-Series Collection
      await PollutantLog.create({
        city,
        ...current
      });
      
      broadcastPayload[city] = { current };
    }
    
    // Push the payload to all connected WebSocket clients
    io.emit('telemetry-update', broadcastPayload);
  }, 4000);
}

// ========================================================
// ENDPOINT 1: Fetch Live Metrics & Recent History (Redis Cached)
// ========================================================
app.get('/api/v2/live/:city', async (req, res) => {
  const cityKey = req.params.city.toLowerCase().trim();
  
  try {
    // 1. Check Redis Cache First
    if (redisClient.isReady) {
      const cachedData = await redisClient.get(`aqi:live:${cityKey}`);
      if (cachedData) {
        console.log(`[Cache Hit] Serving ${cityKey} from Redis`);
        return res.status(200).json(JSON.parse(cachedData));
      }
    }

    // 2. Cache Miss - Query MongoDB
    console.log(`[Cache Miss] Querying MongoDB for ${cityKey}`);
    const latestReading = await PollutantLog.findOne({ city: cityKey }).sort({ timestamp: -1 });
    
    if (!latestReading) {
      return res.status(404).json({ status: "error", message: `Location data matrix not found.` });
    }

    const responsePayload = {
      status: "success",
      location: cityKey,
      timestamp: latestReading.timestamp,
      data: {
        current: latestReading
      }
    };

    // 3. Store in Redis with TTL (60 seconds)
    if (redisClient.isReady) {
      await redisClient.setEx(`aqi:live:${cityKey}`, 60, JSON.stringify(responsePayload));
    }

    res.status(200).json(responsePayload);
  } catch (error) {
    res.status(500).json({ status: "error", message: "Database query failed." });
  }
});

// ========================================================
// ENDPOINT 2: Geocoder Mock
// ========================================================
app.post('/api/v2/search', (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ status: "error", message: "Missing search parameters." });
  
  const normalizedQuery = query.toLowerCase().trim();
  if (normalizedQuery.includes("delhi")) return res.status(200).json({ redirect: "delhi", formattedName: "Delhi, India" });
  else if (normalizedQuery.includes("jaipur")) return res.status(200).json({ redirect: "jaipur", formattedName: "Jaipur, Rajasthan, India" });
  
  res.status(404).json({ status: "error", message: "No stations found." });
});

// ========================================================
// ENDPOINT 3: Auth Session Handler (Set HTTPOnly Cookie)
// ========================================================
app.post('/api/v2/auth/session', (req, res) => {
  const { access_token } = req.body;
  if (!access_token) return res.status(400).json({ error: "Missing access_token" });

  // Set the JWT as an HTTPOnly cookie (secure in production)
  res.cookie('vayu_auth', access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.status(200).json({ status: "success", message: "Session established securely." });
});

app.post('/api/v2/auth/logout', (req, res) => {
  res.clearCookie('vayu_auth');
  res.status(200).json({ status: "success", message: "Logged out securely." });
});

// ========================================================
// MIDDLEWARE: Verify HTTPOnly Cookie Auth
// ========================================================
const verifyAuthCookie = (req, res, next) => {
  const token = req.cookies.vayu_auth;
  if (!token) return res.status(401).json({ error: "Unauthorized: Missing authentication cookie." });

  // If SUPABASE_JWT_SECRET is set, we verify the signature.
  // Otherwise, we just decode it for development.
  try {
    const jwtSecret = process.env.SUPABASE_JWT_SECRET;
    let decoded;
    if (jwtSecret) {
      decoded = jwt.verify(token, jwtSecret);
    } else {
      decoded = jwt.decode(token); // Fallback for dev if no secret
    }
    
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: Invalid token signature." });
  }
};

// ========================================================
// ENDPOINT 4: Secure Profile Route (Requires Auth)
// ========================================================
app.get('/api/v2/user/profile', verifyAuthCookie, (req, res) => {
  res.status(200).json({ 
    status: "success", 
    message: "Authenticated successfully via HTTPOnly cookie",
    user: req.user 
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Internal server processing failure occurred." });
});

server.listen(PORT, async () => {
  console.log(`[AQI Backend Engine] Express server active on http://localhost:${PORT}`);
  await startDatabase();
});
