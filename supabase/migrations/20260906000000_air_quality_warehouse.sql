-- ============================================================================
-- VAYURAKSHAK / BREATHE FUTURE VISION: AIR QUALITY DATA WAREHOUSE
-- Migration: 20260906000000_air_quality_warehouse.sql
-- Engine: Supabase / PostgreSQL 15+
-- ============================================================================

BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

CREATE SCHEMA IF NOT EXISTS telemetry;

-- ============================================================================
-- 1. DIMENSION TABLES
-- ============================================================================

-- 1.1 Stations Registry (Source: stations.csv)
CREATE TABLE IF NOT EXISTS telemetry.stations (
    station_id          VARCHAR(32) PRIMARY KEY,
    station_name        VARCHAR(192) NOT NULL,
    city                VARCHAR(96) NOT NULL,
    state               VARCHAR(96) NOT NULL,
    status              VARCHAR(32) DEFAULT 'Active',
    latitude            NUMERIC(9, 6),
    longitude           NUMERIC(9, 6),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_station_lat CHECK (latitude IS NULL OR (latitude BETWEEN -90.0 AND 90.0)),
    CONSTRAINT chk_station_lng CHECK (longitude IS NULL OR (longitude BETWEEN -180.0 AND 180.0))
);

-- ============================================================================
-- 2. TIME-SERIES FACT TABLES (India CPCB Telemetry)
-- ============================================================================

-- 2.1 Hourly Station Readings (Source: station_hour.csv ~215 MB) - Partitioned
CREATE TABLE IF NOT EXISTS telemetry.station_readings_hourly (
    station_id          VARCHAR(32) NOT NULL,
    recorded_at         TIMESTAMPTZ NOT NULL,
    pm25                NUMERIC(7, 2),
    pm10                NUMERIC(7, 2),
    no                  NUMERIC(7, 2),
    no2                 NUMERIC(7, 2),
    nox                 NUMERIC(7, 2),
    nh3                 NUMERIC(7, 2),
    co                  NUMERIC(7, 2),
    so2                 NUMERIC(7, 2),
    o3                  NUMERIC(7, 2),
    benzene             NUMERIC(7, 2),
    toluene             NUMERIC(7, 2),
    xylene              NUMERIC(7, 2),
    aqi                 SMALLINT,
    aqi_bucket          VARCHAR(32),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_station_readings_hourly PRIMARY KEY (station_id, recorded_at),
    CONSTRAINT chk_stn_hr_pm25 CHECK (pm25 IS NULL OR (pm25 >= 0 AND pm25 <= 2000)),
    CONSTRAINT chk_stn_hr_pm10 CHECK (pm10 IS NULL OR (pm10 >= 0 AND pm10 <= 3000)),
    CONSTRAINT chk_stn_hr_aqi  CHECK (aqi IS NULL OR (aqi >= 0 AND aqi <= 1000))
) PARTITION BY RANGE (recorded_at);

-- Partitions for Station Hourly Data (2015 - 2025 + Default)
CREATE TABLE IF NOT EXISTS telemetry.stn_hr_pre2018 PARTITION OF telemetry.station_readings_hourly
    FOR VALUES FROM ('2015-01-01 00:00:00+00') TO ('2018-01-01 00:00:00+00');
CREATE TABLE IF NOT EXISTS telemetry.stn_hr_2018 PARTITION OF telemetry.station_readings_hourly
    FOR VALUES FROM ('2018-01-01 00:00:00+00') TO ('2019-01-01 00:00:00+00');
CREATE TABLE IF NOT EXISTS telemetry.stn_hr_2019 PARTITION OF telemetry.station_readings_hourly
    FOR VALUES FROM ('2019-01-01 00:00:00+00') TO ('2020-01-01 00:00:00+00');
CREATE TABLE IF NOT EXISTS telemetry.stn_hr_2020 PARTITION OF telemetry.station_readings_hourly
    FOR VALUES FROM ('2020-01-01 00:00:00+00') TO ('2021-01-01 00:00:00+00');
CREATE TABLE IF NOT EXISTS telemetry.stn_hr_default PARTITION OF telemetry.station_readings_hourly DEFAULT;

