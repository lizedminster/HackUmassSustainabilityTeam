import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TabsContainer from './TabsContainer';
import AuthPage from './Auth';
import Register from './Register';

function App() {
  // initialize from localStorage so refresh doesn't force re-login
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Routes>
      {/* Login page */}
      <Route
        path="/Auth"
        element={token ? <Navigate to="/app" /> : <AuthPage setToken={setToken} />}
      />

      {/* Register page */}
      <Route path="/register" element={<Register />} /> 

      {/* Main app (tabs) */}
      <Route
        path="/app/*"
        element={
          token ? (
            <div className="App">
              {/* <header className="App-header">
                <h1>RecycleTime</h1>
                <div>
                  <TextBox />
                </div>
                <div>
                  <CameraCapture />
                </div>
              </header> */}
              <TabsContainer />
            </div>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;
