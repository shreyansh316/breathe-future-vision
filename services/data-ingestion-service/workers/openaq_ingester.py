import requests
import time
import json
import psycopg2
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class OpenAQIngester:
    def __init__(self, db_conn_str: str):
        self.api_url = "https://api.openaq.org/v2/latest"
        self.db_conn_str = db_conn_str
        
    def fetch_india_data(self):
        """Fetch latest AQ data for India from OpenAQ"""
        try:
            params = {
                "country": "IN",
                "limit": 1000,
                "has_geo": "true"
            }
            logger.info("Fetching data from OpenAQ API...")
            response = requests.get(self.api_url, params=params)
            response.raise_for_status()
            data = response.json()
            return data.get("results", [])
        except Exception as e:
            logger.error(f"Error fetching from OpenAQ: {e}")
            return []

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
            
            count = 0
            for record in records:
                try:
                    # Extract coordinates
                    coords = record.get("coordinates", {})
                    lat = coords.get("latitude")
                    lon = coords.get("longitude")
                    
                    # Extract measurements
                    measurements = record.get("measurements", [])
                    pm25 = next((m["value"] for m in measurements if m["parameter"] == "pm25"), None)
                    pm10 = next((m["value"] for m in measurements if m["parameter"] == "pm10"), None)
                    
                    if not lat or not lon:
                        continue
                        
                    # Approximation for AQI for demo purposes
                    aqi = pm25 * 1.5 if pm25 else None
                    
                    timestamp = record.get("measurements", [{}])[0].get("lastUpdated")
                    
                    cursor.execute(insert_query, (
                        timestamp,
                        "openaq",
                        record.get("locationId", str(record.get("location"))),
                        record.get("city"),
                        record.get("state", "Unknown"),
                        lat,
                        lon,
                        pm25,
                        pm10,
                        aqi
                    ))
                    count += 1
                except Exception as e:
                    logger.warning(f"Error processing record: {e}")
                    
            conn.commit()
            cursor.close()
            conn.close()
            logger.info(f"Successfully inserted {count} records into TimescaleDB.")
        except Exception as e:
            logger.error(f"Database error: {e}")

    def run(self, interval_seconds=900):
        while True:
            records = self.fetch_india_data()
            self.store_data(records)
            logger.info(f"Sleeping for {interval_seconds} seconds...")
            time.sleep(interval_seconds)

if __name__ == "__main__":
    import os
    db_url = os.environ.get("DATABASE_URL", "postgresql://postgres:password@localhost:5432/breathe_db")
    ingester = OpenAQIngester(db_url)
    ingester.run()
