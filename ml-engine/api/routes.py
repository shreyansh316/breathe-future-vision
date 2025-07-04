from fastapi import APIRouter, HTTPException
from core.predictor import generate_5_day_forecast

router = APIRouter()

# Simple mock database to grab a base PM2.5 for a city
# In production, this would query TimescaleDB or the Node.js backend for the latest reading before forecasting
MOCK_BASE_PM25 = {
    "Delhi": 250.5,
    "Mumbai": 110.2,
    "Bangalore": 65.0,
    "Chennai": 85.4,
    "Kolkata": 140.6,
    "Hyderabad": 95.1,
    "Pune": 105.3,
    "Ahmedabad": 130.8,
    "Jaipur": 160.2,
    "Lucknow": 210.5
}

@router.get("/predict/5-day/{city_name}")
def get_5_day_forecast(city_name: str):
    """
    Returns a 5-day PM2.5 and AQI forecast for the specified city.
    """
    base_pm25 = MOCK_BASE_PM25.get(city_name, 120.0)
    
    try:
        forecast = generate_5_day_forecast(city_name, base_pm25)
        return {
            "success": True,
            "city": city_name,
            "engine": "Hybrid Prophet-LSTM",
            "forecast": forecast
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
