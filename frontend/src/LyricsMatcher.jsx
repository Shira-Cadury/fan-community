import React, { useState } from 'react';
import { Sparkles, RotateCcw, ArrowRight, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

const QUOTES_DATA = [
  {
    quote: '"Forever is the sweetest con"',
    song: 'Cowboy Like Me',
    correctAlbum: 'evermore',
    options: ['folklore', 'evermore', 'Midnights', 'Red']
  },
  {
    quote: '"You kept me like a secret, but I kept you like an oath"',
    song: 'All Too Well',
    correctAlbum: 'Red',
    options: ['Speak Now', 'Red', 'Fearless', '1989']
  },
  {
    quote: '"I was screaming long live all the magic we made"',
    song: 'Long Live',
    correctAlbum: 'Speak Now',
    options: ['Speak Now', 'Fearless', 'Debut', 'Red']
  },
  {
    quote: '"Meet me behind the mall"',
    song: 'august',
    correctAlbum: 'folklore',
    options: ['evermore', 'folklore', 'Lover', '1989']
  },
  {
    quote: '"I love you, ain\'t that the worst thing you ever heard?"',
    song: 'Cruel Summer',
    correctAlbum: 'Lover',
    options: ['1989', 'Reputation', 'Lover', 'Midnights']
  },
  {
    quote: '"Best believe I\'m still bejeweled, when I walk in the room"',
    song: 'Bejeweled',
    correctAlbum: 'Midnights',
    options: ['1989', 'Midnights', 'Reputation', 'TTPD']
  },
  {
    quote: '"You got that James Dean daydream look in your eye"',
    song: 'Style',
    correctAlbum: '1989',
    options: ['Red', '1989', 'Lover', 'Fearless']
  },
  {
    quote: '"I was a sleeper cell spy, in cold blood they shot me"',
    song: 'The Smallest Man Who Ever Lived',
    correctAlbum: 'TTPD',
    options: ['folklore', 'evermore', 'Midnights', 'TTPD']
  }
];

const ALBUM_STYLES = {
  Debut: { bg: '#EAF4EE', border: '#3F7D58', color: '#2B5A3E' },
  Fearless: { bg: '#FDF8EA', border: '#D4AF37', color: '#8F7118' },
  'Speak Now': { bg: '#F8EEF6', border: '#8A4B82', color: '#6A2A62' },
  Red: { bg: '#FCEAEA', border: '#A82020', color: '#881212' },
  1989: { bg: '#EBF5F7', border: '#5C9EAD', color: '#2A6876' },
  Reputation: { bg: '#EEEEEE', border: '#333333', color: '#111111' },
  Lover: { bg: '#FDEEF3', border: '#D97D9B', color: '#9E3558' },
  folklore: { bg: '#F2F4EB', border: '#656D4A', color: '#444B2E' },
  evermore: { bg: '#F6EFE9', border: '#A36843', color: '#734121' },
  Midnights: { bg: '#EBF0FC', border: '#2F3E75', color: '#1B2754' },
  TTPD: { bg: '#F3F2F1', border: '#6C655F', color: '#3E3935' }
};

export default function LyricsMatcher({ lang, onBack }) {
  const isHe = lang === 'he';
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const current = QUOTES_DATA[currentIdx];
  const BackIcon = isHe ? ArrowRight : ArrowLeft;

  const handleMatch = (album) => {
    if (selectedAlbum) return;
    setSelectedAlbum(album);

    const isCorrect = album === current.correctAlbum;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setScore((prev) => prev + 10);
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUOTES_DATA.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAlbum(null);
      setFeedback(null);
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedAlbum(null);
    setFeedback(null);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-delicate)',
        borderRadius: '24px',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        maxWidth: '550px',
        margin: '0 auto',
        boxShadow: '0 6px 20px rgba(58, 46, 43, 0.05)'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#EBF5F7',
          color: '#2A6876',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}>
          <Sparkles size={32} />
        </div>
        <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem', color: 'var(--text-dark)', fontFamily: '"Georgia", serif' }}>
          {isHe ? 'סיימת את התאמת הציטוטים!' : 'Lyrics Match Completed!'}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 1.5rem' }}>
          {isHe
            ? `צברת ${score} נקודות מתוך ${QUOTES_DATA.length * 10}!`
            : `You scored ${score} out of ${QUOTES_DATA.length * 10} points!`}
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={handleRestart}
            style={{
              padding: '0.65rem 1.35rem',
              borderRadius: '20px',
              backgroundColor: 'var(--primary-rose)',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <RotateCcw size={15} />
            {isHe ? 'שחקי שוב' : 'Play Again'}
          </button>
          <button
            onClick={onBack}
            style={{
              padding: '0.65rem 1.35rem',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-creamy)',
              border: '1px solid var(--border-delicate)',
              color: 'var(--text-dark)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {isHe ? 'חזרה ללובי' : 'Back to Hub'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          <BackIcon size={16} />
          {isHe ? 'חזרה למשחקים' : 'Back to Games'}
        </button>
      </div>

      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-delicate)',
        borderRadius: '24px',
        padding: '1.75rem',
        boxShadow: '0 6px 20px rgba(58, 46, 43, 0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--secondary-sage-dark)' }}>
            {isHe ? `ציטוט ${currentIdx + 1}/${QUOTES_DATA.length}` : `Quote ${currentIdx + 1}/${QUOTES_DATA.length}`}
          </span>
          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-dark)' }}>
            {isHe ? `ניקוד: ${score}` : `Score: ${score}`}
          </span>
        </div>

        {/* כרטיסיית המשפט (Quote Card) */}
        <div
          draggable={!selectedAlbum}
          onDragStart={(e) => e.dataTransfer.setData('text/plain', 'quote-dragged')}
          style={{
            backgroundColor: '#FAF5FC',
            border: '2px dashed #D4BEE4',
            borderRadius: '20px',
            padding: '2rem 1.25rem',
            textAlign: 'center',
            marginBottom: '1.75rem',
            cursor: selectedAlbum ? 'default' : 'grab'
          }}
        >
          <p style={{
            fontSize: '1.35rem',
            margin: '0 0 0.5rem',
            color: '#4D2463',
            fontFamily: '"Georgia", serif',
            fontStyle: 'italic',
            lineHeight: '1.4'
          }}>
            {current.quote}
          </p>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {isHe ? '💡 גררי את המשפט לאלבום הנכון, או לחצי על האלבום' : '💡 Drag to the album or simply click it'}
          </span>
        </div>

        {/* אפשרויות האלבומים */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.85rem',
          marginBottom: '1.5rem'
        }}>
          {current.options.map((album) => {
            const theme = ALBUM_STYLES[album] || { bg: '#fff', border: '#ddd', color: '#333' };
            const isTarget = selectedAlbum === album;
            const isCorrectTarget = isTarget && album === current.correctAlbum;
            const isWrongTarget = isTarget && album !== current.correctAlbum;

            return (
              <div
                key={album}
                onClick={() => handleMatch(album)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleMatch(album);
                }}
                style={{
                  backgroundColor: isCorrectTarget ? '#E8F5E9' : isWrongTarget ? '#FFEBEE' : theme.bg,
                  border: `2px solid ${isCorrectTarget ? '#4CAF50' : isWrongTarget ? '#EF5350' : theme.border}`,
                  borderRadius: '16px',
                  padding: '1.25rem 0.75rem',
                  textAlign: 'center',
                  cursor: selectedAlbum ? 'default' : 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: isCorrectTarget ? '#2E7D32' : isWrongTarget ? '#C62828' : theme.color,
                  marginBottom: '0.35rem'
                }}>
                  {album}
                </div>
                {isCorrectTarget && <CheckCircle2 size={18} color="#2E7D32" style={{ margin: '0 auto' }} />}
                {isWrongTarget && <XCircle size={18} color="#C62828" style={{ margin: '0 auto' }} />}
              </div>
            );
          })}
        </div>

        {/* משוב וכפתור מעבר */}
        {feedback && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-delicate)',
            paddingTop: '1rem'
          }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
              {feedback === 'correct' ? (
                <span style={{ color: '#2E7D32' }}>
                  {isHe ? `בול! השיר הוא "${current.song}" מתוך ${current.correctAlbum} ✨` : `Exact! From "${current.song}" on ${current.correctAlbum} ✨`}
                </span>
              ) : (
                <span style={{ color: '#C62828' }}>
                  {isHe ? `לא הפעם... הציטוט מתוך "${current.song}" באלבום ${current.correctAlbum}.` : `Not quite... It's from "${current.song}" on ${current.correctAlbum}.`}
                </span>
              )}
            </div>

            <button
              onClick={handleNext}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '16px',
                backgroundColor: 'var(--primary-rose)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              {currentIdx + 1 < QUOTES_DATA.length ? (isHe ? 'לציטוט הבא ➔' : 'Next Quote ➔') : (isHe ? 'לסיום 🏆' : 'Finish 🏆')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}