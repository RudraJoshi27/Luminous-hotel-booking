import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch, initialData = {} }) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState(initialData.city || '');
  const [adults, setAdults] = useState(initialData.adults || 2);
  const [rooms, setRooms] = useState(initialData.rooms || 1);
  const [dates, setDates] = useState({
    checkIn: initialData.checkIn || new Date().toISOString().split('T')[0],
    checkOut: initialData.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0]
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!dates.checkIn || !dates.checkOut) {
      setError('Please select check-in and check-out dates.');
      return;
    }
    if (new Date(dates.checkIn) >= new Date(dates.checkOut)) {
      setError('Check-out date must be after Check-in date.');
      return;
    }
    setError('');
    
    const searchData = { destination, adults, rooms, ...dates };
    if (onSearch) {
      onSearch(searchData);
    } else {
      // Redirect to search page with query params
      const params = new URLSearchParams(searchData);
      navigate(`/search?${params.toString()}`);
    }
  };

  return (
    <div className="glass-panel" style={{ 
      display: 'flex', 
      background: '#fff', 
      padding: '0.75rem', 
      borderRadius: 'var(--radius-md)', 
      gap: '0.75rem', 
      alignItems: 'center',
      boxShadow: 'var(--shadow-md)',
      maxWidth: '1150px',
      margin: '0 auto',
      position: 'relative',
      border: '1px solid var(--outline-variant)'
    }}>
      {/* Destination */}
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', padding: '0.5rem 1rem', borderRight: '1px solid var(--outline-variant)' }}>
        <label className="label-mono" style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 700 }}>DESTINATION</label>
        <input 
          type="text" 
          placeholder="Where are you going?" 
          value={destination}
          onChange={e => setDestination(e.target.value)}
          style={{ border: 'none', padding: '4px 0', fontSize: '1.1rem', fontWeight: 600, color: 'var(--on-surface)', outline: 'none', width: '100%', background: 'transparent' }} 
        />
      </div>

      {/* Guests & Rooms */}
      <div 
        style={{ flex: 1.2, display: 'flex', flexDirection: 'column', padding: '0.5rem 1rem', position: 'relative', cursor: 'pointer', borderRight: '1px solid var(--outline-variant)' }}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <label className="label-mono" style={{ fontSize: '0.65rem' }}>GUESTS & ROOMS</label>
        <div style={{ padding: '4px 0', fontSize: '1rem', fontWeight: 600, color: 'var(--on-surface)' }}>
          {adults} Adults · {rooms} Room
        </div>

        {showDropdown && (
          <div className="glass-panel fade-in" style={{ 
            position: 'absolute', top: '110%', left: 0, width: '260px', padding: '1.5rem', zIndex: 100, 
            boxShadow: 'var(--shadow-lg)', border: '1px solid var(--outline-variant)' 
          }} onClick={e => e.stopPropagation()}>
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>Adults</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => {
                  const newAdults = Math.max(1, adults - 1);
                  setAdults(newAdults);
                  if (rooms > newAdults) setRooms(newAdults);
                }} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid var(--primary)', background: 'transparent', color: 'var(--primary)', cursor: 'pointer', fontWeight: 700 }}>-</button>
                <span style={{ fontWeight: 700, minWidth: '15px', textAlign: 'center' }}>{adults}</span>
                <button onClick={() => setAdults(adults + 1)} style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>+</button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>Rooms</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => setRooms(Math.max(1, rooms - 1))} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid var(--primary)', background: 'transparent', color: 'var(--primary)', cursor: 'pointer', fontWeight: 700 }}>-</button>
                <span style={{ fontWeight: 700, minWidth: '15px', textAlign: 'center' }}>{rooms}</span>
                <button 
                  onClick={() => { if (rooms < adults) setRooms(rooms + 1); }} 
                  disabled={rooms >= adults}
                  style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', 
                    background: rooms >= adults ? 'var(--outline-variant)' : 'var(--primary)', 
                    border: 'none', color: '#fff', 
                    cursor: rooms >= adults ? 'not-allowed' : 'pointer', fontWeight: 700 
                  }}
                >+</button>
              </div>
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '10px' }} onClick={() => setShowDropdown(false)}>Apply</button>
          </div>
        )}
      </div>

      {/* Real Travel Dates */}
      <div style={{ flex: 2, display: 'flex', gap: '1rem', padding: '0 1rem' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <label className="label-mono" style={{ fontSize: '0.65rem' }}>CHECK-IN</label>
          <input 
            type="date" 
            value={dates.checkIn} 
            onChange={e => setDates({...dates, checkIn: e.target.value})}
            style={{ border: 'none', background: 'transparent', fontSize: '0.95rem', fontWeight: 600, color: 'var(--on-surface)', outline: 'none', padding: '4px 0' }}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderLeft: '1px solid var(--outline-variant)', paddingLeft: '1rem' }}>
          <label className="label-mono" style={{ fontSize: '0.65rem' }}>CHECK-OUT</label>
          <input 
            type="date" 
            value={dates.checkOut} 
            onChange={e => setDates({...dates, checkOut: e.target.value})}
            style={{ border: 'none', background: 'transparent', fontSize: '0.95rem', fontWeight: 600, color: 'var(--on-surface)', outline: 'none', padding: '4px 0' }}
          />
        </div>
      </div>

        <button className="btn-primary" style={{ height: '54px', padding: '0 36px', borderRadius: 'var(--radius-sm)', fontSize: '1.1rem', fontWeight: 700, marginLeft: 'auto' }} onClick={handleSearch}>
          Search
        </button>

        {error && (
          <div className="fade-in" style={{ 
            position: 'absolute', top: '105%', right: '0', 
            background: 'var(--error-container)', color: 'var(--error)', 
            padding: '8px 16px', borderRadius: 'var(--radius-sm)', 
            fontSize: '0.85rem', fontWeight: 600, border: '1px solid var(--error)',
            zIndex: 50, boxShadow: 'var(--shadow-sm)'
          }}>
            ⚠️ {error}
          </div>
        )}
      </div>
    );
};

export default SearchBar;
