import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HexColorPicker from './Components/HexColorPicker'; // ✅ import your picker

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hexcolor, setHexcolor] = useState('#4ECDC4'); // 🎨 default color
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, hexcolor }), // ⬅️ include color
      });

      if (response.ok) {
        navigate('/Auth'); // ✅ go to login after success
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

          {/* 🎨 Add the color picker */}
          <div style={{ marginTop: '20px', marginBottom: '10px' }}>
            <HexColorPicker
              label="Choose your circle color"
              defaultColor={hexcolor}
              onChange={setHexcolor}
            />
            <p style={{ marginTop: '8px' }}>
              Selected color: <span style={{ color: hexcolor }}>{hexcolor}</span>
            </p>
          </div>

          <button type="submit" style={{ marginTop: '10px' }}>
            Register
          </button>
        </form>

        {/* Back to Login button */}
        <button
          style={{ marginTop: '15px' }}
          onClick={() => navigate('/Auth')}
        >
          Back to Login
        </button>

        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </div>
    </div>
  );
}

export default Register;
