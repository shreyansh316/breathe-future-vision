from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.providers.http.sensors.http import HttpSensor
from airflow.operators.dummy_operator import DummyOperator
import logging

# Point 38: Robust Airflow DAGs for Data Pipelines
# This DAG governs the ingestion of Sentinel-5P satellite rasters and CPCB telemetry.

default_args = {
    'owner': 'data-engineering-team',
    'depends_on_past': False,
    'start_date': datetime(2026, 1, 1),
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'vayunet_satellite_cpcb_ingest',
    default_args=default_args,
    description='Ingests live CPCB node telemetry and Sentinel-5P AOD raster data',
    schedule_interval='*/15 * * * *', # Every 15 minutes
    catchup=False,
    max_active_runs=1
)

start = DummyOperator(task_id='start', dag=dag)

# Step 1: Sense if the external CPCB API is up and has fresh data
sense_cpcb_api = HttpSensor(
    task_id='sense_cpcb_api',
    http_conn_id='cpcb_api_conn',
    endpoint='v1/status',
    response_check=lambda response: response.json().get('status') == 'active',
    poke_interval=60,
    timeout=300,
    dag=dag,
)

def fetch_and_normalize_cpcb(**kwargs):
    logging.info("Fetching raw telemetry from 7900+ CPCB nodes...")
    # Mock data engineering logic (e.g. Pandas DataFrame processing)
    logging.info("Normalizing units to µg/m³ and handling NULL drops...")
    return "cpcb_normalized"

ingest_cpcb = PythonOperator(
    task_id='ingest_cpcb_telemetry',
    python_callable=fetch_and_normalize_cpcb,
    provide_context=True,
    dag=dag,
)

def ingest_sentinel_raster(**kwargs):
    logging.info("Downloading Sentinel-5P NetCDF files via Copernicus Open Access Hub...")
    # Mock Rasterio / Xarray processing
    logging.info("Extracting Aerosol Optical Depth (AOD) bands over India bounding box...")
    return "raster_processed"

ingest_satellite = PythonOperator(
    task_id='ingest_sentinel_raster',
    python_callable=ingest_sentinel_raster,
    provide_context=True,
    dag=dag,
)

def trigger_timescaledb_refresh(**kwargs):
    logging.info("Executing continuous aggregate refresh on TimescaleDB cluster...")
    return "db_refreshed"

refresh_db = PythonOperator(
    task_id='trigger_timescaledb_refresh',
    python_callable=trigger_timescaledb_refresh,
    provide_context=True,
    dag=dag,
)

end = DummyOperator(task_id='end', dag=dag)

# Define pipeline execution dependencies
start >> [sense_cpcb_api, ingest_satellite]
sense_cpcb_api >> ingest_cpcb
[ingest_cpcb, ingest_satellite] >> refresh_db >> end
