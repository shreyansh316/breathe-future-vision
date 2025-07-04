from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as predict_router

app = FastAPI(
    title="BreatheCast AI Forecasting Engine",
    description="Microservice for PM2.5 Prophet/LSTM forecasting.",
    version="1.0.0"
)

# Allow React frontend (and Node.js backend) to communicate with this service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router, prefix="/api/v1")

@app.get("/health")
def health_check():
    return {"status": "healthy", "engine": "BreatheCast AI (Mock LSTM/Prophet active)"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
