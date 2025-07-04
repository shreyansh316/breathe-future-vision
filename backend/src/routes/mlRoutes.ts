import { Router } from 'express';
import { get5DayForecast } from '../controllers/mlController';

const router = Router();

router.get('/predict/5-day/:city', get5DayForecast);

export default router;
