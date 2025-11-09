# RecycleTime
Description

## Setup and Installation

### Project Structure

### API Endpoints

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