import React, { useState, useEffect } from 'react';
import API from './api';
import Navbar from './Navbar';
import AuthModal from './AuthModal';
import AdminModal from './AdminModal';
import CommentsSection from './CommentsSection';
import GamesHub from './GamesHub';
import { Heart, MessageCircle, Flag, Tag, Trash2, Sparkles, Image as ImageIcon, X, Music, ExternalLink, Search, Clock, Flame } from 'lucide-react';

const DAILY_SONGS = [
  { title: 'Cardigan', album: 'folklore', quote: 'When you are young, they assume you know nothing...', link: 'https://open.spotify.com/track/4R2kfaDFslZEMLoQUTdoVJ' },
  { title: 'Lover', album: 'Lover', quote: 'Can I go where you go? Can we always be this close?', link: 'https://open.spotify.com/track/1dGr1nsAZkt7ReEHGNYHpO' },
  { title: 'All Too Well (10 Minute Version)', album: 'Red (Taylor\'s Version)', quote: 'You kept me like a secret, but I kept you like an oath...', link: 'https://open.spotify.com/track/5enxwA8aAbwZbf5aCHqvzq' },
  { title: 'August', album: 'folklore', quote: 'Meet me behind the mall...', link: 'https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp' },
  { title: 'Enchanted (Taylor\'s Version)', album: 'Speak Now', quote: 'Please don\'t be in love with someone else...', link: 'https://open.spotify.com/track/3sW3PzcJHG9v6xM4xgZSYV' },
  { title: 'Cruel Summer', album: 'Lover', quote: 'I love you, ain\'t that the worst thing you ever heard?', link: 'https://open.spotify.com/track/1BxfuPKGuaTgP7aM0fbdwr' },
  { title: 'Style', album: '1989 (Taylor\'s Version)', quote: 'You got that James Dean daydream look in your eye...', link: 'https://open.spotify.com/track/0ug5ULuhfgCrqdBuWuZqvD' },
  { title: 'Down Bad', album: 'The Tortured Poets Department', quote: 'Down bad crying at the gym...', link: 'https://open.spotify.com/track/2OzhngLzyJQ4uW90Fcf546' },
  { title: 'Fearless (Taylor\'s Version)', album: 'Fearless', quote: '\'Cause I don\'t know how it gets better than this...', link: 'https://open.spotify.com/track/77sMIMGoAcBe0ZRaCL97aF' }
];

const TRANSLATIONS = {
  en: {
    tagline: 'Fan Community & Safe Haven',
    signIn: 'Sign In',
    newPost: 'New Post',
    bannerTitle: 'Welcome to Swift Secrets',
    bannerSub: 'A gentle place for community theories, art, lyrical breakdowns, and shared tales.',
    dailySongLabel: 'Song of the Day',
    listenNow: 'Listen',
    searchPlaceholder: 'Search posts...',
    noSearchPosts: 'No posts match your search query.',
    sortLatest: 'Latest',
    sortPopular: 'Popular',
    allTopics: 'All Topics',
    discussions: 'Discussions',
    theories: 'Theories & Analyses',
    news: 'News & Updates',
    events: 'Events',
    gallery: 'Gallery',
    games: 'Games',
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
    bannerTitle: 'ברוכים הבאים ל-Swift Secrets',
    bannerSub: 'מקום עדין ושקט לתאוריות, יצירות, ניתוחי שירים ושיחות קהילה.',
    dailySongLabel: 'השיר היומי',
    listenNow: 'האזנה',
    searchPlaceholder: 'חיפוש פוסטים...',
    noSearchPosts: 'לא נמצאו פוסטים התואמים לחיפוש שלך.',
    sortLatest: 'הכי חדשים',
    sortPopular: 'הכי אהובים',
    allTopics: 'כל הנושאים',
    discussions: 'דיונים',
    theories: 'תיאוריות וניתוחים',
    news: 'חדשות ועדכונים',
    events: 'אירועים',
    gallery: 'גלריה',
    games: 'משחקים',
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
    bg: 'linear-gradient(135deg, #FFF0F5 0%, #FAF0F4 100%)',
    border: '#E8B4C8',
    text: '#8A3B58',
    title: '#9C3D64',
    badgeBg: '#FCE4EC',
    badgeText: '#880E4F'
  },
  discussions: {
    bg: 'linear-gradient(135deg, #F3EBF7 0%, #FAF5FC 100%)',
    border: '#D4BEE4',
    text: '#5B3770',
    title: '#4D2463',
    badgeBg: '#EDE7F6',
    badgeText: '#4A148C'
  },
  theories: {
    bg: 'linear-gradient(135deg, #FFEBE5 0%, #FFF5F2 100%)',
    border: '#F7C4B6',
    text: '#943E26',
    title: '#7A2E19',
    badgeBg: '#FCD8CF',
    badgeText: '#662210'
  },
  news: {
    bg: 'linear-gradient(135deg, #E6F3F7 0%, #F2F9FA 100%)',
    border: '#B3DCE5',
    text: '#225B69',
    title: '#164854',
    badgeBg: '#E0F2F1',
    badgeText: '#004D40'
  },
  events: {
    bg: 'linear-gradient(135deg, #FFF8E7 0%, #FFFDF8 100%)',
    border: '#FFE3A8',
    text: '#8A6218',
    title: '#75500A',
    badgeBg: '#FFF3E0',
    badgeText: '#E65100'
  },
  gallery: {
    bg: 'linear-gradient(135deg, #FDECEF 0%, #F5ECF7 100%)',
    border: '#E5BFCE',
    text: '#7A334E',
    title: '#8C2B50',
    badgeBg: '#FCE4EC',
    badgeText: '#880E4F'
  },
  games: {
    bg: 'linear-gradient(135deg, #F5EFFB 0%, #FAF6FD 100%)',
    border: '#D7C2EC',
    text: '#6A3E91',
    title: '#562580',
    badgeBg: '#EDE5F7',
    badgeText: '#4A148C'
  }
};

