import os
from fastapi import FastAPI, HTTPException, BackgroundTasks, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Dict, Any
import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import razorpay

app = FastAPI(title="AakaashSetu AI Orchestration Hub", version="2.0.0")

# Enable Cross-Origin Resource Sharing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Phase 3: ML Ops & High-Performance Forecasting
try:
    import mlflow
    import onnxruntime as ort
    
    # Initialize MLflow Tracking Server (Point 150)
    MLFLOW_URI = os.getenv("MLFLOW_TRACKING_URI", "http://mlflow:5000")
    mlflow.set_tracking_uri(MLFLOW_URI)
    mlflow.set_experiment("vayurakshak_aqi_forecasting")
    print(f"[ML Ops] Connected to MLflow Tracking Server at {MLFLOW_URI}")
    
    # Scaffold ONNX Forecasting Engine (Point 154)
    class ForecastingEngine:
        def __init__(self, model_path: str = "models/lstm_aqi_forecast.onnx"):
            self.model_path = model_path
            # In production, this loads the quantized ONNX graph
            # self.session = ort.InferenceSession(self.model_path, providers=['CPUExecutionProvider'])
            print(f"[ONNX Runtime] Forecasting engine architecture initialized for {model_path}.")
            
        def predict(self, input_features):
            # Scaffold for executing ONNX graph inference
            return [input_features[0] * 1.1] # mock prediction
            
    engine = ForecastingEngine()
    
except ImportError:
    print("[Warning] ML ops libraries (mlflow, onnxruntime) not found. Running in basic mode.")

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

# ==========================================
# Phase 4: Automated Fellowship Onboarding 
# ==========================================

class FellowshipApplication(BaseModel):
    name: str
    email: EmailStr
    skillset: str

def send_selection_email(email: str, name: str, skillset: str):
    # SMTP Configuration
    SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
    SENDER_EMAIL = os.getenv("SMTP_USER", "system@vayurakshak.in") 
    SENDER_PASSWORD = os.getenv("SMTP_PASS", "your-secure-app-password")

    if SENDER_PASSWORD == "your-secure-app-password":
        print("[Warning] SMTP_PASS not configured. Skipping actual email dispatch.")
        return

    # Crafting a premium, enterprise-grade HTML Email template
    message = MIMEMultipart("alternative")
    message["Subject"] = "✨ Welcome to the Revolution: You are Selected as a VayuFellow!"
    message["From"] = f"VayuRakshak Intelligence <{SENDER_EMAIL}>"
    message["To"] = email

    html_content = f"""
    <html>
      <body style="font-family: 'Inter', sans-serif; background-color: #0B0F19; color: #F8FAFC; padding: 40px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #161C2A; border: 1px solid #222F47; border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          <h2 style="color: #38BDF8; margin-top: 0; font-size: 24px; letter-spacing: -0.025em;">Congratulations {{name}},</h2>
          <p style="color: #94A3B8; font-size: 16px; line-height: 1.6;">
            Our automated environmental coordination grid has evaluated your application profile. We are thrilled to inform you that <strong>you have been officially selected</strong> to join the <strong>VayuRakshak Fellowship Revolution</strong>.
          </p>
          <div style="background-color: #0B0F19; border-left: 4px solid #10B981; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #F8FAFC; font-weight: 600;">Core Assignment Focus: {{skillset.upper()}} ENGINE CORES</p>
            <p style="margin: 4px 0 0 0; color: #94A3B8; font-size: 14px;">Platform Target Era: 2030 Environmental Intelligence Grid</p>
          </div>
          <p style="color: #94A3B8; font-size: 16px; line-height: 1.6;">
            Your localized command center dashboard access key along with your baseline ecosystem tasks will arrive in your main space console shortly.
          </p>
          <hr style="border: 0; border-top: 1px solid #222F47; margin: 32px 0;">
          <p style="color: #64748B; font-size: 12px; margin: 0; text-align: center;">Powered by VayuNet Core • Automated Environmental Guardian Grid</p>
        </div>
      </body>
    </html>
    """
    
    message.attach(MIMEText(html_content, "html"))

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls() # Secure connection upgrade
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.sendmail(SENDER_EMAIL, email, message.as_string())
            print(f"[Automation] Sent selection email to {email}")
    except Exception as e:
        print(f"[Error] Failed to transmit automation email log: {e}")

@app.post("/api/v1/fellowship/join", status_code=status.HTTP_202_ACCEPTED)
async def register_fellow(application: FellowshipApplication, background_tasks: BackgroundTasks):
    print(f"[Registration] Incoming fellowship request from {application.name}")
    
    
    # Enqueue the email to run in the background worker pool instantly
    background_tasks.add_task(send_selection_email, application.email, application.name, application.skillset)
    
    return {"status": "success", "message": "Application processed. Check your inbox."}

# ==========================================
# Phase 5: Payment Gateway (Razorpay)
# ==========================================

class OrderRequest(BaseModel):
    amount: int
    currency: str = "INR"

@app.post("/api/v1/payments/create-order")
async def create_razorpay_order(request: OrderRequest):
    key_id = os.getenv("RAZORPAY_KEY_ID", "rzp_test_YOUR_DEFAULT_KEY")
    key_secret = os.getenv("RAZORPAY_KEY_SECRET", "YOUR_DEFAULT_SECRET")
    
    try:
        client = razorpay.Client(auth=(key_id, key_secret))
        
        # Razorpay expects amount in subunits (paise)
        data = {
            "amount": request.amount * 100, 
            "currency": request.currency,
            "receipt": f"receipt_vayu_{datetime.datetime.utcnow().timestamp()}"
        }
        
        # For testing purposes without valid credentials, we mock the order creation 
        # so the backend doesn't crash if the dev hasn't set their keys yet.
        if key_id == "rzp_test_YOUR_DEFAULT_KEY":
            print("[Warning] Using Mock Razorpay Order since keys are missing.")
            return {"order_id": f"order_mock_{int(datetime.datetime.utcnow().timestamp())}"}

        payment_order = client.order.create(data=data)
        return {"order_id": payment_order.get("id")}
        
    except Exception as e:
        print(f"[Razorpay Error] {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create payment order: {str(e)}")

# ==========================================
# Phase 6: Transact Bridge (MoR Gateway)
# ==========================================

class TransactBridgeRequest(BaseModel):
    amount: int
    plan_name: str
    user_email: EmailStr = "user@example.com"

@app.post("/api/v1/payments/transact-bridge")
async def create_transact_bridge_checkout(request: TransactBridgeRequest):
    # In production, this makes a secure S2S REST call to Transact Bridge's API
    # using your Merchant API Key to generate a secure Hosted Checkout Session.
    
    api_key = os.getenv("TRANSACT_BRIDGE_API_KEY", "missing_key")
    
    # Mocking the Transact Bridge API Response
    checkout_id = f"tb_chk_{int(datetime.datetime.utcnow().timestamp())}"
    mock_checkout_url = f"https://checkout.transactbridge.com/pay/{checkout_id}?amount={request.amount}&plan={request.plan_name.replace(' ', '')}"

    print(f"[Transact Bridge] Generated MoR Checkout Session for {request.plan_name} at {request.amount} INR")
    
    return {
        "status": "success",
        "checkout_url": mock_checkout_url,
        "session_id": checkout_id
    }

if __name__ == "__main__":
    import uvicorn
    print("Starting AakaashSetu AI Engine...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
