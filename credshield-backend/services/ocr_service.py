import easyocr
import google.generativeai as genai
import json
import os

# 1. Initialize the OCR Reader (This must be here for 'extract_text' to work)
# Set gpu=True if you have an NVIDIA GPU and CUDA installed
reader = easyocr.Reader(['en'], gpu=False)

def extract_text(img):
    """Extracts raw text from the image array using EasyOCR."""
    result = reader.readtext(img, detail=0)
    raw_text = " ".join(result)
    return raw_text

def structure_text_with_ai(raw_text, filename):
    """Uses Gemini to intelligently categorize the raw OCR string based on context."""
    
    # ⚠️ PASTE YOUR ACTUAL API KEY HERE ⚠️
    GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY", "#")
    
    if GOOGLE_API_KEY == "YOUR_REAL_GEMINI_API_KEY_HERE" or GOOGLE_API_KEY == "":
        return {
            "name": "Missing API Key", 
            "roll_number": "N/A", 
            "university": "N/A", 
            "issue_date": "N/A", 
            "degree": "N/A"
        }

    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash') 

    prompt = f"""
    Analyze this raw OCR text extracted from a document named '{filename}'.
    
    Step 1: Determine the context (University degree, workshop/hackathon cert, course completion, or ID).
    
    Step 2: Map the relevant fields into a strict JSON object with these EXACT keys: 
    "name", "roll_number", "university", "issue_date", "degree".
    
    Guidance:
    - If it's a University degree, 'degree' is the qualification (e.g., B.Tech) and 'university' is the institution.
    - If it's a workshop/hackathon cert, 'degree' is the role (e.g., Participant) and 'university' is the issuing organization.
    - If a Roll Number isn't found, check for 'Candidate ID' or 'Certificate ID'.
    
    Return ONLY a valid JSON object. If a field is missing, return "Not Found".
    
    OCR Text: {raw_text}
    """
    
    try:
        response = model.generate_content(prompt)
        # Clean the response to ensure it's just JSON
        clean_json = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(clean_json)
    except Exception as e:
        print(f"LLM Parsing Error: {e}")
        return {
            "name": "Processing Error", 
            "roll_number": "Error", 
            "university": "Error", 
            "issue_date": "Error", 
            "degree": "Error"
        }
    
def generate_forensic_summary(trust_score, is_authentic, diagnostics):
    """Uses Gemini to explain the forensic findings to the judges."""
    GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY", "#")
    if GOOGLE_API_KEY == "YOUR_REAL_GEMINI_API_KEY_HERE": return "AI Summary unavailable. Missing API Key."
    
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    prompt = f"""
    You are a digital forensics AI. Write a punchy, 3-sentence summary explaining why a document was flagged as {'Authentic' if is_authentic else 'Forged'}.
    
    Here is the data:
    - Overall Trust Score: {trust_score}%
    - Error Level Analysis (ELA) detected anomalies: {diagnostics['ela_warning']}
    - Suspicious Metadata/Software detected: {diagnostics['metadata_warning']} (Software: {diagnostics['software_used']})
    
    If authentic, praise the clean pixel consistency and valid metadata.
    If forged, aggressively point out the compression anomalies (likely text overlays) and suspicious metadata traces. Keep it professional but highly technical.
    """
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception:
        return "Forensic analysis completed. Anomaly detection thresholds were applied to the pixel map."