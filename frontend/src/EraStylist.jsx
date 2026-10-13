import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import API from './api';
import { ArrowRight, ArrowLeft, Camera, Share2, CheckCircle2, Loader2, Sparkles, Wand2, Trophy, RotateCcw } from 'lucide-react';

const CLOUDINARY_CLOUD_NAME = 'gvdwsxay';
const CLOUDINARY_UPLOAD_PRESET = 'swift-preset';

const ERAS_CHALLENGES = [
  { era: 'folklore', titleHe: 'אתגר אלבום Folklore 🌲', titleEn: 'Folklore Era Challenge 🌲', descHe: 'הלבישי את הדמות לטיול ביער עם קרדיגן נעים וסטייל טבעי וכפרי.', descEn: 'Cozy forest walk with cardigans and earthy ethereal vibes.' },
  { era: '1989', titleHe: 'אתגר אלבום 1989 🏙️', titleEn: '1989 Era Challenge 🏙️', descHe: 'לוק אורבני ושיקי של ניו יורק: סטייל קליל, משקפי שמש ואופנה עירונית.', descEn: 'Chic New York city style with crop tops and cool sunglasses.' },
  { era: 'reputation', titleHe: 'אתגר אלבום Reputation 🐍', titleEn: 'Reputation Era Challenge 🐍', descHe: 'סטייל שחור, נועז, דרמטי ומלא נוכחות.', descEn: 'Edgy black aesthetic with fierce dark vibes.' },
  { era: 'midnights', titleHe: 'אתגר אלבום Midnights 🌙', titleEn: 'Midnights Era Challenge 🌙', descHe: 'זוהר של שעות הלילה הקטנות, ניצוצות, שמלות כסופות ואלגנטיות נוצצת.', descEn: 'Midnight glamour with starry sparkles and dazzling silver vibes.' },
  { era: 'lover', titleHe: 'אתגר אלבום Lover 💖', titleEn: 'Lover Era Challenge 💖', descHe: 'צבעוניות פסטלית רכה, לבבות, קשת בענן ואווירה חלומית ורומנטית.', descEn: 'Soft pastel colors, rainbow hearts, and dreamy romantic vibes.' }
];

const TABS = [
  { id: 'outfits', label: 'שמלות וחליפות', icon: '👗' },
  { id: 'shoes', label: 'נעליים', icon: '👟' },
  { id: 'accessories', label: 'אקססוריז', icon: '💎' },
  { id: 'props', label: 'חפצים', icon: '🎤' }
];

const WARDROBE = {
  outfits: [
    { id: 'o1', name: 'Lover Dress', era: 'lover', emoji: '👗', style: { top: '80px', fontSize: '130px' } },
    { id: 'o2', name: 'Midnights Jacket', era: 'midnights', emoji: '🧥', style: { top: '80px', fontSize: '130px' } },
    { id: 'o3', name: 'Fearless Fringe', era: 'fearless', emoji: '✨', style: { top: '80px', fontSize: '130px' } },
    { id: 'o4', name: 'Reputation Body', era: 'reputation', emoji: '🖤', style: { top: '90px', fontSize: '110px' } },
    { id: 'o5', name: 'Folklore Cardigan', era: 'folklore', emoji: '🧶', style: { top: '85px', fontSize: '120px' } },
  ],
  shoes: [
    { id: 's1', name: 'Cowboy Boots', era: 'fearless', emoji: '👢', style: { bottom: '10px', fontSize: '60px' } },
    { id: 's2', name: 'Red Heels', era: 'red', emoji: '👠', style: { bottom: '10px', fontSize: '60px' } },
    { id: 's3', name: 'Sneakers', era: '1989', emoji: '👟', style: { bottom: '10px', fontSize: '60px' } },
  ],
  accessories: [
    { id: 'a1', name: 'Red Scarf', era: 'red', emoji: '🧣', style: { top: '65px', fontSize: '70px', zIndex: 50 } },
    { id: 'a2', name: '22 Glasses', era: '1989', emoji: '🕶️', style: { top: '15px', fontSize: '45px', zIndex: 60 } },
    { id: 'a3', name: 'Friendship Bracelet', era: 'lover', emoji: '📿', style: { top: '160px', left: '35px', fontSize: '40px', zIndex: 55 } },
    { id: 'a4', name: 'Bejeweled Necklace', era: 'midnights', emoji: '💎', style: { top: '75px', fontSize: '35px', zIndex: 45 } },
  ],
  props: [
    { id: 'p1', name: 'Acoustic Guitar', era: 'folklore', emoji: '🎸', style: { top: '140px', right: '15px', fontSize: '90px', transform: 'rotate(-20deg)' } },
    { id: 'p2', name: 'Eras Mic', era: 'midnights', emoji: '🎤', style: { top: '90px', right: '45px', fontSize: '60px' } },
    { id: 'p3', name: 'Champagne Glass', era: 'reputation', emoji: '🥂', style: { top: '130px', right: '35px', fontSize: '55px' } },
  ]
};

