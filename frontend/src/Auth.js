import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

import Waterbottle from './Waterbottle.png';
import plastic1 from './plastic1.png';
import plastic2 from './plastic2.png';
import flower1 from './flower1.png';
import paper1 from './paper1.png';
import cardboard from './cardboard.png';

function Auth({ setToken, setUserID }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cfg = {
      count: 8,
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

    const imgs = cfg.images.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const items = Array.from({ length: cfg.count }, () => ({
      x: Math.random() * W,
      y: -Math.random() * H,
      size: rand(cfg.sizeMin, cfg.sizeMax),
      speed: rand(cfg.speedMin, cfg.speedMax) / 1000,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: rand(-0.0015, 0.0015),
      img: imgs[Math.floor(Math.random() * imgs.length)],
    }));

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

    // Cleanup on page exit
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

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
