import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TabsContainer from './TabsContainer';
import AuthPage from './Auth';
import Register from './Register';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [userID, setUserID] = useState(() => localStorage.getItem('userID'));

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (userID) localStorage.setItem('userID', userID);
    else localStorage.removeItem('userID');
  }, [userID]);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          token ? (
            <Navigate to="/app" />
          ) : (
            <AuthPage setToken={setToken} setUserID={setUserID} />
          )
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/*"
        element={
          token ? (
            <div className="App">
              <TabsContainer
                user_id={userID}
                setToken={setToken}
                setUserID={setUserID}
              />
            </div>
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
    </Routes>
  );
}

export default App;
