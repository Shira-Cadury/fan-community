import React from 'react';
import { Shield, Sparkles, PlusCircle, LogIn, LogOut, Globe, ClipboardList } from 'lucide-react';

export default function Navbar({
  user,
  onOpenAuth,
  onLogout,
  onOpenNewPost,
  onOpenAdmin,
  onOpenFeedbackBoard,
  lang,
  onToggleLang,
  t
}) {
  const isHe = lang === 'he';
  const isAdmin = user && (user.role === 'admin' || user.username?.toLowerCase() === 'shira');

  return (
    <header style={{
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-delicate)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(58, 46, 43, 0.02)'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* לוגו האתר */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={22} color="var(--primary-rose-dark)" />
          <h1 style={{
            margin: 0,
            fontSize: '1.45rem',
            fontFamily: '"Baskerville", "Georgia", serif',
            fontWeight: 700,
            color: 'var(--primary-rose-dark)',
            letterSpacing: '0.5px'
          }}>
            Swift Secrets
          </h1>
        </div>

        {/* פעולות וכפתורים עליונים */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          {/* כפתור החלפת שפה */}
          <button
            onClick={onToggleLang}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-creamy)',
              border: '1px solid var(--border-delicate)',
              color: 'var(--text-dark)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            <Globe size={15} />
            {lang === 'he' ? 'English' : 'עברית'}
          </button>

          {/* כפתור לוח משימות נקי למנהלות */}
          {isAdmin && (
            <button
              onClick={onOpenFeedbackBoard}
              title={isHe ? 'לוח בקשות ושינויים' : 'Tasks & Requests Board'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '20px',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-delicate)',
                color: 'var(--secondary-sage-dark)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <ClipboardList size={15} />
              <span>{isHe ? 'לוח משימות' : 'Tasks Board'}</span>
            </button>
          )}

          {/* כפתור פאנל ניהול */}
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '20px',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-delicate)',
                color: 'var(--primary-rose-dark)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Shield size={15} />
              <span>{isHe ? 'ניהול' : 'Admin'}</span>
            </button>
          )}

          {/* כפתור פוסט חדש */}
          {user && (
            <button
              onClick={onOpenNewPost}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '20px',
                backgroundColor: 'var(--secondary-sage-dark)',
                color: '#fff',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(46, 125, 50, 0.2)'
              }}
            >
              <PlusCircle size={15} />
              <span>{t.newPost}</span>
            </button>
          )}

          {/* כפתור התחברות / ניתוק */}
          {user ? (
            <button
              onClick={onLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '20px',
                backgroundColor: 'var(--bg-creamy)',
                border: '1px solid var(--border-delicate)',
                color: 'var(--text-dark)',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <LogOut size={14} />
              <span>{user.username}@</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '20px',
                backgroundColor: 'var(--primary-rose)',
                color: '#fff',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <LogIn size={15} />
              <span>{t.signIn}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}