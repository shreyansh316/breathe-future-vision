-- ============================================================================
-- Expose Telemetry Views to Public Schema for Supabase PostgREST Client
-- Allows frontend calls like: supabase.from('stations').select('*')
-- ============================================================================

BEGIN;

CREATE OR REPLACE VIEW public.stations WITH (security_invoker = on) AS
    SELECT * FROM telemetry.stations;

CREATE OR REPLACE VIEW public.station_readings_hourly WITH (security_invoker = on) AS
    SELECT * FROM telemetry.station_readings_hourly;

CREATE OR REPLACE VIEW public.station_readings_daily WITH (security_invoker = on) AS
    SELECT * FROM telemetry.station_readings_daily;

CREATE OR REPLACE VIEW public.city_readings_hourly WITH (security_invoker = on) AS
    SELECT * FROM telemetry.city_readings_hourly;

CREATE OR REPLACE VIEW public.city_readings_daily WITH (security_invoker = on) AS
    SELECT * FROM telemetry.city_readings_daily;

CREATE OR REPLACE VIEW public.seoul_measurements_hourly WITH (security_invoker = on) AS
    SELECT * FROM telemetry.seoul_measurements_hourly;

CREATE OR REPLACE VIEW public.uci_chemical_sensor_readings WITH (security_invoker = on) AS
    SELECT * FROM telemetry.uci_chemical_sensor_readings;

CREATE OR REPLACE VIEW public.global_city_aqi WITH (security_invoker = on) AS
    SELECT * FROM telemetry.global_city_aqi;

CREATE OR REPLACE VIEW public.station_pollutant_snapshots WITH (security_invoker = on) AS
    SELECT * FROM telemetry.station_pollutant_snapshots;

CREATE OR REPLACE VIEW public.historic_ambient_readings WITH (security_invoker = on) AS
    SELECT * FROM telemetry.historic_ambient_readings;

-- Permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;

COMMIT;
