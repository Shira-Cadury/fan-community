import React, { useState } from 'react';
import { Sparkles, RefreshCw, Share2, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const ERA_DATA = {
  lover: {
    name: 'Lover',
    color: '#F48FB1',
    bg: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 50%, #E1BEE7 100%)',
    textColor: '#880E4F',
    desc: {
      he: 'את אדם מלא באור, רומנטיקה ואופטימיות! החיים שלך צבועים בצבעי פסטל בהירים, ואת בוחרת תמיד לראות את הטוב באנשים ולהתמקד באהבה, חמלה ושמחה. את אוהבת לחגוג את הרגעים הקטנים, מחוברת לרגשות שלך בצורה מלאה ולא מפחדת להראות לעולם את הלב הגדול והרגיש שלך.',
      en: 'You are radiant, romantic, and endlessly optimistic! You view the world through soft pastel hues, embracing empathy, celebration, and unapologetic affection. You are deeply in touch with your emotions and never afraid to show your big, golden heart.'
    }
  },
  reputation: {
    name: 'reputation',
    color: '#212121',
    bg: 'linear-gradient(135deg, #212121 0%, #424242 100%)',
    textColor: '#FFFFFF',
    desc: {
      he: 'את בתקופה שבה את חזקה, בטוחה בעצמך ולא דופקת חשבון לאף אחד. מתחת למעטפת הקשוחה, המגוננת והאדג\'ית שלך, יש לך נאמנות אינסופית לאנשים שקרובים אלייך באמת ואהבה עמוקה שאת שומרת רק למי שראוי לה. את יודעת להילחם על שלך, לקום מהריסות חזקה יותר ולתת למעשים שלך לדבר.',
      en: 'You are fierce, fiercely protective, and completely unapologetic. Beneath the sharp armor and dark aesthetics lies profound loyalty and rare tenderness reserved only for those who truly earn your trust. You rise from the ashes stronger every single time.'
    }
  },
  evermore: {
    name: 'evermore',
    color: '#8D6E63',
    bg: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)',
    textColor: '#3E2723',
    desc: {
      he: 'את אוהבת עומק, סיפורים נוסטלגיים ופיוטיים. הלב שלך נמצא במקומות שקטים, בטבע וביצירתיות, ויש לך יכולת מדהימה למצוא יופי גם ברגעים מלנכוליים. את מעריכה אומנות אמיתית, כתיבה ומחשבה עמוקה, ובדיוק כמו האלבום – החוסן השקט שלך מוכיח שגם כאבים שנראים נצחיים חולפים.',
      en: 'You are an old soul enamored by poetry, quiet woodland walks, and layered storytelling. You discover sublime beauty even within melancholy, possessing a calm, resilient grace that proves all enduring pains eventually heal.'
    }
  },
  folklore: {
    name: 'folklore',
    color: '#78909C',
    bg: 'linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%)',
    textColor: '#263238',
    desc: {
      he: 'את חיה בעולם עשיר של דמיון, סקרנות וחיבור עמוק לסיפורים של אחרים. יש לך נפש של סופרת ורגישות מיוחדת לפרטים הקטנים. את מעדיפה שיחות עמוקות לתוך הלילה על פני מסיבות רועשות, ויודעת לברוח לעולמות קסומים של מילים ורגש.',
      en: 'You dwell in richly woven narratives, quiet reflection, and soulful daydreams. You possess an innate empathy and an artistic eye that turns ordinary life into timeless folklore.'
    }
  },
  midnights: {
    name: 'Midnights',
    color: '#303F9F',
    bg: 'linear-gradient(135deg, #1A237E 0%, #283593 100%)',
    textColor: '#FFFFFF',
    desc: {
      he: 'את טיפוס לילה מובהק שחושב על החיים בשעות הקטנות. יש בך שילוב מסקרן של תחכום, שנינות ומודעות עצמית גבוהה. את יודעת לזרוח כשצריך, אבל גם להתעמת עם המחשבות העמוקות ביותר שלך באומץ ובסטייל בלתי מתפשר.',
      en: 'A midnight thinker characterized by contemplative late nights, self-awareness, and magnetic glamour. You balance honest vulnerability with sharp, irresistible confidence.'
    }
  },
  nineteen89: {
    name: '1989',
    color: '#4FC3F7',
    bg: 'linear-gradient(135deg, #E1F5FE 0%, #B3E5FC 100%)',
    textColor: '#01579B',
    desc: {
      he: 'את מלאת אנרגיה, עצמאית ומוכנה לכבוש את העולם! את אוהבת התחלות חדשות, חברויות קרובות ורגעים ספונטניים של חופש טהור. את לא נותנת לרעשי רקע להוריד אותך, ויודעת לנער מעלייך כל דבר שלא משרת אותך יותר בכיף ובביטחון.',
      en: 'Independent, radiant, and unstoppable! You thrive on clean slates, vibrant city skylines, and genuine camaraderie. You gracefully shake off negativity and write your own soundtrack.'
    }
  },
  red: {
    name: 'Red',
    color: '#C62828',
    bg: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)',
    textColor: '#B71C1C',
    desc: {
      he: 'את חיה את הרגשות שלך במקסימום ווליום – בתשוקה, באהבה ובעוצמה. את לא מפחדת להרגיש עד הסוף, לכתוב את הכאב או לחגוג את השמחה. הכנות והאותנטיות שלך הן הכוח הכי גדול שלך.',
      en: 'Passionate, intensely expressive, and entirely genuine. You feel every heartbeat and heartbreak in vibrant shades of passion, embracing love and nostalgia with heroic honesty.'
    }
  },
  ttpd: {
    name: 'The Tortured Poets Department',
    color: '#5D4037',
    bg: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)',
    textColor: '#3E2723',
    desc: {
      he: 'את אינטלקטואלית, פיוטית, ולא מפחדת מדרמה רגשית גדולה. יש לך צורך לפרוק את המחשבות שלך בכתיבה ובמילים חדות. את מסתכלת על החיים כמו יצירת אומנות טרגית ומפוארת בו-זמנית.',
      en: 'An analytical poet at heart. You turn raw heartache, existential musings, and complicated feelings into unforgettable literary masterpieces.'
    }
  }
};

