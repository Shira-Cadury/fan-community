import React, { useState } from 'react';
import { Lightbulb, RotateCcw, ArrowRight, ArrowLeft, CheckCircle2, XCircle, Award } from 'lucide-react';

const THEORIES_DATA = [
  {
    theory: 'במהלך ההופעות בלוס אנג\'לס, טיילור החליפה לשמלות כחולות בכל הסטים באותו ערב כדי לרמוז על ההכרזה של 1989 (Taylor\'s Version).',
    isMastermind: true,
    truth: 'גאונות צרופה! ב-9 באוגוסט 2023 טיילור לבשה אך ורק תלבושות כחולות חדשות והכריזה רשמית על 1989 TV באותו מופע.'
  },
  {
    theory: 'הספירה לאחור המסתורית שהופיעה באתר הרשמי בספטמבר רמזה על שחרור כפול בהפתעה של Debut ו-Reputation באותו לילה.',
    isMastermind: false,
    truth: 'קלאונינג מוחלט! הספירה לאחור הייתה בכלל לרגל השקת מהדורה מוגבלת של מרצ\'נדייז באתר.'
  },
  {
    theory: 'בקליפ של Bejeweled, כפתורי המעלית הצבעוניים רמזו במדויק על סדר שחרור אלבומי ה-Taylor\'s Version הבאים.',
    isMastermind: true,
    truth: 'מדויק להפליא! כפתור 3 הסגול (Speak Now) וכפתור 5 התכלת (1989) חזו במדויק את סדר האלבומים שיצאו.'
  },
  {
    theory: 'הספר "ארגייל" (Argylle) נכתב תחת שם בדוי על ידי טיילור סוויפט בגלל החתול בתיק והסוודר שלבשה.',
    isMastermind: false,
    truth: 'ליצנות טהורה! במאי הסרט והסופרת אישרו שטיילור לא כתבה את הספר, והדמיון היה מקרי לחלוטין.'
  },
  {
    theory: 'טיילור רמזה על שם האלבום "Midnights" דרך נאום הזכייה שלה ב-VMAs שבו אמרה "I will meet you at midnight".',
    isMastermind: true,
    truth: 'בול! באותו הלילה בדיוק בחצות, טיילור חשפה לראשונה את עטיפת האלבום Midnights ברשתות.'
  },
  {
    theory: 'טיילור תכננה להוציא אלבום סודי ואבוד בשם "Karma" בשנת 2016 עם שיער מחומצן בסגנון רוק-פאנק.',
    isMastermind: false,
    truth: 'אחת מתיאוריות הליצנות הוותיקות והאהובות ביותר ברשת, אך מעולם לא אושרה ולא הוכחה במציאות.'
  },
  {
    theory: 'בסרטון הטיקטוק של Midnights Mayhem With Me, טיילור החזיקה את שפופרת הטלפון הפוך בפרקים ספציפיים כדי לרמוז על שיתופי פעולה.',
    isMastermind: true,
    truth: 'אכן Mastermind! הפרק היחיד שבו החזיקה את הטלפון הפוך היה Track 4, שהתברר כשיתוף הפעולה עם לנה דל ריי (Snow on the Beach).'
  },
  {
    theory: 'שער הכניסה של עיריית גלנדייל שינה את שמו ל-"Swift City" רק בגלל מתיחה של מעריצים בטוויטר.',
    isMastermind: false,
    truth: 'ממש לא קלאונינג! ראש עיריית גלנדייל, אריזונה, הכריז על כך רשמית לכבוד פתיחת סיבוב ההופעות The Eras Tour.'
  },
  {
    theory: 'השיר "All Too Well" נכתב במקור כאילתור של מעל 10 דקות במהלך חזרות להופעה כשטיילור הייתה נסערת.',
    isMastermind: true,
    truth: 'אמת לאמיתה! הלהקה התחילה לנגן אקורדים וטיילור החלה לאלתר מילים במשך כ-15 דקות, מה שהוביל לגרסת ה-10 דקות המפורסמת.'
  },
  {
    theory: 'במהלך טקס הגראמי, המעריצים חשבו שטיילור תכריז על Reputation TV, אך במקום זאת היא הכריזה על The Tortured Poets Department.',
    isMastermind: false,
    truth: 'כולם שמו אף ליצן! שחור ולבן בפיד גרם לכולם לחשוב על Rep, אך טיילור הפתיעה את העולם עם אלבום חדש לגמרי.'
  }
];

