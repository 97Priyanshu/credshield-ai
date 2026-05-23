import cv2
from pyzbar.pyzbar import decode
from rapidfuzz import fuzz
import requests

def scan_qr(img):
    """Finds and decodes a QR code in the image."""
    decoded_objects = decode(img)
    for obj in decoded_objects:
        # Assuming the QR contains a URL
        url = obj.data.decode('utf-8')
        if url.startswith("http"):
            return url
    return None

def fetch_name_from_url(url):
    """
    Dummy function for hackathon purposes.
    In reality, you would scrape the URL or hit its API to get the official name.
    """
    # Example: If the URL is an API endpoint
    # response = requests.get(url)
    # data = response.json()
    # return data.get("student_name")
    
    print(f"Hitting Official URL: {url}")
    return "Priyanshu Kanshana" # Simulating the name returned from the official database

def fuzzy_match_names(ocr_name, official_name):
    """Compares two names and returns a similarity score (0-100)."""
    # token_sort_ratio handles words being out of order (e.g., "Om Pandey" vs "Pandey Om")
    score = fuzz.token_sort_ratio(ocr_name.lower(), official_name.lower())
    return round(score, 2)