-- 2.2 Daily Station Readings (Source: station_day.csv ~8.5 MB)
CREATE TABLE IF NOT EXISTS telemetry.station_readings_daily (
    station_id          VARCHAR(32) NOT NULL,
    recorded_date       DATE NOT NULL,
    pm25                NUMERIC(7, 2),
    pm10                NUMERIC(7, 2),
    no                  NUMERIC(7, 2),
    no2                 NUMERIC(7, 2),
    nox                 NUMERIC(7, 2),
    nh3                 NUMERIC(7, 2),
    co                  NUMERIC(7, 2),
    so2                 NUMERIC(7, 2),
    o3                  NUMERIC(7, 2),
    benzene             NUMERIC(7, 2),
    toluene             NUMERIC(7, 2),
    xylene              NUMERIC(7, 2),
    aqi                 SMALLINT,
    aqi_bucket          VARCHAR(32),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_station_readings_daily PRIMARY KEY (station_id, recorded_date)
);

-- 2.3 Hourly City Aggregate Readings (Source: city_hour.csv ~64 MB) - Partitioned
CREATE TABLE IF NOT EXISTS telemetry.city_readings_hourly (
    city                VARCHAR(96) NOT NULL,
    recorded_at         TIMESTAMPTZ NOT NULL,
    pm25                NUMERIC(7, 2),
    pm10                NUMERIC(7, 2),
    no                  NUMERIC(7, 2),
    no2                 NUMERIC(7, 2),
    nox                 NUMERIC(7, 2),
    nh3                 NUMERIC(7, 2),
    co                  NUMERIC(7, 2),
    so2                 NUMERIC(7, 2),
    o3                  NUMERIC(7, 2),
    benzene             NUMERIC(7, 2),
    toluene             NUMERIC(7, 2),
    xylene              NUMERIC(7, 2),
    aqi                 SMALLINT,
    aqi_bucket          VARCHAR(32),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_city_readings_hourly PRIMARY KEY (city, recorded_at)
) PARTITION BY RANGE (recorded_at);

CREATE TABLE IF NOT EXISTS telemetry.city_hr_pre2018 PARTITION OF telemetry.city_readings_hourly
    FOR VALUES FROM ('2015-01-01 00:00:00+00') TO ('2018-01-01 00:00:00+00');
CREATE TABLE IF NOT EXISTS telemetry.city_hr_2018 PARTITION OF telemetry.city_readings_hourly
    FOR VALUES FROM ('2018-01-01 00:00:00+00') TO ('2019-01-01 00:00:00+00');
CREATE TABLE IF NOT EXISTS telemetry.city_hr_2019 PARTITION OF telemetry.city_readings_hourly
    FOR VALUES FROM ('2019-01-01 00:00:00+00') TO ('2020-01-01 00:00:00+00');
CREATE TABLE IF NOT EXISTS telemetry.city_hr_2020 PARTITION OF telemetry.city_readings_hourly
    FOR VALUES FROM ('2020-01-01 00:00:00+00') TO ('2021-01-01 00:00:00+00');
CREATE TABLE IF NOT EXISTS telemetry.city_hr_default PARTITION OF telemetry.city_readings_hourly DEFAULT;

-- 2.4 Daily City Aggregate Readings (Source: city_day.csv ~2.5 MB)
CREATE TABLE IF NOT EXISTS telemetry.city_readings_daily (
    city                VARCHAR(96) NOT NULL,
    recorded_date       DATE NOT NULL,
    pm25                NUMERIC(7, 2),
    pm10                NUMERIC(7, 2),
    no                  NUMERIC(7, 2),
    no2                 NUMERIC(7, 2),
    nox                 NUMERIC(7, 2),
    nh3                 NUMERIC(7, 2),
    co                  NUMERIC(7, 2),
    so2                 NUMERIC(7, 2),
    o3                  NUMERIC(7, 2),
    benzene             NUMERIC(7, 2),
    toluene             NUMERIC(7, 2),
    xylene              NUMERIC(7, 2),
    aqi                 SMALLINT,
    aqi_bucket          VARCHAR(32),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_city_readings_daily PRIMARY KEY (city, recorded_date)
);

-- ============================================================================
-- 3. INTERNATIONAL & SENSOR FACT TABLES
-- ============================================================================

