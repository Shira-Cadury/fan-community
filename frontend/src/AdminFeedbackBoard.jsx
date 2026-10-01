import React, { useState, useEffect } from 'react';
import { PlusCircle, CheckCircle, Trash2, ShieldCheck } from 'lucide-react';

const CATEGORY_LABELS = {
  he: {
    design: '🎨 עיצוב ומראה',
    content: '📝 שינוי תוכן ושירים',
    games: '🎮 הערות למשחקים',
    bug: '🐛 תקלה / באג',
    other: '💡 כללי'
  },
  en: {
    design: '🎨 Design & UI',
    content: '📝 Content & Songs',
    games: '🎮 Games Feedback',
    bug: '🐛 Bug / Issue',
    other: '💡 General'
  }
};

export default function AdminFeedbackBoard({ user, lang }) {
  const isHe = lang === 'he';
  const categories = CATEGORY_LABELS[lang] || CATEGORY_LABELS.he;
  const canManage = user?.username?.toLowerCase() === 'shira';

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('swift_admin_notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('design');

  useEffect(() => {
    localStorage.setItem('swift_admin_notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNote = {
      id: Date.now(),
      author: user?.username || (isHe ? 'מנהלת' : 'Admin'),
      type,
      title: title.trim(),
      content: content.trim(),
      status: 'open',
      date: new Date().toLocaleDateString(isHe ? 'he-IL' : 'en-US')
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setContent('');
  };

  const handleToggleStatus = (id) => {
    if (!canManage) return;
    setNotes(notes.map(n => n.id === id ? { ...n, status: n.status === 'open' ? 'done' : 'open' } : n));
  };

  const handleDeleteNote = (id) => {
    if (!canManage) return;
    if (window.confirm(isHe ? 'למחוק את ההערה?' : 'Delete note?')) {
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* כרטיסיית כותרת קצרה ונקייה */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-delicate)',
        borderRadius: '20px',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 2px 8px rgba(58, 46, 43, 0.03)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-rose-dark)' }}>
          <ShieldCheck size={20} />
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontFamily: '"Georgia", serif' }}>
            {isHe ? 'לוח ניהול ומשימות' : 'Admin Tasks Board'}
          </h3>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {isHe ? 'בקשות לשינויים, תיקונים ותוספות' : 'Requests, fixes and updates'}
        </span>
      </div>

      {/* טופס הוספת בקשה */}
      <form
        onSubmit={handleAddNote}
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-delicate)',
          borderRadius: '20px',
          padding: '1.35rem',
          boxShadow: '0 4px 14px rgba(58, 46, 43, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              padding: '0.55rem 0.8rem',
              borderRadius: '12px',
              border: '1px solid var(--border-delicate)',
              backgroundColor: 'var(--bg-creamy)',
              fontSize: '0.88rem',
              minWidth: '170px'
            }}
          >
            <option value="design">{categories.design}</option>
            <option value="content">{categories.content}</option>
            <option value="games">{categories.games}</option>
            <option value="bug">{categories.bug}</option>
            <option value="other">{categories.other}</option>
          </select>

          <input
            type="text"
            required
            placeholder={isHe ? 'כותרת קצרה...' : 'Title...'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '0.55rem 0.8rem',
              borderRadius: '12px',
              border: '1px solid var(--border-delicate)',
              backgroundColor: 'var(--bg-creamy)',
              fontSize: '0.88rem'
            }}
          />
        </div>

        <textarea
          rows={3}
          required
          placeholder={isHe ? 'פירוט השינוי או התקלה...' : 'Details...'}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            padding: '0.6rem 0.8rem',
            borderRadius: '12px',
            border: '1px solid var(--border-delicate)',
            backgroundColor: 'var(--bg-creamy)',
            fontSize: '0.88rem',
            resize: 'vertical'
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1.3rem',
              borderRadius: '16px',
              backgroundColor: 'var(--primary-rose)',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <PlusCircle size={15} />
            {isHe ? 'הוספה ללוח' : 'Add Note'}
          </button>
        </div>
      </form>

      {/* רשימת הבקשות */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '2.5rem',
            backgroundColor: 'var(--bg-card)',
            borderRadius: '20px',
            border: '1px dashed var(--border-delicate)',
            color: 'var(--text-muted)',
            fontSize: '0.9rem'
          }}>
            {isHe ? 'אין פניות פתוחות כרגע.' : 'No open requests.'}
          </div>
        ) : (
          notes.map((note) => {
            const isDone = note.status === 'done';
            return (
              <div
                key={note.id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: `1px solid ${isDone ? '#C8E6C9' : 'var(--border-delicate)'}`,
                  borderRadius: '16px',
                  padding: '1.15rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                  opacity: isDone ? 0.6 : 1,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-subtle)',
                      color: 'var(--text-dark)'
                    }}>
                      {categories[note.type] || categories.other}
                    </span>
                    <h4 style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: 'var(--text-dark)',
                      textDecoration: isDone ? 'line-through' : 'none'
                    }}>
                      {note.title}
                    </h4>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {note.date} • {note.author}
                    </span>

                    {canManage && (
                      <button
                        onClick={() => handleToggleStatus(note.id)}
                        title={isDone ? (isHe ? 'סמני כלא טופל' : 'Mark as open') : (isHe ? 'סמני כבוצע' : 'Mark as done')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: isDone ? '#2E7D32' : 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: '3px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}

                    {canManage && (
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        title={isHe ? 'מחיקה' : 'Delete'}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#C2185B',
                          cursor: 'pointer',
                          padding: '3px',
                          display: 'flex',
                          alignItems: 'center',
                          opacity: 0.7
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                <p style={{
                  margin: 0,
                  fontSize: '0.88rem',
                  lineHeight: '1.5',
                  color: 'var(--text-dark)',
                  textDecoration: isDone ? 'line-through' : 'none'
                }}>
                  {note.content}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}