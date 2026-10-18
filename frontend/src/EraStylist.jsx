import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import API from './api';
import { ArrowRight, ArrowLeft, Camera, Share2, CheckCircle2, Loader2, Sparkles, Wand2, Trophy } from 'lucide-react';

const CLOUDINARY_CLOUD_NAME = 'gvdwsxay';
const CLOUDINARY_UPLOAD_PRESET = 'swift-preset';

const ERAS_CHALLENGES = [
  { era: 'lover', titleHe: 'אתגר אלבום Lover 💖', titleEn: 'Lover Era Challenge 💖', descHe: 'הלבישי את הדמות בסטייל פסטלי ורוד, נצנצי ולבבות חלומיים.', descEn: 'Soft pastel pinks, sparkles, and dreamy heart vibes.' },
  { era: 'fearless', titleHe: 'אתגר אלבום Fearless ✨', titleEn: 'Fearless Era Challenge ✨', descHe: 'שמלת פרנזים מוזהבת ומנצנצת עם מגפי בוקרים אגדיים.', descEn: 'Gold fringe, sparkly dresses, and legendary cowboy boots.' },
  { era: 'speak_now', titleHe: 'אתגר אלבום Speak Now 💜', titleEn: 'Speak Now Era Challenge 💜', descHe: 'שמלת נשף סגולה, נפוחה ומלכותית באווירת אגדות.', descEn: 'Magical and royal purple ballgowns.' },
  { era: 'red', titleHe: 'אתגר אלבום Red 🧣', titleEn: 'Red Era Challenge 🧣', descHe: 'שפתון אדום בולט, כובע פדורה וצעיף סרוג חמים.', descEn: 'Bright red lips, fedora hats, and cozy knitted scarves.' },
  { era: '1989', titleHe: 'אתגר אלבום 1989 🏙️', titleEn: '1989 Era Challenge 🏙️', descHe: 'ג\'קט מנצנץ, משקפי שמש לבנים וסטייל אורבני שיקי.', descEn: 'Sequined jackets, white sunglasses, and chic city pop style.' },
  { era: 'reputation', titleHe: 'אתגר אלבום Reputation 🐍', titleEn: 'Reputation Era Challenge 🐍', descHe: 'בגד גוף שחור, נחשים ואווירה נועזת, אפלה ומחשמלת.', descEn: 'Edgy black bodysuits, snakes, and fierce dark aesthetics.' },
  { era: 'folklore', titleHe: 'אתגר אלבום Folklore & Evermore 🌲', titleEn: 'Folklore & Evermore Challenge 🌲', descHe: 'שמלת קוטג\'קור כפרית ארוכה וקרדיגן צמר נעים לטיול ביער.', descEn: 'Cottagecore dresses, cozy cardigans, and earthy forest vibes.' },
  { era: 'midnights', titleHe: 'אתגר אלבום Midnights 🌙', titleEn: 'Midnights Era Challenge 🌙', descHe: 'זוהר כחול כהה של חצות הלילה, אבני חן וניצוצות כסופים.', descEn: 'Midnight blue glamour, starry sparkles, and dazzling nights.' }
];

const TABS = [
  { id: 'hair', label: 'שיער', icon: '💇‍♀️' },
  { id: 'outfits', label: 'בגדים', icon: '👗' },
  { id: 'shoes', label: 'נעליים', icon: '👢' },
  { id: 'accessories', label: 'אקססוריז', icon: '💎' },
  { id: 'props', label: 'חפצים', icon: '🎸' }
];

