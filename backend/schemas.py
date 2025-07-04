from pydantic import BaseModel, Field, validator
from typing import Optional, List
import struct

# Point 84: Implement Robust Pydantic Data Validations
# Point 78: Normalize Data Types in Sensor Inputs
class SensorReading(BaseModel):
    sensor_id: str = Field(..., description="Unique alphanumeric identifier for the IoT sensor node")
    lat: float = Field(..., ge=-90, le=90, description="Latitude coordinate")
    lon: float = Field(..., ge=-180, le=180, description="Longitude coordinate")
    
    # Point 78: Ensure parameters like humidity and pressure are consistently parsed as float32
    pm25: float
    pm10: float
    humidity: float
    pressure: float
    temperature: float
    
    @validator('pm25', 'pm10', 'humidity', 'pressure', 'temperature', pre=True)
    def force_float32(cls, v):
        """Force casting to IEEE 754 32-bit floating point for consistency across ingestion pipeline."""
        if v is None:
            raise ValueError("Telemetry value cannot be null")
        # Pack to float32 and unpack to enforce 32-bit precision normalization
        float32_val = struct.unpack('f', struct.pack('f', float(v)))[0]
        return round(float32_val, 4)

class ValidationResult(BaseModel):
    r2_score: float = Field(..., description="R^2 validation score from the ML model inference loop")
    mae: float
    timestamp: str
