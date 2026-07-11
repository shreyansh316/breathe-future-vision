const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Initialize Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

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
// ENDPOINT 1: Fetch Live Metrics & Recent History
// ========================================================
app.get('/api/v2/live/:city', async (req, res) => {
  const cityKey = req.params.city.toLowerCase().trim();
  
  try {
    // Query MongoDB for the latest reading
    const latestReading = await PollutantLog.findOne({ city: cityKey }).sort({ timestamp: -1 });
    
    if (!latestReading) {
      return res.status(404).json({ status: "error", message: `Location data matrix not found.` });
    }

    res.status(200).json({
      status: "success",
      location: cityKey,
      timestamp: latestReading.timestamp,
      data: {
        current: latestReading
      }
    });
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "error", message: "Internal server processing failure occurred." });
});

server.listen(PORT, async () => {
  console.log(`[AQI Backend Engine] Express server active on http://localhost:${PORT}`);
  await startDatabase();
});