// מיפוי מדויק של כל פריט מתוך גיליון הקולאז' (x, y, w, h באחוזים מתוך התמונה)
const WARDROBE = {
  hair: [
    { id: 'h_blonde', name: '1989 Blonde Hair', era: '1989', image: '/wardrobe1.jpg', crop: { x: 10, y: 2, w: 32, h: 22 } },
    { id: 'h_lover', name: 'Pink Dip-Dye Hair', era: 'lover', image: '/wardrobe1.jpg', crop: { x: 37, y: 49, w: 22, h: 18 } },
  ],
  outfits: [
    { id: 'o_1989', name: '1989 Blue Set', era: '1989', image: '/wardrobe1.jpg', crop: { x: 9, y: 21, w: 32, h: 22 }, avatarStyle: { top: '95px', left: '50%', transform: 'translateX(-50%)', width: '130px', zIndex: 20 } },
    { id: 'o_rep', name: 'Reputation Bodysuit', era: 'reputation', image: '/wardrobe1.jpg', crop: { x: 58, y: 11, w: 36, h: 28 }, avatarStyle: { top: '95px', left: '50%', transform: 'translateX(-50%)', width: '120px', zIndex: 20 } },
    { id: 'o_lover', name: 'Lover Fringe Jacket', era: 'lover', image: '/wardrobe1.jpg', crop: { x: 5, y: 55, w: 38, h: 36 }, avatarStyle: { top: '100px', left: '50%', transform: 'translateX(-50%)', width: '140px', zIndex: 20 } },
    { id: 'o_folklore', name: 'Folklore Flannel', era: 'folklore', image: '/wardrobe1.jpg', crop: { x: 58, y: 55, w: 38, h: 32 }, avatarStyle: { top: '100px', left: '50%', transform: 'translateX(-50%)', width: '135px', zIndex: 20 } },
  ],
  shoes: [
    { id: 's_sneakers', name: 'White Sneakers', era: '1989', image: '/wardrobe1.jpg', crop: { x: 13, y: 41, w: 16, h: 13 }, avatarStyle: { bottom: '15px', left: '50%', transform: 'translateX(-50%)', width: '60px', zIndex: 12 } },
    { id: 's_highboots', name: 'Reputation Boots', era: 'reputation', image: '/wardrobe1.jpg', crop: { x: 65, y: 30, w: 24, h: 24 }, avatarStyle: { bottom: '10px', left: '50%', transform: 'translateX(-50%)', width: '70px', zIndex: 12 } },
    { id: 's_boots', name: 'Brown Boots', era: 'fearless', image: '/wardrobe1.jpg', crop: { x: 68, y: 86, w: 24, h: 14 }, avatarStyle: { bottom: '12px', left: '50%', transform: 'translateX(-50%)', width: '65px', zIndex: 12 } },
  ],
  accessories: [
    { id: 'a_hat', name: 'Red Fez Hat', era: 'red', image: '/wardrobe1.jpg', crop: { x: 68, y: 0, w: 20, h: 14 }, avatarStyle: { top: '10px', left: '50%', transform: 'translateX(-50%)', width: '75px', zIndex: 28 } },
    { id: 'a_necklace', name: 'Heart Necklace', era: 'lover', image: '/wardrobe1.jpg', crop: { x: 52, y: 50, w: 14, h: 14 }, avatarStyle: { top: '85px', left: '50%', transform: 'translateX(-50%)', width: '35px', zIndex: 22 } },
  ],
  props: [
    { id: 'p_mic', name: 'Sparkly Mic', era: '1989', image: '/wardrobe1.jpg', crop: { x: 52, y: 38, w: 13, h: 13 }, avatarStyle: { top: '110px', right: '20px', width: '50px', zIndex: 30 } },
    { id: 'p_guitar', name: 'Acoustic Guitar', era: 'folklore', image: '/wardrobe1.jpg', crop: { x: 33, y: 68, w: 30, h: 30 }, avatarStyle: { top: '130px', right: '10px', width: '90px', transform: 'rotate(-15deg)', zIndex: 30 } },
  ]
};

// רכיב חיתוך מדויק באמצעות CSS Background
const CollageItemView = ({ item, style }) => {
  const { x, y, w, h } = item.crop;
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundImage: `url(${item.image})`,
      backgroundPosition: `${x === 0 ? 0 : (x / (100 - w)) * 100}% ${y === 0 ? 0 : (y / (100 - h)) * 100}%`,
      backgroundSize: `${10000 / w}% ${10000 / h}%`,
      backgroundRepeat: 'no-repeat',
      ...style
    }} />
  );
};

