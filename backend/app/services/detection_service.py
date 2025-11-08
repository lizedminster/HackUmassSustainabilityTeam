import warnings
warnings.filterwarnings("ignore", category=UserWarning, module="yolov5")

import torch
from torch.serialization import add_safe_globals
from yolov5.models.yolo import DetectionModel
from torch.nn.modules.container import Sequential
import yolov5
import functools
import numpy as np
import cv2
import os

# # imports for removing background
# import base64
# from io import BytesIO
# from pydantic import BaseModel
# from rembg import remove
# from PIL import Image

# ---------------- PATCH FOR TORCH 2.6+ ----------------
add_safe_globals([DetectionModel, Sequential])
torch_load_original = torch.load
torch.load = functools.partial(torch_load_original, weights_only=False)

# ---------------- LOAD YOLOv5 MODEL -------------------
model = yolov5.load('keremberke/yolov5m-garbage')

# Restore torch.load for safety
torch.load = torch_load_original

# ---------------- MODEL CONFIG -----------------------
model.conf = 0.25  # NMS confidence threshold
model.iou = 0.45   # NMS IoU threshold
model.agnostic = False
model.multi_label = False
model.max_det = 1000

def detect_material(image_path: str) -> str:
    # ---------------- INFERENCE --------------------------
    results = model(image_path, augment=True)

    # finds item type in results output (Detections object)
    names = model.names 
    predictions = results.pred[0]  
    classes = predictions[:, 5].int().tolist()
    detected_labels = [names[c] for c in classes]
    if not detected_labels:
        return "unknown"
    
    detected_material = str(detected_labels[0]) #i am getting the first item because it has the highest probability.
    print(detected_material)
    return detected_material