export default function App() {
  const [lang, setLang] = useState('he');
  const t = TRANSLATIONS[lang];

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [openCommentsPostId, setOpenCommentsPostId] = useState(null);

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('discussions');
  const [postImageUrl, setPostImageUrl] = useState('');

  const currentTheme = CATEGORY_THEMES[selectedCategory] || CATEGORY_THEMES.all;

  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const todaysSong = DAILY_SONGS[dayOfYear % DAILY_SONGS.length];

  const categories = [
    { key: 'all', label: t.allTopics, icon: '✨' },
    { key: 'discussions', label: t.discussions, icon: '💭' },
    { key: 'theories', label: t.theories, icon: '🔍' },
    { key: 'news', label: t.news, icon: '📰' },
    { key: 'events', label: t.events, icon: '📅' },
    { key: 'gallery', label: t.gallery, icon: '🎨' },
    { key: 'games', label: t.games, icon: '🎮' },
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
    if (selectedCategory === 'games') return;
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

    if (isGallery && !postImageUrl.trim() && !postTitle.trim() && !postContent.trim()) {
      alert(lang === 'he' ? 'בגלריה יש לבחור תמונה' : 'Please upload an image for the gallery');
      return;
    }

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

  // סינון ומיון פוסטים בזמן אמת
  const processedPosts = posts
    .filter((post) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      const titleMatch = post.title ? post.title.toLowerCase().includes(query) : false;
      const contentMatch = post.content ? post.content.toLowerCase().includes(query) : false;
      return titleMatch || contentMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.likes_count || 0) - (a.likes_count || 0);
      }
      // latest (default)
      return (b.id || 0) - (a.id || 0);
    });

  return (
    <div dir={lang === 'he' ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenNewPost={() => {
          setIsCreatingPost(true);
          if (selectedCategory !== 'all' && selectedCategory !== 'games') {
            setPostCategory(selectedCategory);
          } else {
            setPostCategory('discussions');
          }
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'he' : 'en')}
        t={t}
      />

      <main style={{ maxWidth: '850px', width: '100%', margin: '0 auto', padding: '1.5rem 1rem', flex: 1 }}>
        {/* Banner */}
        <section style={{
          background: currentTheme.bg,
          border: `1px solid ${currentTheme.border}`,
          borderRadius: '24px',
          padding: '2.4rem 1.5rem',
          textAlign: 'center',
          marginBottom: '1.25rem',
          boxShadow: '0 6px 20px rgba(184, 80, 115, 0.06)',
          transition: 'all 0.4s ease'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
            <Sparkles size={18} color={currentTheme.title} />
            <h2 style={{
              fontSize: '2.1rem',
              color: currentTheme.title,
              margin: 0,
              fontFamily: '"Baskerville", "Georgia", "Garamond", serif',
              fontWeight: 700,
              letterSpacing: '0.8px'
            }}>
              {t.bannerTitle}
            </h2>
            <Sparkles size={18} color={currentTheme.title} />
          </div>
          <p style={{
            margin: '0.4rem 0 0 0',
            color: currentTheme.text,
            fontSize: '0.98rem',
            maxWidth: '620px',
            marginInline: 'auto',
            fontWeight: 500,
            lineHeight: '1.6',
            fontFamily: '"Georgia", serif'
          }}>
            {t.bannerSub}
          </p>
        </section>

        {/* שורת שיר יומי, חיפוש וכפתורי מיון */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '1.25rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* כרטיסיית שיר יומי קומפקטית */}
          <div style={{
            flex: '1 1 300px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-delicate)',
            borderRadius: '16px',
            padding: '0.35rem 0.75rem',
            boxShadow: '0 2px 8px rgba(58, 46, 43, 0.02)',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-rose-dark)',
                flexShrink: 0
              }}>
                <Music size={14} />
              </div>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.82rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{todaysSong.title}</span>
                <span style={{ color: 'var(--secondary-sage)', marginInlineStart: '0.35rem', fontSize: '0.76rem' }}>
                  ({todaysSong.album})
                </span>
              </div>
            </div>

            <a
              href={todaysSong.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.25rem 0.55rem',
                borderRadius: '12px',
                backgroundColor: 'var(--bg-creamy)',
                border: '1px solid var(--border-delicate)',
                color: 'var(--primary-rose-dark)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textDecoration: 'none',
                flexShrink: 0
              }}
            >
              {t.listenNow}
              <ExternalLink size={11} />
            </a>
          </div>

          {selectedCategory !== 'games' && (
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flex: '1 1 320px',
              alignItems: 'center'
            }}>
              {/* חיפוש */}
              <div style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  position: 'absolute',
                  [lang === 'he' ? 'right' : 'left']: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none',
                  color: 'var(--text-muted)'
                }}>
                  <Search size={15} />
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 2.2rem',
                    borderRadius: '16px',
                    border: '1px solid var(--border-delicate)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-dark)',
                    fontSize: '0.85rem',
                    boxShadow: '0 2px 6px rgba(58, 46, 43, 0.02)',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    type="button"
                    style={{
                      position: 'absolute',
                      [lang === 'he' ? 'left' : 'right']: '10px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '3px'
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* כפתורי מיון: הכי חדשים / הכי אהובים */}
              <div style={{
                display: 'inline-flex',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-delicate)',
                borderRadius: '16px',
                padding: '3px',
                height: '44px',
                boxSizing: 'border-box',
                flexShrink: 0
              }}>
                <button
                  type="button"
                  onClick={() => setSortBy('latest')}
                  title={t.sortLatest}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0 0.65rem',
                    borderRadius: '13px',
                    border: 'none',
                    backgroundColor: sortBy === 'latest' ? 'var(--primary-rose)' : 'transparent',
                    color: sortBy === 'latest' ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <Clock size={13} />
                  <span>{t.sortLatest}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSortBy('popular')}
                  title={t.sortPopular}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0 0.65rem',
                    borderRadius: '13px',
                    border: 'none',
                    backgroundColor: sortBy === 'popular' ? 'var(--primary-rose)' : 'transparent',
                    color: sortBy === 'popular' ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <Flame size={13} />
                  <span>{t.sortPopular}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          gap: '0.65rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '1.5rem',
          justifyContent: 'flex-start',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}>
          {categories.map((cat) => {
            const active = selectedCategory === cat.key;
            const theme = CATEGORY_THEMES[cat.key];
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1.15rem',
                  borderRadius: '25px',
                  border: active ? `2px solid ${theme.title}` : '1px solid var(--border-delicate)',
                  backgroundColor: active ? theme.title : 'var(--bg-card)',
                  color: active ? '#fff' : 'var(--text-dark)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  boxShadow: active ? '0 4px 12px rgba(100, 40, 70, 0.15)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Create Post Form */}
        {isCreatingPost && selectedCategory !== 'games' && (
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
                <option value="theories">{t.theories}</option>
                <option value="news">{t.news}</option>
                <option value="events">{t.events}</option>
                <option value="gallery">{t.gallery}</option>
              </select>

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

        {/* תצוגה מותנית: לובי משחקים או רשימת פוסטים ממוינת */}
        {selectedCategory === 'games' ? (
          <GamesHub lang={lang} />
        ) : (
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {processedPosts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '3.5rem 1rem',
                backgroundColor: 'var(--bg-card)',
                borderRadius: '20px',
                border: '2px dashed var(--border-delicate)',
                color: 'var(--text-muted)'
              }}>
                {searchQuery ? t.noSearchPosts : t.noPosts}
              </div>
            ) : (
              processedPosts.map((post) => {
                const canDelete = user && user.role === 'admin';
                const catTheme = CATEGORY_THEMES[post.category] || CATEGORY_THEMES.all;

                return (
                  <article
                    key={post.id}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-delicate)',
                      borderRadius: '20px',
                      padding: '1.85rem',
                      boxShadow: '0 4px 14px rgba(58, 46, 43, 0.04)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    {/* Post Header */}
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

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {canDelete && (
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            title={t.deletePost}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#C2185B',
                              cursor: 'pointer',
                              padding: '4px',
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
                      <p style={{
                        margin: '0 0 1.25rem 0',
                        color: 'var(--text-dark)',
                        opacity: 0.88,
                        fontSize: '0.98rem',
                        lineHeight: '1.7',
                        wordBreak: 'break-word',
                        padding: '0 0.15rem'
                      }}>
                        {post.content}
                      </p>
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
        )}
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