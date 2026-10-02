import React, { useState } from 'react';
import { Sparkles, RefreshCw, Share2, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const ERA_DATA = {
  debut: {
    name: 'Taylor Swift (Debut)',
    color: '#2E7D32',
    bg: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)',
    textColor: '#1B5E20',
    desc: {
      he: 'את מחוברת לשורשים, מלאת תמימות יפה, חולמת בגדול ומאמינה בכוחם של התחלות חדשות. הגיטרה האקוסטית, ריח השדות והכנות הפשוטה והטהורה מגדירים את הלב שלך. את לא מתביישת להראות את הפגיעות שלך ויוצאת לעולם עם חיוך ואומץ.',
      en: 'Grounded, heartfelt, and full of sweet innocence. You find magic in simple guitar melodies, summer evenings, and big, brave dreams. You wear your heart on your sleeve with genuine courage.'
    }
  },
  fearless: {
    name: 'Fearless',
    color: '#F57F17',
    bg: 'linear-gradient(135deg, #FFFDE7 0%, #FFF9C4 50%, #FFE082 100%)',
    textColor: '#E65100',
    desc: {
      he: 'את חסרת פחד! את מאמינה בסיפורי אגדות, בריקוד תחת הגשם ובאהבה ראשונה שמרגישה כמו ניצוץ קסום. את קופצת לחיים בשתי רגליים, לא מפחדת לקחת סיכונים על מה שחשוב לך, ומביאה איתך אנרגיה זהובה, נוצצת ומחבקת לכל מקום.',
      en: 'Unstoppable, fairy-tale dreaming, and golden-hearted! You dance in the rain, take bold leaps of faith for love, and light up any room with your radiant optimism and fearless spirit.'
    }
  },
  speakNow: {
    name: 'Speak Now',
    color: '#7B1FA2',
    bg: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 50%, #CE93D8 100%)',
    textColor: '#4A148C',
    desc: {
      he: 'את דרמטית, כובשת ומאמינה בצדק ובאמת ללא פשרות. את לא שותקת כשמשהו חשוב לך, כותבת את הסיפור שלך בעצמך ומלאה בקסם של שמלות נשף, זיקוקים ורגשות עמוקים. החיים עבורך הם אגדה עוצמתית עם סוף שאת מכתיבה.',
      en: 'Enchanting, outspoken, and theatrical. You refuse to stay silent, writing your own narrative filled with dragons, sparks flying, and unapologetic self-expression.'
    }
  },
  red: {
    name: 'Red',
    color: '#C62828',
    bg: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)',
    textColor: '#B71C1C',
    desc: {
      he: 'את חיה את הרגשות שלך במקסימום ווליום – בתשוקה, באהבה ובעוצמה. את לא מפחדת להרגיש עד הסוף, לכתוב את הכאב או לחגוג את השמחה. הכנות, הסוודרים הסתוויים והאותנטיות שלך הן הכוח הכי גדול שלך.',
      en: 'Passionate, expressive, and fiercely genuine. You live love in burning shades of red, embracing nostalgia, fall leaves, and emotional honesty.'
    }
  },
  nineteen89: {
    name: '1989',
    color: '#0288D1',
    bg: 'linear-gradient(135deg, #E1F5FE 0%, #B3E5FC 100%)',
    textColor: '#01579B',
    desc: {
      he: 'את מלאת אנרגיה, עצמאית ומוכנה לכבוש את העיר הגדולה! את אוהבת התחלות חדשות, חברויות קרובות ורגעים ספונטניים של חופש טהור. את מנערת מעלייך כל רעש שלילי בביטחון ובסטייל בלתי מתפשר.',
      en: 'Independent, vibrant, and ready to take on the world! You thrive on clean slates, city skylines, and shaking off negativity with effortless chic confidence.'
    }
  },
  reputation: {
    name: 'reputation',
    color: '#212121',
    bg: 'linear-gradient(135deg, #212121 0%, #424242 100%)',
    textColor: '#FFFFFF',
    desc: {
      he: 'את בתקופה שבה את חזקה, בטוחה בעצמך ולא דופקת חשבון לאף אחד. מתחת למעטפת הקשוחה, המגוננת והאדג\'ית שלך, יש לך נאמנות אינסופית לאנשים שקרובים אלייך באמת ואהבה עמוקה שאת שומרת רק למי שראוי לה.',
      en: 'Fierce, protective, and completely unapologetic. Beneath the sharp black aesthetic lies rare loyalty and profound tenderness reserved only for those who earn your trust.'
    }
  },
  lover: {
    name: 'Lover',
    color: '#EC407A',
    bg: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 50%, #E1BEE7 100%)',
    textColor: '#880E4F',
    desc: {
      he: 'את אדם מלא באור, רומנטיקה ואופטימיות! החיים שלך צבועים בצבעי פסטל בהירים, ואת בוחרת תמיד לראות את הטוב באנשים ולהתמקד באהבה, חמלה ושמחה. את לא מפחדת להראות לעולם את הלב הגדול והרגיש שלך.',
      en: 'Radiant, romantic, and endlessly sweet! You look at the world through pastel sunsets, empathy, and unapologetic tenderness.'
    }
  },
  folklore: {
    name: 'folklore',
    color: '#546E7A',
    bg: 'linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%)',
    textColor: '#263238',
    desc: {
      he: 'את חיה בעולם עשיר של דמיון, סקרנות וחיבור עמוק לסיפורים של אחרים. יש לך נפש של סופרת ורגישות מיוחדת לפרטים הקטנים. את מעדיפה שיחות עמוקות לתוך הלילה על פני מסיבות רועשות, ויודעת לברוח לעולמות קסומים של מילים ורגש.',
      en: 'A poetic soul woven of daydreams, quiet woodlands, and timeless empathy. You look at life through an artistic lens that turns quiet moments into enduring legends.'
    }
  },
  evermore: {
    name: 'evermore',
    color: '#8D6E63',
    bg: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)',
    textColor: '#3E2723',
    desc: {
      he: 'את אוהבת עומק, סיפורים נוסטלגיים ופיוטיים. הלב שלך נמצא במקומות שקטים, בטבע וביצירתיות, ויש לך יכולת מדהימה למצוא יופי גם ברגעים מלנכוליים. החוסן השקט שלך מוכיח שגם כאבים שנראים נצחיים חולפים בסוף.',
      en: 'An old soul enamored by layered storytelling, cozy plaids, and autumn forests. You find peace in melancholy and possess a graceful, resilient heart.'
    }
  },
  midnights: {
    name: 'Midnights',
    color: '#283593',
    bg: 'linear-gradient(135deg, #1A237E 0%, #283593 100%)',
    textColor: '#FFFFFF',
    desc: {
      he: 'את טיפוס לילה מובהק שחושב על החיים בשעות הקטנות. יש בך שילוב מסקרן של תחכום, שנינות ומודעות עצמית גבוהה. את יודעת לזרוח בביטחון, אך גם להתעמת עם המחשבות העמוקות ביותר שלך בסטייל בלתי מתפשר.',
      en: 'Contemplative, glamorous, and nocturnal. You dance with your late-night thoughts, balancing honest vulnerability with sharp wit and sparkling confidence.'
    }
  },
  ttpd: {
    name: 'The Tortured Poets Department',
    color: '#4E342E',
    bg: 'linear-gradient(135deg, #D7CCC8 0%, #BCAAA4 100%)',
    textColor: '#271713',
    desc: {
      he: 'את אינטלקטואלית, פיוטית, ולא מפחדת מדרמה רגשית גדולה. יש לך צורך לפרוק את המחשבות שלך בכתיבה ובמילים חדות. את מסתכלת על החיים כמו יצירת אומנות מורכבת ומפוארת בו-זמנית.',
      en: 'An analytical poet at heart. You turn raw heartache, existential thoughts, and complicated feelings into unforgettable literary masterpieces.'
    }
  },
  holiday: {
    name: 'The Holiday Collection / Special Era',
    color: '#B71C1C',
    bg: 'linear-gradient(135deg, #FFEBEE 0%, #C8E6C9 100%)',
    textColor: '#1B5E20',
    desc: {
      he: 'את אדם של בית, חום ואווירת חג נוסטלגית! את אוהבת לחגוג מסורות, לקבץ אנשים יחד, לפנק באפייה ביתית וליצור זיכרונות מתוקים שנשארים לתמיד. הנוכחות שלך מנחמת ומלאה באהבה טהורה.',
      en: 'Warm, festive, and nurturing! You cherish tradition, cozy fireside gatherings, and spreading genuine joy to everyone in your circle.'
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
      { text: { he: 'יום יצירתי בבית, אפיית עוגיות, פיקניק או שירים על גיטרה 🧁', en: 'A cozy day at home: baking cookies, guitar melodies or a picnic 🧁' }, eras: ['lover', 'debut', 'fearless', 'holiday'] },
      { text: { he: 'לילה חשוך, מוזיקה חזקה באוזניות, כתיבה ביומן 🖤', en: 'Late night with headphones, journaling or mystery films 🖤' }, eras: ['reputation', 'ttpd', 'speakNow', 'red'] }
    ]
  },
  {
    id: 2,
    q: {
      he: 'איזה סגנון לבוש/אסתטיקה הכי מושך אותך כרגע?',
      en: 'Which style or aesthetic speaks to you most right now?'
    },
    options: [
      { text: { he: 'שמלות וינטג\', סוודרים סרוגים, גווני חום וירוק זית 🍂', en: 'Vintage dresses, chunky knit sweaters, olive & earthy tones 🍂' }, eras: ['evermore', 'folklore', 'debut'] },
      { text: { he: 'בגדים שחורים, ג\'קט עור, אקססוריז מטאליים וסטייל חד 🐍', en: 'All-black outfits, leather jackets, sharp modern tailoring 🐍' }, eras: ['reputation', 'ttpd'] },
      { text: { he: 'שמלות קלילות, נצנצים זהובים או סגול נסיכותי 🌸', en: 'Dreamy soft fabrics, golden sparkles or royal purple dresses 🌸' }, eras: ['lover', 'fearless', 'speakNow'] },
      { text: { he: 'כחול עמוק, קטיפה, סגול או כסף, מראה מודרני מנצנץ 🌌', en: 'Midnight blue, velvet, deep purple and shimmering silver 🌌' }, eras: ['midnights', 'nineteen89', 'red'] }
    ]
  },
  {
    id: 3,
    q: {
      he: 'איזה משקה או מאכל הכי מתאים למצב הרוח שלך?',
      en: 'What beverage or treat matches your current mood?'
    },
    options: [
      { text: { he: 'שוקו חם עם מרשמלו מול החלון הגשום ☕', en: 'Hot cocoa with marshmallows watching the rain ☕' }, eras: ['evermore', 'folklore', 'holiday'] },
      { text: { he: 'אספרסו כפול וחזק, משהו מדויק שמעורר את המוח ⚡', en: 'Double shot black espresso — sharp and focused ⚡' }, eras: ['reputation', 'ttpd'] },
      { text: { he: 'אייס וניל מתוק, מילקשייק תות או לימונדה קרירה 🍓', en: 'Sweet iced strawberry latte or cool sweet lemonade 🍓' }, eras: ['lover', 'nineteen89', 'debut', 'fearless'] },
      { text: { he: 'תה ארל גריי עם דבש בזמן האזנה לשירים נוסטלגיים 🍯', en: 'Earl Grey tea with honey listening to wistful records 🍯' }, eras: ['red', 'speakNow', 'evermore'] }
    ]
  },
  {
    id: 4,
    q: {
      he: 'איך את מתמודדת בדרך כלל כשמישהו פוגע בך?',
      en: 'How do you usually handle getting hurt or let down?'
    },
    options: [
      { text: { he: 'מתנתקת מהרעש, מציבה גבולות ברורים וממשיכה הלאה חזקה יותר 🛡️', en: 'Cut the noise, set unbreakable boundaries, and return stronger 🛡️' }, eras: ['reputation', 'nineteen89'] },
      { text: { he: 'מסתגרת עם המחשבות, כותבת ומנתחת כל מילה שנאמרה 📜', en: 'Retreat inwards, writing and analyzing every detail into poetry 📜' }, eras: ['ttpd', 'folklore', 'evermore'] },
      { text: { he: 'אומרת בדיוק את מה שאני מרגישה בלי לפחד, עומדת על שלי 💜', en: 'Speak now and stand my ground, voicing exactly how I feel 💜' }, eras: ['speakNow', 'red'] },
      { text: { he: 'בוחרת לסלוח, מאמינה בטוב וממשיכה לקוות לעתיד בהיר 💖', en: 'Choose forgiveness, believe in good and look forward with hope 💖' }, eras: ['lover', 'fearless', 'debut', 'holiday'] }
    ]
  },
  {
    id: 5,
    q: {
      he: 'איזה משפט הכי מגדיר את התקופה הנוכחית שלך בחיים?',
      en: 'Which lyric/sentiment best defines your life right now?'
    },
    options: [
      { text: { he: '"אני מגלה את העצמאות שלי ומוכנה להרפתקה הבאה!" 🌟', en: '"I am embracing my independence and ready for the next adventure!" 🌟' }, eras: ['nineteen89', 'fearless'] },
      { text: { he: '"יש בי שקט פנימי, גם אם דברים משתנים מסביב" 🌿', en: '"I hold a quiet peace within me, even when seasons change" 🌿' }, eras: ['evermore', 'folklore', 'debut'] },
      { text: { he: '"הלב שלי פתוח ואני רוצה לחוות כל רגע במלואו" 💘', en: '"My heart is open and I want to experience every feeling fully" 💘' }, eras: ['lover', 'red', 'holiday'] },
      { text: { he: '"אני מסתכלת לאמת בעיניים, בלי פילטרים ובלי מסיכות" 🌒', en: '"I look reality in the eye — unfiltered and unapologetic" 🌒' }, eras: ['midnights', 'ttpd', 'reputation', 'speakNow'] }
    ]
  },
  {
    id: 6,
    q: {
      he: 'איזה סוג של נוף או מקום הכי גורם לך להרגיש בבית?',
      en: 'What landscape or setting makes you feel most at home?'
    },
    options: [
      { text: { he: 'עיר גדולה ומוארת בלילה, גורדי שחקים וקצב מהיר 🌆', en: 'A bright city skyline at night, skyscrapers, and fast pace 🌆' }, eras: ['nineteen89', 'midnights'] },
      { text: { he: 'בקתת עץ מבודדת בלב יער ערפילי, עם קולות של גשם ברקע 🌲', en: 'A cozy cabin in a misty forest, with rain falling outside 🌲' }, eras: ['folklore', 'evermore', 'holiday'] },
      { text: { he: 'חוף ים בשקיעה, שדות פתוחים ורוח חמימה ורגועה 🏖️', en: 'A sunset beach or open meadows with a warm breeze 🏖️️' }, eras: ['fearless', 'lover', 'debut'] },
      { text: { he: 'סמטאות סודיות בעיר עתיקה, טירות וגשרים מסתוריים 🌌', en: 'Secret stone alleyways, castles, and historic architecture 🌌' }, eras: ['reputation', 'ttpd', 'speakNow', 'red'] }
    ]
  },
  {
    id: 7,
    q: {
      he: 'אם היית צריכה לבחור אלמנט אחד של מזג אוויר שאת הכי אוהבת, מה זה יהיה?',
      en: 'If you had to pick your favorite weather element, what would it be?'
    },
    options: [
      { text: { he: 'לילה בהיר ומלא כוכבים, כשכל העיר ישנה 🌟', en: 'A clear starlit night when the entire city is quiet 🌟' }, eras: ['midnights', 'nineteen89'] },
      { text: { he: 'יום סגרירי, ערפל כבד וטפטוף עדין שלא נפסק 🌫️', en: 'Overcast skies, thick fog, and endless gentle drizzle 🌫️' }, eras: ['folklore', 'evermore'] },
      { text: { he: 'שמש חמימה של אביב, שמיים כחולים נקיים ורוח קלילה ☀️', en: 'Warm spring sunshine, crisp blue skies, and gentle breeze ☀️' }, eras: ['fearless', 'lover', 'debut', 'holiday'] },
      { text: { he: 'סופת ברקים עוצמתית באמצע הלילה, רעמים ומתח באוויר ⚡', en: 'A dramatic thunderstorm in the dead of night, electric air ⚡' }, eras: ['reputation', 'speakNow', 'red', 'ttpd'] }
    ]
  },
  {
    id: 8,
    q: {
      he: 'מהי התכונה שאת הכי מעריכה אצל האנשים שקרובים אלייך?',
      en: 'What trait do you value most in those closest to you?'
    },
    options: [
      { text: { he: 'שמחת חיים, זרימה ויכולת להרים את האווירה בכל רגע 🎉', en: 'Joyful vitality, easygoing laughter, and uplifting energy 🎉' }, eras: ['nineteen89', 'lover', 'fearless'] },
      { text: { he: 'כנות עמוקה, יכולת להקשיב לשיחות נפש ארוכות אל תוך הלילה ☕', en: 'Profound empathy and listening during late-night talks ☕' }, eras: ['folklore', 'evermore', 'debut', 'holiday'] },
      { text: { he: 'נאמנות מוחלטת – כאלה שיישארו איתי ויילחמו בשבילי בכל מצב 🛡️️', en: 'Absolute loyalty — staying by my side through any battle 🛡️' }, eras: ['reputation', 'speakNow'] },
      { text: { he: 'שאפתנות, חוכמה פנימית והרצון להצליח ולהגשים חלומות גדולים 📈', en: 'Ambition, sharp intellect, and reaching for big dreams 📈' }, eras: ['midnights', 'ttpd', 'red'] }
    ]
  },
  {
    id: 9,
    q: {
      he: 'כשאת מקשיבה למוזיקה, מה הכי תופס אותך בשיר?',
      en: 'When you listen to music, what captivates you first?'
    },
    options: [
      { text: { he: 'קצב מקפיץ שאי אפשר להפסיק לרקוד איתו, הפקה מנצנצת 💃', en: 'An infectious beat, synth hooks, and dancing rhythms 💃' }, eras: ['nineteen89', 'midnights'] },
      { text: { he: 'המילים, הסיפור הפיוטי והרגש העמוק שנמצא בין השורות ✍️', en: 'Poetic lyrics, rich metaphors, and emotional resonance ✍️' }, eras: ['folklore', 'evermore', 'ttpd'] },
      { text: { he: 'מנגינה מתוקה, הרמוניות קלילות וגיטרות אקוסטיות שמחממות את הלב 🎸', en: 'Sweet acoustics, heartfelt melodies, and comforting chords 🎸' }, eras: ['debut', 'fearless', 'lover', 'holiday'] },
      { text: { he: 'ביטים חזקים, דרמה, אנרגיה מתפרצת וטקסטים חדים ובועטים 🥁', en: 'Biting anthems, theatrical drama, and bold power 🥁' }, eras: ['reputation', 'speakNow', 'red'] }
    ]
  },
  {
    id: 10,
    q: {
      he: 'איך החברים שלך היו מתארים אותך במילה אחת?',
      en: 'How would your friends describe you in one word?'
    },
    options: [
      { text: { he: 'קורנת – מלאה באנרגיה חיובית, חום ואור ✨', en: 'Radiant — bright, infectious warmth, and light ✨' }, eras: ['nineteen89', 'lover', 'fearless', 'holiday'] },
      { text: { he: 'עמוקה – חושבת המון, מחוברת לטבע וליצירה 🍃', en: 'Deep — reflective, nature-loving, and imaginative 🍃' }, eras: ['folklore', 'evermore', 'debut'] },
      { text: { he: 'חזקה – עוצמתית, שומרת על הגבולות שלה ונאמנה עד הסוף 🖤', en: 'Fierce — resilient, protective of boundaries, fiercely loyal 🖤' }, eras: ['reputation', 'speakNow'] },
      { text: { he: 'חולמת – מתוחכמת, חושבת בגדול ותמיד מחפשת משמעות 🌌', en: 'Visionary — sophisticated, ambitious, and deep-thinking 🌌' }, eras: ['midnights', 'ttpd', 'red'] }
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
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
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