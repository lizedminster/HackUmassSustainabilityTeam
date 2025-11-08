from fastapi import APIRouter
from typing import List, Dict
from app.services.user_service import create_user_service, get_users_service

router = APIRouter()

@router.post("/", response_model=Dict)
def create_user(user: Dict):
    return create_user_service(user)

@router.get("/", response_model=List[Dict])
def read_users():
    return get_users_service()
