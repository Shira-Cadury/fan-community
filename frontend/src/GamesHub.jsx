import React, { useState } from 'react';
import { Gamepad2, Sparkles, Trophy, Wand2, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import EraQuizGame from './EraQuizGame';
import ErasTrivia from './ErasTrivia';
import EraStylist from './EraStylist';
import LyricsMatcher from './LyricsMatcher';
import SwiftieLibrary from './SwiftieLibrary';

export default function GamesHub({ lang }) {
  const isHe = lang === 'he';
  const [activeGame, setActiveGame] = useState(null); // null = לובי ראשי, או מזהה המשחק הנבחר
  const BackIcon = isHe ? ArrowRight : ArrowLeft;

  const gamesList = [
    {
      id: 'quiz',
      titleHe: 'שאלון ה-Era שלך',
      titleEn: 'What is Your Era? Quiz',
      descHe: 'גלי איזו תקופה של טיילור סוויפט הכי מתאימה לאישיות שלך כרגע!',
      descEn: 'Find out which Taylor Swift era matches your personality right now!',
      icon: '✨',
      color: 'linear-gradient(135deg, #FFF0F5 0%, #FCE4EC 100%)',
      borderColor: '#E8B4C8'
    },
    {
      id: 'trivia',
      titleHe: 'טריוויית ה-Eras הגדולה',
      titleEn: 'The Ultimate Eras Trivia',
      descHe: 'בחני את הידע המדויק שלך על כל אלבום ואלבום במסע בזמן!',
      descEn: 'Test your precise knowledge across every single album!',
      icon: '🏆',
      color: 'linear-gradient(135deg, #F3EBF7 0%, #EDE7F6 100%)',
      borderColor: '#D4BEE4'
    },
    {
      id: 'stylist',
      titleHe: 'מעצב הלוקים (Era Stylist)',
      titleEn: 'The Era Stylist',
      descHe: 'הלבישי ועצבי דמות עם תלבושות אייקוניות ושתפי בגלריית הקהילה!',
      descEn: 'Style an avatar with iconic outfits and share to the community gallery!',
      icon: '👗',
      color: 'linear-gradient(135deg, #FFF8E7 0%, #FFF3E0 100%)',
      borderColor: '#FFE3A8'
    },
    {
      id: 'lyrics',
      titleHe: 'התאמת ציטוטים לאלבום',
      titleEn: 'Lyrics Matcher',
      descHe: 'זהי לאיזה אלבום ושיר שייך כל ציטוט פיוטי מתוך השירים!',
      descEn: 'Match famous lyrical quotes to their correct album and song!',
      icon: '🎧',
      color: 'linear-gradient(135deg, #E6F3F7 0%, #E0F2F1 100%)',
      borderColor: '#B3DCE5'
    },
    {
      id: 'library',
      titleHe: 'ספריית הציטוטים (Wordle)',
      titleEn: 'Swiftie Library',
      descHe: 'הרכיבי מילים חסרות מתוך ציטוטים מפורסמים כמו משוררת אמיתית!',
      descEn: 'Complete missing words from famous quotes like a true poet!',
      icon: '📚',
      color: 'linear-gradient(135deg, #FAF6ED 0%, #F5EFE6 100%)',
      borderColor: '#D4C4A8'
    }
  ];

  return (
    <div style={{ padding: '1.5rem', maxWidth: '850px', margin: '0 auto' }}>
      {activeGame === null ? (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--primary-rose-dark)',
              marginBottom: '0.75rem',
              boxShadow: '0 4px 12px rgba(216,112,147,0.15)'
            }}>
              <Gamepad2 size={28} />
            </div>
            <h2 style={{ fontFamily: '"Georgia", serif', color: 'var(--text-dark)', margin: '0 0 0.5rem 0', fontSize: '2rem' }}>
              {isHe ? 'פינת המשחקים והאתגרים' : 'Swiftie Games & Challenges'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', margin: 0, fontFamily: '"Georgia", serif' }}>
              {isHe ? 'בחרי משחק, בחני את הידע שלך והכנסי לעולם של טיילור סוויפט!' : 'Choose a game, test your knowledge, and dive into Taylor Swift\'s world!'}
            </p>
          </div>

          {/* גריד כרטיסיות המשחקים */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
            {gamesList.map((game) => (
              <div
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                style={{
                  background: game.color,
                  border: `1.5px solid ${game.borderColor}`,
                  borderRadius: '20px',
                  padding: '1.75rem 1.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 22px rgba(216, 112, 147, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)';
                }}
              >
                <div>
                  <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>{game.icon}</div>
                  <h3 style={{ fontFamily: '"Georgia", serif', color: 'var(--text-dark)', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                    {isHe ? game.titleHe : game.titleEn}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                    {isHe ? game.descHe : game.descEn}
                  </p>
                </div>

                <div style={{
                  marginTop: '1.25rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--primary-rose-dark)'
                }}>
                  {isHe ? 'שחקי עכשיו ➔' : 'Play Now ➔'}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* כפתור חזרה ללובי עבור משחקים שדורשים מעטפת */}
          {activeGame === 'quiz' && (
            <div style={{ marginBottom: '1rem' }}>
              <button
                onClick={() => setActiveGame(null)}
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
          )}

          {activeGame === 'quiz' && <EraQuizGame lang={lang} />}
          {activeGame === 'trivia' && <ErasTrivia lang={lang} onBack={() => setActiveGame(null)} />}
          {activeGame === 'stylist' && <EraStylist lang={lang} onBack={() => setActiveGame(null)} />}
          {activeGame === 'lyrics' && <LyricsMatcher lang={lang} onBack={() => setActiveGame(null)} />}
          {activeGame === 'library' && <SwiftieLibrary lang={lang} onBack={() => setActiveGame(null)} />}
        </div>
      )}
    </div>
  );
}