export default function MastermindClown({ lang, onBack }) {
  const isHe = lang === 'he';
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [userChoice, setUserChoice] = useState(null); // true = Mastermind, false = Clown
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const current = THEORIES_DATA[currentIdx];
  const BackIcon = isHe ? ArrowRight : ArrowLeft;

  const handleChoice = (choice) => {
    if (isAnswered) return;
    setUserChoice(choice);
    setIsAnswered(true);

    if (choice === current.isMastermind) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < THEORIES_DATA.length) {
      setCurrentIdx((prev) => prev + 1);
      setUserChoice(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setUserChoice(null);
    setIsAnswered(false);
    setIsGameOver(false);
  };

  if (isGameOver) {
    let rankTitle = '';
    let rankSubtitle = '';
    let rankColor = '';

    if (score >= 8) {
      rankTitle = 'The Mastermind 🧠✨';
      rankSubtitle = isHe ? 'אתם קוראים את המחשבות של טיילור! אי אפשר לעבוד עליכם.' : 'You read Taylor\'s mind! True genius.';
      rankColor = '#1976D2';
    } else if (score >= 4) {
      rankTitle = 'Casual Swiftie 🎶';
      rankSubtitle = isHe ? 'מעריצים טובים באמצע הדרך, לפעמים גאונים ולפעמים עם אף אדום!' : 'Great balance between facts and fun theories!';
      rankColor = '#8A4B82';
    } else {
      rankTitle = 'Certified Clown 🤡🎈';
      rankSubtitle = isHe ? 'ליצנים מוסמכים! אתם מאמינים לכל פוסט ולכל תיאוריה בטיקטוק...' : 'You believe every single TikTok theory!';
      rankColor = '#D32F2F';
    }

    return (
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-delicate)',
        borderRadius: '24px',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        maxWidth: '560px',
        margin: '0 auto',
        boxShadow: '0 6px 20px rgba(58, 46, 43, 0.05)'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#F3EBF7',
          color: rankColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}>
          <Award size={36} />
        </div>

        <h3 style={{ fontSize: '1.65rem', margin: '0 0 0.5rem', color: rankColor, fontFamily: '"Georgia", serif' }}>
          {rankTitle}
        </h3>
        <p style={{ color: 'var(--text-dark)', fontSize: '1rem', fontWeight: 600, margin: '0 0 0.5rem' }}>
          {isHe ? `ענית נכון על ${score} מתוך ${THEORIES_DATA.length} תיאוריות!` : `You got ${score} out of ${THEORIES_DATA.length} theories correct!`}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: '0 0 1.75rem' }}>
          {rankSubtitle}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={handleRestart}
            style={{
              padding: '0.65rem 1.4rem',
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
              padding: '0.65rem 1.4rem',
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

  const isCorrectGuess = userChoice === current.isMastermind;

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
        {/* ראש הכרטיסייה: מונה שאלות וציון */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--secondary-sage-dark)' }}>
            {isHe ? `תיאוריה ${currentIdx + 1}/${THEORIES_DATA.length}` : `Theory ${currentIdx + 1}/${THEORIES_DATA.length}`}
          </span>
          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-dark)' }}>
            {isHe ? `ניקוד: ${score}` : `Score: ${score}`}
          </span>
        </div>

        {/* כרטיסיית התיאוריה */}
        <div style={{
          backgroundColor: '#FFFDF9',
          border: '1.5px solid #F0E6D8',
          borderRadius: '20px',
          padding: '2rem 1.4rem',
          textAlign: 'center',
          marginBottom: '1.75rem',
          boxShadow: '0 3px 10px rgba(0,0,0,0.02)'
        }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', fontWeight: 700 }}>
            {isHe ? 'האם התיאוריה נכונה או קלאונינג?' : 'Is it real or just clowning?'}
          </span>
          <h3 style={{
            fontSize: '1.3rem',
            lineHeight: '1.5',
            color: 'var(--text-dark)',
            fontFamily: '"Georgia", serif',
            margin: '0.85rem 0 0'
          }}>
            "{current.theory}"
          </h3>
        </div>

        {/* שני כפתורי ענק: Mastermind מול Clown */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {/* כפתור Mastermind */}
          <button
            disabled={isAnswered}
            onClick={() => handleChoice(true)}
            style={{
              padding: '1.2rem 1rem',
              borderRadius: '20px',
              border: isAnswered && current.isMastermind
                ? '2.5px solid #1E88E5'
                : '1.5px solid #BBDEFB',
              backgroundColor: isAnswered && current.isMastermind ? '#E3F2FD' : '#F5F9FF',
              color: '#0D47A1',
              cursor: isAnswered ? 'default' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s',
              opacity: isAnswered && !current.isMastermind ? 0.5 : 1
            }}
          >
            <span style={{ fontSize: '2rem' }}>🧠</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 700 }}>Mastermind</span>
            <span style={{ fontSize: '0.78rem', color: '#1565C0', fontWeight: 500 }}>
              {isHe ? '(גאונות - קרה במציאות!)' : '(It actually happened!)'}
            </span>
          </button>

          {/* כפתור Clown */}
          <button
            disabled={isAnswered}
            onClick={() => handleChoice(false)}
            style={{
              padding: '1.2rem 1rem',
              borderRadius: '20px',
              border: isAnswered && !current.isMastermind
                ? '2.5px solid #E53935'
                : '1.5px solid #FFCDD2',
              backgroundColor: isAnswered && !current.isMastermind ? '#FFEBEE' : '#FFF8F8',
              color: '#B71C1C',
              cursor: isAnswered ? 'default' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s',
              opacity: isAnswered && current.isMastermind ? 0.5 : 1
            }}
          >
            <span style={{ fontSize: '2rem' }}>🤡</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 700 }}>Clown</span>
            <span style={{ fontSize: '0.78rem', color: '#C62828', fontWeight: 500 }}>
              {isHe ? '(ליצנות - לא קרה מעולם)' : '(Pure delusion / false)'}
            </span>
          </button>
        </div>

        {/* אזור התוצאה וההסבר (The Truth) */}
        {isAnswered && (
          <div style={{
            backgroundColor: isCorrectGuess ? '#E8F5E9' : '#FFF3E0',
            border: `1.5px solid ${isCorrectGuess ? '#81C784' : '#FFB74D'}`,
            borderRadius: '18px',
            padding: '1.25rem',
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isCorrectGuess ? (
                <>
                  <CheckCircle2 size={20} color="#2E7D32" />
                  <span style={{ fontWeight: 700, color: '#2E7D32', fontSize: '1rem' }}>
                    {isHe ? 'צדקת לחלוטין! 🎉' : 'Spot on! 🎉'}
                  </span>
                </>
              ) : (
                <>
                  <XCircle size={20} color="#E65100" />
                  <span style={{ fontWeight: 700, color: '#E65100', fontSize: '1rem' }}>
                    {isHe ? 'טעית הפעם! 🙈' : 'Oops, not this time! 🙈'}
                  </span>
                </>
              )}
            </div>

            <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.55', color: 'var(--text-dark)' }}>
              <strong>{isHe ? 'מה קרה במציאות (The Truth):' : 'The Truth:'}</strong> {current.truth}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
              <button
                onClick={handleNext}
                style={{
                  padding: '0.55rem 1.3rem',
                  borderRadius: '16px',
                  backgroundColor: 'var(--primary-rose)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '0.88rem'
                }}
              >
                {currentIdx + 1 < THEORIES_DATA.length 
                  ? (isHe ? 'לתיאוריה הבאה ➔' : 'Next Theory ➔') 
                  : (isHe ? 'לסיום וקבלת התואר 🏆' : 'View Your Title 🏆')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}