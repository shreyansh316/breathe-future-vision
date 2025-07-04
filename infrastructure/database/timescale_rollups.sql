-- Point 39: TimescaleDB Continuous Aggregates
-- Setup for ultra-fast time-series rollups, vital when handling billions of sensor readings.

-- Create the base hypertable
CREATE TABLE IF NOT EXISTS sensor_telemetry (
    time TIMESTAMPTZ NOT NULL,
    sensor_id TEXT NOT NULL,
    pm25 DOUBLE PRECISION,
    pm10 DOUBLE PRECISION,
    temperature DOUBLE PRECISION,
    humidity DOUBLE PRECISION
);

-- Convert to hypertable partitioned by time
SELECT create_hypertable('sensor_telemetry', 'time', if_not_exists => TRUE);

-- Create a Continuous Aggregate for 1-hour rollups
CREATE MATERIALIZED VIEW sensor_telemetry_hourly
WITH (timescaledb.continuous) AS
SELECT 
    time_bucket('1 hour', time) AS bucket,
    sensor_id,
    AVG(pm25) AS avg_pm25,
    MAX(pm25) AS max_pm25,
    AVG(pm10) AS avg_pm10,
    AVG(temperature) AS avg_temp
FROM sensor_telemetry
GROUP BY bucket, sensor_id;

-- Add a continuous aggregate policy to refresh every hour
SELECT add_continuous_aggregate_policy('sensor_telemetry_hourly',
    start_offset => INTERVAL '3 hours',
    end_offset => INTERVAL '1 hour',
    schedule_interval => INTERVAL '1 hour');

-- Create a Continuous Aggregate for 24-hour (daily) rollups
CREATE MATERIALIZED VIEW sensor_telemetry_daily
WITH (timescaledb.continuous) AS
SELECT 
    time_bucket('1 day', time) AS bucket,
    sensor_id,
    AVG(pm25) AS avg_pm25,
    MAX(pm25) AS max_pm25,
    MIN(pm25) AS min_pm25
FROM sensor_telemetry
GROUP BY bucket, sensor_id;

-- Add a continuous aggregate policy to refresh every day
SELECT add_continuous_aggregate_policy('sensor_telemetry_daily',
    start_offset => INTERVAL '3 days',
    end_offset => INTERVAL '1 day',
    schedule_interval => INTERVAL '1 day');

-- Setup data retention policy: Drop raw data older than 30 days to save disk space
SELECT add_retention_policy('sensor_telemetry', INTERVAL '30 days');
