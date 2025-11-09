import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // We'll put styles here

function Auth({ setToken, setUserID }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        setToken(data.token);
        setUserID(data.user_id);
      } else {
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">RecycleTime</h1>
        <form className="auth-form" onSubmit={handleSignIn}>
          <label className="auth-label">
            Username
            <input
              className="auth-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="auth-label">
            Password
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="auth-button" type="submit">Sign In</button>
        </form>
        {error && <div className="auth-error">{error}</div>}
        <button
          className="auth-register-btn"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Auth;
