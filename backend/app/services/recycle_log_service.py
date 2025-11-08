from app.supabase_client import supabase

def create_recycle_log_service(log):
    """
    Adds a new recycle log to Supabase.
    Expects a dict with keys: user_id, material_type
    Returns a dict with user_id and material_type
    Supabase auto-generates id and created_at
    """
    # Only send fields we want to set
    data_to_insert = {
        "user_id": log.get("user_id"),
        "material_type": log.get("material_type")
    }

    response = supabase.table("recycle_log").insert(data_to_insert).execute()

    if response.data:
        inserted = response.data[0]
        # Return only the fields we care about
        return {
            "user_id": inserted["user_id"],
            "material_type": inserted["material_type"]
            # optionally include "created_at": inserted["created_at"] if you want
        }

    return None

def get_recycle_logs_service():
    """
    Returns all recycle logs from Supabase.
    """
    response = supabase.table("recycle_log").select("*").execute()
    
    return [
        {   
            "id": l["id"],
            "user_id": l["user_id"],
            "created_at": l["created_at"],
            "material_type": l["material_type"]
            # optionally include "created_at": l["created_at"]
        }
        for l in response.data
    ] if response.data else []
