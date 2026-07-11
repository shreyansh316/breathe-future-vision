-- TimescaleDB Schema Setup for VayuNet

-- Enable the TimescaleDB extension if not already enabled
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Create the main hypertable for sensor readings
CREATE TABLE IF NOT EXISTS sensor_readings (
    timestamp TIMESTAMPTZ NOT NULL,
    source VARCHAR(50) NOT NULL, -- 'openaq', 'cpcb', 'iot', 'isro_fusion'
    location_id VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    lat DOUBLE PRECISION NOT NULL,
    lon DOUBLE PRECISION NOT NULL,
    pm25 DOUBLE PRECISION,
    pm10 DOUBLE PRECISION,
    aqi DOUBLE PRECISION,
    temperature DOUBLE PRECISION,
    humidity DOUBLE PRECISION,
    UNIQUE (timestamp, location_id, source)
);

-- Convert standard table to TimescaleDB hypertable
-- Partitioning by timestamp, chunking every 1 day
SELECT create_hypertable('sensor_readings', 'timestamp', if_not_exists => TRUE, chunk_time_interval => INTERVAL '1 day');

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS ix_sensor_readings_location_time ON sensor_readings (location_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS ix_sensor_readings_source_time ON sensor_readings (source, timestamp DESC);
CREATE INDEX IF NOT EXISTS ix_sensor_readings_city_time ON sensor_readings (city, timestamp DESC);

-- Spatial index (requires PostGIS, but we can do a standard index on lat/lon for basic bounding boxes)
CREATE INDEX IF NOT EXISTS ix_sensor_readings_lat_lon ON sensor_readings (lat, lon);

-- Create a continuous aggregate for hourly city averages
CREATE MATERIALIZED VIEW IF NOT EXISTS city_hourly_aqi
WITH (timescaledb.continuous) AS
SELECT 
    time_bucket('1 hour', timestamp) AS bucket,
    city,
    state,
    AVG(pm25) AS avg_pm25,
    AVG(pm10) AS avg_pm10,
    AVG(aqi) AS avg_aqi,
    MAX(aqi) AS max_aqi
FROM sensor_readings
WHERE city IS NOT NULL
GROUP BY bucket, city, state;
