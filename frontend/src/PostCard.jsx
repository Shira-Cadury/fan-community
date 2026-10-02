import React, { useState } from 'react';
import CommentsSection from './CommentsSection';
import { Heart, MessageCircle, Flag, Tag, Trash2, Globe, Loader2 } from 'lucide-react';

export default function PostCard({
  post,
  user,
  isAdmin,
  lang,
  t,
  catTheme,
  onToggleLike,
  onDeletePost,
  onReportPost,
  onRequireAuth
}) {
  const isHe = lang === 'he';
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [isTranslated, setIsTranslated] = useState(false);
  const [isLoadingTranslation, setIsLoadingTranslation] = useState(false);

  const handleTranslate = async () => {
    if (translatedContent) {
      setIsTranslated(!isTranslated);
      return;
    }

    if (!post.content || !post.content.trim()) return;

    setIsLoadingTranslation(true);
    try {
      // זיהוי שפת היעד: אם האתר בעברית נתרגם לעברית, אחרת לאנגלית
      const targetLang = isHe ? 'iw' : 'en';
      
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(post.content)}`;
      const res = await fetch(url);
      const data = await res.json();

      // חיבור חלקי התרגום למשפט שלם
      if (data && data[0]) {
        const fullTranslation = data[0].map((item) => item[0]).join('');
        setTranslatedContent(fullTranslation);
        setIsTranslated(true);
      } else {
        throw new Error('Empty response');
      }
    } catch (err) {
      console.error('Translation error:', err);
      alert(isHe ? 'שגיאה בטעינת התרגום' : 'Failed to fetch translation');
    } finally {
      setIsLoadingTranslation(false);
    }
  };

  return (
    <article
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-delicate)',
        borderRadius: '20px',
        padding: '1.85rem',
        boxShadow: '0 4px 14px rgba(58, 46, 43, 0.04)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          fontWeight: 700,
          backgroundColor: catTheme.badgeBg,
          color: catTheme.badgeText,
          padding: '0.3rem 0.8rem',
          borderRadius: '14px'
        }}>
          <Tag size={12} />
          {t[post.category] || post.category}
        </span>

        {isAdmin && (
          <button
            onClick={() => onDeletePost(post.id)}
            title={t.deletePost}
            style={{
              background: 'none',
              border: 'none',
              color: '#C2185B',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              opacity: 0.75
            }}
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {post.title && post.title !== 'Untitled' && (
        <h3 style={{
          margin: '0 0 0.6rem 0',
          color: 'var(--text-dark)',
          fontSize: '1.35rem',
          fontFamily: '"Georgia", serif',
          lineHeight: '1.3'
        }}>
          {post.title}
        </h3>
      )}

      {post.image_url && (
        <div style={{
          marginBottom: '1.25rem',
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid var(--border-delicate)',
          maxHeight: '480px',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#fafafa'
        }}>
          <img
            src={post.image_url}
            alt={post.title || "Post image"}
            style={{ width: '100%', maxHeight: '480px', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      )}

      {post.content && post.content.trim() !== '' && (
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{
            margin: '0 0 0.5rem 0',
            color: 'var(--text-dark)',
            opacity: 0.88,
            fontSize: '0.98rem',
            lineHeight: '1.7',
            wordBreak: 'break-word',
            padding: '0 0.15rem'
          }}>
            {isTranslated && translatedContent ? translatedContent : post.content}
          </p>

          <button
            onClick={handleTranslate}
            disabled={isLoadingTranslation}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'none',
              border: 'none',
              color: 'var(--primary-rose-dark)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '2px 0',
              opacity: 0.9
            }}
          >
            {isLoadingTranslation ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Globe size={13} />
            )}
            <span>
              {isLoadingTranslation
                ? (isHe ? 'מתרגם...' : 'Translating...')
                : isTranslated
                ? (isHe ? 'הצג מקור' : 'See original')
                : (isHe ? 'הצג תרגום' : 'See translation')}
            </span>
          </button>
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border-delicate)',
        paddingTop: '0.95rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
          <button
            onClick={() => onToggleLike(post.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'none',
              border: 'none',
              color: 'var(--primary-rose-dark)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            <Heart
              size={17}
              fill={post.likes_count > 0 ? "var(--primary-rose)" : "none"}
              color="var(--primary-rose-dark)"
            />
            {post.likes_count || 0} {t.likes}
          </button>

          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'none',
              border: 'none',
              color: 'var(--secondary-sage-dark)',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600
            }}
          >
            <MessageCircle size={17} />
            {isCommentsOpen ? t.hideComments : t.comments}
          </button>
        </div>

        <button
          onClick={() => onReportPost(post.id)}
          title={t.report}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.8rem'
          }}
        >
          <Flag size={14} />
          {t.report}
        </button>
      </div>

      {isCommentsOpen && (
        <CommentsSection
          postId={post.id}
          user={user}
          onRequireAuth={onRequireAuth}
          t={t}
        />
      )}
    </article>
  );
}