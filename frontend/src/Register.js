import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // After successful registration, go to login page
        navigate('/Auth');
      } else {
        const data = await response.json();
        setUsername('');
        setPassword('');
        // Check if duplicate username
        if (data.detail && data.detail.includes('duplicate')) {
          setError('Username already exists. Please choose another.');
          
        } else {
          setError(data.detail || 'Registration failed');
        }
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Create an account</h1>
        <form onSubmit={handleRegister}>
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
          <button type="submit">Register</button>
        </form>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </div>
    </div>
  );
}

export default Register;