export default function EraStylist({ lang, onBack }) {
  const isHe = lang === 'he';
  const BackIcon = isHe ? ArrowRight : ArrowLeft;
  const avatarRef = useRef(null);

  const [challenge] = useState(() => ERAS_CHALLENGES[Math.floor(Math.random() * ERAS_CHALLENGES.length)]);
  const [activeTab, setActiveTab] = useState('outfits');
  
  const [selections, setSelections] = useState({
    hair: null,
    outfits: null,
    shoes: null,
    accessories: null,
    props: null
  });

  const [scoreResult, setScoreResult] = useState(null);
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleSelectItem = (category, item) => {
    setSelections(prev => ({
      ...prev,
      [category]: prev[category]?.id === item.id ? null : item
    }));
  };

  const handleCalculateScoreAndCapture = async () => {
    let matches = 0;
    let totalChosen = 0;

    Object.values(selections).forEach(item => {
      if (item) {
        totalChosen++;
        if (item.era === challenge.era) {
          matches++;
        }
      }
    });

    let percentage = totalChosen > 0 ? Math.round((matches / totalChosen) * 100) : 0;
    if (totalChosen === 0) percentage = 0;
    else if (percentage === 0) percentage = 35;

    setScoreResult(percentage);

    if (!avatarRef.current) return;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(avatarRef.current, { backgroundColor: '#FDF6F6', scale: 2 });
      const dataUrl = canvas.toDataURL('image/png');
      setScreenshotUrl(dataUrl);
    } catch (err) {
      alert('שגיאה בצילום המסך!');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleShareToForum = async () => {
    if (!screenshotUrl) return;
    setIsSharing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', screenshotUrl);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();
      
      await API.post('/posts', {
        title: `הלוק שלי לאתגר ${challenge.titleHe} (${scoreResult}% התאמה)! ✨`,
        content: 'עיצבתי דמות מושלמת ברוח ה-Eras מהפריטים החדשים בארון!',
        category: 'gallery',
        image_url: uploadData.secure_url
      });

      setShareSuccess(true);
    } catch (err) {
      alert('השמירה נכשלה, ודאי שאת מחוברת לחשבון.');
    } finally {
      setIsSharing(false);
    }
  };

  if (screenshotUrl && scoreResult !== null) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-delicate)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#E8F5E9', color: '#2E7D32', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <Trophy size={28} />
          </div>

          <h2 style={{ fontFamily: '"Georgia", serif', color: 'var(--text-dark)', marginBottom: '0.25rem' }}>
            {shareSuccess ? 'הלוק שותף בהצלחה!' : 'תוצאת אתגר הסטיילינג! 🎉'}
          </h2>
          
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-rose-dark)', margin: '0.5rem 0', fontFamily: '"Georgia", serif' }}>
            {scoreResult}% {isHe ? 'התאמה לארה!' : 'Era Match!'}
          </div>

          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            {shareSuccess ? 'היצירה מחכה לך עכשיו בגלריית הקהילה.' : `עמדת באתגר של ${isHe ? challenge.titleHe : challenge.titleEn}! מוכנה לשתף עם כולם?`}
          </p>

          <img 
            src={screenshotUrl} 
            alt="My Era Look" 
            style={{ width: '220px', borderRadius: '16px', border: '2px solid var(--primary-rose)', boxShadow: '0 4px 15px rgba(216,112,147,0.2)', marginBottom: '1.5rem' }} 
          />

          {shareSuccess ? (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button onClick={onBack} style={{ padding: '0.8rem 1.5rem', borderRadius: '20px', backgroundColor: 'var(--primary-rose)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>חזרה ללובי המשחקים</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '300px', margin: '0 auto' }}>
              <button 
                onClick={handleShareToForum}
                disabled={isSharing}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', borderRadius: '20px', backgroundColor: 'var(--primary-rose)', color: '#fff', border: 'none', fontWeight: 600, cursor: isSharing ? 'not-allowed' : 'pointer' }}
              >
                {isSharing ? <Loader2 size={18} className="animate-spin" /> : <Share2 size={18} />}
                {isSharing ? 'משתף בגלריה...' : 'שתפי את הלוק בגלריה! ✨'}
              </button>
              <button 
                onClick={() => setScreenshotUrl(null)}
                style={{ padding: '0.8rem 1.5rem', borderRadius: '20px', backgroundColor: 'var(--bg-creamy)', color: 'var(--text-dark)', border: '1px solid var(--border-delicate)', fontWeight: 600, cursor: 'pointer' }}
              >
                המשך לעצב / נסה שוב
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
      <div>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
          <BackIcon size={16} />
          {isHe ? 'חזרה למשחקים' : 'Back to Games'}
        </button>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #FFF8E7 0%, #FFF3E0 100%)',
        border: '1.5px solid #FFE3A8',
        borderRadius: '20px',
        padding: '1.25rem',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#B26A00', marginBottom: '0.3rem', fontSize: '0.8rem', fontWeight: 700 }}>
          <Sparkles size={15} />
          <span>{isHe ? 'אתגר הסטיילינג היומי' : 'Daily Styling Challenge'}</span>
        </div>
        <h3 style={{ margin: '0 0 0.25rem 0', fontFamily: '"Georgia", serif', color: 'var(--text-dark)', fontSize: '1.25rem' }}>
          {isHe ? challenge.titleHe : challenge.titleEn}
        </h3>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '550px', marginInline: 'auto' }}>
          {isHe ? challenge.descHe : challenge.descEn}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', backgroundColor: 'var(--bg-card)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-delicate)', boxShadow: '0 4px 18px rgba(0,0,0,0.03)' }}>
        
        {/* אזור הדוגמנית */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div 
            id="avatar-capture-area" 
            ref={avatarRef}
            style={{ 
              position: 'relative', width: '280px', height: '460px', backgroundColor: '#FDF6F6', 
              borderRadius: '24px', border: '2px dashed #E8B4C8', margin: '0 auto', 
              overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.02)'
            }}
          >
            {/* בובת דוגמנית וקטורית (SVG) */}
            <svg width="140" height="420" viewBox="0 0 140 420" style={{ position: 'absolute', bottom: '10px', zIndex: 1 }}>
              <path d="M 48 200 L 52 400 L 66 400 L 60 200 Z" fill="#EAD1C5" stroke="#D5B8A9" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 92 200 L 88 400 L 74 400 L 80 200 Z" fill="#EAD1C5" stroke="#D5B8A9" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 44 120 Q 40 165 48 200 L 92 200 Q 100 165 96 120 Z" fill="#EAD1C5" stroke="#D5B8A9" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M 46 120 Q 50 75 45 52 L 95 52 Q 90 75 94 120 Z" fill="#EAD1C5" stroke="#D5B8A9" strokeWidth="1.5" strokeLinejoin="round" />
              <rect x="62" y="30" width="16" height="25" fill="#EAD1C5" stroke="#D5B8A9" strokeWidth="1.5" rx="3" />
              <ellipse cx="70" cy="16" rx="21" ry="25" fill="#EAD1C5" stroke="#D5B8A9" strokeWidth="1.5" />
              <path d="M 45 58 Q 24 115 20 185" fill="none" stroke="#EAD1C5" strokeWidth="11" strokeLinecap="round" />
              <path d="M 95 58 Q 116 115 120 185" fill="none" stroke="#EAD1C5" strokeWidth="11" strokeLinecap="round" />
            </svg>

            {/* שכבות הפריטים הנבחרים */}
            {Object.entries(selections).map(([cat, item]) => {
              if (!item) return null;
              return (
                <div key={cat} style={{ position: 'absolute', ...item.avatarStyle }}>
                  <CollageItemView item={item} style={{ height: item.avatarStyle.width || '100px' }} />
                </div>
              );
            })}
          </div>

          <button 
            onClick={handleCalculateScoreAndCapture}
            disabled={isCapturing}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--primary-rose)', color: '#fff', padding: '0.8rem 2rem', borderRadius: '20px', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: isCapturing ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(216,112,147,0.25)' }}
          >
            {isCapturing ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
            {isHe ? 'סיימתי לעצב ובדוק ציון! ✨' : 'Finish & Score Look! ✨'}
          </button>
        </div>

        {/* ארון הבגדים */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-dark)', fontFamily: '"Georgia", serif', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Wand2 size={22} color="var(--primary-rose)" />
            {isHe ? 'ארון הבגדים החדש מהקולאז\'' : 'The New Collage Wardrobe'}
          </h3>

          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', borderBottom: '2px solid var(--bg-subtle)', paddingBottom: '0.5rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.45rem 0.75rem', borderRadius: '12px', border: 'none', background: activeTab === tab.id ? 'var(--primary-rose)' : 'transparent',
                  color: activeTab === tab.id ? '#fff' : 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(75px, 1fr))', gap: '0.75rem', maxHeight: '310px', overflowY: 'auto', paddingRight: '4px' }}>
            {WARDROBE[activeTab]?.map(item => {
              const isSelected = selections[activeTab]?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(activeTab, item)}
                  style={{
                    aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: isSelected ? '#FFF0F5' : 'var(--bg-creamy)', border: `2px solid ${isSelected ? 'var(--primary-rose)' : 'var(--border-delicate)'}`,
                    borderRadius: '16px', cursor: 'pointer', overflow: 'hidden', transition: 'transform 0.1s', position: 'relative'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {isSelected && <CheckCircle2 size={16} color="var(--primary-rose)" style={{ position: 'absolute', top: '4px', right: '4px', zIndex: 10 }} />}
                  <CollageItemView item={item} />
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}