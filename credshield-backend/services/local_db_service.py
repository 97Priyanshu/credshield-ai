import json
import os
import uuid
from datetime import datetime

DB_FILE = "database.json"

def init_db():
    """Ensures the JSON file exists."""
    if not os.path.exists(DB_FILE):
        with open(DB_FILE, "w") as f:
            json.dump([], f)

def save_verification_record(user_id: str, record_data: dict):
    """Saves the record to a local JSON file."""
    init_db()
    
    # Generate a unique ID for this record
    record_id = str(uuid.uuid4())
    
    new_entry = {
        "id": record_id,
        "user_id": user_id,
        "timestamp": datetime.now().isoformat(),
        **record_data
    }

    with open(DB_FILE, "r+") as f:
        data = json.load(f)
        data.append(new_entry)
        f.seek(0)
        json.dump(data, f, indent=4)
    
    return record_id

def get_record_by_id(record_id: str):
    """Fetches a record from the local JSON file."""
    if not os.path.exists(DB_FILE):
        return None
        
    with open(DB_FILE, "r") as f:
        data = json.load(f)
        for record in data:
            if record["id"] == record_id:
                return record
    return None

def get_all_records_for_user(user_id: str):
    """Fetches all records belonging to a specific user."""
    if not os.path.exists(DB_FILE):
        return []
        
    user_records = []
    with open(DB_FILE, "r") as f:
        data = json.load(f)
        for record in data:
            if record["user_id"] == user_id:
                user_records.append(record)
    
    # Sort by date, newest first
    user_records.sort(key=lambda x: x["timestamp"], reverse=True)
    return user_records