import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, BookOpen, RotateCcw, Trophy, CheckCircle2, HelpCircle } from 'lucide-react';

const LIBRARY_QUOTES = [
  { 
    id: 1, 
    quote: "Life was a ______ and it bent right to your wind.", 
    word: "WILLOW", 
    album: "evermore",
    hint: "סוג של עץ שמתכופף ברוח..." 
  },
  { 
    id: 2, 
    quote: "And isn't it just so pretty to think all along there was some invisible ______", 
    word: "STRING", 
    album: "folklore",
    hint: "חוט דק ובלתי נראה שקושר בין שני אנשים..."
  },
  { 
    id: 3, 
    quote: "You kept me like a secret, but I kept you like an ______", 
    word: "OATH", 
    album: "Red (Taylor's Version)",
    hint: "הבטחה חזקה או שבועה..."
  },
  { 
    id: 4, 
    quote: "I want auroras and sad ______", 
    word: "PROSE", 
    album: "folklore (the lakes)",
    hint: "צורת כתיבה, טקסט ספרותי שהוא לא שירה..."
  },
  { 
    id: 5, 
    quote: "All's fair in love and ______", 
    word: "POETRY", 
    album: "The Tortured Poets Department",
    hint: "שירה, המחלקה של המשוררים המיוסרים..."
  },
  { 
    id: 6, 
    quote: "I had the time of my life fighting ______ with you", 
    word: "DRAGONS", 
    album: "Speak Now",
    hint: "יצורי אש מיתולוגיים מהאגדות..."
  }
];

