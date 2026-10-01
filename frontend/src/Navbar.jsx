import React from 'react';
import logoImg from './assets/logo.png';
import { LogIn, LogOut, PlusCircle, Sparkles, Globe, Shield } from 'lucide-react';

export default function Navbar({
  user,
  onOpenAuth,
  onLogout,
  onOpenNewPost,
  onOpenAdmin,
  lang,
  onToggleLang,
  t
}) {
  return (
    <header style={{
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-delicate)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: '0 2px 8px rgba(58, 46, 43, 0.05)'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0.65rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem'
      }}>
        {/* Brand & Logo */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.65rem', 
          cursor: 'pointer',
          flexShrink: 0
        }}>
          <img
            src={logoImg}
            alt="Swift Secrets Logo"
            style={{
              width: '40px',
              height: '40px',
              minWidth: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--primary-rose-light)',
              boxShadow: '0 2px 6px rgba(216, 112, 147, 0.25)',
              flexShrink: 0
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{
              margin: 0,
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--primary-rose-dark)',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              whiteSpace: 'nowrap'
            }}>
              Swift Secrets
              <Sparkles size={15} color="var(--primary-rose)" />
            </h1>
            {t.tagline && (
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {t.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'flex-end'
        }}>
          {/* כפתור החלפת שפה */}
          <button
            onClick={onToggleLang}
            title="Change language / החלף שפה"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.4rem 0.65rem',
              borderRadius: '16px',
              border: '1px solid var(--border-delicate)',
              backgroundColor: 'var(--bg-creamy)',
              color: 'var(--text-dark)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Globe size={14} color="var(--secondary-sage)" />
            {lang === 'en' ? 'עברית' : 'English'}
          </button>

          {user ? (
            <>
              {/* כפתורי מנהל בלבד */}
              {user.role === 'admin' && (
                <>
                  <button
                    onClick={onOpenAdmin}
                    title="Admin Panel / פאנל ניהול"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '20px',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border-delicate)',
                      color: 'var(--primary-rose-dark)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Shield size={15} />
                    {lang === 'he' ? 'ניהול' : 'Admin'}
                  </button>

                  <button
                    onClick={onOpenNewPost}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '20px',
                      backgroundColor: 'var(--secondary-sage)',
                      color: '#fff',
                      border: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <PlusCircle size={16} />
                    {t.newPost}
                  </button>
                </>
              )}

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--bg-subtle)',
                padding: '0.3rem 0.7rem',
                borderRadius: '16px',
                border: '1px solid var(--border-delicate)',
                whiteSpace: 'nowrap'
              }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                  @{user.username}
                </span>
                <button
                  onClick={onLogout}
                  title="Logout"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px'
                  }}
                >
                  <LogOut size={15} />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '20px',
                backgroundColor: 'var(--primary-rose)',
                color: '#fff',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(216, 112, 147, 0.3)',
                whiteSpace: 'nowrap'
              }}
            >
              <LogIn size={15} />
              {t.signIn}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}