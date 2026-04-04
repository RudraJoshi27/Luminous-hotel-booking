import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const PROPERTY_TYPES = ['Hotel', 'Resort', 'Villa', 'Hostel', 'Apartment', 'Homestay', 'Boutique Hotel'];

const InputField = ({ label, id, type = 'text', value, onChange, placeholder, required = true, children }) => (
  <div style={{ marginBottom: '1.25rem' }}>
    <label htmlFor={id} style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--on-surface)' }}>
      {label} {required && <span style={{ color: 'var(--error)' }}>*</span>}
    </label>
    {children || (
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%', padding: '12px 14px',
          border: '1.5px solid var(--outline)', borderRadius: 'var(--radius-sm)',
          fontSize: '0.95rem', color: 'var(--on-surface)', background: 'var(--surface)',
          fontFamily: 'var(--font-body)'
        }}
      />
    )}
  </div>
);

const ListHotel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    type: 'Hotel',
    city: '',
    address: '',
    distance: '',
    title: '',
    desc: '',
    cheapestPrice: '',
    starRating: '3',
    photos: '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }

    setLoading(true);
    setError('');
    try {
      const token = user?.token || '';
      await axios.post('http://localhost:5000/api/listings', {
        ...form,
        cheapestPrice: Number(form.cheapestPrice),
        starRating: Number(form.starRating),
        photos: form.photos ? [form.photos] : [],
        rating: 4.0,
      }, { headers: { Authorization: `Bearer ${token}` } });

      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to list property. Please try again.');
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
        <Navbar />
        <div style={{ maxWidth: '500px', margin: '4rem auto', textAlign: 'center', padding: '2rem' }}>
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h2 style={{ marginBottom: '1rem' }}>Login Required</h2>
            <p style={{ color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>You must be logged in to list your property.</p>
            <button className="btn-primary" onClick={() => navigate('/login')}>Login to Continue</button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
        <Navbar />
        <div style={{ maxWidth: '500px', margin: '4rem auto', textAlign: 'center', padding: '2rem' }}>
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ marginBottom: '0.5rem', color: 'var(--success)' }}>Property Listed!</h2>
            <p style={{ color: 'var(--on-surface-variant)', marginBottom: '2rem' }}>Your property has been submitted and will appear in search results.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={() => { setSuccess(false); setForm({ name:'',type:'Hotel',city:'',address:'',distance:'',title:'',desc:'',cheapestPrice:'',starRating:'3',photos:'' }); }}>List Another</button>
              <button className="btn-primary" onClick={() => navigate('/search')}>View Listings</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>List Your Property</h1>
          <p style={{ color: 'var(--on-surface-variant)' }}>Start your journey with Luminous Logic today.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--outline-variant)', fontSize: '1.1rem' }}>
              🏨 Basic Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.5rem' }}>
              <InputField label="Property Name" id="name" value={form.name} onChange={handleChange} placeholder="e.g. Blue Lagoon Resort" />
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--on-surface)' }}>
                  Property Type <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <select id="type" value={form.type} onChange={handleChange}
                  style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--outline)', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', color: 'var(--on-surface)', background: 'var(--surface)' }}>
                  {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <InputField label="City" id="city" value={form.city} onChange={handleChange} placeholder="e.g. Mumbai" />
              <InputField label="Full Address" id="address" value={form.address} onChange={handleChange} placeholder="e.g. Marine Drive, South Mumbai" />
              <InputField label="Distance from Center" id="distance" value={form.distance} onChange={handleChange} placeholder="e.g. 500m from Beach" />
              <InputField label="Price Per Night (₹)" id="cheapestPrice" type="number" value={form.cheapestPrice} onChange={handleChange} placeholder="e.g. 7500" />
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--outline-variant)', fontSize: '1.1rem' }}>
              📝 Property Details
            </h3>
            <InputField label="Tagline / Title" id="title" value={form.title} onChange={handleChange} placeholder="e.g. Stunning sea views and luxury comfort" />

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="desc" style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--on-surface)' }}>
                Description <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <textarea
                id="desc"
                value={form.desc}
                onChange={handleChange}
                rows={4}
                required
                placeholder="Tell guests what makes your property unique..."
                style={{
                  width: '100%', padding: '12px 14px',
                  border: '1.5px solid var(--outline)', borderRadius: 'var(--radius-sm)',
                  fontSize: '0.95rem', color: 'var(--on-surface)', background: 'var(--surface)',
                  fontFamily: 'var(--font-body)', resize: 'vertical', lineHeight: 1.6
                }}
              />
            </div>

            <InputField label="Photo URL" id="photos" value={form.photos} onChange={handleChange} required={false} placeholder="Link to a high-quality photo" />

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '0.9rem', color: 'var(--on-surface)' }}>
                Star Rating
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[3, 4, 5].map(s => (
                  <label key={s} style={{
                    flex: 1, cursor: 'pointer', textAlign: 'center', padding: '12px',
                    borderRadius: 'var(--radius-sm)', border: `2px solid ${form.starRating == s ? 'var(--primary)' : 'var(--outline)'}`,
                    background: form.starRating == s ? 'var(--primary-container)' : 'var(--surface)',
                    transition: 'all 0.15s'
                  }}>
                    <input type="radio" name="starRating" id="starRating" value={s} checked={form.starRating == s} onChange={handleChange} style={{ display: 'none' }} />
                    <div style={{ fontSize: '1.2rem', color: '#ffca28' }}>{'★'.repeat(s)}</div>
                    <div style={{ fontSize: '0.85rem', marginTop: '4px', fontWeight: form.starRating == s ? 700 : 500, color: form.starRating == s ? 'var(--primary-dark)' : 'var(--on-surface-subtle)' }}>{s} Star</div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div style={{ background: 'var(--error-light)', border: '1px solid var(--error)', borderRadius: 'var(--radius-sm)', padding: '1rem', marginBottom: '1.5rem', color: 'var(--error)', fontSize: '0.9rem', fontWeight: 500 }}>
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading}
            style={{ width: '100%', padding: '16px', fontSize: '1.1rem', borderRadius: 'var(--radius-md)' }}>
            {loading ? 'Submitting...' : '🚀 List My Property'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListHotel;
