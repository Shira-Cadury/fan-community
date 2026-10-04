import React, { useState } from 'react';
import { Gamepad2, Sparkles, ChevronRight, CheckCircle2, XCircle, HelpCircle, RotateCcw, Trophy } from 'lucide-react';

const EMOJI_QUESTIONS = [
  { id: 1, emojis: '🧣 🍂 💔 ❄️', answer: 'All Too Well', options: ['All Too Well', 'Back To December', 'cardigan', 'Lover'], hint: '10 דקות של כאב לב...' },
  { id: 2, emojis: '🐍 📞 ☠️ 👑', answer: 'Look What You Made Me Do', options: ['End Game', 'Blank Space', 'Look What You Made Me Do', 'Karma'], hint: 'הטיילור הישנה לא יכולה לענות לטלפון עכשיו' },
  { id: 3, emojis: '🚗 💨 🎒 💰', answer: 'Getaway Car', options: ['Cruel Summer', 'Getaway Car', 'Out Of The Woods', 'Style'], hint: 'שום דבר טוב לא קורה במושב האחורי' },
  { id: 4, emojis: '💎 ✨ 🚶‍♀️ 👗', answer: 'Bejeweled', options: ['Mirrorball', 'Bejeweled', 'Gorgeous', 'Dress'], hint: 'אני עדיין יכולה לגרום לכל החדר לנצוץ' },
  { id: 5, emojis: '🌲 🧶 👵🏻 🧥', answer: 'cardigan', options: ['willow', 'ivy', 'cardigan', 'august'], hint: 'הרגשתי כמו משהו ישן מתחת למיטה' },
  { id: 6, emojis: '☔ 🕛 🌌 👦🏻', answer: 'Midnight Rain', options: ['Midnight Rain', 'Lavender Haze', 'Clean', 'Sparks Fly'], hint: 'הוא היה שמש, אני הייתי גשם של חצות' },
  { id: 7, emojis: '🇬🇧 👦🏼 ☕ 🛵', answer: 'London Boy', options: ['So Long, London', 'London Boy', 'Welcome To New York', 'Paris'], hint: 'אוהבת תה של אחר הצהריים וסיפורים מהפאב' },
  { id: 8, emojis: '🏹 💘 🎯 🏃‍♀️', answer: 'The Archer', options: ['The Archer', 'Treacherous', 'State Of Grace', 'Lover'], hint: 'אני הקשת, ואני גם המטרה' },
  { id: 9, emojis: '🪩 💃 💔 👠', answer: 'mirrorball', options: ['mirrorball', 'maroon', 'Delicate', 'Anti-Hero'], hint: 'אני אשנה את כל מה שאני כדי להתאים לך' },
  { id: 10, emojis: '🏰 🧱 🐉 👑', answer: 'Castles Crumbling', options: ['Long Live', 'Castles Crumbling', 'Enchanted', 'Sparks Fly'], hint: 'אימפריות נופלות, והם חגגו כשהייתי למטה' }
];