const QUESTIONS = [
  {
    id: 1,
    q: {
      he: 'מהי דרך הבילוי המועדפת עלייך בסוף השבוע?',
      en: 'What is your ideal way to spend a weekend?'
    },
    options: [
      { text: { he: 'מסיבה קצבית עם חברים, ריקודים ואורות נוצצים ✨', en: 'A vibrant party with friends, dancing and sparkling lights ✨' }, eras: ['nineteen89', 'midnights'] },
      { text: { he: 'טיול בטבע, יער ערפילי, או התכרבלות עם ספר טוב 🌲', en: 'A forest walk, foggy trails, or curling up with a book 🌲' }, eras: ['evermore', 'folklore'] },
      { text: { he: 'יום יצירתי בבית, אפיית עוגיות, ציור או תפירה 🧁', en: 'A cozy creative day at home: baking cookies or painting 🧁' }, eras: ['lover', 'red'] },
      { text: { he: 'לילה חשוך, מוזיקה חזקה באוזניות, כתיבה ביומן 🖤', en: 'Late night with headphones, journaling or deep mystery films 🖤' }, eras: ['reputation', 'ttpd'] }
    ]
  },
  {
    id: 2,
    q: {
      he: 'איזה סגנון לבוש/אסתטיקה הכי מושך אותך כרגע?',
      en: 'Which style or aesthetic speaks to you most right now?'
    },
    options: [
      { text: { he: 'שמלות וינטג\', סוודרים סרוגים, גווני חום וירוק זית 🍂', en: 'Vintage dresses, chunky knit sweaters, olive & earthy tones 🍂' }, eras: ['evermore', 'folklore'] },
      { text: { he: 'בגדים שחורים, ג\'קט עור, אקססוריז מטאליים וסטייל חד 🐍', en: 'All-black outfits, leather jackets, sharp modern tailoring 🐍' }, eras: ['reputation'] },
      { text: { he: 'שמלות קלילות, צבעי פסטל (ורוד, תכלת), נצנצים ואור 🌸', en: 'Pastels (pink, sky blue), dreamy soft fabrics, butterflies 🌸' }, eras: ['lover'] },
      { text: { he: 'כחול עמוק, קטיפה, סגול או כסף, מראה מודרני מנצנץ 🌌', en: 'Midnight blue, velvet, deep purple and shimmering silver 🌌' }, eras: ['midnights'] }
    ]
  },
  {
    id: 3,
    q: {
      he: 'איזה משקה או מאכל הכי מתאים למצב הרוח שלך?',
      en: 'What beverage or treat matches your current mood?'
    },
    options: [
      { text: { he: 'שוקו חם עם מרשמלו מול החלון הגשום ☕', en: 'Hot cocoa with marshmallows watching the rain ☕' }, eras: ['evermore', 'folklore'] },
      { text: { he: 'אספרסו כפול וחזק, משהו מדויק שמעורר את המוח ⚡', en: 'Double shot black espresso — sharp and focused ⚡' }, eras: ['reputation', 'ttpd'] },
      { text: { he: 'אייס וניל מתוק, מילקשייק תות או משקה פירותי קייצי 🍓', en: 'Sweet iced strawberry latte or a sunny fruity smoothie 🍓' }, eras: ['lover', 'nineteen89'] },
      { text: { he: 'תה ארל גריי עם דבש בזמן האזנה לשירים נוסטלגיים 🍯', en: 'Earl Grey tea with honey listening to wistful records 🍯' }, eras: ['red', 'evermore'] }
    ]
  },
  {
    id: 4,
    q: {
      he: 'איך את מתמודדת בדרך כלל כשמישהו פוגע בך?',
      en: 'How do you usually handle getting hurt or let down?'
    },
    options: [
      { text: { he: 'מתנתקת מהרעש, מציבה גבולות ברורים וממשיכה הלאה חזקה יותר 🛡️', en: 'Cut the noise, set unbreakable boundaries, and return stronger 🛡️' }, eras: ['reputation'] },
      { text: { he: 'מסתגרת עם המחשבות, כותבת ומנתחת כל מילה שנאמרה 📜', en: 'Retreat inwards, writing and analyzing every detail into poetry 📜' }, eras: ['ttpd', 'folklore'] },
      { text: { he: 'בוחרת לסלוח ולהתמקד באהבה של מי שבאמת אוהב אותי 💖', en: 'Choose forgiveness and pour affection into those who truly love me 💖' }, eras: ['lover'] },
      { text: { he: 'יוצאת לנשום אוויר, שמה שיר קצבי ומנערת את זה ממני 🏙️', en: 'Step outside, blast an upbeat anthem, and shake it off 🏙️' }, eras: ['nineteen89', 'red'] }
    ]
  },
  {
    id: 5,
    q: {
      he: 'איזה משפט הכי מגדיר את התקופה הנוכחית שלך בחיים?',
      en: 'Which lyric/sentiment best defines your life right now?'
    },
    options: [
      { text: { he: '"אני מגלה את העצמאות שלי ומוכנה להרפתקה הבאה!" 🌟', en: '"I am embracing my independence and ready for the next adventure!" 🌟' }, eras: ['nineteen89'] },
      { text: { he: '"יש בי שקט פנימי, גם אם דברים משתנים מסביב" 🌿', en: '"I hold a quiet peace within me, even when seasons change" 🌿' }, eras: ['evermore', 'folklore'] },
      { text: { he: '"הלב שלי פתוח ואני רוצה לחוות כל רגע במלואו" 💘', en: '"My heart is open and I want to experience every feeling fully" 💘' }, eras: ['lover', 'red'] },
      { text: { he: '"אני מסתכלת לאמת בעיניים, בלי פילטרים ובלי מסיכות" 🌒', en: '"I look reality in the eye — unfiltered and unapologetic" 🌒' }, eras: ['midnights', 'ttpd', 'reputation'] }
    ]
  }
];

