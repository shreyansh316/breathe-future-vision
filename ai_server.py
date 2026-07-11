import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import datetime

app = FastAPI(title="AakaashSetu AI Orchestration Hub", version="2.0.0")

# Enable Cross-Origin Resource Sharing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Data Models
class ChatRequest(BaseModel):
    user_message: str
    location: str = "Jaipur"

class ChatResponse(BaseModel):
    status: str
    timestamp: str
    ai_response: str
    sources_retrieved: List[str]

# Mock Vector Store Knowledge Repository (Environmental Policies & Health Manuals)
MOCK_VECTOR_STORE = [
    {
        "keyword": "policy",
        "doc": "National Clean Air Programme (NCAP) directives order a 20-30% reduction in particulate matter concentration updates across non-attainment municipalities by targeting heavy emission vectors."
    },
    {
        "keyword": "health",
        "doc": "Under moderate-to-poor air status indexes (AQI 101-200), vulnerable categories including individuals with respiratory vulnerabilities are strictly cautioned against prolonged high-exertion outdoor schedules."
    },
    {
        "keyword": "tips",
        "doc": "Public health tips suggest deploying indoor air purifiers with HEPA filtration and sealing windows during high-pollution morning inversions."
    }
]

# Mock Live AQI Data Lookup Layer
def get_live_aqi_metrics(location: str) -> Dict[str, Any]:
    normalized_loc = location.lower().strip()
    if "jaipur" in normalized_loc:
        return {"aqi": 78, "status": "Moderate", "dominant_pollutant": "PM10"}
    elif "delhi" in normalized_loc:
        return {"aqi": 125, "status": "Poor", "dominant_pollutant": "PM2.5"}
    return {"aqi": 45, "status": "Good", "dominant_pollutant": "O3"}

@app.post("/api/v2/ai/chat", response_model=ChatResponse)
async def process_ai_agent_query(payload: ChatRequest):
    try:
        user_query = payload.user_message.lower()
        location_target = payload.location
        
        # 1. Vector Database Retrieval Phase (Semantic Match)
        matched_documents = []
        for item in MOCK_VECTOR_STORE:
            if item["keyword"] in user_query:
                matched_documents.append(item["doc"])
        
        if not matched_documents:
            matched_documents.append("Standard air index tracking operational protocols and global health guideline arrays.")

        # 2. Live API Telemetry Gathering Phase
        live_metrics = get_live_aqi_metrics(location_target)

        # 3. Prompt Construction & Processing Context Simulation
        context_block = "\n".join(matched_documents)
        
        # Simulated LLM Processing Logic Engine
        if "policy" in user_query:
            ai_answer = f"According to verified government environmental policy logs, active mitigation directives specify aggressive targets. For {location_target}, where the air status registers as {live_metrics['status']} (AQI: {live_metrics['aqi']}), compliance standards enforce strict emissions regulation filters across local sectors."
        elif "health" in user_query or "tips" in user_query:
            ai_answer = f"The live parameters for {location_target} present an AQI of {live_metrics['aqi']} ({live_metrics['status']}). Given these indexes, health advisories suggest modifying strenuous outdoor windows, particularly if sensitive to prominent {live_metrics['dominant_pollutant']} indicators. {context_block}"
        else:
            ai_answer = f"Hello! I am AakaashSetu AI. Currently in {location_target}, the live ambient index measures at {live_metrics['aqi']}, yielding a status classification of '{live_metrics['status']}'. Let me know if you would like me to dissect historical patterns or parse related policy clauses."

        import asyncio
        await asyncio.sleep(1) # Simulate real LLM processing delay

        return ChatResponse(
            status="success",
            timestamp=datetime.datetime.utcnow().isoformat(),
            ai_response=ai_answer,
            sources_retrieved=matched_documents
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Core processing routine failure: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    print("Starting AakaashSetu AI Engine...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
