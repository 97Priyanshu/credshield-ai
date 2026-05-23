import os
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_URL", "#")

SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "#")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def save_verification_record(user_id: str, record_data: dict):
    """Saves the processed certificate data to Supabase."""
    try:
        data, count = supabase.table('verifications').insert({
            "user_id": user_id,
            "filename": record_data["filename"],
            "trust_score": record_data["trust_score"],
            "is_authentic": record_data["is_authentic"],
            "metadata": record_data["metadata"],
            "forensic_logs": record_data["forensic_logs"]
        }).execute()
        return data[1][0]['id'] if data[1] else None
    except Exception as e:
        print(f"Database Save Error: {e}")
        return None

def get_record_by_id(record_id: str):
    """Fetches a past forensic record by its ID."""
    try:
        response = supabase.table('verifications').select("*").eq('id', record_id).execute()
        if response.data:
            return response.data[0]
        return None
    except Exception as e:
        print(f"Database Fetch Error: {e}")
        return None