-- 3.1 Seoul Telemetry Measurements (Source: Measurement_summary.csv ~90 MB)
CREATE TABLE IF NOT EXISTS telemetry.seoul_measurements_hourly (
    station_code        VARCHAR(16) NOT NULL,
    recorded_at         TIMESTAMPTZ NOT NULL,
    address             VARCHAR(256),
    latitude            NUMERIC(9, 6),
    longitude           NUMERIC(9, 6),
    so2                 NUMERIC(8, 4),
    no2                 NUMERIC(8, 4),
    o3                  NUMERIC(8, 4),
    co                  NUMERIC(7, 2),
    pm10                NUMERIC(7, 2),
    pm25                NUMERIC(7, 2),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_seoul_measurements PRIMARY KEY (station_code, recorded_at),
    CONSTRAINT chk_seoul_pm25 CHECK (pm25 IS NULL OR (pm25 >= 0 AND pm25 <= 1500)),
    CONSTRAINT chk_seoul_pm10 CHECK (pm10 IS NULL OR (pm10 >= 0 AND pm10 <= 2000))
);

-- 3.2 Italian Chemical Sensor Dataset (Source: AirQuality.csv ~767 KB)
CREATE TABLE IF NOT EXISTS telemetry.uci_chemical_sensor_readings (
    reading_id          BIGSERIAL PRIMARY KEY,
    recorded_at         TIMESTAMPTZ NOT NULL,
    co_gt               NUMERIC(6, 2),
    pt08_s1_co          NUMERIC(7, 2),
    nmhc_gt             NUMERIC(7, 2),
    c6h6_gt             NUMERIC(6, 2),
    pt08_s2_nmhc        NUMERIC(7, 2),
    nox_gt              NUMERIC(7, 2),
    pt08_s3_nox         NUMERIC(7, 2),
    no2_gt              NUMERIC(7, 2),
    pt08_s4_no2         NUMERIC(7, 2),
    pt08_s5_o3          NUMERIC(7, 2),
    temperature_c       NUMERIC(5, 2),
    relative_humidity   NUMERIC(5, 2),
    absolute_humidity   NUMERIC(6, 4),
    CONSTRAINT uq_uci_reading_timestamp UNIQUE (recorded_at)
);

-- 3.3 Global City AQI Benchmark (Source: global air pollution dataset.csv ~1.6 MB)
CREATE TABLE IF NOT EXISTS telemetry.global_city_aqi (
    country             VARCHAR(96) NOT NULL,
    city                VARCHAR(96) NOT NULL,
    aqi_value           SMALLINT NOT NULL,
    aqi_category        VARCHAR(32) NOT NULL,
    co_aqi_value        SMALLINT,
    co_aqi_category     VARCHAR(32),
    ozone_aqi_value     SMALLINT,
    ozone_aqi_category  VARCHAR(32),
    no2_aqi_value       SMALLINT,
    no2_aqi_category    VARCHAR(32),
    pm25_aqi_value      SMALLINT,
    pm25_aqi_category   VARCHAR(32),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_global_city_aqi PRIMARY KEY (country, city)
);

-- 3.4 Live Pollutant Snapshots (Source: AQI.csv ~350 KB)
CREATE TABLE IF NOT EXISTS telemetry.station_pollutant_snapshots (
    snapshot_id         BIGSERIAL PRIMARY KEY,
    country             VARCHAR(64) NOT NULL DEFAULT 'India',
    state               VARCHAR(96) NOT NULL,
    city                VARCHAR(96) NOT NULL,
    station             VARCHAR(192) NOT NULL,
    last_updated_at     TIMESTAMPTZ NOT NULL,
    latitude            NUMERIC(9, 6),
    longitude           NUMERIC(9, 6),
    pollutant_id        VARCHAR(16) NOT NULL,
    pollutant_min       NUMERIC(8, 2),
    pollutant_max       NUMERIC(8, 2),
    pollutant_avg       NUMERIC(8, 2)
);

