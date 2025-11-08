import './App.css';
import React, { useState, useEffect } from 'react';
import CameraCapture from './Components/CameraCapture';
import TextBox from './Components/TextBox';
import TabsContainer from './TabsContainer';
import AuthPage from './Auth';

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

  if (!token) {
    return <AuthPage setToken={setToken} />;
  }

  return (
    <div className="App">
      < TabsContainer/>
    </div>
  );
}

export default App;
