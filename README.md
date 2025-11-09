# RecycleTime
This is a website that allows people to quickly see whether they should recycle by taking a picture of the item. Users can create an account or sign into their existing account. Then they take a photo of their trash which then uses a yolov5 model to identify the material and lets the user know whether they should recycle it. There are also a fast fact tab for quick recycling tips, a dashboard to see how many items they have recycled, a stats tab to see how many of each material you recycle, and a tab to switch accounts.

## Project Structure

Here is the overarching folder structure:

```
HackUmassSustainabilityTeam/
├── backend/                                # Backend
│   ├── app/
│   │   ├── main.py                        # FastAPI app entry point
│   │   ├── supabase_client.py             # Supabase connection setup
│   │   ├── routers/                    # API route definitions
│   │   │   ├── users.py
│   │   │   ├── recycle_log.py
│   │   │   └── detection.py
│   │   └── services/                   # Logic + database operations
│   │       ├── user_service.py
│   │       ├── recycle_log_service.py
│   │       ├── detection_service.py
│   │       └── background_service.py
│   │   
│   └── requirements.txt                   # Backend dependencies
│
├── frontend/                               # Frontend
│   ├── public/
│   │   └── index.html                     # HTML entry point for React
│   ├── src/
│   │   ├── Components/                    # Components for the website pages
│   │   │   ├── CameraCapture.js
│   │   │   ├── ConfirmPhoto.js
│   │   │   ├── Leaderboard.js
│   │   │   ├── UsageLineChart.js
│   │   │   ├── WeeklyBarChart.js
│   │   │   ├── WeekNavigator.js
│   │   │   └── HexColorPicker.js
│   │   ├── FastFacts.js
│   │   ├── TabsContainer.js
│   │   ├── App.js                         # Main React component
│   │   ├── SharePage.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── CameraPage.js
│   │   ├── Auth.js
│   │   ├── index.js                       # React entry point
│   │   └── styles.css                     
│   └── package.json                       # Frontend dependencies
│
├── .gitignore
└── README.md                              # Main documentation file
```

## API Endpoints

Prefix: /users
- POST /users/ → add a new user
- POST /users/login → user login authentication

Prefix: /recycle_log
- POST /recycleLog/ → add a new recycle log
- GET /recycleLog/ → get all recycle logs

Prefix: /upload
- POST /upload → upload an image to remove the background and then use a model to classify the material it is made of

## Setup and Installation

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

## Features
- **Image Classification:** Capture images of items using a camera or upload images to classify whether the item is recyclable using YOLOv5.  
- **Live Camera Integration:** Directly interact with your webcam to classify items in real-time.  
- **Statistics Page and Dashboard:** View visual analytics of recycling trends, including total items recycled, category breakdowns, and historical data.  
- **Database Integration:** All user interactions and item data are stored in a database for persistent tracking.  

## Technologies Used
- **Backend:** FastAPI, Uvicorn, Python  
- **Frontend:** React, JavaScript  
- **Machine Learning:** YOLOv5 for image classification  
- **Database:** PostgreSQL in Supabase  
- **Visualization:** Chart.js or Recharts for dashboard statistics  

## Contributing
To contribute to the project:  
1. Fork the repository.  
2. Create a new feature branch (`git checkout -b feature-name`).  
3. Commit your changes (`git commit -m "Add feature"`).  
4. Push to your branch (`git push origin feature-name`).  
5. Open a pull request to merge into `main`.