export default function GamesHub({ lang }) {
  const isHe = lang === 'he';
  const [activeGame, setActiveGame] = useState(null);

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleStartGame = () => {
    setActiveGame('emoji');
    setCurrentQ(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowHint(false);
    setGameOver(false);
  };

  const handleOptionClick = (option) => {
    if (selectedOption) return; // מניעת לחיצה כפולה
    setSelectedOption(option);
    
    const correct = option === EMOJI_QUESTIONS[currentQ].answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQ < EMOJI_QUESTIONS.length - 1) {
        setCurrentQ(q => q + 1);
        setSelectedOption(null);
        setIsCorrect(null);
        setShowHint(false);
      } else {
        setGameOver(true);
      }
    }, 1500); // מעבר לשאלה הבאה אחרי שנייה וחצי
  };

  if (!activeGame) {
    return (
      <div style={{ padding: '1rem' }}>
        <h2 style={{ fontFamily: '"Georgia", serif', color: 'var(--text-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Gamepad2 size={24} color="var(--primary-rose-dark)" />
          {isHe ? 'מרכז המשחקים' : 'Games Hub'}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* כרטיסיית משחק האימוג'ים */}
          <div 
            onClick={handleStartGame}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-delicate)',
              borderRadius: '20px',
              padding: '2rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(184, 80, 115, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧩🎶</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)', fontSize: '1.4rem' }}>
              {isHe ? 'נחשי את השיר לפי האימוג\'ים' : 'Guess The Song Emoji Quiz'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 1.5rem 0' }}>
              {isHe ? 'חושבת שאת מכירה כל שורה בשירים? בואי נבדוק עד כמה את טובה בפיענוח רמזים!' : 'Test your Swiftie knowledge by decoding the emojis!'}
            </p>
            <button style={{
              backgroundColor: 'var(--primary-rose)',
              color: '#fff',
              border: 'none',
              padding: '0.6rem 1.5rem',
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Sparkles size={18} />
              {isHe ? 'שחקי עכשיו' : 'Play Now'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- תצוגת סיכום המשחק ---
  if (gameOver) {
    return (
      <div style={{ padding: '2rem 1rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', padding: '3rem 2rem', boxShadow: '0 12px 36px rgba(0,0,0,0.08)', border: '1px solid var(--border-delicate)' }}>
          <Trophy size={60} color="#FFD700" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2rem', color: 'var(--text-dark)', margin: '0 0 0.5rem 0', fontFamily: '"Georgia", serif' }}>
            {isHe ? 'כל הכבוד סוויפטי!' : 'Great Job Swiftie!'}
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            {isHe ? `ענית נכון על ${score} מתוך ${EMOJI_QUESTIONS.length} שירים!` : `You got ${score} out of ${EMOJI_QUESTIONS.length} correct!`}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={handleStartGame}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                backgroundColor: 'var(--primary-rose)', color: '#fff', border: 'none',
                padding: '0.8rem 1.5rem', borderRadius: '20px', fontWeight: 600, cursor: 'pointer', fontSize: '1rem'
              }}
            >
              <RotateCcw size={18} />
              {isHe ? 'שחקי שוב' : 'Play Again'}
            </button>
            <button
              onClick={() => setActiveGame(null)}
              style={{
                backgroundColor: 'var(--bg-subtle)', color: 'var(--text-dark)', border: '1px solid var(--border-delicate)',
                padding: '0.8rem 1.5rem', borderRadius: '20px', fontWeight: 600, cursor: 'pointer', fontSize: '1rem'
              }}
            >
              {isHe ? 'חזרה למשחקים' : 'Back to Games'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- תצוגת השאלות במשחק ---
  const question = EMOJI_QUESTIONS[currentQ];

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      {/* סרגל התקדמות עליון */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveGame(null)}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 600 }}
        >
          {isHe ? 'חזרה' : 'Back'}
        </button>
        <div style={{ fontWeight: 700, color: 'var(--primary-rose-dark)', backgroundColor: 'var(--bg-subtle)', padding: '0.4rem 1rem', borderRadius: '14px' }}>
          {isHe ? `שאלה ${currentQ + 1} מתוך ${EMOJI_QUESTIONS.length}` : `Question ${currentQ + 1} of ${EMOJI_QUESTIONS.length}`}
        </div>
        <div style={{ fontWeight: 700, color: 'var(--secondary-sage-dark)' }}>
          {isHe ? `נקודות: ${score}` : `Score: ${score}`}
        </div>
      </div>

      {/* כרטיסיית השאלה */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-delicate)',
        borderRadius: '24px',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '3.5rem', letterSpacing: '0.5rem', marginBottom: '2rem' }}>
          {question.emojis}
        </div>

        {/* כפתור רמז */}
        <button 
          onClick={() => setShowHint(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            marginBottom: '1.5rem',
            opacity: showHint ? 1 : 0.7
          }}
        >
          <HelpCircle size={16} />
          {showHint ? <span style={{ fontWeight: 600, color: 'var(--primary-rose)' }}>{question.hint}</span> : (isHe ? 'לחצי לרמז' : 'Need a hint?')}
        </button>

        {/* אפשרויות התשובה */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {question.options.map((opt, idx) => {
            let bgColor = 'var(--bg-subtle)';
            let borderColor = 'var(--border-delicate)';
            let textColor = 'var(--text-dark)';
            let icon = null;

            if (selectedOption !== null) {
              if (opt === question.answer) {
                // התשובה הנכונה תמיד תיצבע בירוק אחרי הלחיצה
                bgColor = '#E8F5E9';
                borderColor = '#A5D6A7';
                textColor = '#2E7D32';
                icon = <CheckCircle2 size={18} color="#2E7D32" />;
              } else if (opt === selectedOption) {
                // אם בחרנו את זה וזה טעות - ייצבע באדום
                bgColor = '#FFEBEE';
                borderColor = '#FFCDD2';
                textColor = '#C62828';
                icon = <XCircle size={18} color="#C62828" />;
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(opt)}
                disabled={selectedOption !== null}
                style={{
                  padding: '1rem',
                  borderRadius: '16px',
                  backgroundColor: bgColor,
                  border: `2px solid ${borderColor}`,
                  color: textColor,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  fontFamily: '"Georgia", serif',
                  cursor: selectedOption ? 'default' : 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s ease',
                  opacity: selectedOption && opt !== question.answer && opt !== selectedOption ? 0.5 : 1
                }}
              >
                <span>{opt}</span>
                {icon}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}