export default function EraStylist({ lang, onBack }) {
  const isHe = lang === 'he';
  const BackIcon = isHe ? ArrowRight : ArrowLeft;
  const avatarRef = useRef(null);

  // בחירת אתגר אקראי בעליית המשחק
  const [challenge] = useState(() => ERAS_CHALLENGES[Math.floor(Math.random() * ERAS_CHALLENGES.length)]);

  const [activeTab, setActiveTab] = useState('outfits');
  const [selections, setSelections] = useState({
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
    // חישוב אחוזי התאמה לאתגר
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
    else if (percentage === 0) percentage = 30; // בונוס קטן לעידוד

    setScoreResult(percentage);

    // צילום המסך של הדמות
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
        content: 'עיצבתי לוק חדש ברוח ה-Eras, מה דעתכן?',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '850px', margin: '0 auto' }}>
      <div>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
          <BackIcon size={16} />
          {isHe ? 'חזרה למשחקים' : 'Back to Games'}
        </button>
      </div>

      {/* באנר המשימה / האתגר היומי */}
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
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '520px', marginInline: 'auto' }}>
          {isHe ? challenge.descHe : challenge.descEn}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', backgroundColor: 'var(--bg-card)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-delicate)', boxShadow: '0 4px 18px rgba(0,0,0,0.03)' }}>
        
        {/* אזור הדמות (קנבס הצילום) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div 
            id="avatar-capture-area" 
            ref={avatarRef}
            style={{ 
              position: 'relative', width: '280px', height: '420px', backgroundColor: '#FDF6F6', 
              borderRadius: '24px', border: '2px dashed #E8B4C8', margin: '0 auto', 
              overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.02)'
            }}
          >
            {/* הבסיס של הדמות (Mannequin Silhouette) */}
            <div style={{ position: 'absolute', bottom: '0', width: '100px', height: '320px', backgroundColor: '#EAD1C5', borderRadius: '40px 40px 0 0', zIndex: 10 }}>
              <div style={{ position: 'absolute', top: '-60px', left: '10px', width: '80px', height: '90px', backgroundColor: '#EAD1C5', borderRadius: '50%' }} />
            </div>

            {/* שכבות הביגוד המדויקות */}
            {selections.outfits && <div style={{ position: 'absolute', zIndex: 20, ...selections.outfits.style }}>{selections.outfits.emoji}</div>}
            {selections.shoes && <div style={{ position: 'absolute', zIndex: 30, ...selections.shoes.style }}>{selections.shoes.emoji}</div>}
            {selections.accessories && <div style={{ position: 'absolute', zIndex: 40, ...selections.accessories.style }}>{selections.accessories.emoji}</div>}
            {selections.props && <div style={{ position: 'absolute', zIndex: 50, ...selections.props.style }}>{selections.props.emoji}</div>}
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

        {/* ארון הבגדים (Wardrobe) */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-dark)', fontFamily: '"Georgia", serif', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Wand2 size={22} color="var(--primary-rose)" />
            {isHe ? 'ארון הבגדים' : 'The Wardrobe'}
          </h3>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--bg-subtle)', paddingBottom: '0.5rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.5rem 0.8rem', borderRadius: '12px', border: 'none', background: activeTab === tab.id ? 'var(--primary-rose)' : 'transparent',
                  color: activeTab === tab.id ? '#fff' : 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '1rem' }}>
            {WARDROBE[activeTab].map(item => {
              const isSelected = selections[activeTab]?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(activeTab, item)}
                  style={{
                    aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: isSelected ? '#FFF0F5' : 'var(--bg-creamy)', border: `2px solid ${isSelected ? 'var(--primary-rose)' : 'var(--border-delicate)'}`,
                    borderRadius: '16px', cursor: 'pointer', fontSize: '2rem', transition: 'transform 0.1s', position: 'relative'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {isSelected && <CheckCircle2 size={16} color="var(--primary-rose)" style={{ position: 'absolute', top: '4px', right: '4px' }} />}
                  {item.emoji}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}