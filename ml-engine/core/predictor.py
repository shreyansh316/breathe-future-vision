import datetime
from typing import List, Dict, Any

def generate_5_day_forecast(city_name: str, base_pm25: float = 120.0) -> List[Dict[str, Any]]:
    """
    Mock inference engine that simulates a Prophet + LSTM hybrid model output.
    When ready, drop your PyTorch/Scikit-Learn model inference here.
    """
    forecast = []
    
    # Simulate a daily pattern with slight variations
    current_date = datetime.datetime.now()
    
    for day_offset in range(1, 6):
        target_date = current_date + datetime.timedelta(days=day_offset)
        
        # Simulate an increasing/decreasing trend over the week
        # e.g., if base is high, maybe it improves due to wind
        trend_modifier = 1.0 + (day_offset * 0.05) if base_pm25 < 100 else 1.0 - (day_offset * 0.04)
        
        # Add some random noise for realism
        import random
        noise = random.uniform(0.9, 1.1)
        
        predicted_pm25 = base_pm25 * trend_modifier * noise
        predicted_pm10 = predicted_pm25 * 1.6
        
        # Basic AQI calculation estimate based on PM2.5
        predicted_aqi = int(predicted_pm25 * 1.2)
        
        # Determine risk zone
        risk_level = "GREEN"
        if predicted_aqi > 300:
            risk_level = "RED"
        elif predicted_aqi > 150:
            risk_level = "ORANGE"
            
        forecast.append({
            "date": target_date.strftime("%Y-%m-%d"),
            "predicted_aqi": predicted_aqi,
            "predicted_pm25": round(predicted_pm25, 2),
            "predicted_pm10": round(predicted_pm10, 2),
            "health_risk_zone": risk_level,
            "confidence_score": round(random.uniform(0.85, 0.96), 2)
        })
        
    return forecast
