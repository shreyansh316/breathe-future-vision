import { Request, Response, NextFunction } from 'express';
import { fetchLiveAqi } from '../services/waqiService';
import AqiReading from '../models/AqiReading';

// GET /api/v1/aqi/live
export const getLiveAqi = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const liveData = await fetchLiveAqi();
    
    // Attempt to persist the live data to MongoDB in the background
    // We don't await this to keep the API response extremely fast for the frontend
    if (liveData && liveData.length > 0) {
      AqiReading.insertMany(liveData).catch(err => {
        // Suppress errors if MongoDB isn't connected yet (fallback mode)
        if (err.name !== 'MongooseError') {
          console.error('[DB] Background insert failed:', err.message);
        }
      });
    }

    res.status(200).json({
      success: true,
      count: liveData.length,
      data: liveData
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/aqi/history
export const getHistoricalAqi = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { city, hours = 24 } = req.query;
    
    const query: any = {};
    if (city) {
      query.city = city;
    }

    const timeLimit = new Date();
    timeLimit.setHours(timeLimit.getHours() - Number(hours));
    query.timestamp = { $gte: timeLimit };

    const history = await AqiReading.find(query).sort({ timestamp: 1 });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    next(error);
  }
};
