import React, { useState, useEffect } from 'react';
import API from './api';
import Navbar from './Navbar';
import AuthModal from './AuthModal';
import AdminModal from './AdminModal';
import CommentsSection from './CommentsSection';
import { Heart, MessageCircle, Flag, Tag, Trash2, Sparkles, Image as ImageIcon, X } from 'lucide-react';

const TRANSLATIONS = {
  en: {
    tagline: 'Fan Community & Safe Haven',
    signIn: 'Sign In',
    newPost: 'New Post',
    bannerTitle: 'Welcome to Swift Secret',
    bannerSub: 'A gentle place for community theories, art, lyrical breakdowns, and shared tales.',
    allTopics: 'All Topics',
    discussions: 'Discussions',
    news: 'News & Updates',
    events: 'Events',
    gallery: 'Gallery',
    createTitle: 'Create a New Tale / Post',
    titlePlaceholder: 'Post title (optional for gallery)...',
    contentPlaceholder: 'Write your story or thoughts (optional for gallery)...',
    chooseImage: 'Upload Image from Device',
    orEnterUrl: 'Or paste image link...',
    removeImage: 'Remove image',
    cancel: 'Cancel',
    publish: 'Publish',
    noPosts: 'No posts found in this category yet. Be the first to share one!',
    by: 'by',
    likes: 'Likes',
    comments: 'Comments',
    hideComments: 'Hide Comments',
    report: 'Report Post',
    reportPrompt: 'Please provide a reason for reporting this post:',
    reportPromptComment: 'Please provide a reason for reporting this comment:',
    reportComment: 'Report comment',
    reportSuccess: 'Report submitted for moderation. Thank you for keeping our community safe!',
    deletePost: 'Delete post',
    deletePostConfirm: 'Are you sure you want to delete this post?',
    reply: 'Reply',
    replyPlaceholder: 'Write a reply...',
    sendReply: 'Reply',
    commentPlaceholder: 'Write a comment...',
    signInToComment: 'Sign in to join the conversation',
    postComment: 'Send',
    noCommentsYet: 'No replies yet. Start the conversation!',
  },
  he: {
    tagline: '',
    signIn: 'התחברות',
    newPost: 'פוסט חדש',
    bannerTitle: 'ברוכים הבאים ל Swift Secret',
    bannerSub: 'מקום עדין ושקט לתאוריות, יצירות, ניתוחי שירים ושיחות קהילה.',
    allTopics: 'כל הנושאים',
    discussions: 'דיונים',
    news: 'חדשות ועדכונים',
    events: 'אירועים',
    gallery: 'גלריה',
    createTitle: 'יצירת פוסט חדש',
    titlePlaceholder: 'כותרת הפוסט (אופציונלי בגלריה)...',
    contentPlaceholder: 'כתבי את המחשבות שלך (אופציונלי בגלריה)...',
    chooseImage: 'העלאת תמונה מהמכשיר',
    orEnterUrl: 'או הדבקת קישור לתמונה...',
    removeImage: 'הסרת תמונה',
    cancel: 'ביטול',
    publish: 'פרסום',
    noPosts: 'עדיין אין פוסטים בקטגוריה זו. היי הראשונה לשתף!',
    by: 'מאת',
    likes: 'לייקים',
    comments: 'תגובות',
    hideComments: 'הסתר תגובות',
    report: 'דיווח על פוסט',
    reportPrompt: 'אנא צייני את סיבת הדיווח על הפוסט:',
    reportPromptComment: 'אנא צייני את סיבת הדיווח על התגובה:',
    reportComment: 'דיווח על תגובה',
    reportSuccess: 'הדיווח נשלח לבדיקת הנהלת הקהילה. תודה!',
    deletePost: 'מחיקת פוסט',
    deletePostConfirm: 'האם את בטוחה שברצונך למחוק פוסט זה?',
    reply: 'הגב',
    replyPlaceholder: 'כתיבת תגובה...',
    sendReply: 'שלח',
    commentPlaceholder: 'כתיבת תגובה...',
    signInToComment: 'התחברי כדי להגיב',
    postComment: 'פרסם',
    noCommentsYet: 'עדיין אין תגובות. היי הראשונה להגיב!',
  }
};

