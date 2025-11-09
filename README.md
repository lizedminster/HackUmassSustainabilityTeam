# RecycleTime
Description

## Setup and Installation

### Project Structure

### API Endpoints
Users (user management)

Prefix: /users
Router: app.routers.users — see users.py and its router included in main.py (app.include_router(users.router, prefix="/users", tags=["Users"])).
Recycle log (records of recycled items)

Prefix: /recycle_log
Router: app.routers.recycle_log — see recycle_log.py and inclusion in main.py (app.include_router(recycle_log.router, prefix="/recycle_log", tags=["recycle_log"])).
Detection (image classification / YOLO)

Prefix: /detect
Router: app.routers.detection — see detection.py and inclusion in main.py (app.include_router(detection.router, prefix="/detect", tags=["Detection"])).
Related service: app.services.detection_service.detect_material — see detection_service.py.
Background removal / image upload

Endpoint: POST /upload
Implementations:
Background removal endpoint referenced/defined in main.py (Background Removal Code block and call to app.services.background_service.remove_background). See app.services.background_service.remove_background — background_service.py.
Separate test script with its own FastAPI app and POST /upload: testingBackgroundRemoval.py (contains app.post("/upload") example and CORS setup).
### Backend setup
The backend is a FastAPI that runs on localhost:8000. First, acquire the .env file with the database url and key. Then open a terminal in VSCode and paste the following commands:
```
cd backend
python -m venv venv  # create a virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt  # install dependencies
uvicorn app.main:app --reload  # start the backend
```

### Frontend setup
The frontend is a React app that runs on localhost:3000.
Open a new terminal in VSCode and paste the following commands:
```
cd frontend
npm install
npm start  # start the frontend
```

### Features
- **Image Classification:** Capture images of items using a camera or upload images to classify whether the item is recyclable using YOLOv5.  
- **Live Camera Integration:** Directly interact with your webcam to classify items in real-time.  
- **Statistics Page and Dashboard:** View visual analytics of recycling trends, including total items recycled, category breakdowns, and historical data.  
- **Database Integration:** All user interactions and item data are stored in a database for persistent tracking.  

### Technologies Used
- **Backend:** FastAPI, Uvicorn, Python  
- **Frontend:** React, JavaScript  
- **Machine Learning:** YOLOv5 for image classification  
- **Database:** PostgreSQL in Supabase  
- **Visualization:** Chart.js or Recharts for dashboard statistics  

### Contributing
To contribute to the project:  
1. Fork the repository.  
2. Create a new feature branch (`git checkout -b feature-name`).  
3. Commit your changes (`git commit -m "Add feature"`).  
4. Push to your branch (`git push origin feature-name`).  
5. Open a pull request to merge into `main`.
