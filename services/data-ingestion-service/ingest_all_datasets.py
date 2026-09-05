"""
================================================================================
VAYURAKSHAK / BREATHE FUTURE VISION: MULTI-DATASET SUPABASE INGESTION ENGINE
Module: services/data-ingestion-service/ingest_all_datasets.py
Engine: PostgreSQL 15+ / Supabase Transaction Pooler (Port 5432 or 6543)
================================================================================
"""

import io
import os
import sys
import glob
import logging
from datetime import datetime
import pandas as pd
import numpy as np
import psycopg2

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("ETL_Architect")

# Database Connection URI (Supports direct connection or Supabase Session/Transaction Pooler)
# Format: postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
DB_URL = os.environ.get(
    "SUPABASE_DB_URL",
    os.environ.get("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/postgres")
)
DATA_DIR = os.environ.get("DATA_DIR", "AirPollutionSeoul")
CHUNK_SIZE = 25000

SENTINEL_VALUES = [-200, "-200", -999, "-999", 9999, "9999", "NA", "NaN", "None", "null", ""]

def get_connection():
    return psycopg2.connect(DB_URL)

def stream_dataframe_to_postgres(df: pd.DataFrame, table_name: str, conn, columns=None):
    """Streams a sanitized DataFrame into Postgres using fast binary/text COPY FROM STDIN."""
    cursor = conn.cursor()
    buffer = io.StringIO()

    # Coerce sentinel values & NaN to standard PostgreSQL \N (NULL)
    df_clean = df.replace(SENTINEL_VALUES, None)
    df_clean.to_csv(buffer, index=False, header=False, na_rep="\\N", sep="\t")
    buffer.seek(0)

    col_str = f"({', '.join(columns)})" if columns else ""
    copy_sql = f"COPY {table_name} {col_str} FROM STDIN WITH (FORMAT text, DELIMITER E'\\t', NULL '\\N')"
    
    cursor.copy_expert(copy_sql, buffer)
    conn.commit()
    cursor.close()

# ==============================================================================
# INGESTION HANDLERS FOR EACH OF THE 10 DATASETS
# ==============================================================================

def ingest_stations(conn, file_path):
    """1. stations.csv"""
    logger.info(f"Ingesting {file_path} -> telemetry.stations...")
    df = pd.read_csv(file_path)
    df.columns = ["station_id", "station_name", "city", "state", "status"]
    
    cursor = conn.cursor()
    for _, row in df.iterrows():
        cursor.execute("""
            INSERT INTO telemetry.stations (station_id, station_name, city, state, status)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (station_id) DO UPDATE SET
                station_name = EXCLUDED.station_name,
                city = EXCLUDED.city,
                state = EXCLUDED.state,
                status = EXCLUDED.status;
        """, (row["station_id"], row["station_name"], row["city"], row["state"], row["status"]))
    conn.commit()
    cursor.close()
    logger.info("telemetry.stations ingestion completed.")

def ingest_station_hour(conn, file_path):
    """2. station_hour.csv (~215 MB) - Streamed in chunks"""
    logger.info(f"Streaming {file_path} -> telemetry.station_readings_hourly...")
    cols = [
        "station_id", "recorded_at", "pm25", "pm10", "no", "no2", "nox", "nh3",
        "co", "so2", "o3", "benzene", "toluene", "xylene", "aqi", "aqi_bucket"
    ]
    total_rows = 0
    for chunk in pd.read_csv(file_path, chunksize=CHUNK_SIZE, low_memory=False):
        chunk.columns = cols
        chunk["recorded_at"] = pd.to_datetime(chunk["recorded_at"], errors="coerce")
        chunk = chunk.dropna(subset=["station_id", "recorded_at"])
        stream_dataframe_to_postgres(chunk, "telemetry.station_readings_hourly", conn, cols)
        total_rows += len(chunk)
        logger.info(f"Streamed {total_rows:,} rows into telemetry.station_readings_hourly")

def ingest_station_day(conn, file_path):
    """3. station_day.csv (~8.5 MB)"""
    logger.info(f"Streaming {file_path} -> telemetry.station_readings_daily...")
    cols = [
        "station_id", "recorded_date", "pm25", "pm10", "no", "no2", "nox", "nh3",
        "co", "so2", "o3", "benzene", "toluene", "xylene", "aqi", "aqi_bucket"
    ]
    for chunk in pd.read_csv(file_path, chunksize=CHUNK_SIZE, low_memory=False):
        chunk.columns = cols
        chunk["recorded_date"] = pd.to_datetime(chunk["recorded_date"], errors="coerce").dt.date
        chunk = chunk.dropna(subset=["station_id", "recorded_date"])
        stream_dataframe_to_postgres(chunk, "telemetry.station_readings_daily", conn, cols)