const CATEGORY_THEMES = {
  all: {
    bg: 'linear-gradient(135deg, #FDECEF 0%, #FFF5F7 100%)',
    border: '#F8BBD0',
    text: '#9C27B0',
    title: '#AD1457',
    badgeBg: '#F8BBD0',
    badgeText: '#880E4F'
  },
  discussions: {
    bg: 'linear-gradient(135deg, #EDE7F6 0%, #F3E5F5 100%)',
    border: '#D1C4E9',
    text: '#5E35B1',
    title: '#4A148C',
    badgeBg: '#D1C4E9',
    badgeText: '#4A148C'
  },
  news: {
    bg: 'linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%)',
    border: '#C8E6C9',
    text: '#2E7D32',
    title: '#1B5E20',
    badgeBg: '#C8E6C9',
    badgeText: '#1B5E20'
  },
  events: {
    bg: 'linear-gradient(135deg, #FFF9C4 0%, #FFFDE7 100%)',
    border: '#FFE082',
    text: '#F57F17',
    title: '#E65100',
    badgeBg: '#FFE082',
    badgeText: '#E65100'
  },
  gallery: {
    bg: 'linear-gradient(135deg, #FCE4EC 0%, #EDE7F6 50%, #E8F5E9 100%)',
    border: '#F48FB1',
    text: '#880E4F',
    title: '#C2185B',
    badgeBg: '#F48FB1',
    badgeText: '#880E4F'
  }
};

