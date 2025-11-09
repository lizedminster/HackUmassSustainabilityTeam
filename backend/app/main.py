from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users 
from app.routers import recycle_log
from app.routers import detection   # import your routers here
# imports for removing background
# import base64
# from io import BytesIO
from pydantic import BaseModel
# from rembg import remove
# from PIL import Image
from app.services.detection_service import detect_material
from app.services.background_service import remove_background

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
app.include_router(detection.router, prefix="/detect", tags=["Detection"])


# Background Removal Code
class ImageData(BaseModel):
    image: str  # base64 string

@app.post("/upload")
async def upload_image(data: ImageData):
    try:
        output_path = remove_background(data)

        material_type = detect_material(output_path)
        return {"success": True, "material_type": material_type}
    except Exception as e:
        return {"success": False, "error": str(e)}
