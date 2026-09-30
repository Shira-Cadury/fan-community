import React, { useState } from 'react';
import API from './api';
import { ShieldCheck, UserMinus, UserCheck, X } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, lang = 'he' }) {
  const [targetUsername, setTargetUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;
  const isHe = lang === 'he';

  const handlePromote = async () => {
    if (!targetUsername.trim()) return;
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const res = await API.patch(`/auth/users/${targetUsername.trim()}/role?new_role=admin`);
      setMessage(res.data.message || (isHe ? 'המשתמש קודם למנהל בהצלחה!' : 'User promoted to Admin!'));
      setTargetUsername('');
    } catch (err) {
      setError(err.response?.data?.detail || (isHe ? 'שגיאה בקידום המשתמש' : 'Failed to promote user'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!targetUsername.trim()) return;
    const confirmPrompt = isHe
      ? `האם את בטוחה שברצונך למחוק את המשתמש @${targetUsername.trim()} לצמיתות?`
      : `Are you sure you want to permanently delete user @${targetUsername.trim()}?`;

    if (!window.confirm(confirmPrompt)) return;

    setMessage('');
    setError('');
    setLoading(true);

    try {
      const res = await API.delete(`/auth/users/${targetUsername.trim()}`);
      setMessage(res.data.message || (isHe ? 'המשתמש נמחק בהצלחה!' : 'User deleted successfully!'));
      setTargetUsername('');
    } catch (err) {
      setError(err.response?.data?.detail || (isHe ? 'שגיאה במחיקת המשתמש' : 'Failed to delete user'));
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
      zIndex: 60,
      padding: '1rem',
      direction: isHe ? 'rtl' : 'ltr'
    }}>
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '18px',
        border: '1px solid var(--border-delicate)',
        maxWidth: '440px',
        width: '100%',
        padding: '1.75rem',
        boxShadow: '0 10px 25px rgba(58, 46, 43, 0.15)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-rose-dark)' }}>
            <ShieldCheck size={22} />
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>
              {isHe ? 'פאנל ניהול משתמשים' : 'Admin User Panel'}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 0, marginBottom: '1rem' }}>
          {isHe
            ? 'הקלידי שם משתמש כדי למנות אותו למנהל או כדי למחוק אותו מהמערכת:'
            : 'Enter a username to promote them to Admin or delete them:'}
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder={isHe ? 'שם משתמש (למשל: noa)' : 'Username (e.g. noa)'}
          value={targetUsername}
          onChange={(e) => setTargetUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '0.65rem 0.8rem',
            borderRadius: '10px',
            border: '1px solid var(--border-delicate)',
            backgroundColor: 'var(--bg-creamy)',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}
        />

        {/* Messages */}
        {message && (
          <div style={{ backgroundColor: '#E8F5E9', color: '#2E7D32', padding: '0.55rem', borderRadius: '8px', fontSize: '0.82rem', marginBottom: '1rem' }}>
            {message}
          </div>
        )}
        {error && (
          <div style={{ backgroundColor: '#FFEBEE', color: '#C62828', padding: '0.55rem', borderRadius: '8px', fontSize: '0.82rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handlePromote}
            disabled={loading || !targetUsername.trim()}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              padding: '0.65rem',
              borderRadius: '12px',
              backgroundColor: 'var(--secondary-sage)',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: targetUsername.trim() ? 'pointer' : 'default',
              opacity: targetUsername.trim() ? 1 : 0.6
            }}
          >
            <UserCheck size={16} />
            {isHe ? 'מנה למנהל' : 'Make Admin'}
          </button>

          <button
            onClick={handleDelete}
            disabled={loading || !targetUsername.trim()}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              padding: '0.65rem',
              borderRadius: '12px',
              backgroundColor: '#C62828',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: targetUsername.trim() ? 'pointer' : 'default',
              opacity: targetUsername.trim() ? 1 : 0.6
            }}
          >
            <UserMinus size={16} />
            {isHe ? 'מחק משתמש' : 'Delete User'}
          </button>
        </div>
      </div>
    </div>
  );
}