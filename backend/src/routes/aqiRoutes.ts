import { Router } from 'express';
import { getLiveAqi, getHistoricalAqi } from '../controllers/aqiController';

const router = Router();

// Route: GET /api/v1/aqi/live
// Desc: Fetches live AQI data across key cities
router.get('/live', getLiveAqi);

// Route: GET /api/v1/aqi/history
// Desc: Fetches time-series historical data for charting
router.get('/history', getHistoricalAqi);

export default router;
