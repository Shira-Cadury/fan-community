import React from 'react';
import { Sparkles, Music, HelpCircle, Puzzle, HeartHandshake, Play } from 'lucide-react';

const GAMES = [
  {
    id: 'lyrics-guesser',
    title: { he: 'נחשי את השיר לפי הליריקה', en: 'Guess the Song by Lyric' },
    desc: { he: 'מבחן מהיר: מאיזה שיר לקוחה השורה הזו?', en: 'Test your knowledge: which track is this line from?' },
    icon: Music,
    tag: { he: 'בקרוב', en: 'Coming Soon' },
    accentColor: '#9C3D64',
    bgColor: '#FFF0F5'
  },
  {
    id: 'era-trivia',
    title: { he: 'חידון האלבומים (Era Trivia)', en: 'Era Trivia Quiz' },
    desc: { he: 'שאלות טריוויה מכל האלבומים והסיבובים.', en: 'Trivia questions covering every album and tour era.' },
    icon: HelpCircle,
    tag: { he: 'בקרוב', en: 'Coming Soon' },
    accentColor: '#5B3770',
    bgColor: '#F3EBF7'
  },
  {
    id: 'swiftle',
    title: { he: 'סוויפטל (Swiftle)', en: 'Swiftle Daily' },
    desc: { he: 'ניחוש שיר יומי במספר ניסיונות קצוב.', en: 'Daily song guessing game in limited tries.' },
    icon: Puzzle,
    tag: { he: 'בתכנון', en: 'In Planning' },
    accentColor: '#1B4965',
    bgColor: '#E3EEF8'
  },
  {
    id: 'bracelet-creator',
    title: { he: 'בונה צמידי חברות', en: 'Friendship Bracelet Builder' },
    desc: { he: 'עצבי צמיד חברות דיגיטלי אישי ושתפי בגלריה!', en: 'Design a digital friendship bracelet to share in the gallery!' },
    icon: HeartHandshake,
    tag: { he: 'בתכנון', en: 'In Planning' },
    accentColor: '#7A2E19',
    bgColor: '#FFEBE5'
  }
];

export default function GamesHub({ lang }) {
  const isHe = lang === 'he';

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
            {isHe ? 'פינת המשחקים והחידונים' : 'Games & Trivia Lounge'}
          </h3>
          <Sparkles size={18} />
        </div>
        <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {isHe 
            ? 'אנחנו בונות בימים אלו מגוון משחקים וחידונים ייחודיים לקהילה. הנה הצצה למה שמחכה לכן כאן בקרוב!'
            : 'We are crafting fun games and trivia challenges for the community. Here is a preview of what is coming!'}
        </p>
      </div>

      {/* Grid של כרטיסיות המשחקים */}
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
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
                boxShadow: '0 2px 8px rgba(58, 46, 43, 0.03)',
                transition: 'transform 0.2s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    backgroundColor: game.bgColor,
                    color: game.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={20} />
                  </div>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '10px',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-delicate)'
                  }}>
                    {game.tag[lang] || game.tag.en}
                  </span>
                </div>

                <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.05rem', color: 'var(--text-dark)' }}>
                  {game.title[lang] || game.title.en}
                </h4>
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  {game.desc[lang] || game.desc.en}
                </p>
              </div>

              <button
                disabled
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  padding: '0.5rem',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bg-creamy)',
                  border: '1px solid var(--border-delicate)',
                  color: 'var(--text-muted)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'not-allowed',
                  opacity: 0.8
                }}
              >
                <Play size={13} />
                {isHe ? 'בקרוב...' : 'Coming Soon...'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}