export default function SwiftieLibrary({ lang, onBack }) {
  const isHe = lang === 'he';
  const BackIcon = isHe ? ArrowRight : ArrowLeft;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  
  const [availableLetters, setAvailableLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  
  const [isShake, setIsShake] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQuote = LIBRARY_QUOTES[currentIdx];

  // אתחול שלב חדש
  useEffect(() => {
    if (!currentQuote) return;
    
    // יצירת מערך אותיות מבולבל
    const chars = currentQuote.word.split('');
    const shuffled = chars.map((char, index) => ({ id: index, char }))
                          .sort(() => Math.random() - 0.5);
    
    setAvailableLetters(shuffled);
    setSelectedLetters([]);
    setIsSuccess(false);
    setShowHint(false);
    setIsShake(false);
  }, [currentIdx, currentQuote]);

  const handleLetterClick = (letterObj) => {
    if (isSuccess || isShake) return;

    // העברה מהזמינים לנבחרים
    setAvailableLetters(prev => prev.filter(l => l.id !== letterObj.id));
    const newSelected = [...selectedLetters, letterObj];
    setSelectedLetters(newSelected);

    // בדיקה אם המילה הושלמה
    if (newSelected.length === currentQuote.word.length) {
      const formedWord = newSelected.map(l => l.char).join('');
      if (formedWord === currentQuote.word) {
        // הצלחה!
        setIsSuccess(true);
        setScore(prev => prev + 10);
        setTimeout(() => {
          if (currentIdx + 1 < LIBRARY_QUOTES.length) {
            setCurrentIdx(prev => prev + 1);
          } else {
            setIsGameOver(true);
          }
        }, 1500);
      } else {
        // טעות - אפקט שקשוק וריקון
        setIsShake(true);
        setTimeout(() => {
          setIsShake(false);
          // מחזיר הכל למצב המבולבל הקודם
          setAvailableLetters(prev => [...prev, ...newSelected].sort(() => Math.random() - 0.5));
          setSelectedLetters([]);
        }, 800);
      }
    }
  };

  const handleSelectedLetterClick = (letterObj) => {
    if (isSuccess || isShake) return;
    // החזרה מהנבחרים לזמינים
    setSelectedLetters(prev => prev.filter(l => l.id !== letterObj.id));
    setAvailableLetters(prev => [...prev, letterObj]);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
        <div style={{ backgroundColor: '#FAF6ED', borderRadius: '24px', padding: '3rem 2rem', border: '2px solid #D4C4A8', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
          <Trophy size={50} color="#8A6218" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontFamily: '"Georgia", serif', color: '#5C4010', margin: '0 0 0.5rem 0' }}>
            {isHe ? 'משוררת מדופלמת!' : 'A True Poet!'}
          </h2>
          <p style={{ color: '#8A6218', marginBottom: '2rem', fontSize: '1.1rem' }}>
            {isHe ? `סיימת את הספרייה עם ${score} נקודות.` : `You completed the library with ${score} points.`}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={handleRestart} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#75500A', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '20px', fontWeight: 600, cursor: 'pointer' }}>
              <RotateCcw size={18} />
              {isHe ? 'קריאה חוזרת' : 'Read Again'}
            </button>
            <button onClick={onBack} style={{ backgroundColor: 'transparent', color: '#75500A', border: '1px solid #75500A', padding: '0.8rem 1.5rem', borderRadius: '20px', fontWeight: 600, cursor: 'pointer' }}>
              {isHe ? 'חזרה למשחקים' : 'Back to Games'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // אנימציית ה-Shake לטעויות (מוגדרת כ-inline style/keyframes)
  const shakeAnimation = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-5px); }
      40%, 80% { transform: translateX(5px); }
    }
  `;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <style>{shakeAnimation}</style>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
          <BackIcon size={16} />
          {isHe ? 'חזרה למשחקים' : 'Back to Games'}
        </button>
        <div style={{ fontWeight: 700, color: '#75500A', fontSize: '0.9rem' }}>
          {isHe ? `ניקוד: ${score}` : `Score: ${score}`}
        </div>
      </div>

      {/* העיצוב של "דף מספר עתיק" */}
      <div style={{ 
        backgroundColor: '#FAF6ED', 
        borderRadius: '16px 24px 24px 16px', 
        padding: '3rem 2rem', 
        border: '1px solid #D4C4A8', 
        borderLeft: '12px solid #75500A',
        boxShadow: 'inset -20px 0 30px rgba(255,255,255,0.4), 0 10px 25px rgba(0,0,0,0.05)',
        position: 'relative',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        
        {/* אייקון ספרייה עליון */}
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', opacity: 0.3 }}>
          <BookOpen size={40} color="#75500A" />
        </div>

        {/* מידע על הציטוט */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#967A45', fontWeight: 700 }}>
            {currentQuote.album} • {isHe ? `ציטוט ${currentIdx + 1}/${LIBRARY_QUOTES.length}` : `Quote ${currentIdx + 1}/${LIBRARY_QUOTES.length}`}
          </span>
          
          <h3 style={{ 
            fontFamily: '"Georgia", "Times New Roman", serif', 
            fontSize: '1.6rem', 
            color: '#3D2A05', 
            lineHeight: '1.6',
            margin: '1.5rem 0',
            fontStyle: 'italic'
          }}>
            "{currentQuote.quote}"
          </h3>

          {!showHint && (
            <button 
              onClick={() => setShowHint(true)}
              style={{ background: 'none', border: 'none', color: '#A08655', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}
            >
              <HelpCircle size={14} /> {isHe ? 'רמז' : 'Hint'}
            </button>
          )}
          {showHint && (
            <p style={{ color: '#75500A', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>
              💡 {currentQuote.hint}
            </p>
          )}
        </div>

        {/* שורת המילה להרכבה */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '0.5rem', 
          marginBottom: '2.5rem',
          animation: isShake ? 'shake 0.4s ease-in-out' : 'none'
        }}>
          {Array.from({ length: currentQuote.word.length }).map((_, i) => {
            const letter = selectedLetters[i];
            return (
              <div 
                key={`slot-${i}`}
                onClick={() => letter && handleSelectedLetterClick(letter)}
                style={{
                  width: '45px', height: '55px', 
                  borderBottom: `3px solid ${isSuccess ? '#4CAF50' : '#8A6218'}`,
                  backgroundColor: letter ? (isSuccess ? '#E8F5E9' : '#FFFDF9') : 'transparent',
                  color: isSuccess ? '#2E7D32' : '#3D2A05',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.6rem', fontFamily: '"Georgia", serif', fontWeight: 700,
                  cursor: letter && !isSuccess ? 'pointer' : 'default',
                  boxShadow: letter ? '0 4px 6px rgba(0,0,0,0.05)' : 'none',
                  borderRadius: letter ? '6px' : '0',
                  transition: 'all 0.2s'
                }}
              >
                {letter ? letter.char : ''}
              </div>
            );
          })}
        </div>

        {/* שורת האותיות המפוזרות לבחירה */}
        {!isSuccess && (
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
            {availableLetters.map(letter => (
              <button
                key={`avail-${letter.id}`}
                onClick={() => handleLetterClick(letter)}
                style={{
                  width: '45px', height: '55px',
                  backgroundColor: '#FFFDF9',
                  border: '1px solid #D4C4A8',
                  borderRadius: '8px',
                  color: '#5C4010',
                  fontSize: '1.4rem', fontFamily: '"Georgia", serif', fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 0 #D4C4A8',
                  transition: 'transform 0.1s, box-shadow 0.1s'
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = 'translateY(4px)';
                  e.currentTarget.style.boxShadow = '0 0 0 #D4C4A8';
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 0 #D4C4A8';
                }}
              >
                {letter.char}
              </button>
            ))}
          </div>
        )}

        {/* הודעת הצלחה */}
        {isSuccess && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#2E7D32', animation: 'fadeIn 0.4s' }}>
            <CheckCircle2 size={32} style={{ marginBottom: '0.5rem' }} />
            <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>{isHe ? 'מדויק!' : 'Perfect!'}</span>
          </div>
        )}

      </div>
    </div>
  );
}