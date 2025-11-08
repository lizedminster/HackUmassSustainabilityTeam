from fastapi import APIRouter
from typing import List, Dict
from app.services.recycle_log_service import create_recycle_log_service, get_recycle_logs_service

router = APIRouter()

# POST /recycleLog/ → add a new recycle log
@router.post("/", response_model=Dict)
def create_recycle_log(log: Dict):
    # Logic will be handled in services
    return create_recycle_log_service(log)

# GET /recycleLog/ → get all recycle logs
@router.get("/", response_model=List[Dict])
def read_recycle_logs():
    # Logic will be handled in services
    return get_recycle_logs_service()