def ingest_city_hour(conn, file_path):
    """4. city_hour.csv (~64 MB)"""
    logger.info(f"Streaming {file_path} -> telemetry.city_readings_hourly...")
    cols = [
        "city", "recorded_at", "pm25", "pm10", "no", "no2", "nox", "nh3",
        "co", "so2", "o3", "benzene", "toluene", "xylene", "aqi", "aqi_bucket"
    ]
    for chunk in pd.read_csv(file_path, chunksize=CHUNK_SIZE, low_memory=False):
        chunk.columns = cols
        chunk["recorded_at"] = pd.to_datetime(chunk["recorded_at"], errors="coerce")
        chunk = chunk.dropna(subset=["city", "recorded_at"])
        stream_dataframe_to_postgres(chunk, "telemetry.city_readings_hourly", conn, cols)

def ingest_city_day(conn, file_path):
    """5. city_day.csv (~2.5 MB)"""
    logger.info(f"Streaming {file_path} -> telemetry.city_readings_daily...")
    cols = [
        "city", "recorded_date", "pm25", "pm10", "no", "no2", "nox", "nh3",
        "co", "so2", "o3", "benzene", "toluene", "xylene", "aqi", "aqi_bucket"
    ]
    for chunk in pd.read_csv(file_path, chunksize=CHUNK_SIZE, low_memory=False):
        chunk.columns = cols
        chunk["recorded_date"] = pd.to_datetime(chunk["recorded_date"], errors="coerce").dt.date
        chunk = chunk.dropna(subset=["city", "recorded_date"])
        stream_dataframe_to_postgres(chunk, "telemetry.city_readings_daily", conn, cols)

def ingest_seoul_summary(conn, file_path):
    """6. Measurement_summary.csv (~90 MB Seoul data)"""
    logger.info(f"Streaming {file_path} -> telemetry.seoul_measurements_hourly...")
    cols = [
        "recorded_at", "station_code", "address", "latitude", "longitude",
        "so2", "no2", "o3", "co", "pm10", "pm25"
    ]
    target_cols = [
        "station_code", "recorded_at", "address", "latitude", "longitude",
        "so2", "no2", "o3", "co", "pm10", "pm25"
    ]
    for chunk in pd.read_csv(file_path, chunksize=CHUNK_SIZE, low_memory=False):
        chunk.columns = cols
        chunk["recorded_at"] = pd.to_datetime(chunk["recorded_at"], errors="coerce")
        chunk = chunk[target_cols].dropna(subset=["station_code", "recorded_at"])
        stream_dataframe_to_postgres(chunk, "telemetry.seoul_measurements_hourly", conn, target_cols)

def ingest_uci_air_quality(conn, file_path):
    """7. AirQuality.csv (~767 KB UCI Italian Sensor Data: Semicolon delimited, comma decimal, -200 sentinels)"""
    logger.info(f"Streaming {file_path} -> telemetry.uci_chemical_sensor_readings...")
    df = pd.read_csv(file_path, sep=";", decimal=",", low_memory=False)
    # Remove blank trailing un-named columns common in UCI dataset
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    df = df.dropna(how="all")

    # Build UTC timestamp from Date & Time strings (DD/MM/YYYY + HH.MM.SS)
    df["dt_str"] = df["Date"].astype(str) + " " + df["Time"].astype(str).str.replace(".", ":", regex=False)
    df["recorded_at"] = pd.to_datetime(df["dt_str"], format="%d/%m/%Y %H:%M:%S", errors="coerce")
    df = df.dropna(subset=["recorded_at"])

    # Map column names
    target_cols = [
        "recorded_at", "co_gt", "pt08_s1_co", "nmhc_gt", "c6h6_gt", "pt08_s2_nmhc",
        "nox_gt", "pt08_s3_nox", "no2_gt", "pt08_s4_no2", "pt08_s5_o3",
        "temperature_c", "relative_humidity", "absolute_humidity"
    ]
    cleaned_df = pd.DataFrame({
        "recorded_at": df["recorded_at"],
        "co_gt": df.get("CO(GT)"),
        "pt08_s1_co": df.get("PT08.S1(CO)"),
        "nmhc_gt": df.get("NMHC(GT)"),
        "c6h6_gt": df.get("C6H6(GT)"),
        "pt08_s2_nmhc": df.get("PT08.S2(NMHC)"),
        "nox_gt": df.get("NOx(GT)"),
        "pt08_s3_nox": df.get("PT08.S3(NOx)"),
        "no2_gt": df.get("NO2(GT)"),
        "pt08_s4_no2": df.get("PT08.S4(NO2)"),
        "pt08_s5_o3": df.get("PT08.S5(O3)"),
        "temperature_c": df.get("T"),
        "relative_humidity": df.get("RH"),
        "absolute_humidity": df.get("AH")
    })
    cleaned_df = cleaned_df.drop_duplicates(subset=["recorded_at"])
    stream_dataframe_to_postgres(cleaned_df, "telemetry.uci_chemical_sensor_readings", conn, target_cols)

