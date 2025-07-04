import logging
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class HealthRiskEngine:
    """
    Takes 5-day AQI forecasts and outputs dynamic risk polygons.
    """
    def __init__(self):
        # Base thresholds for PM2.5
        self.thresholds = {
            "SAFE": 50,
            "MODERATE": 100,
            "HIGH_RISK": 200,
            "SEVERE": 300
        }

    def generate_risk_zones(self, forecast_data, hours_ahead=24):
        """
        Creates GeoJSON-like output representing health risk polygons.
        In a real app, this would use PostGIS or Shapely to merge adjacent high-risk points into polygons.
        For this prototype, we'll map forecasted points to colors.
        """
        logger.info(f"Generating Health Risk Zones for T+{hours_ahead} hours...")
        
        zones = []
        for point in forecast_data:
            pm25 = point.get('pm25_pred', 0)
            
            # Incorporate a dummy population density factor (urban areas get higher risk flags faster)
            # We assume points with exactly round coords (like 28.0, 77.0) are rural, others are urban
            is_urban = (point['lat'] % 1 != 0)
            risk_multiplier = 1.2 if is_urban else 1.0
            adjusted_pm25 = pm25 * risk_multiplier
            
            if adjusted_pm25 > self.thresholds["SEVERE"]:
                risk_level = "CRITICAL"
                color = "red"
                advisory = "Stay indoors. Wear N95 mask if going out."
            elif adjusted_pm25 > self.thresholds["HIGH_RISK"]:
                risk_level = "HIGH"
                color = "orange"
                advisory = "Reduce prolonged outdoor exertion."
            elif adjusted_pm25 > self.thresholds["MODERATE"]:
                risk_level = "MODERATE"
                color = "yellow"
                advisory = "Unusually sensitive people should consider reducing exertion."
            else:
                risk_level = "LOW"
                color = "green"
                advisory = "Air quality is satisfactory."
                
            zones.append({
                "lat": point['lat'],
                "lon": point['lon'],
                "forecasted_pm25": round(pm25, 2),
                "risk_level": risk_level,
                "color": color,
                "advisory": advisory
            })
            
        return zones

if __name__ == "__main__":
    engine = HealthRiskEngine()
    dummy_forecast = [
        {"lat": 28.6, "lon": 77.2, "pm25_pred": 350},
        {"lat": 12.9, "lon": 77.5, "pm25_pred": 45}
    ]
    zones = engine.generate_risk_zones(dummy_forecast)
    print(json.dumps(zones, indent=2))
