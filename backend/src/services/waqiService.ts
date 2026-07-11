import axios from 'axios';

// We fallback to a mock service if WAQI_TOKEN is not provided
const WAQI_TOKEN = process.env.WAQI_TOKEN;

// Some primary cities to pull if bounding box isn't used
const PRIMARY_CITIES = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'];

export const fetchLiveAqi = async () => {
  if (!WAQI_TOKEN) {
    console.log('[Service] WAQI_TOKEN missing, returning robust mock data');
    return generateMockAqiData();
  }

  try {
    const results = [];
    // WAQI API doesn't easily allow bulk city queries without a bounding box
    // For demo purposes, we query the primary cities individually
    for (const city of PRIMARY_CITIES) {
      const response = await axios.get(`https://api.waqi.info/feed/${city}/?token=${WAQI_TOKEN}`);
      if (response.data && response.data.status === 'ok') {
        const data = response.data.data;
        results.push({
          city: city,
          state: 'India',
          location: {
            type: 'Point',
            coordinates: [data.city.geo[1], data.city.geo[0]] // [lng, lat]
          },
          aqi: data.aqi,
          pm25: data.iaqi.pm25 ? data.iaqi.pm25.v : 0,
          pm10: data.iaqi.pm10 ? data.iaqi.pm10.v : 0,
          timestamp: new Date()
        });
      }
    }
    return results;
  } catch (error: any) {
    console.error('[Service] Error fetching WAQI data:', error.message);
    throw new Error('Failed to fetch from WAQI');
  }
};

const generateMockAqiData = () => {
  return [
    { city: 'Delhi', state: 'Delhi', coordinates: [77.2090, 28.6139], aqi: 285, pm25: 145.2, pm10: 240.5, color: '#DC143C' },
    { city: 'Mumbai', state: 'Maharashtra', coordinates: [72.8777, 19.0760], aqi: 142, pm25: 65.8, pm10: 110.2, color: '#FF8F00' },
    { city: 'Bangalore', state: 'Karnataka', coordinates: [77.5946, 12.9716], aqi: 85, pm25: 35.4, pm10: 75.1, color: '#FFA726' },
    { city: 'Chennai', state: 'Tamil Nadu', coordinates: [80.2707, 13.0827], aqi: 92, pm25: 42.1, pm10: 82.4, color: '#FFA726' },
    { city: 'Kolkata', state: 'West Bengal', coordinates: [88.3639, 22.5726], aqi: 198, pm25: 95.6, pm10: 165.3, color: '#FF8F00' },
    { city: 'Hyderabad', state: 'Telangana', coordinates: [78.4867, 17.3850], aqi: 115, pm25: 52.3, pm10: 95.8, color: '#FF8F00' },
    { city: 'Pune', state: 'Maharashtra', coordinates: [73.8567, 18.5204], aqi: 105, pm25: 48.5, pm10: 88.2, color: '#FF8F00' },
    { city: 'Ahmedabad', state: 'Gujarat', coordinates: [72.5714, 23.0225], aqi: 165, pm25: 78.4, pm10: 135.6, color: '#FF8F00' },
    { city: 'Jaipur', state: 'Rajasthan', coordinates: [75.7873, 26.9124], aqi: 175, pm25: 85.2, pm10: 145.8, color: '#FF8F00' },
    { city: 'Lucknow', state: 'Uttar Pradesh', coordinates: [80.9462, 26.8467], aqi: 245, pm25: 115.6, pm10: 195.4, color: '#DC143C' }
  ].map(item => ({
    city: item.city,
    state: item.state,
    location: {
      type: 'Point',
      coordinates: item.coordinates
    },
    aqi: item.aqi,
    pm25: item.pm25,
    pm10: item.pm10,
    timestamp: new Date()
  }));
};