def ingest_global_dataset(conn, file_path):
    """8. global air pollution dataset.csv (~1.6 MB)"""
    logger.info(f"Streaming {file_path} -> telemetry.global_city_aqi...")
    cols = [
        "country", "city", "aqi_value", "aqi_category", "co_aqi_value",
        "co_aqi_category", "ozone_aqi_value", "ozone_aqi_category",
        "no2_aqi_value", "no2_aqi_category", "pm25_aqi_value", "pm25_aqi_category"
    ]
    df = pd.read_csv(file_path)
    df.columns = cols
    df = df.dropna(subset=["country", "city"]).drop_duplicates(subset=["country", "city"])
    stream_dataframe_to_postgres(df, "telemetry.global_city_aqi", conn, cols)

def ingest_aqi_snapshot(conn, file_path):
    """9. AQI.csv (~350 KB)"""
    logger.info(f"Streaming {file_path} -> telemetry.station_pollutant_snapshots...")
    cols = [
        "country", "state", "city", "station", "last_updated_at",
        "latitude", "longitude", "pollutant_id", "pollutant_min", "pollutant_max", "pollutant_avg"
    ]
    df = pd.read_csv(file_path)
    df.columns = cols
    df["last_updated_at"] = pd.to_datetime(df["last_updated_at"], format="%d-%m-%Y %H:%M:%S", errors="coerce")
    df = df.dropna(subset=["last_updated_at"])
    stream_dataframe_to_postgres(df, "telemetry.station_pollutant_snapshots", conn, cols)

def ingest_historic_data(conn, file_path):
    """10. data.csv (~61 MB Historic Indian Data)"""
    logger.info(f"Streaming {file_path} -> telemetry.historic_ambient_readings...")
    target_cols = [
        "station_code", "sampling_date", "state", "location", "agency",
        "area_type", "so2", "no2", "rspm", "spm", "pm25", "recorded_date"
    ]
    for chunk in pd.read_csv(file_path, chunksize=CHUNK_SIZE, low_memory=False):
        chunk_clean = pd.DataFrame({
            "station_code": chunk["stn_code"],
            "sampling_date": chunk["sampling_date"],
            "state": chunk["state"],
            "location": chunk["location"],
            "agency": chunk["agency"],
            "area_type": chunk["type"],
            "so2": pd.to_numeric(chunk["so2"], errors="coerce"),
            "no2": pd.to_numeric(chunk["no2"], errors="coerce"),
            "rspm": pd.to_numeric(chunk["rspm"], errors="coerce"),
            "spm": pd.to_numeric(chunk["spm"], errors="coerce"),
            "pm25": pd.to_numeric(chunk["pm2_5"], errors="coerce"),
            "recorded_date": pd.to_datetime(chunk["date"], errors="coerce").dt.date
        })
        chunk_clean = chunk_clean.dropna(subset=["state", "location"])
        stream_dataframe_to_postgres(chunk_clean, "telemetry.historic_ambient_readings", conn, target_cols)

# ==============================================================================
# MAIN ENTRYPOINT
# ==============================================================================
def main():
    logger.info("Connecting to Supabase Database...")
    conn = get_connection()

    file_map = {
        "stations.csv": ingest_stations,
        "station_day.csv": ingest_station_day,
        "city_day.csv": ingest_city_day,
        "city_hour.csv": ingest_city_hour,
        "Measurement_summary.csv": ingest_seoul_summary,
        "AirQuality.csv": ingest_uci_air_quality,
        "global air pollution dataset.csv": ingest_global_dataset,
        "AQI.csv": ingest_aqi_snapshot,
        "data.csv": ingest_historic_data,
        "station_hour.csv": ingest_station_hour,  # Run heaviest table last
    }

    try:
        for filename, ingest_func in file_map.items():
            path = os.path.join(DATA_DIR, filename)
            if os.path.exists(path):
                logger.info(f"=== Starting ETL Pipeline: {filename} ===")
                ingest_func(conn, path)
            else:
                logger.warning(f"File not found: {path} - Skipping.")
        logger.info("All 10 datasets successfully ingested and indexed in Supabase!")
    except Exception as err:
        logger.exception(f"Fatal error during ingestion: {err}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    main()
