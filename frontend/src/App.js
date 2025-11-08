import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TabsContainer from './TabsContainer';
import AuthPage from './Auth';
import Register from './Register';

function App() {
  // initialize from localStorage so refresh doesn't force re-login
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user_id, setUserID] = useState(() => localStorage.getItem('user_id'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (user_id) {
      localStorage.setItem('user_id', user_id);
    } else {
      localStorage.removeItem('user_id');
    }
  }, [user_id]);

  return (
    <Routes>
      {/* Login page */}
      <Route
        path="/Auth"
        element={token ? <Navigate to="/app" /> : <AuthPage setToken={setToken} setUserID={setUserID} />}
      />

      {/* Register page */}
      <Route path="/register" element={<Register />} /> 

      {/* Main app (tabs) */}
      <Route
        path="/*"
        element={
          token ? (
            <div className="App">
              <TabsContainer user_id={user_id} />
            </div>
          ) : (
            <Navigate to="/Auth" />
          )
        }
      />
    </Routes>
  );
}

export default App;
