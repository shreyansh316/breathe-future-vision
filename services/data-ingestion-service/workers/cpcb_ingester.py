import time
import json
import psycopg2
import logging
from datetime import datetime, timedelta
import random

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CPCBIngesterMock:
    """
    Since CPCB real-time API requires official credentials,
    this class mocks the CPCB data feed for demonstration purposes,
    generating realistic data for major Indian cities.
    """
    def __init__(self, db_conn_str: str):
        self.db_conn_str = db_conn_str
        self.cities = [
            {"name": "Delhi", "state": "Delhi", "lat": 28.6139, "lon": 77.2090, "base_pm25": 150},
            {"name": "Mumbai", "state": "Maharashtra", "lat": 19.0760, "lon": 72.8777, "base_pm25": 80},
            {"name": "Bangalore", "state": "Karnataka", "lat": 12.9716, "lon": 77.5946, "base_pm25": 40},
            {"name": "Kolkata", "state": "West Bengal", "lat": 22.5726, "lon": 88.3639, "base_pm25": 120},
            {"name": "Chennai", "state": "Tamil Nadu", "lat": 13.0827, "lon": 80.2707, "base_pm25": 50},
        ]
        
    def fetch_cpcb_mock_data(self):
        """Generate mock AQ data for CPCB stations"""
        logger.info("Generating mock CPCB data...")
        records = []
        now = datetime.utcnow().isoformat()
        
        for city in self.cities:
            # Add some random noise to base pollution levels
            noise = random.uniform(-20, 30)
            pm25 = max(0, city["base_pm25"] + noise)
            pm10 = pm25 * 1.6
            aqi = pm25 * 1.5
            
            record = {
                "timestamp": now,
                "source": "cpcb",
                "location_id": f"cpcb_{city['name'].lower()}_01",
                "city": city["name"],
                "state": city["state"],
                "lat": city["lat"],
                "lon": city["lon"],
                "pm25": pm25,
                "pm10": pm10,
                "aqi": aqi
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
            logger.info(f"Successfully inserted {len(records)} CPCB records into TimescaleDB.")
        except Exception as e:
            logger.error(f"Database error: {e}")

    def run(self, interval_seconds=600):
        while True:
            records = self.fetch_cpcb_mock_data()
            self.store_data(records)
            logger.info(f"Sleeping for {interval_seconds} seconds...")
            time.sleep(interval_seconds)

if __name__ == "__main__":
    import os
    db_url = os.environ.get("DATABASE_URL", "postgresql://postgres:password@localhost:5432/breathe_db")
    ingester = CPCBIngesterMock(db_url)
    ingester.run()
