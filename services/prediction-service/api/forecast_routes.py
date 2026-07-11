from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime, timedelta
import random

# In a real app, we would import the ML models here
# from ..ml_models.prophet_forecaster import BreatheCastProphet
# from ..ml_models.lstm_attention import BreatheCastLSTMAttention
from ..risk_engine import HealthRiskEngine

router = APIRouter()
risk_engine = HealthRiskEngine()

@router.get("/forecast/5-day")
async def get_5_day_forecast(
    city: Optional[str] = None,
    lat: Optional[float] = None,
    lon: Optional[float] = None
):
    """
    Unified endpoint returning the 120-hour forecast (ensembled from LSTM and Prophet).
    Since ML models take time to train/load, we simulate the output for the UI.
    """
    if not city and not (lat and lon):
        raise HTTPException(status_code=400, detail="Must provide city or lat/lon")
        
    now = datetime.utcnow()
    forecast = []
    
    # Simulate a 120 hour forecast where pollution rises at night and drops mid-day
    # Add a gradual trend upwards to simulate a coming pollution event
    base_pm25 = 80 if not city else (150 if city.lower() == 'delhi' else 60)
    
    for hour in range(120):
        target_time = now + timedelta(hours=hour)
        
        # Diurnal cycle: peaks around 2 AM, lowest around 2 PM
        hour_of_day = target_time.hour
        diurnal_factor = 1.0 + 0.4 * (1.0 if (hour_of_day < 6 or hour_of_day > 20) else -1.0)
        
        # General trend (getting worse over 5 days)
        trend_factor = 1.0 + (hour / 120) * 0.3
        
        # Add some noise representing the LSTM capturing sudden local spikes
        noise = random.uniform(-10, 15)
        
        predicted_pm25 = max(10, base_pm25 * diurnal_factor * trend_factor + noise)
        
        forecast.append({
            "timestamp": target_time.isoformat(),
            "hours_ahead": hour,
            "predicted_pm25": round(predicted_pm25, 2),
            "predicted_aqi": round(predicted_pm25 * 1.5, 0)
        })
        
    return {
        "status": "success",
        "model_ensemble": "Prophet + LSTM-Attention",
        "location": city or f"{lat},{lon}",
        "forecast": forecast
    }

@router.get("/forecast/risk-zones")
async def get_risk_zones(hours_ahead: int = Query(24, ge=1, le=120)):
    """
    Returns the national grid of health risk zones for a specific future hour.
    """
    # Simulate forecasted grid
    dummy_grid = []
    import numpy as np
    
    # Base pattern: North India worse than South India
    for lat in np.arange(8.0, 37.0, 2.0):
        for lon in np.arange(68.0, 97.0, 2.0):
            base = 40 + (lat - 8) * 5
            # Future time factor
            time_multiplier = 1.0 + (hours_ahead / 120) * 0.5
            pred = base * time_multiplier + random.uniform(-20, 20)
            
            dummy_grid.append({
                "lat": float(lat),
                "lon": float(lon),
                "pm25_pred": max(10, float(pred))
            })
            
    # Pass through risk engine
    zones = risk_engine.generate_risk_zones(dummy_grid, hours_ahead)
    
    return {
        "status": "success",
        "hours_ahead": hours_ahead,
        "valid_time": (datetime.utcnow() + timedelta(hours=hours_ahead)).isoformat(),
        "zones": zones
    }
