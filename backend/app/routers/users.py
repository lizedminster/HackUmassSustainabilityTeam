
from fastapi import APIRouter, HTTPException
from fastapi import Request
from typing import List, Dict
from app.services.user_service import create_user_service, get_users_service, verify_user_service
import jwt
import os

router = APIRouter()


@router.post("/", response_model=Dict)
def create_user(user: Dict):
    return create_user_service(user)

@router.post("/login", response_model=Dict)
async def login(request: Request):
    body = await request.json()
    username = body.get("username")
    password = body.get("password")
    user = verify_user_service(username, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    # Generate JWT token
    secret = os.getenv("JWT_SECRET", "supersecret")
    token = jwt.encode({"user_id": user["id"], "username": user["username"]}, secret, algorithm="HS256")
    return {"token": token}

@router.get("/", response_model=List[Dict])
def read_users():
    return get_users_service()
