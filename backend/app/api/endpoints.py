from fastapi import APIRouter, UploadFile, File, HTTPException, WebSocket, WebSocketDisconnect, BackgroundTasks
from app.services.ocr_service import OCRService
from app.services.risk_engine import RiskEngine
from app.services.verification_service import VerificationService
from app.services.websocket_manager import ConnectionManager
from app.services.background_check_service import BackgroundCheckService
from app.services.audio_service import AudioService

router = APIRouter()
ocr_service = OCRService()
risk_engine = RiskEngine()
verification_service = VerificationService()
manager = ConnectionManager()
background_check_service = BackgroundCheckService()
audio_service = AudioService()

# In-memory storage for background check results (for prototype)
background_tasks_results = {}

@router.post("/ocr/process")
async def process_document(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    contents = await file.read()
    
    # 1. Extract Data via OCR
    ocr_result = ocr_service.process_document(contents)
    
    if "error" in ocr_result:
        raise HTTPException(status_code=500, detail="OCR Failed")
        
    extracted_data = ocr_result.get("extracted_data", {})
    
    # 2. Verify Data against Gov DB
    verification_result = verification_service.verify_identity(extracted_data)
    
    # 3. Calculate Initial Risk
    risk_result = risk_engine.calculate_risk(extracted_data, verification_result)

    # 4. Trigger Shadow Agent Tasks (Background)
    task_id = extracted_data.get("document_number", "unknown")
    background_tasks.add_task(run_shadow_checks, task_id, extracted_data)
    
    return {
        "ocr": ocr_result,
        "verification": verification_result,
        "risk": risk_result,
        "background_check_task_id": task_id
    }

async def run_shadow_checks(task_id: str, data: dict):
    # Simulate async processing
    criminal_check = await background_check_service.perform_background_check(data)
    media_check = await background_check_service.check_social_media(data)
    background_tasks_results[task_id] = {
        "criminal": criminal_check,
        "media": media_check,
        "complete": True
    }

@router.get("/shadow-agent/status/{task_id}")
async def get_shadow_agent_status(task_id: str):
    result = background_tasks_results.get(task_id)
    if not result:
        return {"status": "processing", "complete": False}
    return {"status": "completed", "results": result, "complete": True}

@router.post("/risk/evaluate")
async def evaluate_risk(user_data: dict):
    # This might need mock verification result if called standalone
    return risk_engine.calculate_risk(user_data)

@router.websocket("/ws/chat/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Echo back with a prefix for now, or integrate LLM here later
            await manager.send_personal_message(f"Agent: Received '{data}' - How can I help?", websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@router.post("/voice/process")
async def process_voice(file: UploadFile = File(...)):
    contents = await file.read()
    # 1. STT
    user_text = audio_service.stt_process(contents)
    
    # 2. Logic (Mock AI response)
    # 3. TTS
    tts_result = audio_service.tts_process(user_text)
    
    return {
        "transcription": user_text,
        "response": tts_result
    }
