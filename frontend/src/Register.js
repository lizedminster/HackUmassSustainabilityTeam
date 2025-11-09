import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HexColorPicker from './Components/HexColorPicker';
import './Register.css';

import Waterbottle from './Waterbottle.png';
import plastic1 from './plastic1.png';
import plastic2 from './plastic2.png';
import flower1 from './flower1.png';
import paper1 from './paper1.png';
import cardboard from './cardboard.png';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hexcolor, setHexcolor] = useState("#0a3f08ff");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cfg = {
      count: 8, // how many images fall
      sizeMin: 140,
      sizeMax: 260,
      speedMin: 40,
      speedMax: 200,
      images: [Waterbottle, plastic1, plastic2, flower1, paper1, cardboard],
      zIndex: 0,
    };

    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: String(cfg.zIndex),
    });
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    function onResize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', onResize);

    function rand(a, b) {
      return a + Math.random() * (b - a);
    }

    // Load images
    const imgs = cfg.images.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    // Initialize falling items
    const items = Array.from({ length: cfg.count }, () => ({
      x: Math.random() * W,
      y: -Math.random() * H,
      size: rand(cfg.sizeMin, cfg.sizeMax),
      speed: rand(cfg.speedMin, cfg.speedMax) / 1000,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: rand(-0.0015, 0.0015),
      img: imgs[Math.floor(Math.random() * imgs.length)],
    }));

    // Animation loop
    let last = performance.now();
    let rafId;
    function loop(now) {
      const dt = now - last;
      last = now;
      ctx.clearRect(0, 0, W, H);
      for (const p of items) {
        p.y += p.speed * dt;
        p.rot += p.rotSpeed * dt;
        if (p.y - p.size > H) {
          p.y = -p.size;
          p.x = Math.random() * W;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (p.img.complete) {
          const iw = p.img.naturalWidth, ih = p.img.naturalHeight;
          const drawW = p.size;
          const drawH = (ih / iw) * drawW;
          ctx.drawImage(p.img, -drawW / 2, -drawH / 2, drawW, drawH);
        }
        ctx.restore();
      }
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);

    // Cleanup when leaving Register page
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

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
