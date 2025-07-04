from fastapi import FastAPI, HTTPException, Request, Depends
from pydantic import BaseModel
import psycopg2
import os
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="VayuNet IoT Webhook API")

# Simple dependency to get database connection
def get_db():
    db_url = os.environ.get("DATABASE_URL", "postgresql://postgres:password@localhost:5432/breathe_db")
    conn = psycopg2.connect(db_url)
    try:
        yield conn
    finally:
        conn.close()

class IoTDataPayload(BaseModel):
    sensor_id: str
    lat: float
    lon: float
    village: str = None
    district: str = None
    state: str = None
    pm25: float
    pm10: float
    temperature: float = None
    humidity: float = None
    secret_key: str

@app.post("/api/v1/iot/webhook")
async def receive_iot_data(payload: IoTDataPayload, db = Depends(get_db)):
    """
    Webhook endpoint to receive data from low-cost ground sensors deployed in Tier-2/3 cities.
    """
    # Simple authentication for demo
    if payload.secret_key != "vayu_iot_secret_2026":
        raise HTTPException(status_code=401, detail="Unauthorized IoT device")
        
    try:
        cursor = db.cursor()
        
        insert_query = """
        INSERT INTO sensor_readings (
            timestamp, source, location_id, city, state, lat, lon, pm25, pm10, aqi, temperature, humidity
        ) VALUES (
            %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
        ) ON CONFLICT DO NOTHING;
        """
        
        aqi = payload.pm25 * 1.5 if payload.pm25 else None
        now = datetime.utcnow().isoformat()
        city_name = payload.village or payload.district or "Unknown Rural"
        
        cursor.execute(insert_query, (
            now,
            "iot",
            payload.sensor_id,
            city_name,
            payload.state,
            payload.lat,
            payload.lon,
            payload.pm25,
            payload.pm10,
            aqi,
            payload.temperature,
            payload.humidity
        ))
        
        db.commit()
        cursor.close()
        
        logger.info(f"Received and stored IoT data from {payload.sensor_id}")
        return {"status": "success", "message": "Data ingested"}
        
    except Exception as e:
        logger.error(f"Error storing IoT data: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Database error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
