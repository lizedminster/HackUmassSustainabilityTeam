from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users 
from app.routers import recycle_log   # import your routers here

# 1. Create the FastAPI app
app = FastAPI(
    title="My Project API",
    description="Backend API for React frontend",
    version="1.0.0"
)

# 2. Middleware (optional but needed for React + FastAPI on different ports)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Include routers (your endpoints)
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(recycle_log.router, prefix="/recycle_log", tags=["recycle_log"])