export default function EraQuizGame({ lang = 'he' }) {
  const isHe = lang === 'he';
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState({});
  const [resultEra, setResultEra] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSelectOption = (eras) => {
    const newScores = { ...scores };
    eras.forEach((era) => {
      newScores[era] = (newScores[era] || 0) + 1;
    });
    setScores(newScores);

    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // חישוב התוצאה המובילה
      let topEra = 'lover';
      let maxScore = -1;
      Object.entries(newScores).forEach(([era, count]) => {
        if (count > maxScore) {
          maxScore = count;
          topEra = era;
        }
      });
      setResultEra(topEra);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScores({});
    setResultEra(null);
    setCopied(false);
  };

  const handleShare = () => {
    if (!resultEra) return;
    const eraInfo = ERA_DATA[resultEra];
    const text = isHe
      ? `עשיתי את השאלון ב-Swift Secrets ויצאתי ה-Era של "${eraInfo.name}"! 💿✨ בדקו מה ה-Era שלכן!`
      : `I took the Swift Secrets quiz and got "${eraInfo.name}" Era! 💿✨ Find out yours!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // מסך תוצאה סופית
  if (resultEra) {
    const era = ERA_DATA[resultEra];
    return (
      <div style={{
        background: era.bg,
        border: `2px solid ${era.color}`,
        borderRadius: '24px',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
        color: era.textColor,
        maxWidth: '650px',
        margin: '0 auto',
        animation: 'fadeIn 0.4s ease'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          fontSize: '0.85rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          opacity: 0.9,
          marginBottom: '0.75rem'
        }}>
          <Sparkles size={16} />
          {isHe ? 'התוצאה שלך' : 'Your Result'}
          <Sparkles size={16} />
        </div>

        <h2 style={{
          fontSize: '2.4rem',
          margin: '0 0 1.25rem',
          fontFamily: '"Georgia", serif',
          fontWeight: 800
        }}>
          {isHe ? `את ה-Era של "${era.name}"!` : `You are "${era.name}"!`}
        </h2>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#2b2b2b',
          borderRadius: '20px',
          padding: '1.6rem',
          fontSize: '1rem',
          lineHeight: '1.7',
          textAlign: isHe ? 'right' : 'left',
          marginBottom: '1.75rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
        }}>
          {era.desc[lang] || era.desc.he}
        </div>

        <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleShare}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.65rem 1.4rem',
              borderRadius: '20px',
              backgroundColor: '#fff',
              color: '#333',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
            }}
          >
            {copied ? <Check size={16} color="#2E7D32" /> : <Share2 size={16} />}
            {copied ? (isHe ? 'הועתק ללוח!' : 'Copied!') : (isHe ? 'שיתוף התוצאה' : 'Share Result')}
          </button>

          <button
            onClick={handleRestart}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.65rem 1.4rem',
              borderRadius: '20px',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={15} />
            {isHe ? 'שחקי שוב' : 'Play Again'}
          </button>
        </div>
      </div>
    );
  }

  // מסך הצגת השאלות
  const currentQ = QUESTIONS[currentIdx];
  const progressPercent = ((currentIdx + 1) / QUESTIONS.length) * 100;

  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      border: '1.5px solid var(--border-delicate)',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      maxWidth: '650px',
      margin: '0 auto',
      boxShadow: '0 6px 20px rgba(58, 46, 43, 0.03)'
    }}>
      {/* מד התקדמות עליון */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          marginBottom: '0.5rem'
        }}>
          <span>{isHe ? `שאלה ${currentIdx + 1} מתוך ${QUESTIONS.length}` : `Question ${currentIdx + 1} of ${QUESTIONS.length}`}</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div style={{
          width: '100%',
          height: '6px',
          backgroundColor: 'var(--bg-creamy)',
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: 'var(--primary-rose)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* גוף השאלה */}
      <h3 style={{
        fontSize: '1.25rem',
        color: 'var(--text-dark)',
        margin: '0 0 1.25rem',
        fontFamily: '"Georgia", serif',
        lineHeight: '1.5'
      }}>
        {currentQ.q[lang] || currentQ.q.he}
      </h3>

      {/* 4 אפשרויות בחירה */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {currentQ.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectOption(opt.eras)}
            style={{
              padding: '1rem 1.2rem',
              borderRadius: '16px',
              border: '1px solid var(--border-delicate)',
              backgroundColor: 'var(--bg-creamy)',
              color: 'var(--text-dark)',
              textAlign: isHe ? 'right' : 'left',
              fontSize: '0.92rem',
              fontWeight: 500,
              cursor: 'pointer',
              lineHeight: '1.4',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
              e.currentTarget.style.borderColor = 'var(--primary-rose)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-creamy)';
              e.currentTarget.style.borderColor = 'var(--border-delicate)';
            }}
          >
            <span>{opt.text[lang] || opt.text.he}</span>
            {isHe ? <ArrowLeft size={16} color="var(--primary-rose-dark)" /> : <ArrowRight size={16} color="var(--primary-rose-dark)" />}
          </button>
        ))}
      </div>
    </div>
  );
}