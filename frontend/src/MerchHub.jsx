import React, { useState, useEffect } from 'react';
import API from './api';
import { Package, Search, Plus, X, Trash2, ExternalLink, Loader2, Image as ImageIcon, Disc3 } from 'lucide-react';

const CLOUDINARY_CLOUD_NAME = 'gvdwsxay';
const CLOUDINARY_UPLOAD_PRESET = 'swift-preset';

const ERAS = [
  { id: 'all', label: 'All Eras / הכל' },
  { id: 'debut', label: 'Debut', color: '#A5D6A7' },
  { id: 'fearless', label: 'Fearless', color: '#FFE082' },
  { id: 'speakNow', label: 'Speak Now', color: '#CE93D8' },
  { id: 'red', label: 'Red', color: '#EF9A9A' },
  { id: '1989', label: '1989', color: '#81D4FA' },
  { id: 'reputation', label: 'reputation', color: '#BDBDBD' },
  { id: 'lover', label: 'Lover', color: '#F8BBD0' },
  { id: 'folklore', label: 'folklore', color: '#CFD8DC' },
  { id: 'evermore', label: 'evermore', color: '#D7CCC8' },
  { id: 'midnights', label: 'Midnights', color: '#9FA8DA' },
  { id: 'ttpd', label: 'TTPD', color: '#D7CCC8' }
];

const CATEGORIES = [
  { id: 'all', label: 'All Types / הכל' },
  { id: 'vinyl', label: 'Vinyls / תקלטים' },
  { id: 'cd', label: 'CDs / דיסקים' },
  { id: 'cardigan', label: 'Cardigans / קרדיגנים' }
];

