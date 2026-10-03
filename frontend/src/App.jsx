import React, { useState, useEffect } from 'react';
import API from './api';
import Navbar from './Navbar';
import AuthModal from './AuthModal';
import AdminModal from './AdminModal';
import GamesHub from './GamesHub';
import AdminFeedbackBoard from './AdminFeedbackBoard';
import PostCard from './PostCard';
import CommentsSection from './CommentsSection';
import { 
  Heart, Sparkles, Image as ImageIcon, Video,
  X, Music, ExternalLink, Search, Clock, Flame, Edit3, Trash2, Loader2, Star, MessageCircle
} from 'lucide-react';

const CLOUDINARY_CLOUD_NAME = 'gvdwsxay';
const CLOUDINARY_UPLOAD_PRESET = 'swift-preset';

const isVideoUrl = (url) => {
  if (!url) return false;
  return Boolean(url.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) || url.includes('/video/upload/'));
};

const DEFAULT_DAILY_SONG = {
  title: "Enchanted (Taylor's Version)",
  album: 'Speak Now',
  explanation: 'שיר אגדי שלוכד את רגע ההתאהבות הראשוני והתקווה שהצד השני מרגיש בדיוק אותו דבר. בחרנו בו היום בגלל הליריקה הקסומה וההפקה הנוסטלגית!',
  link: 'https://open.spotify.com/search/Enchanted%20Taylor%27s%20Version',
  image_url: ''
};

