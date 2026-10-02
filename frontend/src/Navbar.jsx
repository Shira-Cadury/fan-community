import React from 'react';
import { 
  Sparkles, LogIn, LogOut, PlusCircle, 
  ShieldCheck, ClipboardList, Globe, MessageCircle 
} from 'lucide-react';

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
  const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb5QQZjEKyZDVdqCDz0a';

  return (
    <header style={{
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-delicate)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(8px)',
      boxShadow: '0 2px 10px rgba(58, 46, 43, 0.03)'
    }}>
      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        flexWrap: 'wrap'
      }}>
        {/* לוגו האתר */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-rose-dark)'
          }}>
            <Sparkles size={16} />
          </div>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            fontFamily: '"Georgia", serif',
            color: 'var(--text-dark)',
            letterSpacing: '0.5px'
          }}>
            Swift Secrets
          </span>
        </div>

        {/* כפתורי פעולה */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* כפתור ערוץ הוואטסאפ */}
          <a
            href={WHATSAPP_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            title={isHe ? 'הצטרפי לערוץ הוואטסאפ שלנו' : 'Join our WhatsApp Channel'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '20px',
              backgroundColor: '#E8F5E9',
              border: '1px solid #A5D6A7',
              color: '#2E7D32',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(46, 125, 50, 0.08)'
            }}
          >
            <MessageCircle size={15} />
            <span>{isHe ? 'ערוץ WhatsApp' : 'WhatsApp Channel'}</span>
          </a>

          {/* כפתור פוסט חדש */}
          <button
            onClick={onOpenNewPost}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.95rem',
              borderRadius: '20px',
              backgroundColor: 'var(--primary-rose)',
              color: '#fff',
              border: 'none',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(216, 112, 147, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            <PlusCircle size={15} />
            <span>{t.newPost}</span>
          </button>

          {/* כפתור לוח משימות למנהלת */}
          {isAdmin && (
            <button
              onClick={onOpenFeedbackBoard}
              title={isHe ? 'לוח משימות ובקשות' : 'Tasks Board'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.45rem 0.75rem',
                borderRadius: '16px',
                backgroundColor: 'var(--bg-creamy)',
                border: '1px solid var(--border-delicate)',
                color: 'var(--text-dark)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <ClipboardList size={14} />
            </button>
          )}

          {/* כפתור פאנל ניהול */}
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              title={isHe ? 'ניהול קהילה' : 'Admin Panel'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.45rem 0.75rem',
                borderRadius: '16px',
                backgroundColor: '#EDE7F6',
                border: '1px solid #D1C4E9',
                color: '#4A148C',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <ShieldCheck size={14} />
            </button>
          )}

          {/* כפתור החלפת שפה */}
          <button
            onClick={onToggleLang}
            title={isHe ? 'Change Language' : 'החלפת שפה'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.45rem 0.65rem',
              borderRadius: '16px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-delicate)',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Globe size={14} />
            <span>{lang === 'he' ? 'EN' : 'עב'}</span>
          </button>

          {/* כפתור התחברות / התנתקות */}
          {user ? (
            <button
              onClick={onLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '16px',
                backgroundColor: 'var(--bg-creamy)',
                border: '1px solid var(--border-delicate)',
                color: 'var(--text-dark)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <LogOut size={14} />
              <span>{user.username}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.9rem',
                borderRadius: '16px',
                backgroundColor: 'var(--bg-creamy)',
                border: '1px solid var(--border-delicate)',
                color: 'var(--primary-rose-dark)',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <LogIn size={14} />
              <span>{t.signIn}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}