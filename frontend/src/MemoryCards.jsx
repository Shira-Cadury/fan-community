import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, ArrowRight, ArrowLeft, Trophy } from 'lucide-react';

const CARD_SYMBOLS = [
  { id: 'scarf', emoji: '🧣', name: { he: 'הצעיף האדום', en: 'Red Scarf' } },
  { id: 'mirrorball', emoji: '🪩', name: { he: 'כדור דיסקו', en: 'Mirrorball' } },
  { id: 'snake', emoji: '🐍', name: { he: 'הנחש', en: 'The Snake' } },
  { id: 'cardigan', emoji: '🧶', name: { he: 'קרדיגן', en: 'Cardigan' } },
  { id: 'guitar', emoji: '🎸', name: { he: 'הגיטרה האקוסטית', en: 'Guitar' } },
  { id: 'bracelet', emoji: '💖', name: { he: 'צמיד חברות', en: 'Friendship Bracelet' } },
  { id: 'champagne', emoji: '🥂', name: { he: 'שמפניה', en: 'Champagne Problems' } },
  { id: 'quill', emoji: '🪶', name: { he: 'נוצת שיר', en: 'Quill Pen' } }
];

export default function MemoryCards({ lang, onBack }) {
  const isHe = lang === 'he';
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return localStorage.getItem('swift_memory_best') ? Number(localStorage.getItem('swift_memory_best')) : null;
  });

  const BackIcon = isHe ? ArrowRight : ArrowLeft;

  const initGame = () => {
    const paired = [...CARD_SYMBOLS, ...CARD_SYMBOLS].map((item, idx) => ({
      ...item,
      uniqueId: idx
    }));
    // Shuffle
    const shuffled = paired.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (uniqueId) => {
    if (flipped.length === 2 || flipped.includes(uniqueId) || matched.includes(uniqueId)) return;

    const newFlipped = [...flipped, uniqueId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const firstCard = cards.find((c) => c.uniqueId === newFlipped[0]);
      const secondCard = cards.find((c) => c.uniqueId === newFlipped[1]);

      if (firstCard.id === secondCard.id) {
        setMatched((prev) => [...prev, firstCard.uniqueId, secondCard.uniqueId]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 900);
      }
    }
  };

  const isGameOver = cards.length > 0 && matched.length === cards.length;

  useEffect(() => {
    if (isGameOver) {
      if (!bestScore || moves < bestScore) {
        setBestScore(moves);
        localStorage.setItem('swift_memory_best', moves.toString());
      }
    }
  }, [isGameOver, moves, bestScore]);

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
        {/* ראש המשחק: מונה מהלכים ושיא אישי */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              {isHe ? `מהלכים: ${moves}` : `Moves: ${moves}`}
            </span>
            {bestScore && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--primary-rose-dark)'
              }}>
                <Trophy size={14} />
                {isHe ? `שיא אישי: ${bestScore}` : `Best: ${bestScore}`}
              </span>
            )}
          </div>

          <button
            onClick={initGame}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.85rem',
              borderRadius: '14px',
              backgroundColor: 'var(--bg-creamy)',
              border: '1px solid var(--border-delicate)',
              color: 'var(--text-dark)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={13} />
            {isHe ? 'ערבב מחדש' : 'Reset'}
          </button>
        </div>

        {/* לוח הקלפים (4x4 Grid) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.65rem',
          maxWidth: '440px',
          margin: '0 auto 1rem'
        }}>
          {cards.map((card) => {
            const isShown = flipped.includes(card.uniqueId) || matched.includes(card.uniqueId);
            const isMatch = matched.includes(card.uniqueId);

            return (
              <button
                key={card.uniqueId}
                onClick={() => handleCardClick(card.uniqueId)}
                style={{
                  aspectRatio: '1',
                  borderRadius: '14px',
                  border: isMatch
                    ? '2px solid #4CAF50'
                    : isShown
                    ? '2px solid var(--primary-rose)'
                    : '1px solid var(--border-delicate)',
                  backgroundColor: isMatch ? '#E8F5E9' : isShown ? '#FFF0F5' : 'var(--bg-creamy)',
                  cursor: isShown ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isShown ? '1.8rem' : '1.1rem',
                  fontWeight: 700,
                  color: 'var(--primary-rose-dark)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  transition: 'transform 0.15s ease, background-color 0.2s',
                  transform: isShown ? 'scale(1)' : 'scale(0.98)'
                }}
              >
                {isShown ? card.emoji : '✨'}
              </button>
            );
          })}
        </div>

        {/* מסך ניצחון */}
        {isGameOver && (
          <div style={{
            textAlign: 'center',
            backgroundColor: '#F3EBF7',
            borderRadius: '16px',
            padding: '1.25rem',
            border: '1px solid #D4BEE4',
            marginTop: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.35rem', color: '#4D2463', fontSize: '1.15rem' }}>
              {isHe ? 'כל הכבוד! מצאת את כל הזוגות! 🎉' : 'Well done! Matched all cards! 🎉'}
            </h4>
            <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              {isHe ? `סיימת ב-${moves} מהלכים.` : `Finished in ${moves} moves.`}
            </p>
            <button
              onClick={initGame}
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: '16px',
                backgroundColor: 'var(--primary-rose)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {isHe ? 'שחקי שוב' : 'Play Again'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}