import React, { useState } from 'react';
import TriviaGame from './TriviaGame';
import LyricsGame from './LyricsGame';
import MemoryGame from './MemoryGame';
import ClownGame from './ClownGame';
import EraQuizGame from './EraQuizGame'; // המשחק החדש!
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export default function GamesHub({ lang }) {
  const isHe = lang === 'he';
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    {
      id: 'era_quiz',
      title: isHe ? 'מהי ה-Era הנוכחית שלך? 💿' : "What's Your Current Era? 💿",
      desc: isHe ? 'עני על 5 שאלות אופי ואסתטיקה וגלי איזה אלבום של טיילור מתאים בדיוק למצב הרוח שלך!' : 'Answer 5 aesthetic questions and find out which Taylor Swift era matches your current vibe!',
      component: <EraQuizGame lang={lang} />
    },
    {
      id: 'trivia',
      title: isHe ? 'טריוויית ה-Eras הגדולה 🏆' : 'The Ultimate Eras Trivia 🏆',
      desc: isHe ? 'בחנו את הידע שלכן בכל האלבומים והפרטים הקטנים של טיילור.' : 'Test your knowledge across all of Taylor\'s albums, lore, and Easter eggs.',
      component: <TriviaGame lang={lang} />
    },
    {
      id: 'lyrics',
      title: isHe ? 'התאמת שורות משירים 🎵' : 'Lyrics Matcher 🎵',
      desc: isHe ? 'האם תזהו לאיזה שיר שייכת השורה המפורסמת?' : 'Can you match the iconic lyrics to their corresponding song title?',
      component: <LyricsGame lang={lang} />
    },
    {
      id: 'memory',
      title: isHe ? 'משחק הזיכרון של האלבומים 🎴' : 'Album Memory Match 🎴',
      desc: isHe ? 'הפכו את הקלפים ומצאו את זוגות האלבומים הזהים בזמן הקצר ביותר.' : 'Flip the cards to match album pairs in the shortest time possible.',
      component: <MemoryGame lang={lang} />
    },
    {
      id: 'clown',
      title: isHe ? 'מאסטרמיינד או קלאון? 🤡' : 'Mastermind or Clown? 🤡',
      desc: isHe ? 'החליטו האם התאוריה היא רמז אמיתי ומתוחכם או הזיה של מעריצים!' : 'Decide if the theory is a genuine Easter egg or peak clown behavior!',
      component: <ClownGame lang={lang} />
    }
  ];

  if (activeGame) {
    const currentGame = games.find((g) => g.id === activeGame);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <button
          onClick={() => setActiveGame(null)}
          style={{
            alignSelf: isHe ? 'flex-start' : 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-delicate)',
            color: 'var(--text-dark)',
            fontSize: '0.88rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {isHe ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          <span>{isHe ? 'חזרה לכל המשחקים' : 'Back to Games Hub'}</span>
        </button>

        {currentGame?.component}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        textAlign: 'center',
        padding: '1.5rem 1rem',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '24px',
        border: '1px solid var(--border-delicate)',
        boxShadow: '0 4px 14px rgba(58, 46, 43, 0.03)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-rose-dark)' }}>
          <Sparkles size={20} />
          <h2 style={{ margin: 0, fontSize: '1.6rem', fontFamily: '"Georgia", serif' }}>
            {isHe ? 'ארקייד המשחקים של Swift Secrets' : 'Swift Secrets Arcade'}
          </h2>
          <Sparkles size={20} />
        </div>
        <p style={{ margin: '0.4rem 0 0', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
          {isHe ? 'בחרי משחק ותראי עד כמה את סוויפטית אמיתית!' : 'Pick a mini-game and see how well you know Taylor!'}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.25rem'
      }}>
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-delicate)',
              borderRadius: '20px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(58, 46, 43, 0.03)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(216, 112, 147, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(58, 46, 43, 0.03)';
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text-dark)', fontSize: '1.2rem', fontFamily: '"Georgia", serif' }}>
                {game.title}
              </h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                {game.desc}
              </p>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: isHe ? 'flex-start' : 'flex-end' }}>
              <span style={{
                color: 'var(--primary-rose-dark)',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                {isHe ? 'שחקי עכשיו' : 'Play Now'}
                {isHe ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}