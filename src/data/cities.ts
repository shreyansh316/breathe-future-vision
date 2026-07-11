
export interface City {
  name: string;
  pm25: number;
  pm10: number;
  aqi: string;
  color: string;
  state: string;
  coordinates: [number, number];
  position?: { x: number; y: number };
  // Additional WAQI data
  actualAqi?: number;
  dominentPol?: string;
  lastUpdate?: string;
  humidity?: number;
  temperature?: number;
  pressure?: number;
  windSpeed?: number;
  no2?: number;
  o3?: number;
  so2?: number;
  co?: number;
  isRuralNode?: boolean;
}

// Enhanced city positions for 51 cities across India
export const cityPositions = {
  // North India
  'Delhi': { x: 0.45, y: 0.25 },
  'Gurgaon': { x: 0.44, y: 0.26 },
  'Noida': { x: 0.46, y: 0.25 },
  'Faridabad': { x: 0.45, y: 0.27 },
  'Chandigarh': { x: 0.43, y: 0.22 },
  'Amritsar': { x: 0.40, y: 0.20 },
  'Ludhiana': { x: 0.41, y: 0.21 },
  
  // Rajasthan
  'Jaipur': { x: 0.42, y: 0.32 },
  'Jodhpur': { x: 0.38, y: 0.33 },
  'Udaipur': { x: 0.40, y: 0.37 },
  'Kota': { x: 0.43, y: 0.36 },
  
  // Gujarat
  'Ahmedabad': { x: 0.30, y: 0.40 },
  'Surat': { x: 0.32, y: 0.44 },
  'Vadodara': { x: 0.31, y: 0.41 },
  'Rajkot': { x: 0.28, y: 0.42 },
  
  // Maharashtra
  'Mumbai': { x: 0.35, y: 0.55 },
  'Pune': { x: 0.40, y: 0.58 },
  'Nagpur': { x: 0.51, y: 0.52 },
  'Nashik': { x: 0.38, y: 0.52 },
  'Aurangabad': { x: 0.43, y: 0.55 },
  'Solapur': { x: 0.43, y: 0.61 },
  
  // Karnataka
  'Bangalore': { x: 0.48, y: 0.75 },
  'Mysore': { x: 0.46, y: 0.77 },
  'Hubli': { x: 0.44, y: 0.68 },
  'Mangalore': { x: 0.42, y: 0.73 },
  
  // Tamil Nadu
  'Chennai': { x: 0.55, y: 0.78 },
  'Coimbatore': { x: 0.48, y: 0.79 },
  'Madurai': { x: 0.50, y: 0.82 },
  'Salem': { x: 0.51, y: 0.76 },
  'Tiruchirappalli': { x: 0.52, y: 0.79 },
  
  // Andhra Pradesh & Telangana
  'Hyderabad': { x: 0.50, y: 0.65 },
  'Visakhapatnam': { x: 0.58, y: 0.65 },
  'Vijayawada': { x: 0.55, y: 0.69 },
  'Guntur': { x: 0.54, y: 0.70 },
  'Tirupati': { x: 0.52, y: 0.74 },
  
  // Kerala
  'Kochi': { x: 0.45, y: 0.82 },
  'Thiruvananthapuram': { x: 0.46, y: 0.85 },
  'Kozhikode': { x: 0.44, y: 0.79 },
  'Kottayam': { x: 0.45, y: 0.83 },
  
  // West Bengal
  'Kolkata': { x: 0.68, y: 0.45 },
  'Howrah': { x: 0.67, y: 0.45 },
  'Durgapur': { x: 0.66, y: 0.42 },
  'Asansol': { x: 0.65, y: 0.42 },
  
  // Odisha
  'Bhubaneswar': { x: 0.62, y: 0.52 },
  'Cuttack': { x: 0.63, y: 0.53 },
  'Rourkela': { x: 0.60, y: 0.48 },
  
  // Bihar & Jharkhand
  'Patna': { x: 0.61, y: 0.38 },
  'Gaya': { x: 0.60, y: 0.39 },
  'Ranchi': { x: 0.62, y: 0.43 },
  'Jamshedpur': { x: 0.64, y: 0.44 },
  
  // Uttar Pradesh
  'Lucknow': { x: 0.55, y: 0.32 },
  'Kanpur': { x: 0.54, y: 0.33 },
  'Agra': { x: 0.50, y: 0.32 },
  'Varanasi': { x: 0.58, y: 0.37 },

  // International cities for testing
  'Beijing': { x: 0.75, y: 0.15 },
  'Shanghai': { x: 0.78, y: 0.25 },
  'London': { x: 0.15, y: 0.15 }
};

