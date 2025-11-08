import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate

function AuthPage({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // initialize navigate

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        setToken(data.token);
      } else {
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>RecycleTime</h1>
        <div className="sign-in-div">
          <form onSubmit={handleSignIn}>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button className="sign-in-btn" type="submit">
              Sign In
            </button>
          </form>

          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

          {/* Register button */}
          <button
            style={{ marginTop: '10px' }}
            onClick={() => navigate('/register')} // redirect to Register.js
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