-- 3.5 Historic Ambient Readings (Source: data.csv ~61 MB)
CREATE TABLE IF NOT EXISTS telemetry.historic_ambient_readings (
    reading_id          BIGSERIAL PRIMARY KEY,
    station_code        VARCHAR(32),
    sampling_date       VARCHAR(64),
    state               VARCHAR(96) NOT NULL,
    location            VARCHAR(96) NOT NULL,
    agency              VARCHAR(96),
    area_type           VARCHAR(96),
    so2                 NUMERIC(7, 2),
    no2                 NUMERIC(7, 2),
    rspm                NUMERIC(7, 2),
    spm                 NUMERIC(7, 2),
    pm25                NUMERIC(7, 2),
    recorded_date       DATE
);

-- ============================================================================
-- 4. HIGH-PERFORMANCE INDEXING PLAN
-- ============================================================================

-- B-Tree Station/City Time Traversal Indexes
CREATE INDEX IF NOT EXISTS idx_stn_hr_station_time 
    ON telemetry.station_readings_hourly (station_id, recorded_at DESC);

CREATE INDEX IF NOT EXISTS idx_stn_day_station_date 
    ON telemetry.station_readings_daily (station_id, recorded_date DESC);

CREATE INDEX IF NOT EXISTS idx_city_hr_city_time 
    ON telemetry.city_readings_hourly (city, recorded_at DESC);

CREATE INDEX IF NOT EXISTS idx_city_day_city_date 
    ON telemetry.city_readings_daily (city, recorded_date DESC);

CREATE INDEX IF NOT EXISTS idx_seoul_stn_time 
    ON telemetry.seoul_measurements_hourly (station_code, recorded_at DESC);

-- BRIN Range Indexes for High-Density Time-Series Tables
CREATE INDEX IF NOT EXISTS idx_stn_hr_brin_time 
    ON telemetry.station_readings_hourly USING BRIN (recorded_at) WITH (pages_per_range = 32);

CREATE INDEX IF NOT EXISTS idx_city_hr_brin_time 
    ON telemetry.city_readings_hourly USING BRIN (recorded_at) WITH (pages_per_range = 32);

CREATE INDEX IF NOT EXISTS idx_seoul_brin_time 
    ON telemetry.seoul_measurements_hourly USING BRIN (recorded_at) WITH (pages_per_range = 32);

CREATE INDEX IF NOT EXISTS idx_hist_recorded_date 
    ON telemetry.historic_ambient_readings (recorded_date DESC);

-- ============================================================================
-- 5. SUPABASE ROW-LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS across all telemetry tables
ALTER TABLE telemetry.stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry.station_readings_hourly ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry.station_readings_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry.city_readings_hourly ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry.city_readings_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry.seoul_measurements_hourly ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry.uci_chemical_sensor_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry.global_city_aqi ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry.station_pollutant_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry.historic_ambient_readings ENABLE ROW LEVEL SECURITY;

-- Grant SELECT access to public / authenticated users
CREATE POLICY "Public Read Access: stations" ON telemetry.stations FOR SELECT USING (true);
CREATE POLICY "Public Read Access: station_readings_hourly" ON telemetry.station_readings_hourly FOR SELECT USING (true);
CREATE POLICY "Public Read Access: station_readings_daily" ON telemetry.station_readings_daily FOR SELECT USING (true);
CREATE POLICY "Public Read Access: city_readings_hourly" ON telemetry.city_readings_hourly FOR SELECT USING (true);
CREATE POLICY "Public Read Access: city_readings_daily" ON telemetry.city_readings_daily FOR SELECT USING (true);
CREATE POLICY "Public Read Access: seoul_measurements_hourly" ON telemetry.seoul_measurements_hourly FOR SELECT USING (true);
CREATE POLICY "Public Read Access: uci_chemical_sensor_readings" ON telemetry.uci_chemical_sensor_readings FOR SELECT USING (true);
CREATE POLICY "Public Read Access: global_city_aqi" ON telemetry.global_city_aqi FOR SELECT USING (true);
CREATE POLICY "Public Read Access: station_pollutant_snapshots" ON telemetry.station_pollutant_snapshots FOR SELECT USING (true);
CREATE POLICY "Public Read Access: historic_ambient_readings" ON telemetry.historic_ambient_readings FOR SELECT USING (true);

-- Allow service_role to manage all writes (INSERT, UPDATE, DELETE)
GRANT USAGE ON SCHEMA telemetry TO anon, authenticated, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA telemetry TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA telemetry TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA telemetry TO service_role;

COMMIT;
