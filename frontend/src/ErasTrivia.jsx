import React, { useState, useEffect } from 'react';
import { Clock, Award, RotateCcw, ArrowRight, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

const ERAS_DATA = [
  {
    era: 'Taylor Swift (Debut)',
    color: '#2B5A3E',
    badgeBg: '#E2F0E7',
    btnBg: '#3F7D58',
    question: 'מה היה הסינגל הראשון שפרסם את טיילור סוויפט מתוך אלבום הבכורה שלה?',
    options: ['Tim McGraw', 'Teardrops on My Guitar', 'Our Song', 'Picture to Burn'],
    correct: 0,
  },
  {
    era: 'Fearless',
    color: '#855E0E',
    badgeBg: '#FDF3D6',
    btnBg: '#C49424',
    question: 'איזה שיר מתוך Fearless מתחיל במילים "You\'re on the phone with your girlfriend, she\'s upset"?',
    options: ['Love Story', 'You Belong With Me', 'Fifteen', 'White Horse'],
    correct: 1,
  },
  {
    era: 'Speak Now',
    color: '#5C2456',
    badgeBg: '#F5E4F3',
    btnBg: '#8A4B82',
    question: 'מה מייחד את כתיבת השירים באלבום Speak Now?',
    options: [
      'כל השירים נכתבו בשיתוף עם מקס מרטין',
      'טיילור כתבה את כל השירים באלבום לבדה לגמרי',
      'כל השירים נכתבו בסיבוב ההופעות בלבד',
      'האלבום הוקלט כולו בהופעה חיה',
    ],
    correct: 1,
  },
  {
    era: 'Red',
    color: '#7D1515',
    badgeBg: '#FCE6E6',
    btnBg: '#A82020',
    question: 'איזה פריט לבוש איקוני מוזכר בשיר All Too Well והושאר אצל אחות של הבחור?',
    options: ['כובע שחור', 'טבעת כסף', 'צעיף אדום', 'ג\'קט ג\'ינס'],
    correct: 2,
  },
  {
    era: '1989',
    color: '#1C5B68',
    badgeBg: '#E0F1F4',
    btnBg: '#478B99',
    question: 'מהי שנת הלידה של טיילור שהעניקה לאלבום הפופ הראשון שלה את שמו?',
    options: ['1987', '1989', '1991', '1993'],
    correct: 1,
  },
  {
    era: 'Reputation',
    color: '#1F1F1F',
    badgeBg: '#E8E8E8',
    btnBg: '#3D3D3D',
    question: 'איזו חיה מופיעה באופן בולט בקליפים, באסתטיקה ובבמה של סיבוב ההופעות Reputation?',
    options: ['נחש', 'חתול', 'זאב', 'ברבור'],
    correct: 0,
  },
  {
    era: 'Lover',
    color: '#8A2B49',
    badgeBg: '#FDE4ED',
    btnBg: '#C76384',
    question: 'באיזה צבעים מאופיין עולם הוויזואליה והעטיפה של האלבום Lover?',
    options: ['שחור ולבן מטאלי', 'צבעי פסטל רכים ורוד ותכלת', 'חום ובז\' סתווי', 'אדום וזהב כהה'],
    correct: 1,
  },
  {
    era: 'Folklore & Evermore',
    color: '#3B4127',
    badgeBg: '#EAEFE0',
    btnBg: '#596041',
    question: 'מי הדמות הבדיונית שמופיעה במשולש האהבה המפורסם של Folklore לצד בטי וג\'יימס?',
    options: ['דורותיאה', 'אוגוסטין (אינז)', 'מרג\'ורי', 'רבקה'],
    correct: 1,
  },
  {
    era: 'Midnights',
    color: '#1A2552',
    badgeBg: '#E2E9FB',
    btnBg: '#2E3E7A',
    question: 'כמה שירים רגילים (Standard Edition) כלל האלבום Midnights כשיצא בחצות?',
    options: ['10', '13', '15', '19'],
    correct: 1,
  },
  {
    era: 'The Tortured Poets Department',
    color: '#3B3632',
    badgeBg: '#EAE8E6',
    btnBg: '#5C544F',
    question: 'מה היה הסינגל המוביל שיצא בליווי קליפ יחד עם פוסט מאלון?',
    options: ['Fortnight', 'I Can Do It With a Broken Heart', 'Down Bad', 'Florida!!!'],
    correct: 0,
  }
];

export default function ErasTrivia({ lang, onBack }) {
  const isHe = lang === 'he';
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQuestion = ERAS_DATA[currentIdx];

  useEffect(() => {
    if (isAnswered || isGameOver) return;

    if (timeLeft === 0) {
      setIsAnswered(true);
      setSelectedOpt(-1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, isGameOver]);

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.correct) {
      setScore((prev) => prev + 10);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < ERAS_DATA.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setTimeLeft(15);
    setIsGameOver(false);
  };

  const BackIcon = isHe ? ArrowRight : ArrowLeft;

  if (isGameOver) {
    const totalScore = ERAS_DATA.length * 10;
    const ratio = score / totalScore;
    let title = isHe ? 'סוויפטי בהתהוות!' : 'Swiftie in Training!';
    if (ratio === 1) title = isHe ? 'Mastermind מושלמת! 🌟' : 'Perfect Mastermind! 🌟';
    else if (ratio >= 0.7) title = isHe ? 'אלופת ה-Eras! ✨' : 'Eras Champion! ✨';

    return (
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-delicate)',
        borderRadius: '24px',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        boxShadow: '0 4px 18px rgba(58, 46, 43, 0.04)',
        maxWidth: '560px',
        margin: '0 auto'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#FFF0F5',
          color: 'var(--primary-rose-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}>
          <Award size={32} />
        </div>

        <h3 style={{ fontSize: '1.5rem', color: 'var(--text-dark)', margin: '0 0 0.5rem', fontFamily: '"Georgia", serif' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 1.5rem' }}>
          {isHe
            ? `סיימת את כל ה-Eras עם ${score} נקודות מתוך ${totalScore}!`
            : `You completed all Eras with ${score} out of ${totalScore} points!`}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={handleRestart}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1.3rem',
              borderRadius: '20px',
              backgroundColor: 'var(--primary-rose)',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={15} />
            {isHe ? 'שחקי שוב' : 'Play Again'}
          </button>
          <button
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1.3rem',
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

  const progressPercent = ((currentIdx + 1) / ERAS_DATA.length) * 100;

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
        boxShadow: '0 4px 18px rgba(58, 46, 43, 0.03)',
        transition: 'all 0.3s ease'
      }}>
        {/* כותרת עליונה דינמית של ה-Era */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '20px',
            backgroundColor: currentQuestion.badgeBg,
            color: currentQuestion.color,
            fontWeight: 700,
            fontSize: '0.85rem'
          }}>
            <span>Era {currentIdx + 1}/{ERAS_DATA.length}:</span>
            <span>{currentQuestion.era}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              {isHe ? `ניקוד: ${score}` : `Score: ${score}`}
            </span>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              color: timeLeft <= 5 ? '#C62828' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.88rem'
            }}>
              <Clock size={16} />
              <span>{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* פס התקדמות בצבע ה-Era */}
        <div style={{
          width: '100%',
          height: '6px',
          borderRadius: '3px',
          backgroundColor: 'var(--bg-subtle)',
          overflow: 'hidden',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: currentQuestion.btnBg,
            transition: 'width 0.4s ease, background-color 0.4s ease'
          }} />
        </div>

        {/* שאלת הטריוויה */}
        <h3 style={{
          margin: '0 0 1.5rem 0',
          fontSize: '1.2rem',
          lineHeight: '1.5',
          color: 'var(--text-dark)',
          fontFamily: '"Georgia", serif'
        }}>
          {currentQuestion.question}
        </h3>

        {/* 4 אפשרויות בחירה */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {currentQuestion.options.map((opt, idx) => {
            let btnBg = 'var(--bg-creamy)';
            let btnBorder = 'var(--border-delicate)';
            let btnColor = 'var(--text-dark)';

            if (isAnswered) {
              if (idx === currentQuestion.correct) {
                btnBg = '#E8F5E9';
                btnBorder = '#4CAF50';
                btnColor = '#2E7D32';
              } else if (idx === selectedOpt) {
                btnBg = '#FFEBEE';
                btnBorder = '#EF5350';
                btnColor = '#C62828';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                style={{
                  padding: '0.85rem 1.15rem',
                  borderRadius: '16px',
                  border: `1.5px solid ${btnBorder}`,
                  backgroundColor: btnBg,
                  color: btnColor,
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  textAlign: isHe ? 'right' : 'left',
                  cursor: isAnswered ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{opt}</span>
                {isAnswered && idx === currentQuestion.correct && (
                  <CheckCircle2 size={18} color="#2E7D32" />
                )}
                {isAnswered && idx === selectedOpt && idx !== currentQuestion.correct && (
                  <XCircle size={18} color="#C62828" />
                )}
              </button>
            );
          })}
        </div>

        {/* כפתור מעבר דינמי בצבע ה-Era הנוכחית */}
        {isAnswered && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleNextQuestion}
              style={{
                padding: '0.6rem 1.35rem',
                borderRadius: '18px',
                backgroundColor: currentQuestion.btnBg,
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.88rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              {currentIdx + 1 < ERAS_DATA.length 
                ? (isHe ? 'ל-Era הבאה ➔' : 'Next Era ➔')
                : (isHe ? 'לסיום וצפייה בתוצאה 🏆' : 'Finish & View Score 🏆')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}