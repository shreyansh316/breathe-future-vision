import pandas as pd
from prophet import Prophet
import logging
from datetime import datetime, timedelta

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class BreatheCastProphet:
    """
    Captures long-term seasonal trends (e.g., Diwali, winter crop burning in Punjab/Haryana).
    Prophet is excellent at handling missing data and outliers, which is common in Indian AQI datasets.
    """
    def __init__(self):
        # Configure Prophet with Indian holidays and strong weekly/yearly seasonality
        self.model = Prophet(
            yearly_seasonality=True,
            weekly_seasonality=True,
            daily_seasonality=True,
            changepoint_prior_scale=0.05
        )
        self.model.add_country_holidays(country_name='IN')
        self.is_trained = False

    def train(self, historical_df: pd.DataFrame):
        """
        Train Prophet model.
        historical_df requires 'ds' (datetime) and 'y' (PM2.5 value)
        """
        logger.info(f"Training Prophet Forecaster with {len(historical_df)} historical records...")
        
        # In a real scenario we would tune hyperparams based on the specific city.
        self.model.fit(historical_df)
        self.is_trained = True
        logger.info("Prophet model training complete.")

    def predict_5_days(self) -> pd.DataFrame:
        """
        Forecast the next 5 days (120 hours)
        """
        if not self.is_trained:
            raise ValueError("Prophet model not trained.")
            
        # Create future dataframe for 120 hours (5 days)
        future = self.model.make_future_dataframe(periods=120, freq='H')
        forecast = self.model.predict(future)
        
        # Return only the future 120 hours
        future_forecast = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(120)
        return future_forecast

if __name__ == "__main__":
    # Test the model with dummy data
    logger.info("Running Prophet Forecaster test...")
    
    # Generate 1 year of hourly dummy data
    dates = pd.date_range(start='2025-07-01', end='2026-07-11', freq='H')
    
    # Create synthetic PM2.5 data (higher in winter, lower in monsoon)
    import numpy as np
    day_of_year = dates.dayofyear
    # Sine wave for seasonality (peak in Nov/Dec - day 330)
    seasonality = 100 + 50 * np.sin(2 * np.pi * (day_of_year - 240) / 365)
    noise = np.random.normal(0, 15, len(dates))
    y = np.maximum(10, seasonality + noise)
    
    df = pd.DataFrame({'ds': dates, 'y': y})
    
    forecaster = BreatheCastProphet()
    forecaster.train(df)
    
    prediction = forecaster.predict_5_days()
    print("5-Day Forecast sample (first 5 hours):")
    print(prediction.head())
