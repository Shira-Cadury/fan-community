import React, { useState } from 'react';
import { Sparkles, Music, HelpCircle, Layers, Play, Smile } from 'lucide-react';
import ErasTrivia from './ErasTrivia';
import LyricsMatcher from './LyricsMatcher';
import MemoryCards from './MemoryCards';
import MastermindClown from './MastermindClown';

const GAMES = [
  {
    id: 'eras-trivia',
    title: { he: 'טריוויית אלבומים כרונולוגית (The Eras Trivia)', en: 'The Eras Trivia' },
    desc: {
      he: 'מסע כרונולוגי בין כל האלבומים של טיילור עם שאלות ברמת קושי עולה וטיימר של 15 שניות!',
      en: 'A chronological journey across all Eras with increasing difficulty and a 15s timer!'
    },
    icon: HelpCircle,
    accentColor: '#A82020',
    bgColor: '#FCEAEA',
  },
  {
    id: 'mastermind-clown',
    title: { he: 'גאון או ליצן? (Mastermind or Clown)', en: 'Mastermind or Clown?' },
    desc: {
      he: 'האם תיאוריית המעריצים התבררה כגאונות אמיתית של טיילור, או כקלאונינג מוחלט שלא קרה?',
      en: 'Was the famous Swiftie theory pure Mastermind genius, or certified Clowning delusion?'
    },
    icon: Smile,
    accentColor: '#0D47A1',
    bgColor: '#E3F2FD',
  },
  {
    id: 'lyrics-matcher',
    title: { he: 'התאימו את הציטוט לאלבום (Lyrics Matcher)', en: 'Lyrics Matcher' },
    desc: {
      he: 'גררו שורות וציטוטים מוכרים מתוך שירים ישירות אל עטיפת האלבום הנכונה.',
      en: 'Drag and drop iconic lyrics onto their corresponding album cover.'
    },
    icon: Music,
    accentColor: '#5C9EAD',
    bgColor: '#EBF5F7',
  },
  {
    id: 'swift-memory',
    title: { he: 'משחק הזיכרון (Swift Memory Cards)', en: 'Swift Memory Cards' },
    desc: {
      he: 'הפכו קלפים וגלו זוגות תואמים של פריטים אייקוניים: הצעיף האדום, כדור הדיסקו ועוד.',
      en: 'Flip cards and match iconic Swiftie symbols: the red scarf, mirrorball, and more.'
    },
    icon: Layers,
    accentColor: '#8A4B82',
    bgColor: '#F8EEF6',
  }
];

export default function GamesHub({ lang }) {
  const isHe = lang === 'he';
  const [activeGameId, setActiveGameId] = useState(null);

  if (activeGameId === 'eras-trivia') {
    return <ErasTrivia lang={lang} onBack={() => setActiveGameId(null)} />;
  }

  if (activeGameId === 'mastermind-clown') {
    return <MastermindClown lang={lang} onBack={() => setActiveGameId(null)} />;
  }

  if (activeGameId === 'lyrics-matcher') {
    return <LyricsMatcher lang={lang} onBack={() => setActiveGameId(null)} />;
  }

  if (activeGameId === 'swift-memory') {
    return <MemoryCards lang={lang} onBack={() => setActiveGameId(null)} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-delicate)',
        borderRadius: '20px',
        padding: '1.5rem',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(58, 46, 43, 0.03)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-rose-dark)' }}>
          <Sparkles size={18} />
          <h3 style={{ margin: 0, fontSize: '1.35rem', fontFamily: '"Georgia", serif' }}>
            {isHe ? 'פינת המשחקים של Swift Secrets' : 'Swift Secrets Games Lounge'}
          </h3>
          <Sparkles size={18} />
        </div>
        <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {isHe 
            ? 'ארבעה משחקים אינטראקטיביים שנוצרו במיוחד עבור קהילת הסוויפטיז שלנו!'
            : 'Four interactive games designed specially for our Swiftie community!'}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        {GAMES.map((game) => {
          const IconComponent = game.icon;
          return (
            <div
              key={game.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-delicate)',
                borderRadius: '18px',
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                boxShadow: '0 2px 8px rgba(58, 46, 43, 0.03)',
                transition: 'transform 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: game.bgColor,
                    color: game.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={22} />
                  </div>
                </div>

                <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.05rem', color: 'var(--text-dark)' }}>
                  {game.title[lang] || game.title.en}
                </h4>
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {game.desc[lang] || game.desc.en}
                </p>
              </div>

              <button
                onClick={() => setActiveGameId(game.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  padding: '0.6rem',
                  borderRadius: '12px',
                  backgroundColor: 'var(--primary-rose)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(216, 112, 147, 0.25)'
                }}
              >
                <Play size={14} />
                {isHe ? 'שחקי עכשיו!' : 'Play Now!'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}