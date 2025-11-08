from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users 
from app.routers import recycle_log   # import your routers here
# imports for removing background
import base64
from io import BytesIO
from pydantic import BaseModel
from rembg import remove
from PIL import Image

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

# Background Removal Code
class ImageData(BaseModel):
    image: str  # base64 string

@app.post("/upload")
async def upload_image(data: ImageData):
    try:
        image_base64 = data.image

        # Remove prefix if exists: "data:image/jpeg;base64,"
        if "," in image_base64:
            image_base64 = image_base64.split(",")[1]

        # Decode base64
        image_bytes = base64.b64decode(image_base64)

        # Convert bytes to PIL.Image
        input_image = Image.open(BytesIO(image_bytes))

        input_image.save("inputImage.png")

        # Remove background
        output_image = remove(input_image)

        # Save output
        output_path = "backgroundRemoved.png"
        output_image.save(output_path)

        return {"success": True, "output_path": output_path}

    except Exception as e:
        return {"success": False, "error": str(e)}