// Initial cities data - will be updated with real WAQI data
export const initialCitiesData: City[] = [
  // North India
  { name: 'Delhi', pm25: 156, pm10: 234, aqi: 'Severe', color: '#8B0000', state: 'Delhi', coordinates: [77.2090, 28.6139] },
  { name: 'Gurgaon', pm25: 145, pm10: 220, aqi: 'Severe', color: '#8B0000', state: 'Haryana', coordinates: [77.0266, 28.4595] },
  { name: 'Noida', pm25: 142, pm10: 215, aqi: 'Severe', color: '#8B0000', state: 'Uttar Pradesh', coordinates: [77.3910, 28.5355] },
  { name: 'Faridabad', pm25: 138, pm10: 210, aqi: 'Very Poor', color: '#DC143C', state: 'Haryana', coordinates: [77.3178, 28.4089] },
  { name: 'Chandigarh', pm25: 89, pm10: 145, aqi: 'Moderate', color: '#FFA726', state: 'Chandigarh', coordinates: [76.7794, 30.7333] },
  { name: 'Amritsar', pm25: 95, pm10: 152, aqi: 'Poor', color: '#FF8F00', state: 'Punjab', coordinates: [74.8723, 31.6340] },
  { name: 'Ludhiana', pm25: 102, pm10: 165, aqi: 'Poor', color: '#FF8F00', state: 'Punjab', coordinates: [75.8573, 30.9010] },
  { name: 'Jaipur', pm25: 87, pm10: 142, aqi: 'Moderate', color: '#FFA726', state: 'Rajasthan', coordinates: [75.7873, 26.9124] },
  { name: 'Jodhpur', pm25: 78, pm10: 128, aqi: 'Moderate', color: '#FFA726', state: 'Rajasthan', coordinates: [73.0243, 26.2389] },
  { name: 'Udaipur', pm25: 65, pm10: 98, aqi: 'Satisfactory', color: '#4CAF50', state: 'Rajasthan', coordinates: [73.7125, 24.5854] },
  { name: 'Kota', pm25: 82, pm10: 135, aqi: 'Moderate', color: '#FFA726', state: 'Rajasthan', coordinates: [75.8648, 25.2138] },
  { name: 'Ahmedabad', pm25: 98, pm10: 167, aqi: 'Poor', color: '#FF8F00', state: 'Gujarat', coordinates: [72.5714, 23.0225] },
  { name: 'Surat', pm25: 85, pm10: 138, aqi: 'Moderate', color: '#FFA726', state: 'Gujarat', coordinates: [72.8311, 21.1702] },
  { name: 'Vadodara', pm25: 79, pm10: 125, aqi: 'Moderate', color: '#FFA726', state: 'Gujarat', coordinates: [73.2081, 22.3072] },
  { name: 'Rajkot', pm25: 72, pm10: 115, aqi: 'Moderate', color: '#FFA726', state: 'Gujarat', coordinates: [70.8022, 22.3039] },
  { name: 'Mumbai', pm25: 89, pm10: 145, aqi: 'Moderate', color: '#FFA726', state: 'Maharashtra', coordinates: [72.8777, 19.0760] },
  { name: 'Pune', pm25: 74, pm10: 119, aqi: 'Moderate', color: '#FFA726', state: 'Maharashtra', coordinates: [73.8567, 18.5204] },
  { name: 'Nagpur', pm25: 92, pm10: 148, aqi: 'Moderate', color: '#FFA726', state: 'Maharashtra', coordinates: [79.0882, 21.1458] },
  { name: 'Nashik', pm25: 68, pm10: 105, aqi: 'Satisfactory', color: '#4CAF50', state: 'Maharashtra', coordinates: [73.7898, 19.9975] },
  { name: 'Aurangabad', pm25: 76, pm10: 122, aqi: 'Moderate', color: '#FFA726', state: 'Maharashtra', coordinates: [75.3433, 19.8762] },
  { name: 'Solapur', pm25: 71, pm10: 112, aqi: 'Moderate', color: '#FFA726', state: 'Maharashtra', coordinates: [75.9064, 17.6599] },
  { name: 'Bangalore', pm25: 67, pm10: 98, aqi: 'Satisfactory', color: '#4CAF50', state: 'Karnataka', coordinates: [77.5946, 12.9716] },
  { name: 'Mysore', pm25: 58, pm10: 85, aqi: 'Satisfactory', color: '#4CAF50', state: 'Karnataka', coordinates: [76.6394, 12.2958] },
  { name: 'Hubli', pm25: 63, pm10: 92, aqi: 'Satisfactory', color: '#4CAF50', state: 'Karnataka', coordinates: [75.1240, 15.3647] },
  { name: 'Mangalore', pm25: 55, pm10: 78, aqi: 'Satisfactory', color: '#4CAF50', state: 'Karnataka', coordinates: [74.8560, 12.9141] },
  { name: 'Chennai', pm25: 78, pm10: 112, aqi: 'Moderate', color: '#FFA726', state: 'Tamil Nadu', coordinates: [80.2707, 13.0827] },
  { name: 'Coimbatore', pm25: 69, pm10: 103, aqi: 'Satisfactory', color: '#4CAF50', state: 'Tamil Nadu', coordinates: [76.9558, 11.0168] },
  { name: 'Madurai', pm25: 73, pm10: 116, aqi: 'Moderate', color: '#FFA726', state: 'Tamil Nadu', coordinates: [78.1198, 9.9252] },
  { name: 'Salem', pm25: 66, pm10: 98, aqi: 'Satisfactory', color: '#4CAF50', state: 'Tamil Nadu', coordinates: [78.1460, 11.6643] },
  { name: 'Tiruchirappalli', pm25: 71, pm10: 108, aqi: 'Moderate', color: '#FFA726', state: 'Tamil Nadu', coordinates: [78.7047, 10.7905] },
  { name: 'Hyderabad', pm25: 92, pm10: 156, aqi: 'Moderate', color: '#FFA726', state: 'Telangana', coordinates: [78.4867, 17.3850] },
  { name: 'Visakhapatnam', pm25: 75, pm10: 118, aqi: 'Moderate', color: '#FFA726', state: 'Andhra Pradesh', coordinates: [83.2185, 17.6868] },
  { name: 'Vijayawada', pm25: 81, pm10: 128, aqi: 'Moderate', color: '#FFA726', state: 'Andhra Pradesh', coordinates: [80.6480, 16.5062] },
  { name: 'Guntur', pm25: 77, pm10: 121, aqi: 'Moderate', color: '#FFA726', state: 'Andhra Pradesh', coordinates: [80.4365, 16.3067] },
  { name: 'Tirupati', pm25: 64, pm10: 95, aqi: 'Satisfactory', color: '#4CAF50', state: 'Andhra Pradesh', coordinates: [79.4192, 13.6288] },
  { name: 'Kochi', pm25: 52, pm10: 75, aqi: 'Satisfactory', color: '#4CAF50', state: 'Kerala', coordinates: [76.2673, 9.9312] },
  { name: 'Thiruvananthapuram', pm25: 48, pm10: 68, aqi: 'Good', color: '#2E7D32', state: 'Kerala', coordinates: [76.9366, 8.5241] },
  { name: 'Kozhikode', pm25: 54, pm10: 78, aqi: 'Satisfactory', color: '#4CAF50', state: 'Kerala', coordinates: [75.7804, 11.2588] },
  { name: 'Kottayam', pm25: 46, pm10: 65, aqi: 'Good', color: '#2E7D32', state: 'Kerala', coordinates: [76.5222, 9.5916] },
  { name: 'Kolkata', pm25: 134, pm10: 189, aqi: 'Very Poor', color: '#DC143C', state: 'West Bengal', coordinates: [88.3639, 22.5726] },
  { name: 'Howrah', pm25: 128, pm10: 182, aqi: 'Very Poor', color: '#DC143C', state: 'West Bengal', coordinates: [88.3103, 22.5958] },
  { name: 'Durgapur', pm25: 115, pm10: 168, aqi: 'Poor', color: '#FF8F00', state: 'West Bengal', coordinates: [87.3119, 23.5204] },
  { name: 'Asansol', pm25: 118, pm10: 172, aqi: 'Poor', color: '#FF8F00', state: 'West Bengal', coordinates: [86.9842, 23.6739] },
  { name: 'Bhubaneswar', pm25: 86, pm10: 138, aqi: 'Moderate', color: '#FFA726', state: 'Odisha', coordinates: [85.8245, 20.2961] },
  { name: 'Cuttack', pm25: 89, pm10: 142, aqi: 'Moderate', color: '#FFA726', state: 'Odisha', coordinates: [85.8790, 20.4625] },
  { name: 'Rourkela', pm25: 94, pm10: 152, aqi: 'Moderate', color: '#FFA726', state: 'Odisha', coordinates: [84.8536, 22.2604] },
  { name: 'Patna', pm25: 125, pm10: 185, aqi: 'Very Poor', color: '#DC143C', state: 'Bihar', coordinates: [85.1376, 25.5941] },
  { name: 'Gaya', pm25: 132, pm10: 195, aqi: 'Very Poor', color: '#DC143C', state: 'Bihar', coordinates: [84.9994, 24.7914] },
  { name: 'Ranchi', pm25: 98, pm10: 158, aqi: 'Poor', color: '#FF8F00', state: 'Jharkhand', coordinates: [85.3240, 23.3441] },
  { name: 'Jamshedpur', pm25: 105, pm10: 165, aqi: 'Poor', color: '#FF8F00', state: 'Jharkhand', coordinates: [86.1844, 22.8046] },
  { name: 'Lucknow', pm25: 148, pm10: 225, aqi: 'Severe', color: '#8B0000', state: 'Uttar Pradesh', coordinates: [80.9462, 26.8467] },
  { name: 'Kanpur', pm25: 165, pm10: 248, aqi: 'Severe', color: '#8B0000', state: 'Uttar Pradesh', coordinates: [80.3319, 26.4499] },
  { name: 'Agra', pm25: 138, pm10: 205, aqi: 'Very Poor', color: '#DC143C', state: 'Uttar Pradesh', coordinates: [78.0081, 27.1767] },
  { name: 'Varanasi', pm25: 142, pm10: 212, aqi: 'Severe', color: '#8B0000', state: 'Uttar Pradesh', coordinates: [82.9739, 25.3176] }
];

