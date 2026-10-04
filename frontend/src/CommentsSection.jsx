import React, { useState, useEffect } from 'react';
import API from './api';
import { Send, CornerDownRight, Trash2, Flag, ShieldCheck, Loader2 } from 'lucide-react';

export default function CommentsSection({ postId, user, onRequireAuth, t, onCommentsCountUpdate }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // סטייט חדש לניהול מצב טעינה
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const res = await API.get(`/posts/${postId}/comments`);
      setComments(res.data);
      // מעדכן את האב בכמות התגובות הנוכחית
      if (onCommentsCountUpdate) {
        onCommentsCountUpdate(res.data.length);
      }
    } catch (err) {
      console.error('Failed to load comments', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleAddComment = async (parentId = null, content = '') => {
    if (!user) {
      onRequireAuth();
      return;
    }
    if (!content.trim()) return;

    try {
      await API.post(`/posts/${postId}/comments`, {
        content: content.trim(),
        parent_id: parentId,
      });
      if (parentId) {
        setReplyingTo(null);
        setReplyText('');
      } else {
        setNewCommentText('');
      }
      loadComments();
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to submit comment');
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await API.delete(`/posts/${postId}/comments/${commentId}`);
      loadComments();
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to delete comment');
    }
  };

  const handleReportComment = async (commentId) => {
    if (!user) {
      onRequireAuth();
      return;
    }
    const reason = window.prompt(t ? t.reportPromptComment : 'Please provide a reason for reporting this comment:');
    if (!reason) return;

    try {
      await API.post('/reports', { comment_id: commentId, reason });
      alert(t ? t.reportSuccess : 'Report submitted successfully.');
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to submit report');
    }
  };

  return (
    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed var(--border-delicate)' }}>
      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem', color: 'var(--text-muted)' }}>
            <Loader2 size={20} className="animate-spin" />
          </div>
        ) : comments.length === 0 ? (
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {t ? t.noCommentsYet : 'No replies yet. Start the conversation!'}
          </p>
        ) : (
          comments.map((c) => {
            const commentDepth = c.depth || 0;
            const isCommentAdmin = c.author?.role === 'admin';

            return (
              <div
                key={c.id}
                style={{
                  marginInlineStart: `${commentDepth * 1.5}rem`,
                  backgroundColor: commentDepth > 0 ? 'var(--bg-subtle)' : 'var(--bg-creamy)',
                  border: '1px solid var(--border-delicate)',
                  borderRadius: '12px',
                  padding: '0.65rem 0.85rem',
                  fontSize: '0.88rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--primary-rose-dark)', fontSize: '0.82rem' }}>
                      @{c.author?.username || 'member'}
                    </span>

                    {/* תגית Admin מעוצבת למנהלות */}
                    {isCommentAdmin && (
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.2rem',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        backgroundColor: '#EDE7F6',
                        color: '#4A148C',
                        border: '1px solid #D1C4E9',
                        padding: '0.12rem 0.45rem',
                        borderRadius: '10px',
                        letterSpacing: '0.3px',
                      }}>
                        <ShieldCheck size={11} />
                        Admin
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                    {/* כפתור תגובה */}
                    {commentDepth < 3 && user && (
                      <button
                        onClick={() => {
                          setReplyingTo(replyingTo === c.id ? null : c.id);
                          setReplyText('');
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--secondary-sage)',
                          cursor: 'pointer',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                        }}
                      >
                        <CornerDownRight size={13} />
                        {t ? t.reply : 'Reply'}
                      </button>
                    )}

                    {/* דיווח על תגובה */}
                    <button
                      onClick={() => handleReportComment(c.id)}
                      title={t ? t.reportComment : 'Report comment'}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        padding: 0
                      }}
                    >
                      <Flag size={12} />
                    </button>

                    {/* מחיקת תגובה - מוגבלת למנהלים בלבד */}
                    {user && user.role === 'admin' && !c.is_deleted && (
                      <button
                        onClick={() => handleDelete(c.id)}
                        title="Delete"
                        style={{ background: 'none', border: 'none', color: '#B85073', cursor: 'pointer', padding: 0 }}
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>

                <p style={{ margin: 0, color: c.is_deleted ? 'var(--text-muted)' : 'var(--text-dark)', fontStyle: c.is_deleted ? 'italic' : 'normal' }}>
                  {c.content}
                </p>

                {/* תיבת מענה לתגובה ספציפית */}
                {replyingTo === c.id && (
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.4rem' }}>
                    <input
                      type="text"
                      autoFocus
                      placeholder={t ? t.replyPlaceholder : "Write a reply..."}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(c.id, replyText);
                      }}
                      style={{
                        flex: 1,
                        padding: '0.4rem 0.6rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-delicate)',
                        backgroundColor: '#fff',
                        fontSize: '0.82rem',
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(c.id, replyText)}
                      disabled={!replyText.trim()}
                      style={{
                        backgroundColor: 'var(--secondary-sage)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '0.4rem 0.75rem',
                        cursor: replyText.trim() ? 'pointer' : 'default',
                        opacity: replyText.trim() ? 1 : 0.6,
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      {t ? t.sendReply : 'Send'}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Main Comment Input */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder={user ? (t ? t.commentPlaceholder : "Write a comment...") : (t ? t.signInToComment : "Sign in to comment")}
          disabled={!user}
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddComment(null, newCommentText);
          }}
          style={{
            flex: 1,
            padding: '0.55rem 0.8rem',
            borderRadius: '12px',
            border: '1px solid var(--border-delicate)',
            backgroundColor: 'var(--bg-card)',
            fontSize: '0.88rem',
          }}
        />
        <button
          onClick={() => handleAddComment(null, newCommentText)}
          disabled={!user || !newCommentText.trim()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            backgroundColor: 'var(--primary-rose)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '0.55rem 1rem',
            cursor: user && newCommentText.trim() ? 'pointer' : 'default',
            opacity: user && newCommentText.trim() ? 1 : 0.6,
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          <Send size={14} />
          {t ? t.postComment : 'Post'}
        </button>
      </div>
    </div>
  );
}