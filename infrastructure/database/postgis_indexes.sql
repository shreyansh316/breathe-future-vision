-- Point 36: PostGIS Spatial Indexing 
-- Blueprint for handling heavy geospatial intersections (e.g., "Find all active stubble fires within 50km of this village")

-- Ensure PostGIS is enabled
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Sensor Nodes Table
CREATE TABLE IF NOT EXISTS sensor_nodes (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- e.g., 'CPCB', 'LOW_COST', 'SATELLITE_VIRTUAL'
    location GEOMETRY(Point, 4326) NOT NULL
);

-- CREATE SPATIAL INDEX (GiST R-Tree) for ultra-fast point/polygon lookups
CREATE INDEX IF NOT EXISTS idx_sensor_nodes_geom 
ON sensor_nodes USING GIST (location);

-- 2. Stubble Fire Anomalies Table (Detected by VIIRS/MODIS)
CREATE TABLE IF NOT EXISTS thermal_anomalies (
    id BIGSERIAL PRIMARY KEY,
    detected_at TIMESTAMPTZ NOT NULL,
    confidence INT NOT NULL, -- 0 to 100
    frp DOUBLE PRECISION, -- Fire Radiative Power
    location GEOMETRY(Point, 4326) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_thermal_anomalies_geom 
ON thermal_anomalies USING GIST (location);

CREATE INDEX IF NOT EXISTS idx_thermal_anomalies_time 
ON thermal_anomalies (detected_at DESC);

-- Example Query: Find all high-confidence fires within 50km of a specific sensor node
/*
SELECT t.*
FROM thermal_anomalies t
JOIN sensor_nodes s ON s.id = 'node-uuid-here'
WHERE t.detected_at > NOW() - INTERVAL '24 hours'
  AND t.confidence > 80
  AND ST_DWithin(
      t.location::geography, 
      s.location::geography, 
      50000 -- 50 km in meters
  );
*/