// Function to get AQI category and color based on PM2.5 value
export const getAQIFromPM25 = (pm25: number): { aqi: string; color: string } => {
  if (pm25 <= 12) return { aqi: 'Good', color: '#2E7D32' };
  if (pm25 <= 35) return { aqi: 'Satisfactory', color: '#4CAF50' };
  if (pm25 <= 55) return { aqi: 'Moderate', color: '#FFA726' };
  if (pm25 <= 150) return { aqi: 'Poor', color: '#FF8F00' };
  if (pm25 <= 250) return { aqi: 'Very Poor', color: '#DC143C' };
  return { aqi: 'Severe', color: '#8B0000' };
};

// Enhanced function to fetch real pollution data from WAQI API with better error handling
export const fetchPollutionData = async (): Promise<City[]> => {
  const apiToken = '199320f70237e0be9b83b0074ac2f8e081377ea4';
  const updatedCities: City[] = [];
  
  console.log('Starting WAQI API data fetch for', initialCitiesData.length, 'cities');
  
  for (const city of initialCitiesData) {
    try {
      // Try different city name formats for better API matching
      const cityQueries = [
        city.name.toLowerCase(),
        `${city.name.toLowerCase()}, ${city.state.toLowerCase()}`,
        city.name.toLowerCase().replace(/\s+/g, '-')
      ];
      
      let apiData = null;
      
      for (const query of cityQueries) {
        try {
          const response = await fetch(`https://api.waqi.info/feed/${encodeURIComponent(query)}/?token=${apiToken}`);
          const data = await response.json();
          
          if (data.status === 'ok' && data.data && data.data.aqi !== '-') {
            apiData = data.data;
            console.log(`Successfully fetched data for ${city.name} using query: ${query}`);
            break;
          }
        } catch (queryError) {
          console.log(`Query failed for ${city.name} with query ${query}:`, queryError);
          continue;
        }
      }
      
      if (apiData) {
        const pm25 = apiData.iaqi?.pm25?.v || city.pm25;
        const pm10 = apiData.iaqi?.pm10?.v || city.pm10;
        const aqiInfo = getAQIFromPM25(pm25);
        
        updatedCities.push({
          ...city,
          pm25,
          pm10,
          aqi: aqiInfo.aqi,
          color: aqiInfo.color,
          actualAqi: apiData.aqi,
          dominentPol: apiData.dominentpol,
          lastUpdate: apiData.time?.s,
          humidity: apiData.iaqi?.h?.v,
          temperature: apiData.iaqi?.t?.v,
          pressure: apiData.iaqi?.p?.v,
          windSpeed: apiData.iaqi?.w?.v,
          no2: apiData.iaqi?.no2?.v,
          o3: apiData.iaqi?.o3?.v,
          so2: apiData.iaqi?.so2?.v,
          co: apiData.iaqi?.co?.v,
          position: cityPositions[city.name as keyof typeof cityPositions]
        });
        
        console.log(`Updated ${city.name}: PM2.5=${pm25}, AQI=${apiData.aqi}, Dominant Pollutant=${apiData.dominentpol}`);
      } else {
        // Use default data if API call fails
        console.log(`Using default data for ${city.name} - API data not available`);
        updatedCities.push({
          ...city,
          position: cityPositions[city.name as keyof typeof cityPositions]
        });
      }
    } catch (error) {
      console.log(`Failed to fetch data for ${city.name}:`, error);
      updatedCities.push({
        ...city,
        position: cityPositions[city.name as keyof typeof cityPositions]
      });
    }
    
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log('Completed WAQI API data fetch. Updated', updatedCities.filter(c => c.actualAqi).length, 'cities with real data');
  return generateNationalGrid(updatedCities);
};

// Helper to calculate distance between two coordinates
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const p = 0.017453292519943295;    // Math.PI / 180
  const c = Math.cos;
  const a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

// Generate 7,900 simulated rural IoT nodes across India, anchored to real API data
const generateNationalGrid = (majorCities: City[]): City[] => {
  const gridCities = [...majorCities];
  const numNodes = 7900;
  
  // A very rough bounding approximation of India's landmass
  // to prevent dropping nodes in the ocean.
  const landBoxes = [
    { minLat: 28, maxLat: 34, minLng: 74, maxLng: 80 }, // North
    { minLat: 24, maxLat: 28, minLng: 70, maxLng: 88 }, // Central/North
    { minLat: 18, maxLat: 24, minLng: 72, maxLng: 86 }, // Central/South
    { minLat: 8, maxLat: 18, minLng: 75, maxLng: 80 },  // South
    { minLat: 22, maxLat: 28, minLng: 88, maxLng: 96 }  // Northeast
  ];

  for (let i = 0; i < numNodes; i++) {
    const box = landBoxes[Math.floor(Math.random() * landBoxes.length)];
    const lat = box.minLat + Math.random() * (box.maxLat - box.minLat);
    const lng = box.minLng + Math.random() * (box.maxLng - box.minLng);
    
    // Find nearest major city to anchor the pollution level
    let nearestCity = majorCities[0];
    let minDistance = Infinity;
    
    // We only check the first 50 cities (actual major cities with real API data)
    for (let j = 0; j < Math.min(50, majorCities.length); j++) {
      const city = majorCities[j];
      const dist = getDistance(lat, lng, city.coordinates[1], city.coordinates[0]);
      if (dist < minDistance) {
        minDistance = dist;
        nearestCity = city;
      }
    }

    // Base PM2.5 is derived from the nearest real city, with 10-30% variance
    // This creates a realistic "heat map" that obeys real-world weather patterns
    const variance = 0.7 + Math.random() * 0.6; // 0.7 to 1.3 multiplier
    let basePm25 = nearestCity.pm25 * variance;
    
    // Add distance decay: the further from a major city, the cleaner the air generally is
    const distanceDecay = Math.max(0.5, 1 - (minDistance / 1000));
    basePm25 *= distanceDecay;

    // Minimum baseline PM2.5 for India
    basePm25 = Math.max(15, basePm25);
    
    const aqiInfo = getAQIFromPM25(basePm25);
    
    gridCities.push({
      name: `Node-IND-${i}`,
      state: 'Rural Grid',
      pm25: Math.round(basePm25),
      pm10: Math.round(basePm25 * 1.5),
      aqi: aqiInfo.aqi,
      color: aqiInfo.color,
      coordinates: [lng, lat],
      isRuralNode: true,
    });
  }
  
  return gridCities;
};
