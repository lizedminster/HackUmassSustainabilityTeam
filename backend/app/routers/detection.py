from fastapi import APIRouter
# from app.main import remove_background

router = APIRouter()

@router.post("/")
def detect_item():
    return {"message": "Detection endpoint"}
    # return remove_background()
