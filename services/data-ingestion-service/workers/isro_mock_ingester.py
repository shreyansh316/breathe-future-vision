import time
import json
import psycopg2
import logging
from datetime import datetime
import random
import numpy as np

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ISROMockIngester:
    """
    Mocks the ISRO satellite Aerosol Optical Depth (AOD) grid data over rural India.
    Generates a grid of data points interpolating across the country.
    """
    def __init__(self, db_conn_str: str):
        self.db_conn_str = db_conn_str
        # Bounding box roughly covering India
        self.min_lat = 8.0
        self.max_lat = 37.0
        self.min_lon = 68.0
        self.max_lon = 97.0
        self.grid_resolution = 1.0 # 1 degree grid for mocking
        
    def generate_isro_mock_data(self):
        """Generate a grid of mock AOD data"""
        logger.info("Generating mock ISRO satellite grid data...")
        records = []
        now = datetime.utcnow().isoformat()
        
        lats = np.arange(self.min_lat, self.max_lat, self.grid_resolution)
        lons = np.arange(self.min_lon, self.max_lon, self.grid_resolution)
        
        for lat in lats:
            for lon in lons:
                # Filter out points that are clearly in the ocean (rough approximation)
                if lat < 20 and (lon < 72 or lon > 85):
                    continue
                    
                # Generate a mock PM2.5 value based on latitude/longitude (Northern India has higher)
                base_pm25 = 20
                if lat > 25:
                    base_pm25 += (lat - 25) * 8
                
                # Add random noise
                pm25 = max(5, base_pm25 + random.uniform(-10, 20))
                
                record = {
                    "timestamp": now,
                    "source": "isro_mock",
                    "location_id": f"isro_grid_{lat:.2f}_{lon:.2f}",
                    "city": None,
                    "state": None,
                    "lat": float(lat),
                    "lon": float(lon),
                    "pm25": float(pm25),
                    "pm10": float(pm25 * 1.5),
                    "aqi": float(pm25 * 1.5)
                }
                records.append(record)
                
        return records

    def store_data(self, records):
        """Store the records into TimescaleDB"""
        if not records:
            return
            
        try:
            conn = psycopg2.connect(self.db_conn_str)
            cursor = conn.cursor()
            
            insert_query = """
            INSERT INTO sensor_readings (
                timestamp, source, location_id, city, state, lat, lon, pm25, pm10, aqi
            ) VALUES (
                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
            ) ON CONFLICT DO NOTHING;
            """
            
            for record in records:
                cursor.execute(insert_query, (
                    record["timestamp"],
                    record["source"],
                    record["location_id"],
                    record["city"],
                    record["state"],
                    record["lat"],
                    record["lon"],
                    record["pm25"],
                    record["pm10"],
                    record["aqi"]
                ))
                    
            conn.commit()
            cursor.close()
            conn.close()
            logger.info(f"Successfully inserted {len(records)} ISRO grid records into TimescaleDB.")
        except Exception as e:
            logger.error(f"Database error: {e}")

    def run(self, interval_seconds=3600):
        # Satellite data updates less frequently, typically daily or hourly
        while True:
            records = self.generate_isro_mock_data()
            self.store_data(records)
            logger.info(f"Sleeping for {interval_seconds} seconds...")
            time.sleep(interval_seconds)

if __name__ == "__main__":
    import os
    db_url = os.environ.get("DATABASE_URL", "postgresql://postgres:password@localhost:5432/breathe_db")
    ingester = ISROMockIngester(db_url)
    ingester.run()
