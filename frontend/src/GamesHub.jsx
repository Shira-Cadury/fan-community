import React, { useState } from 'react';
import ErasTrivia from './ErasTrivia';
import LyricsMatcher from './LyricsMatcher';
import MemoryCards from './MemoryCards';
import MastermindClown from './MastermindClown';
import EraQuizGame from './EraQuizGame';
import { HelpCircle, Brain, Music, Layers, Disc3 } from 'lucide-react';

export default function GamesHub({ lang }) {
  const isHe = lang === 'he';
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    {
      id: 'trivia',
      title: isHe ? 'טריוויית אלבומים כרונולוגית (The Eras Trivia)' : 'The Eras Trivia',
      desc: isHe ? 'מסע כרונולוגי בין כל האלבומים של טיילור עם שאלות ברמת קושי עולה וטיימר של 15 שניות!' : 'Chronological journey across all Taylor albums with timed questions!',
      icon: <HelpCircle size={22} color="#D81B60" />,
      iconBg: '#FCE4EC',
      component: <ErasTrivia lang={lang} onBack={() => setActiveGame(null)} />
    },
    {
      id: 'clown',
      title: isHe ? 'גאון או ליצן? (Mastermind or Clown)' : 'Mastermind or Clown?',
      desc: isHe ? 'האם תיאוריית המעריצים התבררה כגאונות אמיתית של טיילור, או כקלאונינג מוחלט שלא קרה?' : 'Is the fan theory a genuine Mastermind Easter egg, or pure clown behavior?',
      icon: <Brain size={22} color="#1E88E5" />,
      iconBg: '#E3F2FD',
      component: <MastermindClown lang={lang} onBack={() => setActiveGame(null)} />
    },
    {
      id: 'lyrics',
      title: isHe ? 'התאימו את הציטוט לאלבום (Lyrics Matcher)' : 'Lyrics Matcher',
      desc: isHe ? 'גררו שורות וציטוטים מוכרים מתוך שירים ישירות אל עטיפת האלבום הנכונה.' : 'Match iconic lyrics directly to their correct album era.',
      icon: <Music size={22} color="#00897B" />,
      iconBg: '#E0F2F1',
      component: <LyricsMatcher lang={lang} onBack={() => setActiveGame(null)} />
    },
    {
      id: 'memory',
      title: isHe ? 'משחק הזיכרון (Swift Memory Cards)' : 'Swift Memory Cards',
      desc: isHe ? 'הפכו קלפים וגלו זוגות תואמים של פריטים אייקוניים: הצעיף האדום, כדור הדיסקו ועוד.' : 'Flip cards and find pairs of iconic Swiftie lore symbols.',
      icon: <Layers size={22} color="#8E24AA" />,
      iconBg: '#F3E5F5',
      component: <MemoryCards lang={lang} onBack={() => setActiveGame(null)} />
    },
    {
      id: 'era_quiz',
      title: isHe ? 'מהי ה-Era הנוכחית שלך?' : "What's Your Current Era?",
      desc: isHe ? 'עני על 10 שאלות אופי ואסתטיקה וגלי איזה אלבום של טיילור מתאים בדיוק למצב הרוח שלך!' : 'Answer 10 aesthetic questions and find out which Taylor Swift era matches your current vibe!',
      icon: <Disc3 size={22} color="#C2185B" />,
      iconBg: '#FCE4EC',
      component: <EraQuizGame lang={lang} onBack={() => setActiveGame(null)} />
    }
  ];

  if (activeGame) {
    const currentGame = games.find((g) => g.id === activeGame);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {currentGame?.component}
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '1.5rem',
      padding: '0.5rem 0'
    }}>
      {games.map((game) => (
        <div
          key={game.id}
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-delicate)',
            borderRadius: '24px',
            padding: '1.75rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            boxShadow: '0 4px 16px rgba(58, 46, 43, 0.03)',
            minHeight: '220px'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '1.5rem',
            [isHe ? 'left' : 'right']: '1.5rem',
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            backgroundColor: game.iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {game.icon}
          </div>

          <div style={{ paddingInlineEnd: '3.5rem', textAlign: isHe ? 'right' : 'left' }}>
            <h3 style={{
              margin: '0 0 0.6rem',
              color: 'var(--text-dark)',
              fontSize: '1.15rem',
              fontFamily: '"Georgia", serif',
              fontWeight: 700
            }}>
              {game.title}
            </h3>
            <p style={{
              margin: 0,
              color: 'var(--text-muted)',
              fontSize: '0.88rem',
              lineHeight: '1.5'
            }}>
              {game.desc}
            </p>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button
              onClick={() => setActiveGame(game.id)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '16px',
                backgroundColor: '#D97398',
                color: '#fff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                boxShadow: '0 4px 12px rgba(217, 115, 152, 0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{isHe ? 'שחקי עכשיו!' : 'Play Now!'}</span>
              <span>▷</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}