const TRANSLATIONS = {
  en: {
    tagline: 'Fan Community & Safe Haven',
    signIn: 'Sign In',
    newPost: 'New Post',
    bannerTitle: 'Welcome to Swift Secrets',
    bannerSub: 'A gentle place for community theories, art, lyrical breakdowns, and shared tales.',
    dailySongLabel: 'Song of the Day',
    listenNow: 'Listen',
    viewExplanation: 'Read Story',
    editDailySong: 'Edit Song of the Day',
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
    titlePlaceholder: 'Post title (optional)...',
    contentPlaceholder: 'Write your story or thoughts (optional)...',
    chooseImage: 'Upload Image / Video',
    uploadingMedia: 'Uploading file...',
    orEnterUrl: 'Or paste image/video link...',
    removeImage: 'Remove media',
    exclusiveBtnOff: 'Standard Post',
    exclusiveBtnOn: '✨ Mark as Site Exclusive',
    exclusiveBadge: 'Site Exclusive',
    cancel: 'Cancel',
    publish: 'Publish',
    save: 'Save',
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
    bannerTitle: 'ברוכים הבאים ל Swift Secrets',
    bannerSub: 'מקום עדין ושקט לתאוריות, יצירות, ניתוחי שירים ושיחות קהילה.',
    dailySongLabel: 'השיר היומי',
    listenNow: 'האזנה',
    viewExplanation: 'לסיפור מאחורי השיר',
    editDailySong: 'עריכת השיר היומי',
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
    titlePlaceholder: 'כותרת הפוסט (אופציונלי)...',
    contentPlaceholder: 'כתבי את המחשבות שלך (אופציונלי)...',
    chooseImage: 'העלאת תמונה או סרטון',
    uploadingMedia: 'מעלה קובץ...',
    orEnterUrl: 'או הדבקת קישור...',
    removeImage: 'הסרת מדיה',
    exclusiveBtnOff: 'פוסט רגיל',
    exclusiveBtnOn: '✨ סמני כבלעדי לאתר',
    exclusiveBadge: 'בלעדי לאתר',
    cancel: 'ביטול',
    publish: 'פרסום',
    save: 'שמירה',
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
  const [isFeedbackBoardOpen, setIsFeedbackBoardOpen] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [isExclusive, setIsExclusive] = useState(false);
  const [selectedImageModalPost, setSelectedImageModalPost] = useState(null);
  const [isModalLikeAnimating, setIsModalLikeAnimating] = useState(false);

  const [dailySong, setDailySong] = useState(() => {
    const saved = localStorage.getItem('swift_daily_song');
    return saved ? JSON.parse(saved) : DEFAULT_DAILY_SONG;
  });
  const [isDailySongModalOpen, setIsDailySongModalOpen] = useState(false);
  const [isEditSongModalOpen, setIsEditSongModalOpen] = useState(false);

  const [songTitle, setSongTitle] = useState(dailySong.title);
  const [songAlbum, setSongAlbum] = useState(dailySong.album);
  const [songExplanation, setSongExplanation] = useState(dailySong.explanation || '');
  const [songLink, setSongLink] = useState(dailySong.link || '');
  const [songImageUrl, setSongImageUrl] = useState(dailySong.image_url || '');

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('discussions');
  const [postImageUrl, setPostImageUrl] = useState('');

  const isAdmin = user && (user.role === 'admin' || user.username?.toLowerCase() === 'shira');
  const currentTheme = CATEGORY_THEMES[selectedCategory] || CATEGORY_THEMES.all;

  const categories = [
    { key: 'all', label: t.allTopics, icon: '✨' },
    { key: 'discussions', label: t.discussions, icon: '💭' },
    { key: 'theories', label: t.theories, icon: '🔍' },
    { key: 'news', label: t.news, icon: '📰' },
    { key: 'events', label: t.events, icon: '📅' },
    { key: 'gallery', label: t.gallery, icon: '🎨' },
    { key: 'games', label: t.games, icon: '🎮' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      API.get('/auth/me')
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem('token'));
    }

    API.get('/daily-song')
      .then((res) => {
        if (res.data) {
          setDailySong(res.data);
          localStorage.setItem('swift_daily_song', JSON.stringify(res.data));
        }
      })
      .catch(() => {});
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

  const handleMediaUploadToCloudinary = async (e, setTargetUrl) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert(lang === 'he' ? 'גודל הקובץ מוגבל לעד 50MB' : 'File size is limited to 50MB');
      return;
    }

    setIsUploadingMedia(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await res.json();
      setTargetUrl(data.secure_url);
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      alert(lang === 'he' ? `שגיאה בהעלאה: ${err.message}` : `Upload error: ${err.message}`);
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const handleSaveDailySong = async (e) => {
    e.preventDefault();
    const updated = {
      title: songTitle.trim(),
      album: songAlbum.trim(),
      explanation: songExplanation.trim(),
      link: songLink.trim() || null,
      image_url: songImageUrl.trim() || null
    };

    setDailySong(updated);
    localStorage.setItem('swift_daily_song', JSON.stringify(updated));
    setIsEditSongModalOpen(false);

    try {
      await API.post('/daily-song', updated);
    } catch (err) {
      console.log('Saved to browser storage.');
    }
  };

  const isVisualCategory = postCategory === 'gallery' || postCategory === 'theories';

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (isVisualCategory && !postImageUrl.trim() && !postTitle.trim() && !postContent.trim()) {
      alert(lang === 'he' ? 'יש לבחור תמונה, סרטון או להזין תוכן' : 'Please upload media or enter content');
      return;
    }

    const defaultTitle = postCategory === 'theories'
      ? (lang === 'he' ? 'תיאוריה וניתוח' : 'Theory & Analysis')
      : (lang === 'he' ? 'יצירה מהגלריה' : 'Gallery Tale');

    let finalTitle = postTitle.trim() || (isVisualCategory ? defaultTitle : 'Untitled');
    if (isExclusive) {
      finalTitle = `[EXCLUSIVE_POST] ${finalTitle}`;
    }

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
      setIsExclusive(false);
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
      if (selectedImageModalPost && selectedImageModalPost.id === postId) {
        setSelectedImageModalPost(null);
      }
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
      if (selectedImageModalPost && selectedImageModalPost.id === postId) {
        setSelectedImageModalPost((prev) => ({
          ...prev,
          likes_count: res.data.likes_count,
          is_liked: res.data.liked
        }));
      }
    } catch (err) {
      console.error('Failed to toggle like', err);
      fetchPosts();
    }
  };

  const handleModalLikeClick = (postId) => {
    setIsModalLikeAnimating(true);
    setTimeout(() => setIsModalLikeAnimating(false), 300);
    handleToggleLike(postId);
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
      return (b.id || 0) - (a.id || 0);
    });

  const isGridCategory = selectedCategory === 'gallery' || selectedCategory === 'theories';

  const checkIsExclusive = (post) => {
    return Boolean(post?.title && post.title.includes('[EXCLUSIVE_POST]'));
  };

  const cleanDisplayTitle = (title) => {
    if (!title) return '';
    return title.replace(/\[EXCLUSIVE_POST\]\s*/g, '').trim() || (lang === 'he' ? 'ללא כותרת' : 'Untitled');
  };

  return (
    <div dir={lang === 'he' ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenNewPost={() => {
          setIsCreatingPost(true);
          setIsExclusive(false);
          if (selectedCategory !== 'all' && selectedCategory !== 'games') {
            setPostCategory(selectedCategory);
          } else {
            setPostCategory('discussions');
          }
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenFeedbackBoard={() => setIsFeedbackBoardOpen(true)}
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

        {/* שורת שיר יומי וחיפוש */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '1.25rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
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
            <div 
              onClick={() => setIsDailySongModalOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden', cursor: 'pointer', flex: 1 }}
              title={lang === 'he' ? 'לחצי לקריאת ההסבר על השיר' : 'Click to read story'}
            >
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
                <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{dailySong.title}</span>
                <span style={{ color: 'var(--secondary-sage)', marginInlineStart: '0.35rem', fontSize: '0.76rem' }}>
                  ({dailySong.album})
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
              {dailySong.link && (
                <a
                  href={dailySong.link}
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
                    textDecoration: 'none'
                  }}
                >
                  {t.listenNow}
                  <ExternalLink size={11} />
                </a>
              )}

              {isAdmin && (
                <button
                  onClick={() => {
                    setSongTitle(dailySong.title);
                    setSongAlbum(dailySong.album);
                    setSongExplanation(dailySong.explanation || '');
                    setSongLink(dailySong.link || '');
                    setSongImageUrl(dailySong.image_url || '');
                    setIsEditSongModalOpen(true);
                  }}
                  title={t.editDailySong}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '3px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Edit3 size={14} />
                </button>
              )}
            </div>
          </div>

          {selectedCategory !== 'games' && (
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flex: '1 1 320px',
              alignItems: 'center'
            }}>
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

        {/* שורת קטגוריות */}
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
            const theme = CATEGORY_THEMES[cat.key] || CATEGORY_THEMES.all;
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

        {/* טופס פוסט חדש */}
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
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <select
                  value={postCategory}
                  onChange={(e) => setPostCategory(e.target.value)}
                  style={{
                    padding: '0.6rem 0.85rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-delicate)',
                    backgroundColor: 'var(--bg-creamy)',
                    fontSize: '0.9rem',
                    flex: '1 1 180px'
                  }}
                >
                  <option value="discussions">{t.discussions}</option>
                  <option value="theories">{t.theories}</option>
                  <option value="news">{t.news}</option>
                  <option value="events">{t.events}</option>
                  <option value="gallery">{t.gallery}</option>
                </select>

                <button
                  type="button"
                  onClick={() => setIsExclusive(!isExclusive)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.55rem 0.95rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    border: isExclusive ? '1.5px solid #8A2BE2' : '1px solid var(--border-delicate)',
                    backgroundColor: isExclusive ? '#F3E5F5' : 'var(--bg-creamy)',
                    color: isExclusive ? '#6A1B9A' : 'var(--text-muted)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Star size={15} fill={isExclusive ? '#8A2BE2' : 'none'} color={isExclusive ? '#8A2BE2' : 'var(--text-muted)'} />
                  <span>{isExclusive ? t.exclusiveBtnOn : t.exclusiveBtnOff}</span>
                </button>
              </div>

              <input
                type="text"
                placeholder={t.titlePlaceholder}
                required={!isVisualCategory}
                minLength={!isVisualCategory ? 3 : 0}
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
                    cursor: isUploadingMedia ? 'not-allowed' : 'pointer',
                    opacity: isUploadingMedia ? 0.7 : 1
                  }}>
                    {isUploadingMedia ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                    {isUploadingMedia ? t.uploadingMedia : t.chooseImage}
                    <input
                      type="file"
                      accept="image/*,video/*"
                      disabled={isUploadingMedia}
                      onChange={(e) => handleMediaUploadToCloudinary(e, setPostImageUrl)}
                      style={{ display: 'none' }}
                    />
                  </label>

                  <input
                    type="url"
                    placeholder={t.orEnterUrl}
                    value={postImageUrl}
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
                    maxHeight: '260px',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#111'
                  }}>
                    {isVideoUrl(postImageUrl) ? (
                      <video
                        src={postImageUrl}
                        controls
                        playsInline
                        style={{ maxHeight: '260px', maxWidth: '100%' }}
                      />
                    ) : (
                      <img
                        src={postImageUrl}
                        alt="Preview"
                        style={{ maxHeight: '260px', objectFit: 'contain' }}
                      />
                    )}
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
                        cursor: 'pointer',
                        zIndex: 5
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <textarea
                placeholder={t.contentPlaceholder}
                required={!isVisualCategory && !postImageUrl}
                rows={isVisualCategory ? 2 : 4}
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
                    setIsExclusive(false);
                  }}
                  style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isUploadingMedia}
                  style={{
                    padding: '0.5rem 1.35rem',
                    borderRadius: '18px',
                    backgroundColor: 'var(--primary-rose)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 600,
                    cursor: isUploadingMedia ? 'not-allowed' : 'pointer',
                    opacity: isUploadingMedia ? 0.7 : 1
                  }}
                >
                  {t.publish}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* תוכן ראשי: משחקים / גלריה או תיאוריות (גריד) / כל השאר (פוסטים רגילים) */}
        {selectedCategory === 'games' ? (
          <GamesHub lang={lang} />
        ) : isGridCategory ? (
          <div>
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
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
                gap: '4px'
              }}>
                {processedPosts.map((post) => {
                  const postExclusive = checkIsExclusive(post);
                  return (
                    <div
                      key={post.id}
                      onClick={() => setSelectedImageModalPost(post)}
                      style={{
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        aspectRatio: '1 / 1',
                        backgroundColor: 'var(--bg-subtle)',
                        border: postExclusive ? '1.5px solid #AB47BC' : '1px solid var(--border-delicate)',
                        cursor: 'pointer',
                        boxShadow: postExclusive ? '0 2px 8px rgba(171, 71, 188, 0.25)' : '0 1px 4px rgba(0,0,0,0.03)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)';
                        e.currentTarget.style.boxShadow = '0 4px 10px rgba(216, 112, 147, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = postExclusive ? '0 2px 8px rgba(171, 71, 188, 0.25)' : '0 1px 4px rgba(0,0,0,0.03)';
                      }}
                    >
                      {postExclusive && (
                        <div style={{
                          position: 'absolute',
                          top: '3px',
                          [lang === 'he' ? 'right' : 'left']: '3px',
                          backgroundColor: 'rgba(123, 31, 162, 0.88)',
                          color: '#FFD700',
                          fontSize: '0.52rem',
                          fontWeight: 800,
                          padding: '1px 4px',
                          borderRadius: '4px',
                          zIndex: 2,
                          backdropFilter: 'blur(2px)',
                          letterSpacing: '0.2px'
                        }}>
                          ★ {t.exclusiveBadge}
                        </div>
                      )}

                      {post.image_url ? (
                        isVideoUrl(post.image_url) ? (
                          <video
                            src={post.image_url}
                            muted
                            preload="metadata"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <img
                            src={post.image_url}
                            alt={cleanDisplayTitle(post.title)}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        )
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0.25rem',
                          textAlign: 'center',
                          color: 'var(--text-muted)',
                          fontSize: '0.65rem'
                        }}>
                          {cleanDisplayTitle(post.title)}
                        </div>
                      )}

                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)',
                        padding: '0.2rem 0.35rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: '#fff',
                        fontSize: '0.65rem'
                      }}>
                        <span style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '65%' }}>
                          {cleanDisplayTitle(post.title)}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.62rem' }}>
                          <Heart
                            size={9}
                            fill={post.is_liked ? '#fff' : 'none'}
                            color="#fff"
                          />
                          {post.likes_count || 0}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
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
              processedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={{
                    ...post,
                    title: cleanDisplayTitle(post.title),
                    isExclusive: checkIsExclusive(post)
                  }}
                  user={user}
                  isAdmin={isAdmin}
                  lang={lang}
                  t={t}
                  catTheme={CATEGORY_THEMES[post.category] || CATEGORY_THEMES.all}
                  onToggleLike={handleToggleLike}
                  onDeletePost={handleDeletePost}
                  onReportPost={handleReportPost}
                  onRequireAuth={() => setIsAuthOpen(true)}
                />
              ))
            )}
          </section>
        )}
      </main>

      {/* פופאפ מודל: לוח משימות ובקשות */}
      {isFeedbackBoardOpen && isAdmin && (
        <div
          onClick={() => setIsFeedbackBoardOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.75rem',
              boxShadow: '0 12px 36px rgba(0,0,0,0.2)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-dark)', fontFamily: '"Georgia", serif' }}>
                {lang === 'he' ? 'לוח משימות ובקשות' : 'Tasks & Requests Board'}
              </h3>
              <button
                onClick={() => setIsFeedbackBoardOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <AdminFeedbackBoard user={user} lang={lang} />
          </div>
        </div>
      )}

      {/* חלון סיפור השיר היומי */}
      {isDailySongModalOpen && (
        <div
          onClick={() => setIsDailySongModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '24px',
              maxWidth: '520px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
              position: 'relative',
              textAlign: 'center'
            }}
          >
            <button
              onClick={() => setIsDailySongModalOpen(false)}
              style={{
                position: 'absolute',
                top: '14px',
                [lang === 'he' ? 'left' : 'right']: '14px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            {dailySong.image_url ? (
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '16px',
                overflow: 'hidden',
                margin: '0 auto 1.25rem',
                border: '1.5px solid var(--border-delicate)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
              }}>
                <img
                  src={dailySong.image_url}
                  alt={dailySong.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ) : (
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--primary-rose-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}>
                <Music size={26} />
              </div>
            )}

            <span style={{
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: 'var(--secondary-sage-dark)',
              letterSpacing: '0.5px'
            }}>
              {t.dailySongLabel} • {dailySong.album}
            </span>

            <h3 style={{
              margin: '0.35rem 0 1rem',
              fontSize: '1.5rem',
              color: 'var(--text-dark)',
              fontFamily: '"Georgia", serif'
            }}>
              {dailySong.title}
            </h3>

            {dailySong.explanation && (
              <div style={{
                backgroundColor: 'var(--bg-creamy)',
                border: '1px solid var(--border-delicate)',
                borderRadius: '16px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                textAlign: lang === 'he' ? 'right' : 'left',
                fontSize: '0.92rem',
                lineHeight: '1.65',
                color: 'var(--text-dark)',
                opacity: 0.9
              }}>
                {dailySong.explanation}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              {dailySong.link && (
                <a
                  href={dailySong.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.65rem 1.4rem',
                    borderRadius: '20px',
                    backgroundColor: 'var(--primary-rose)',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.88rem'
                  }}
                >
                  {t.listenNow}
                  <ExternalLink size={14} />
                </a>
              )}
              <button
                onClick={() => setIsDailySongModalOpen(false)}
                style={{
                  padding: '0.65rem 1.2rem',
                  borderRadius: '20px',
                  backgroundColor: 'var(--bg-creamy)',
                  border: '1px solid var(--border-delicate)',
                  color: 'var(--text-dark)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* חלון עריכת שיר יומי */}
      {isEditSongModalOpen && (
        <div
          onClick={() => setIsEditSongModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
          }}
        >
          <form
            onSubmit={handleSaveDailySong}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '24px',
              maxWidth: '520px',
              width: '100%',
              padding: '1.75rem',
              boxShadow: '0 12px 36px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <h3 style={{ margin: 0, color: 'var(--primary-rose-dark)', fontSize: '1.25rem', fontFamily: '"Georgia", serif' }}>
                {t.editDailySong}
              </h3>
              <button
                type="button"
                onClick={() => setIsEditSongModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                {lang === 'he' ? 'שם השיר' : 'Song Title'}
              </label>
              <input
                type="text"
                required
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-delicate)',
                  backgroundColor: 'var(--bg-creamy)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  marginTop: '0.25rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                {lang === 'he' ? 'אלבום / Era' : 'Album / Era'}
              </label>
              <input
                type="text"
                required
                value={songAlbum}
                onChange={(e) => setSongAlbum(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-delicate)',
                  backgroundColor: 'var(--bg-creamy)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  marginTop: '0.25rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                {lang === 'he' ? 'הסבר / ניתוח על השיר של היום' : 'Explanation & Thoughts'}
              </label>
              <textarea
                rows={3}
                value={songExplanation}
                onChange={(e) => setSongExplanation(e.target.value)}
                placeholder={lang === 'he' ? 'למה בחרתן את השיר הזה? מה המשמעות שלו...' : 'Why did you pick this song?'}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-delicate)',
                  backgroundColor: 'var(--bg-creamy)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  marginTop: '0.25rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                {lang === 'he' ? 'קישור להאזנה (אופציונלי)' : 'Listen Link (Optional)'}
              </label>
              <input
                type="url"
                value={songLink}
                onChange={(e) => setSongLink(e.target.value)}
                placeholder="https://..."
                style={{
                  width: '100%',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-delicate)',
                  backgroundColor: 'var(--bg-creamy)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  marginTop: '0.25rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                {lang === 'he' ? 'תמונה של השיר/האלבום (אופציונלי)' : 'Song/Album Image (Optional)'}
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                <label style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px dashed var(--secondary-sage)',
                  color: 'var(--secondary-sage-dark)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: isUploadingMedia ? 'not-allowed' : 'pointer'
                }}>
                  <ImageIcon size={15} />
                  {t.chooseImage}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isUploadingMedia}
                    onChange={(e) => handleMediaUploadToCloudinary(e, setSongImageUrl)}
                    style={{ display: 'none' }}
                  />
                </label>

                <input
                  type="url"
                  placeholder={t.orEnterUrl}
                  value={songImageUrl}
                  onChange={(e) => setSongImageUrl(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: '180px',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-delicate)',
                    backgroundColor: 'var(--bg-creamy)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              {songImageUrl && (
                <div style={{
                  position: 'relative',
                  marginTop: '0.5rem',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  width: '70px',
                  height: '70px',
                  border: '1px solid var(--border-delicate)'
                }}>
                  <img src={songImageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => setSongImageUrl('')}
                    style={{
                      position: 'absolute',
                      top: '3px',
                      right: '3px',
                      background: 'rgba(0,0,0,0.6)',
                      border: 'none',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setIsEditSongModalOpen(false)}
                style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={isUploadingMedia}
                style={{
                  padding: '0.5rem 1.35rem',
                  borderRadius: '16px',
                  backgroundColor: 'var(--primary-rose)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600,
                  cursor: isUploadingMedia ? 'not-allowed' : 'pointer'
                }}
              >
                {t.save}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* חלון הגדלת תמונה/סרטון במודאל כולל תגובות מלאות */}
      {selectedImageModalPost && (
        <div
          onClick={() => setSelectedImageModalPost(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '24px',
              maxWidth: '580px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <button
              onClick={() => setSelectedImageModalPost(null)}
              style={{
                position: 'absolute',
                top: '12px',
                [lang === 'he' ? 'left' : 'right']: '12px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={18} />
            </button>

            {selectedImageModalPost.image_url && (
              <div style={{ backgroundColor: '#000', display: 'flex', justifyContent: 'center', borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
                {isVideoUrl(selectedImageModalPost.image_url) ? (
                  <video
                    src={selectedImageModalPost.image_url}
                    controls
                    autoPlay
                    playsInline
                    style={{ maxWidth: '100%', maxHeight: '55vh', objectFit: 'contain' }}
                  />
                ) : (
                  <img
                    src={selectedImageModalPost.image_url}
                    alt={cleanDisplayTitle(selectedImageModalPost.title)}
                    style={{ maxWidth: '100%', maxHeight: '55vh', objectFit: 'contain' }}
                  />
                )}
              </div>
            )}

            <div style={{ padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-dark)', fontFamily: '"Georgia", serif' }}>
                    {cleanDisplayTitle(selectedImageModalPost.title)}
                  </h3>
                  {checkIsExclusive(selectedImageModalPost) && (
                    <span style={{
                      backgroundColor: '#F3E5F5',
                      color: '#6A1B9A',
                      border: '1px solid #CE93D8',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      ★ {t.exclusiveBadge}
                    </span>
                  )}
                </div>

                {isAdmin && (
                  <button
                    onClick={() => handleDeletePost(selectedImageModalPost.id)}
                    style={{ background: 'none', border: 'none', color: '#C2185B', cursor: 'pointer', padding: '4px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {selectedImageModalPost.content && (
                <p style={{ margin: '0 0 1rem 0', color: 'var(--text-dark)', opacity: 0.88, fontSize: '0.92rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                  {selectedImageModalPost.content}
                </p>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-delicate)', paddingTop: '0.75rem', marginBottom: '1rem' }}>
                <button
                  onClick={() => handleModalLikeClick(selectedImageModalPost.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: 'none',
                    border: 'none',
                    color: selectedImageModalPost.is_liked ? 'var(--primary-rose)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: isModalLikeAnimating ? 'scale(1.35)' : 'scale(1)',
                    transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}>
                    <Heart
                      size={17}
                      fill={selectedImageModalPost.is_liked ? 'var(--primary-rose)' : 'none'}
                      color={selectedImageModalPost.is_liked ? 'var(--primary-rose)' : 'var(--text-muted)'}
                    />
                  </span>
                  {selectedImageModalPost.likes_count || 0} {t.likes}
                </button>

                <button
                  onClick={() => handleReportPost(selectedImageModalPost.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {t.report}
                </button>
              </div>

              {/* אזור התגובות המובנה בתוך המודאל */}
              <div style={{ borderTop: '1px dashed var(--border-delicate)', paddingTop: '1rem' }}>
                <CommentsSection
                  postId={selectedImageModalPost.id}
                  user={user}
                  onRequireAuth={() => setIsAuthOpen(true)}
                  t={t}
                />
              </div>
            </div>
          </div>
        </div>
      )}

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