export default function MerchHub({ lang, isAdmin }) {
  const isHe = lang === 'he';
  const [items, setItems] = useState([]);
  const [selectedEra, setSelectedEra] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '', category: 'vinyl', era: 'midnights',
    image_url: '', release_year: '', rarity: '',
    status: '', description: '', external_link: ''
  });

  useEffect(() => {
    fetchItems();
  }, [selectedEra, selectedCategory]);

  const fetchItems = async () => {
    try {
      let url = '/collectibles?';
      if (selectedEra !== 'all') url += `era=${selectedEra}&`;
      if (selectedCategory !== 'all') url += `category=${selectedCategory}`;
      
      const res = await API.get(url);
      setItems(res.data);
    } catch (err) {
      console.error('Failed to fetch collectibles', err);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST', body: fd
      });
      const data = await res.json();
      setFormData({ ...formData, image_url: data.secure_url });
    } catch (err) {
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/collectibles', formData);
      setIsAdding(false);
      setFormData({
        title: '', category: 'vinyl', era: 'midnights', image_url: '',
        release_year: '', rarity: '', status: '', description: '', external_link: ''
      });
      fetchItems();
    } catch (err) {
      alert('Failed to add item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(isHe ? 'למחוק פריט זה?' : 'Delete this item?')) return;
    try {
      await API.delete(`/collectibles/${id}`);
      setSelectedItem(null);
      fetchItems();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: '"Georgia", serif', color: 'var(--text-dark)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Package size={26} color="var(--primary-rose-dark)" />
          {isHe ? 'אוסף דיסקים, תקלטים וקרדיגנים' : 'Collector\'s Corner'}
        </h2>
        {isAdmin && (
          <button
            onClick={() => setIsAdding(true)}
            style={{
              backgroundColor: 'var(--primary-rose)', color: '#fff', border: 'none', padding: '0.6rem 1.2rem',
              borderRadius: '20px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer'
            }}
          >
            <Plus size={16} />
            {isHe ? 'הוספת פריט חדש' : 'Add New Item'}
          </button>
        )}
      </div>

      {/* שורת סינונים וחיפוש */}
      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border-delicate)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <select value={selectedEra} onChange={(e) => setSelectedEra(e.target.value)} style={{ padding: '0.6rem 1rem', borderRadius: '14px', border: '1px solid var(--border-delicate)', backgroundColor: 'var(--bg-creamy)', fontWeight: 600, flex: '1 1 200px' }}>
            {ERAS.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
          </select>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ padding: '0.6rem 1rem', borderRadius: '14px', border: '1px solid var(--border-delicate)', backgroundColor: 'var(--bg-creamy)', fontWeight: 600, flex: '1 1 200px' }}>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <div style={{ position: 'relative', flex: '2 1 250px' }}>
            <Search size={16} style={{ position: 'absolute', top: '12px', [isHe ? 'right' : 'left']: '12px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder={isHe ? 'חיפוש פריט...' : 'Search items...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: `0.6rem ${isHe ? '2.2rem' : '1rem'} 0.6rem ${isHe ? '1rem' : '2.2rem'}`, borderRadius: '14px', border: '1px solid var(--border-delicate)', backgroundColor: 'var(--bg-creamy)', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </div>

      {/* גריד פריטים */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <Disc3 size={48} opacity={0.3} style={{ marginBottom: '1rem' }} />
          <p>{isHe ? 'לא נמצאו פריטים התואמים לחיפוש.' : 'No items found.'}</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {filteredItems.map(item => {
            const eraObj = ERAS.find(e => e.id === item.era) || ERAS[0];
            return (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                style={{
                  backgroundColor: 'var(--bg-card)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-delicate)', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: '200px', backgroundColor: '#f5f5f5', backgroundImage: `url(${item.image_url || ''})`, backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: `4px solid ${eraObj.color || 'var(--primary-rose)'}` }} />
                <div style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--secondary-sage-dark)', marginBottom: '0.3rem' }}>{item.category} • {item.era}</div>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'var(--text-dark)' }}>{item.title}</h3>
                  {item.rarity && <span style={{ display: 'inline-block', backgroundColor: '#FFF0F5', color: '#C2185B', padding: '0.2rem 0.5rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>{item.rarity}</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* חלון הוספת פריט (למנהלים בלבד) */}
      {isAdding && isAdmin && (
        <div onClick={() => setIsAdding(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <form onClick={e => e.stopPropagation()} onSubmit={handleSubmit} style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '24px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: 'var(--text-dark)' }}>{isHe ? 'הוספת פריט אספנות' : 'Add Collectible'}</h3>
              <button type="button" onClick={() => setIsAdding(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input required placeholder={isHe ? 'שם הפריט' : 'Title'} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid #ccc' }} />
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <select value={formData.era} onChange={e => setFormData({...formData, era: e.target.value})} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid #ccc' }}>
                  {ERAS.filter(e => e.id !== 'all').map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
                </select>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid #ccc' }}>
                  {CATEGORIES.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <input placeholder={isHe ? 'שנת יציאה' : 'Release Year'} value={formData.release_year} onChange={e => setFormData({...formData, release_year: e.target.value})} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid #ccc' }} />
                <input placeholder={isHe ? 'נדירות (למשל: נדיר מאוד)' : 'Rarity'} value={formData.rarity} onChange={e => setFormData({...formData, rarity: e.target.value})} style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid #ccc' }} />
              </div>

              <textarea placeholder={isHe ? 'תיאור קצר' : 'Description'} rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid #ccc', resize: 'vertical' }} />
              <input placeholder={isHe ? 'קישור חיצוני (אופציונלי)' : 'External Link'} value={formData.external_link} onChange={e => setFormData({...formData, external_link: e.target.value})} style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid #ccc' }} />
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem', backgroundColor: '#f0f0f0', borderRadius: '10px', cursor: 'pointer' }}>
                {isUploading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
                <span>{isHe ? 'העלאת תמונה' : 'Upload Image'}</span>
                <input type="file" accept="image/*" onChange={handleUpload} disabled={isUploading} style={{ display: 'none' }} />
              </label>
              {formData.image_url && <img src={formData.image_url} alt="Preview" style={{ height: '100px', objectFit: 'contain', borderRadius: '8px' }} />}

              <button type="submit" disabled={isUploading} style={{ padding: '1rem', borderRadius: '12px', backgroundColor: 'var(--primary-rose)', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>
                {isHe ? 'שמירה' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* מודאל צפייה בפריט */}
      {selectedItem && (
        <div onClick={() => setSelectedItem(null)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(5px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ backgroundColor: 'var(--bg-card)', borderRadius: '24px', maxWidth: '600px', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ position: 'relative', height: '300px', backgroundColor: '#000', display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => setSelectedItem(null)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={18} /></button>
              {selectedItem.image_url ? (
                <img src={selectedItem.image_url} alt={selectedItem.title} style={{ height: '100%', objectFit: 'contain' }} />
              ) : (
                <Package size={60} color="#555" style={{ alignSelf: 'center' }} />
              )}
            </div>

            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--secondary-sage-dark)', marginBottom: '0.5rem' }}>{selectedItem.category} • {selectedItem.era}</div>
                  <h2 style={{ margin: '0 0 1rem 0', fontFamily: '"Georgia", serif', color: 'var(--text-dark)' }}>{selectedItem.title}</h2>
                </div>
                {isAdmin && (
                  <button onClick={() => handleDelete(selectedItem.id)} style={{ background: 'none', border: 'none', color: '#C62828', cursor: 'pointer' }}><Trash2 size={18} /></button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {selectedItem.release_year && <span style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.3rem 0.8rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600 }}>{isHe ? 'שנה: ' : 'Year: '}{selectedItem.release_year}</span>}
                {selectedItem.rarity && <span style={{ backgroundColor: '#FFF0F5', color: '#C2185B', padding: '0.3rem 0.8rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700 }}>✨ {selectedItem.rarity}</span>}
              </div>

              {selectedItem.description && (
                <p style={{ lineHeight: '1.6', color: 'var(--text-dark)', marginBottom: '2rem', fontSize: '0.95rem' }}>{selectedItem.description}</p>
              )}

              {selectedItem.external_link && (
                <a href={selectedItem.external_link} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--primary-rose)', color: '#fff', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem' }}>
                  {isHe ? 'צפייה בפריט ברשת' : 'View Online'} <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}