import base64
from io import BytesIO
from pydantic import BaseModel
from rembg import remove
from PIL import Image

class ImageData(BaseModel):
    image: str  # base64 string

def remove_background(data: ImageData):

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
        return output_path