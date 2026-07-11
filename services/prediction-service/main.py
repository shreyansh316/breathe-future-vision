from fastapi import FastAPI, HTTPException
import time
from prometheus_client import Counter, Histogram, Gauge, generate_latest
from prometheus_client.core import CollectorRegistry
from fastapi.responses import PlainTextResponse

app = FastAPI(title="Prediction Service", version="1.0.0")

# Prometheus Metrics
prediction_requests = Counter(
    'prediction_requests_total',
    'Total prediction requests',
    ['city_id', 'model_version']
)

prediction_latency = Histogram(
    'prediction_latency_seconds',
    'Prediction inference latency',
    buckets=(0.01, 0.05, 0.1, 0.5, 1.0, 5.0)
)

model_accuracy = Gauge(
    'model_accuracy_rmse',
    'Model accuracy (RMSE)',
    ['model_version', 'city_id']
)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/metrics", response_class=PlainTextResponse)
def metrics():
    return generate_latest()

@app.get("/api/v2/predictions/{city_id}")
async def get_predictions(city_id: str, hours: int = 168):
    start_time = time.time()
    
    try:
        # Placeholder for actual model inference
        # In a real scenario, we would load the trained LSTM/Prophet model and predict
        forecast = [
            {
                "timestamp": time.time() + (i * 3600),
                "pm25_prediction": 50 + (i * 0.1),
                "confidence_lower": 40 + (i * 0.1),
                "confidence_upper": 60 + (i * 0.1)
            }
            for i in range(hours)
        ]
        
        prediction_requests.labels(
            city_id=city_id,
            model_version="v1.0.0"
        ).inc()
        
        return {"city_id": city_id, "forecast": forecast}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        duration = time.time() - start_time
        prediction_latency.observe(duration)
