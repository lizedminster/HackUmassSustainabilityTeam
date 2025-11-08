from fastapi import APIRouter, HTTPException, Request
from typing import List, Dict
from app.services.user_service import create_user_service, get_users_service, verify_user_service
import jwt
import os
from postgrest.exceptions import APIError  # import APIError to catch PostgREST errors

router = APIRouter()

@router.post("/", response_model=Dict)
def create_user(user: Dict):
    try:
        return create_user_service(user)
    except APIError as e:
        # Check for duplicate key violation (PostgreSQL unique constraint)
        if "duplicate key value violates unique constraint" in str(e):
            raise HTTPException(status_code=409, detail="Username already exists")
        else:
            # For other database errors, raise 500
            raise HTTPException(status_code=500, detail="Internal server error")

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
    return {"token": token, "user_id": user["id"]}

@router.get("/", response_model=List[Dict])
def read_users():
    return get_users_service()
