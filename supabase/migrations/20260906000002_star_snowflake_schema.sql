-- ============================================================================
-- VAYURAKSHAK: STAR / SNOWFLAKE RELATIONAL SCHEMA
-- Migration: 20260906000002_star_snowflake_schema.sql
-- ============================================================================

BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. PARENT DIMENSION TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.dim_stations (
    station_id      VARCHAR(32) PRIMARY KEY,
    station_name    VARCHAR(255) NOT NULL,
    city            VARCHAR(100) NOT NULL,
    state           VARCHAR(100),
    status          VARCHAR(50),
    latitude        DOUBLE PRECISION,
    longitude       DOUBLE PRECISION,
    created_at      TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS public.dim_cities (
    city_id         SERIAL PRIMARY KEY,
    city_name       VARCHAR(100) UNIQUE NOT NULL,
    state           VARCHAR(100),
    country         VARCHAR(100) DEFAULT 'India'
);

-- Populate dim_stations from telemetry.stations if already populated
INSERT INTO public.dim_stations (station_id, station_name, city, state, status, latitude, longitude)
SELECT station_id, station_name, city, state, status, latitude::DOUBLE PRECISION, longitude::DOUBLE PRECISION
FROM telemetry.stations
ON CONFLICT (station_id) DO NOTHING;

-- Populate dim_cities from dim_stations and city datasets
INSERT INTO public.dim_cities (city_name, state, country)
SELECT DISTINCT city, state, 'India'
FROM public.dim_stations
WHERE city IS NOT NULL
ON CONFLICT (city_name) DO NOTHING;

-- ============================================================================
-- 2. CHILD FACT TABLES (With Referential Foreign Keys)
-- ============================================================================

-- Daily Station Fact
CREATE TABLE IF NOT EXISTS public.fact_station_daily (
    id              BIGSERIAL PRIMARY KEY,
    station_id      VARCHAR(32) NOT NULL REFERENCES public.dim_stations(station_id) ON DELETE CASCADE,
    reading_date    DATE NOT NULL,
    pm2_5           DOUBLE PRECISION,
    pm10            DOUBLE PRECISION,
    no              DOUBLE PRECISION,
    no2             DOUBLE PRECISION,
    nox             DOUBLE PRECISION,
    nh3             DOUBLE PRECISION,
    co              DOUBLE PRECISION,
    so2             DOUBLE PRECISION,
    o3              DOUBLE PRECISION,
    benzene         DOUBLE PRECISION,
    toluene         DOUBLE PRECISION,
    xylene          DOUBLE PRECISION,
    aqi             DOUBLE PRECISION,
    aqi_bucket      VARCHAR(50),
    CONSTRAINT uq_station_day UNIQUE (station_id, reading_date)
);

-- Hourly Station Fact
CREATE TABLE IF NOT EXISTS public.fact_station_hourly (
    station_id      VARCHAR(32) NOT NULL REFERENCES public.dim_stations(station_id) ON DELETE CASCADE,
    reading_time    TIMESTAMPTZ NOT NULL,
    pm2_5           DOUBLE PRECISION,
    pm10            DOUBLE PRECISION,
    no              DOUBLE PRECISION,
    no2             DOUBLE PRECISION,
    nox             DOUBLE PRECISION,
    nh3             DOUBLE PRECISION,
    co              DOUBLE PRECISION,
    so2             DOUBLE PRECISION,
    o3              DOUBLE PRECISION,
    benzene         DOUBLE PRECISION,
    toluene         DOUBLE PRECISION,
    xylene          DOUBLE PRECISION,
    aqi             DOUBLE PRECISION,
    aqi_bucket      VARCHAR(50),
    PRIMARY KEY (station_id, reading_time)
);

-- Daily City Fact
CREATE TABLE IF NOT EXISTS public.fact_city_daily (
    id              BIGSERIAL PRIMARY KEY,
    city_name       VARCHAR(100) NOT NULL REFERENCES public.dim_cities(city_name) ON DELETE CASCADE,
    reading_date    DATE NOT NULL,
    pm2_5           DOUBLE PRECISION,
    pm10            DOUBLE PRECISION,
    no              DOUBLE PRECISION,
    no2             DOUBLE PRECISION,
    nox             DOUBLE PRECISION,
    nh3             DOUBLE PRECISION,
    co              DOUBLE PRECISION,
    so2             DOUBLE PRECISION,
    o3              DOUBLE PRECISION,
    benzene         DOUBLE PRECISION,
    toluene         DOUBLE PRECISION,
    xylene          DOUBLE PRECISION,
    aqi             DOUBLE PRECISION,
    aqi_bucket      VARCHAR(50),
    CONSTRAINT uq_city_day UNIQUE (city_name, reading_date)
);

-- Hourly City Fact
CREATE TABLE IF NOT EXISTS public.fact_city_hourly (
    city_name       VARCHAR(100) NOT NULL REFERENCES public.dim_cities(city_name) ON DELETE CASCADE,
    reading_time    TIMESTAMPTZ NOT NULL,
    pm2_5           DOUBLE PRECISION,
    pm10            DOUBLE PRECISION,
    no              DOUBLE PRECISION,
    no2             DOUBLE PRECISION,
    nox             DOUBLE PRECISION,
    nh3             DOUBLE PRECISION,
    co              DOUBLE PRECISION,
    so2             DOUBLE PRECISION,
    o3              DOUBLE PRECISION,
    benzene         DOUBLE PRECISION,
    toluene         DOUBLE PRECISION,
    xylene          DOUBLE PRECISION,
    aqi             DOUBLE PRECISION,
    aqi_bucket      VARCHAR(50),
    PRIMARY KEY (city_name, reading_time)
);

-- UCI Sensor Fact
CREATE TABLE IF NOT EXISTS public.fact_sensor_uci (
    reading_time    TIMESTAMPTZ PRIMARY KEY,
    co_gt           DOUBLE PRECISION,
    pt08_s1_co      DOUBLE PRECISION,
    c6h6_gt         DOUBLE PRECISION,
    pt08_s2_nmhc    DOUBLE PRECISION,
    nox_gt          DOUBLE PRECISION,
    pt08_s3_nox     DOUBLE PRECISION,
    no2_gt          DOUBLE PRECISION,
    pt08_s4_no2     DOUBLE PRECISION,
    pt08_s5_o3      DOUBLE PRECISION,
    temperature     DOUBLE PRECISION,
    relative_hum    DOUBLE PRECISION,
    absolute_hum    DOUBLE PRECISION
);

-- ============================================================================
-- 3. COMPOSITE INDEXES FOR HIGH-THROUGHPUT ANALYTICS
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_station_hourly_time ON public.fact_station_hourly(reading_time DESC);
CREATE INDEX IF NOT EXISTS idx_station_daily_time  ON public.fact_station_daily(reading_date DESC);
CREATE INDEX IF NOT EXISTS idx_city_hourly_time    ON public.fact_city_hourly(reading_time DESC);
CREATE INDEX IF NOT EXISTS idx_city_daily_time     ON public.fact_city_daily(reading_date DESC);

-- ============================================================================
-- 4. ROW-LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.dim_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dim_cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fact_station_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fact_station_hourly ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fact_city_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fact_city_hourly ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fact_sensor_uci ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read dim_stations" ON public.dim_stations FOR SELECT USING (true);
CREATE POLICY "Public read dim_cities" ON public.dim_cities FOR SELECT USING (true);
CREATE POLICY "Public read fact_station_daily" ON public.fact_station_daily FOR SELECT USING (true);
CREATE POLICY "Public read fact_station_hourly" ON public.fact_station_hourly FOR SELECT USING (true);
CREATE POLICY "Public read fact_city_daily" ON public.fact_city_daily FOR SELECT USING (true);
CREATE POLICY "Public read fact_city_hourly" ON public.fact_city_hourly FOR SELECT USING (true);
CREATE POLICY "Public read fact_sensor_uci" ON public.fact_sensor_uci FOR SELECT USING (true);

-- Permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

COMMIT;
