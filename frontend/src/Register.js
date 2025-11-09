import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HexColorPicker from './Components/HexColorPicker';
import './Register.css'; // Import CSS

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hexcolor, setHexcolor] = useState('#4ECDC4');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, hexcolor }),
      });

      if (response.ok) {
        navigate('/Auth');
      } else {
        const data = await response.json();
        setUsername('');
        setPassword('');
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
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Create an Account</h1>

        <form className="register-form" onSubmit={handleRegister}>
          <label className="register-label">
            Username
            <input
              className="register-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label className="register-label">
            Password
            <input
              className="register-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="color-picker-container">
            <HexColorPicker
              label="Choose your circle color"
              defaultColor={hexcolor}
              onChange={setHexcolor}
            />
            <p className="selected-color">
              Selected color: <span style={{ color: hexcolor }}>{hexcolor}</span>
            </p>
          </div>

          <button className="register-button" type="submit">Register</button>
        </form>

        <button
          className="back-login-button"
          onClick={() => navigate('/Auth')}
        >
          Back to Login
        </button>

        {error && <div className="register-error">{error}</div>}
      </div>
    </div>
  );
}

export default Register;
