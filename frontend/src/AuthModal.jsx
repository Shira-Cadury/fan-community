import React, { useState } from 'react';
import logoImg from './assets/logo.png';
import API from './api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, lang = 'he' }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const isHe = lang === 'he';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isRegister) {
        await API.post('/auth/register', { username, password });
      }

      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);

      const res = await API.post('/auth/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const token = res.data.access_token;
      localStorage.setItem('token', token);

      const userRes = await API.get('/auth/me');
      onAuthSuccess(userRes.data);
      onClose();
    } catch (err) {
      const detail = err.response?.data?.detail;
      setErrorMsg(typeof detail === 'string' ? detail : (isHe ? 'ההתחברות נכשלה. אנא בדקי את הפרטים.' : 'Authentication failed. Please check credentials.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(58, 46, 43, 0.45)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '1rem',
      direction: isHe ? 'rtl' : 'ltr'
    }}>
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '18px',
        border: '1px solid var(--border-delicate)',
        maxWidth: '400px',
        width: '100%',
        padding: '2rem',
        boxShadow: '0 10px 25px rgba(58, 46, 43, 0.12)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img
            src={logoImg}
            alt="Swift Secret"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--primary-rose-light)',
              marginBottom: '0.5rem',
              boxShadow: '0 2px 8px rgba(216, 112, 147, 0.25)'
            }}
          />
          <h2 style={{ margin: 0, color: 'var(--primary-rose-dark)', fontSize: '1.4rem' }}>
            {isRegister ? (isHe ? 'הצטרפות ל-Swift Secret' : 'Join Swift Secret') : (isHe ? 'ברוכים השבים' : 'Welcome Back')}
          </h2>
          <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {isRegister
              ? (isHe ? 'צרי חשבון עם שם משתמש וסיסמה בלבד' : 'Create an account to join the discussion')
              : (isHe ? 'התחברי כדי לשתף ולהגיב' : 'Sign in to share your thoughts')}
          </p>
        </div>

        {errorMsg && (
          <div style={{
            backgroundColor: '#FFEBEE',
            color: '#C62828',
            padding: '0.6rem 0.8rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-dark)' }}>
              {isHe ? 'שם משתמש' : 'Username'}
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.8rem',
                borderRadius: '10px',
                border: '1px solid var(--border-delicate)',
                backgroundColor: 'var(--bg-creamy)',
                marginTop: '0.25rem',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-dark)' }}>
              {isHe ? 'סיסמה' : 'Password'}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.8rem',
                borderRadius: '10px',
                border: '1px solid var(--border-delicate)',
                backgroundColor: 'var(--bg-creamy)',
                marginTop: '0.25rem',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '0.5rem',
              padding: '0.75rem',
              borderRadius: '12px',
              backgroundColor: 'var(--primary-rose)',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? (isHe ? 'רק רגע...' : 'Please wait...') : (isRegister ? (isHe ? 'הרשמה' : 'Sign Up') : (isHe ? 'התחברות' : 'Sign In'))}
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            {isRegister ? (isHe ? 'כבר יש לך חשבון? ' : 'Already have an account? ') : (isHe ? 'אין לך חשבון? ' : "Don't have an account? ")}
          </span>
          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setErrorMsg(''); }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--secondary-sage)',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isRegister ? (isHe ? 'התחברי כאן' : 'Sign In') : (isHe ? 'הרשמי כאן' : 'Sign Up')}
          </button>
        </div>

        {/* כפתור כניסה כאורח */}
        <button
          onClick={onClose}
          type="button"
          style={{
            width: '100%',
            marginTop: '0.85rem',
            padding: '0.55rem',
            borderRadius: '10px',
            backgroundColor: 'var(--bg-creamy)',
            border: '1px dashed var(--border-delicate)',
            color: 'var(--text-dark)',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {isHe ? 'המשך כאורח / עיון בלבד' : 'Continue as Guest'}
        </button>
      </div>
    </div>
  );
}