export default function App() {
  const [lang, setLang] = useState('he');
  const t = TRANSLATIONS[lang];

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [openCommentsPostId, setOpenCommentsPostId] = useState(null);

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('discussions');
  const [postImageUrl, setPostImageUrl] = useState('');

  const currentTheme = CATEGORY_THEMES[selectedCategory] || CATEGORY_THEMES.all;

  const categories = [
    { key: 'all', label: t.allTopics },
    { key: 'discussions', label: t.discussions },
    { key: 'news', label: t.news },
    { key: 'events', label: t.events },
    { key: 'gallery', label: t.gallery },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      API.get('/auth/me')
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const fetchPosts = async () => {
    try {
      const url = selectedCategory === 'all' ? '/posts' : `/posts?category=${selectedCategory}`;
      const res = await API.get(url);
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to load posts', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert(lang === 'he' ? 'גודל התמונה מוגבל לעד 5MB' : 'Image size is limited to 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPostImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const isGallery = postCategory === 'gallery';

    // בדיקה: אם זו לא גלריה וחובה טקסט, או אם בגלריה לא העלו אפילו תמונה
    if (isGallery && !postImageUrl.trim() && !postTitle.trim() && !postContent.trim()) {
      alert(lang === 'he' ? 'בגלריה יש לבחור תמונה' : 'Please upload an image for the gallery');
      return;
    }

    // אם בגלריה לא נכתבה כותרת, נשים כותרת ברירת מחדל
    const finalTitle = postTitle.trim() || (isGallery ? (lang === 'he' ? 'יצירה מהגלריה' : 'Gallery Tale') : 'Untitled');
    const finalContent = postContent.trim() || '';

    try {
      await API.post('/posts', {
        title: finalTitle,
        content: finalContent,
        category: postCategory,
        image_url: postImageUrl.trim() ? postImageUrl.trim() : null,
      });
      setPostTitle('');
      setPostContent('');
      setPostImageUrl('');
      setIsCreatingPost(false);
      fetchPosts();
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        alert(detail.map(d => `${d.loc?.slice(-1)[0]}: ${d.msg}`).join('\n'));
      } else if (typeof detail === 'string') {
        alert(detail);
      } else {
        alert('Failed to create post. Please check input requirements.');
      }
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm(t.deletePostConfirm)) return;

    try {
      await API.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to delete post');
    }
  };

  const handleToggleLike = async (postId) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    try {
      const res = await API.post(`/posts/${postId}/like`);
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId
            ? { ...p, likes_count: res.data.likes_count, is_liked: res.data.liked }
            : p
        )
      );
    } catch (err) {
      console.error('Failed to toggle like', err);
      fetchPosts();
    }
  };

  const handleReportPost = async (postId) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    const reason = window.prompt(t.reportPrompt);
    if (!reason) return;

    try {
      await API.post('/reports', { post_id: postId, reason });
      alert(t.reportSuccess);
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to submit report');
    }
  };

  const isGalleryForm = postCategory === 'gallery';

  return (
    <div dir={lang === 'he' ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenNewPost={() => {
          setIsCreatingPost(true);
          if (selectedCategory !== 'all') {
            setPostCategory(selectedCategory);
          }
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'he' : 'en')}
        t={t}
      />

      <main style={{ maxWidth: '850px', width: '100%', margin: '0 auto', padding: '2rem 1rem', flex: 1 }}>
        {/* Banner דינמי */}
        <section style={{
          background: currentTheme.bg,
          border: `1.5px solid ${currentTheme.border}`,
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          marginBottom: '2rem',
          boxShadow: '0 8px 24px rgba(184, 80, 115, 0.08)',
          transition: 'all 0.4s ease'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <Sparkles size={20} color={currentTheme.title} />
            <h2 style={{
              fontSize: '2rem',
              color: currentTheme.title,
              margin: 0,
              fontFamily: 'serif',
              fontWeight: 700,
              letterSpacing: '0.5px'
            }}>
              {t.bannerTitle}
            </h2>
            <Sparkles size={20} color={currentTheme.title} />
          </div>
          <p style={{
            margin: '0.5rem 0 0 0',
            color: currentTheme.text,
            fontSize: '1rem',
            maxWidth: '620px',
            marginInline: 'auto',
            fontWeight: 500
          }}>
            {t.bannerSub}
          </p>
        </section>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
          {categories.map((cat) => {
            const active = selectedCategory === cat.key;
            const theme = CATEGORY_THEMES[cat.key];
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                style={{
                  padding: '0.5rem 1.2rem',
                  borderRadius: '25px',
                  border: active ? `2px solid ${theme.title}` : '1px solid var(--border-delicate)',
                  backgroundColor: active ? theme.title : 'var(--bg-card)',
                  color: active ? '#fff' : 'var(--text-dark)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: active ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Create Post Form */}
        {isCreatingPost && (
          <form
            onSubmit={handleCreatePost}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1.5px solid var(--primary-rose-light)',
              borderRadius: '20px',
              padding: '1.75rem',
              marginBottom: '2rem',
              boxShadow: '0 6px 18px rgba(216, 112, 147, 0.12)'
            }}
          >
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary-rose-dark)', fontSize: '1.25rem' }}>
              {t.createTitle}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <select
                value={postCategory}
                onChange={(e) => setPostCategory(e.target.value)}
                style={{
                  padding: '0.6rem 0.85rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-delicate)',
                  backgroundColor: 'var(--bg-creamy)',
                  fontSize: '0.9rem'
                }}
              >
                <option value="discussions">{t.discussions}</option>
                <option value="news">{t.news}</option>
                <option value="events">{t.events}</option>
                <option value="gallery">{t.gallery}</option>
              </select>

              {/* בגלריה הכותרת אופציונלית, בשאר הקטגוריות חובה */}
              <input
                type="text"
                placeholder={t.titlePlaceholder}
                required={!isGalleryForm}
                minLength={!isGalleryForm ? 3 : 0}
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-delicate)',
                  backgroundColor: 'var(--bg-creamy)',
                  fontSize: '0.95rem'
                }}
              />

              {/* העלאת תמונה מהמכשיר או הזנת קישור */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <label style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.55rem 1rem',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px dashed var(--secondary-sage)',
                    color: 'var(--secondary-sage-dark)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>
                    <ImageIcon size={16} />
                    {t.chooseImage}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>

                  <input
                    type="url"
                    placeholder={t.orEnterUrl}
                    value={postImageUrl.startsWith('data:') ? '' : postImageUrl}
                    onChange={(e) => setPostImageUrl(e.target.value)}
                    style={{
                      flex: 1,
                      minWidth: '200px',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '10px',
                      border: '1px solid var(--border-delicate)',
                      backgroundColor: 'var(--bg-creamy)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                {/* תצוגה מקדימה של התמונה שנבחרה */}
                {postImageUrl && (
                  <div style={{
                    position: 'relative',
                    marginTop: '0.5rem',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-delicate)',
                    maxHeight: '220px',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#fafafa'
                  }}>
                    <img
                      src={postImageUrl}
                      alt="Preview"
                      style={{ maxHeight: '220px', objectFit: 'contain' }}
                    />
                    <button
                      type="button"
                      onClick={() => setPostImageUrl('')}
                      title={t.removeImage}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: lang === 'he' ? '8px' : 'auto',
                        right: lang === 'he' ? 'auto' : '8px',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* בגלריה התוכן אופציונלי */}
              <textarea
                placeholder={t.contentPlaceholder}
                required={!isGalleryForm && !postImageUrl}
                rows={isGalleryForm ? 2 : 4}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-delicate)',
                  backgroundColor: 'var(--bg-creamy)',
                  fontSize: '0.92rem',
                  resize: 'vertical'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingPost(false);
                    setPostImageUrl('');
                  }}
                  style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.5rem 1.35rem',
                    borderRadius: '18px',
                    backgroundColor: 'var(--primary-rose)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {t.publish}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Posts List */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {posts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3.5rem 1rem',
              backgroundColor: 'var(--bg-card)',
              borderRadius: '20px',
              border: '2px dashed var(--border-delicate)',
              color: 'var(--text-muted)'
            }}>
              {t.noPosts}
            </div>
          ) : (
            posts.map((post) => {
              const isAuthor = user && user.id === post.author_id;
              const canDelete = isAuthor || (user && user.role === 'admin');
              const catTheme = CATEGORY_THEMES[post.category] || CATEGORY_THEMES.all;

              return (
                <article
                  key={post.id}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-delicate)',
                    borderRadius: '18px',
                    padding: '1.6rem',
                    boxShadow: '0 3px 10px rgba(58, 46, 43, 0.04)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  {/* Post Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      backgroundColor: catTheme.badgeBg,
                      color: catTheme.badgeText,
                      padding: '0.28rem 0.75rem',
                      borderRadius: '14px'
                    }}>
                      <Tag size={12} />
                      {t[post.category] || post.category}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        {t.by} @{post.author?.username || 'member'}
                      </span>

                      {/* Delete Post Button */}
                      {canDelete && (
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          title={t.deletePost}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#C2185B',
                            cursor: 'pointer',
                            padding: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            opacity: 0.75,
                            transition: 'opacity 0.2s'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* מציג כותרת רק אם קיימת ואינה ברירת המחדל הריקה */}
                  {post.title && post.title !== 'Untitled' && (
                    <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)', fontSize: '1.3rem' }}>
                      {post.title}
                    </h3>
                  )}

                  {/* הצגת תמונה אם קיימת בפוסט */}
                  {post.image_url && (
                    <div style={{
                      marginBottom: '1.15rem',
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

                  {/* מציג תוכן טקסטואלי רק אם קיים */}
                  {post.content && post.content.trim() !== '' && (
                    <p style={{ margin: '0 0 1.2rem 0', color: 'var(--text-dark)', opacity: 0.85, fontSize: '0.95rem', lineHeight: '1.6' }}>
                      {post.content}
                    </p>
                  )}

                  {/* Card Actions */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid var(--border-delicate)',
                    paddingTop: '0.9rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
                      <button
                        onClick={() => handleToggleLike(post.id)}
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
                        onClick={() => setOpenCommentsPostId(openCommentsPostId === post.id ? null : post.id)}
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
                        {openCommentsPostId === post.id ? t.hideComments : t.comments}
                      </button>
                    </div>

                    <button
                      onClick={() => handleReportPost(post.id)}
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

                  {/* Comments Section */}
                  {openCommentsPostId === post.id && (
                    <CommentsSection
                      postId={post.id}
                      user={user}
                      onRequireAuth={() => setIsAuthOpen(true)}
                      t={t}
                    />
                  )}
                </article>
              );
            })
          )}
        </section>
      </main>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(userData) => setUser(userData)}
        lang={lang}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
      />
    </div>
  );
}