import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import HotelCard from '../components/HotelCard';
import axios from 'axios';

const PROPERTY_TYPES = ['Hotel', 'Resort', 'Villa', 'Hostel', 'Apartment', 'Homestay'];
const AMENITIES = ['Free WiFi', 'Swimming Pool', 'Parking', 'Spa', 'Gym', 'Restaurant'];

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    city: queryParams.get('destination') || '',
    minPrice: '',
    maxPrice: '',
    starRating: '',
    type: [], // Multiple types
    amenities: [], // New filter
    sort: 'popular'
  });

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const { city, minPrice, maxPrice, starRating, type, amenities, sort } = filters;
      const typeStr = type.join(',');
      const amenitiesStr = amenities.join(',');
      const url = `http://localhost:5000/api/hotels?city=${city}&min=${minPrice || 0}&max=${maxPrice || 1000000}&stars=${starRating}&type=${typeStr}&amenities=${amenitiesStr}&sort=${sort}`;
      const res = await axios.get(url);
      setHotels(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHotels();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'type') {
        const newTypes = checked 
          ? [...filters.type, value] 
          : filters.type.filter(t => t !== value);
        setFilters({ ...filters, type: newTypes });
      } else if (name === 'amenities') {
        const newAmenities = checked 
          ? [...filters.amenities, value] 
          : filters.amenities.filter(a => a !== value);
        setFilters({ ...filters, amenities: newAmenities });
      }
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '80px' }}>
      <Navbar />
      
      {/* Sticky Search Header */}
      <div style={{ background: 'var(--surface)', padding: '1.5rem 0', borderBottom: '1px solid var(--outline-variant)', position: 'sticky', top: '80px', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <SearchBar 
            initialData={{ city: filters.city }} 
            onSearch={(data) => setFilters(prev => ({ ...prev, city: data.destination }))} 
          />
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '3rem' }}>
        
        {/* Sidebar Filters */}
        <aside style={{ 
          height: 'fit-content', 
          position: 'sticky', 
          top: '220px', 
          maxHeight: 'calc(100vh - 240px)', 
          overflowY: 'auto',
          paddingRight: '4px' // Space for scrollbar
        }} className="custom-scrollbar">
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Filters
              <span 
                style={{ fontSize: '0.75rem', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => setFilters({ city: '', minPrice: '', maxPrice: '', starRating: '', type: [], amenities: [], sort: 'popular' })}
              >
                Reset
              </span>
            </h3>
            
            {/* Price Range - Vertical Layout to Fix Overlap */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label className="label-mono" style={{ display: 'block', marginBottom: '1rem' }}>PRICE PER NIGHT</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--on-surface-subtle)', fontSize: '0.9rem' }}>₹</span>
                  <input 
                    type="number" 
                    name="minPrice" 
                    value={filters.minPrice}
                    placeholder="Min Price" 
                    onChange={handleFilterChange} 
                    style={{ width: '100%', padding: '10px 10px 10px 25px', fontSize: '0.9rem', border: '1.5px solid var(--outline)' }} 
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--on-surface-subtle)', fontSize: '0.9rem' }}>₹</span>
                  <input 
                    type="number" 
                    name="maxPrice" 
                    value={filters.maxPrice}
                    placeholder="Max Price" 
                    onChange={handleFilterChange} 
                    style={{ width: '100%', padding: '10px 10px 10px 25px', fontSize: '0.9rem', border: '1.5px solid var(--outline)' }} 
                  />
                </div>
              </div>
            </div>

            {/* Star Rating */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label className="label-mono" style={{ display: 'block', marginBottom: '1rem' }}>STAR RATING</label>
              <select 
                name="starRating" 
                value={filters.starRating}
                onChange={handleFilterChange} 
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--outline)', fontWeight: 600 }}
              >
                <option value="">Any Rating</option>
                <option value="5">5 Star Hotels</option>
                <option value="4">4 Star Hotels</option>
                <option value="3">3 Star Hotels</option>
              </select>
            </div>

            {/* Property Type */}
            <div style={{ marginBottom: '2.5rem' }}>
              <label className="label-mono" style={{ display: 'block', marginBottom: '1rem' }}>PROPERTY TYPE</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {PROPERTY_TYPES.map(type => (
                  <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                    <input 
                      type="checkbox" 
                      name="type" 
                      value={type} 
                      checked={filters.type.includes(type)}
                      onChange={handleFilterChange} 
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Amenities (UI Only for now) */}
            <div>
              <label className="label-mono" style={{ display: 'block', marginBottom: '1rem' }}>AMENITIES</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {AMENITIES.map(amenity => (
                  <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                    <input 
                      type="checkbox" 
                      name="amenities" 
                      value={amenity} 
                      checked={filters.amenities.includes(amenity)}
                      onChange={handleFilterChange} 
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results Section */}
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>
                Hotels in <span style={{ color: 'var(--primary)' }}>{filters.city || 'all Destinations'}</span>
              </h1>
              <p style={{ color: 'var(--on-surface-subtle)', fontWeight: 500 }}>
                Showing {hotels.length} verified properties
              </p>
            </div>
            
            {/* Functional Sort By Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--on-surface-subtle)' }}>SORT BY</span>
              <select 
                name="sort" 
                value={filters.sort}
                onChange={handleFilterChange}
                style={{ 
                  padding: '10px 16px', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1.5px solid var(--outline)', 
                  background: 'var(--surface)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: 'var(--primary)',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="popular">Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '6rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
              <h3>Finding the best deals...</h3>
            </div>
          ) : hotels.length === 0 ? (
            <div className="glass-panel" style={{ padding: '5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔍</div>
              <h2 style={{ marginBottom: '1rem' }}>No results found</h2>
              <p style={{ color: 'var(--on-surface-subtle)', maxWidth: '400px', margin: '0 auto 2rem' }}>
                We couldn't find any hotels matching your current filters. Try resetting your search or adjusting the price range.
              </p>
              <button className="btn-primary" onClick={() => setFilters({ city:'', minPrice:'', maxPrice:'', starRating:'', type: [], sort: 'popular' })}>
                Reset all filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {hotels.map(hotel => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Search;
