# from rembg import remove
# from PIL import Image

# # Store path of the image in the variable input_path
# input_path =  'exampleTrash.jpg'

# # Store path of the output image in the variable output_path
# output_path = 'exampleTrashBlank.png'

# # Processing the image
# input = Image.open(input_path)

# # Removing the background from the given Image
# output = remove(input)

# #Saving the image in the given path
# output.save(output_path)

# main.py
import base64
from io import BytesIO
from fastapi import FastAPI
from pydantic import BaseModel
from rembg import remove
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

        # Remove background
        output_image = remove(input_image)

        # Save output
        output_path = "exampleTrashBlank.png"
        output_image.save(output_path)

        return {"success": True, "output_path": output_path}

    except Exception as e:
        return {"success": False, "error": str(e)}
