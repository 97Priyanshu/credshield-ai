from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import json
import asyncio
import io
from pdf2image import convert_from_bytes 

from services.ocr_service import extract_text, structure_text_with_ai, generate_forensic_summary
from services.qr_service import scan_qr, fetch_name_from_url, fuzzy_match_names
from services.forensic_service import run_cnn_analysis
from services.auth_service import verify_supabase_token
from services.local_db_service import save_verification_record, get_record_by_id, get_all_records_for_user

app = FastAPI(title="CredShield AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def process_single_file(file_bytes: bytes, filename: str) -> dict:
    is_pdf = filename.lower().endswith('.pdf')
    img = None

    try:
        if is_pdf:
            pages = convert_from_bytes(file_bytes, first_page=1, last_page=1)
            open_cv_image = np.array(pages[0])
            img = cv2.cvtColor(open_cv_image, cv2.COLOR_RGB2BGR)
        else:
            nparr = np.frombuffer(file_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
        if img is None: raise ValueError("Invalid file format")
    except Exception as e:
        return {"status": "error", "filename": filename, "message": str(e)}

    raw_text = extract_text(img)
    structured_data = structure_text_with_ai(raw_text, filename)
    
    qr_url = scan_qr(img)
    qr_verified = False
    if qr_url:
        official_name = fetch_name_from_url(qr_url)
        score = fuzzy_match_names(structured_data.get("name", ""), official_name)
        qr_verified = score > 90

    trust_score, is_authentic, heatmap_url, diagnostics = run_cnn_analysis(img, file_bytes)
    ai_summary = generate_forensic_summary(trust_score, is_authentic, diagnostics)

    return {
        "status": "success",
        "filename": filename,
        "trust_score": trust_score,
        "is_authentic": is_authentic,
        "heatmap": heatmap_url,           
        "ai_summary": ai_summary,         
        "diagnostics": diagnostics,       
        "metadata": {**structured_data, "qr_verified": qr_verified},
        "forensic_logs": [
            {"check": "OCR Extraction", "status": "Done"},
            {"check": "QR Verification", "status": "Done" if qr_verified else "Skipped"},
            {"check": "CNN Pixel Forensics", "status": "Done"} 
        ]
    }

@app.post("/api/v1/verify/single")
async def verify_single(file: UploadFile = File(...), user=Depends(verify_supabase_token)):
    contents = await file.read()
    result = await process_single_file(contents, file.filename)
    if result["status"] == "success":
        result["record_id"] = save_verification_record(user['uid'], result)
    return result

@app.get("/api/v1/records/all")
async def get_history(user=Depends(verify_supabase_token)):
    records = get_all_records_for_user(user['uid'])
    return [{
        "id": r["id"],
        "candidateName": r["metadata"].get("name", "Unknown"),
        "uploadDate": r["timestamp"].split("T")[0],
        "trustScore": r["trust_score"],
        "status": "Authentic" if r["is_authentic"] else "Flagged"
    } for r in records]

@app.get("/api/v1/records/{record_id}")
async def get_single_record(record_id: str, user=Depends(verify_supabase_token)):
    record = get_record_by_id(record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    return record

@app.websocket("/api/v1/verify/batch-stream")
async def websocket_batch(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            file_data = await websocket.receive_bytes()
            result = await process_single_file(file_data, "batch_file.jpg")
            await websocket.send_text(json.dumps(result))
    except WebSocketDisconnect:
        pass