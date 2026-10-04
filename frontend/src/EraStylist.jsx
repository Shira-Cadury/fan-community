import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import API from './api';
import { ArrowRight, ArrowLeft, Camera, Share2, CheckCircle2, Loader2, Sparkles, Wand2 } from 'lucide-react';

const CLOUDINARY_CLOUD_NAME = 'gvdwsxay';
const CLOUDINARY_UPLOAD_PRESET = 'swift-preset';

const TABS = [
  { id: 'outfits', label: 'שמלות וחליפות', icon: '👗' },
  { id: 'shoes', label: 'נעליים', icon: '👟' },
  { id: 'accessories', label: 'אקססוריז', icon: '💎' },
  { id: 'props', label: 'חפצים', icon: '🎤' }
];

const WARDROBE = {
  outfits: [
    { id: 'o1', name: 'Lover Dress', emoji: '👗', style: { top: '80px', fontSize: '130px' } },
    { id: 'o2', name: 'Midnights Jacket', emoji: '🧥', style: { top: '80px', fontSize: '130px' } },
    { id: 'o3', name: 'Fearless Fringe', emoji: '✨', style: { top: '80px', fontSize: '130px' } },
    { id: 'o4', name: 'Reputation Body', emoji: '🖤', style: { top: '90px', fontSize: '110px' } },
    { id: 'o5', name: 'Folklore Cardigan', emoji: '🧶', style: { top: '85px', fontSize: '120px' } },
  ],
  shoes: [
    { id: 's1', name: 'Cowboy Boots', emoji: '👢', style: { bottom: '10px', fontSize: '60px' } },
    { id: 's2', name: 'Red Heels', emoji: '👠', style: { bottom: '10px', fontSize: '60px' } },
    { id: 's3', name: 'Sneakers', emoji: '👟', style: { bottom: '10px', fontSize: '60px' } },
  ],
  accessories: [
    { id: 'a1', name: 'Red Scarf', emoji: '🧣', style: { top: '65px', fontSize: '70px', zIndex: 50 } },
    { id: 'a2', name: '22 Glasses', emoji: '🕶️', style: { top: '15px', fontSize: '45px', zIndex: 60 } },
    { id: 'a3', name: 'Friendship Bracelet', emoji: '📿', style: { top: '160px', left: '35px', fontSize: '40px', zIndex: 55 } },
    { id: 'a4', name: 'Bejeweled Necklace', emoji: '💎', style: { top: '75px', fontSize: '35px', zIndex: 45 } },
  ],
  props: [
    { id: 'p1', name: 'Acoustic Guitar', emoji: '🎸', style: { top: '140px', right: '15px', fontSize: '90px', transform: 'rotate(-20deg)' } },
    { id: 'p2', name: 'Eras Mic', emoji: '🎤', style: { top: '90px', right: '45px', fontSize: '60px' } },
    { id: 'p3', name: 'Champagne Glass', emoji: '🥂', style: { top: '130px', right: '35px', fontSize: '55px' } },
  ]
};

export default function EraStylist({ lang, onBack }) {
  const isHe = lang === 'he';
  const BackIcon = isHe ? ArrowRight : ArrowLeft;
  const avatarRef = useRef(null);

  const [activeTab, setActiveTab] = useState('outfits');
  const [selections, setSelections] = useState({
    outfits: null,
    shoes: null,
    accessories: null,
    props: null
  });

  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleSelectItem = (category, item) => {
    setSelections(prev => ({
      ...prev,
      [category]: prev[category]?.id === item.id ? null : item // לחיצה נוספת מסירה את הפריט
    }));
  };

  const handleFinishDesign = async () => {
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
      // 1. העלאת צילום המסך (Base64) ל-Cloudinary
      const formData = new FormData();
      formData.append('file', screenshotUrl);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();
      
      // 2. העלאת הפוסט לשרת לתוך קטגוריית "גלריה"
      await API.post('/posts', {
        title: 'הלוק שלי מ-The Ultimate Era Stylist! ✨',
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

  if (screenshotUrl) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-delicate)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontFamily: '"Georgia", serif', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
            {shareSuccess ? 'הלוק שותף בהצלחה!' : 'הלוק שלך מוכן! 📸'}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            {shareSuccess ? 'הוא מחכה לך עכשיו בגלריית יצירות הקהילה.' : 'את נראית כמו Era מהלכת. מוכנה לשתף עם הקהילה?'}
          </p>

          <img 
            src={screenshotUrl} 
            alt="My Era Look" 
            style={{ width: '240px', borderRadius: '16px', border: '2px solid var(--primary-rose)', boxShadow: '0 4px 15px rgba(216,112,147,0.2)', marginBottom: '2rem' }} 
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
                {isSharing ? 'משתף בגלריה...' : 'שתפי את הלוק בגלריה!'}
              </button>
              <button 
                onClick={() => setScreenshotUrl(null)}
                style={{ padding: '0.8rem 1.5rem', borderRadius: '20px', backgroundColor: 'var(--bg-creamy)', color: 'var(--text-dark)', border: '1px solid var(--border-delicate)', fontWeight: 600, cursor: 'pointer' }}
              >
                חזרה לעיצוב
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

            {/* שכבות הביגוד (Z-Index Hierarchy) */}
            {selections.outfits && <div style={{ position: 'absolute', zIndex: 20, ...selections.outfits.style }}>{selections.outfits.emoji}</div>}
            {selections.shoes && <div style={{ position: 'absolute', zIndex: 30, ...selections.shoes.style }}>{selections.shoes.emoji}</div>}
            {selections.accessories && <div style={{ position: 'absolute', zIndex: 40, ...selections.accessories.style }}>{selections.accessories.emoji}</div>}
            {selections.props && <div style={{ position: 'absolute', zIndex: 50, ...selections.props.style }}>{selections.props.emoji}</div>}
          </div>

          <button 
            onClick={handleFinishDesign}
            disabled={isCapturing}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--primary-rose)', color: '#fff', padding: '0.8rem 2rem', borderRadius: '20px', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: isCapturing ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(216,112,147,0.25)' }}
          >
            {isCapturing ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
            {isHe ? 'סיימתי לעצב!' : 'Finish Look!'}
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