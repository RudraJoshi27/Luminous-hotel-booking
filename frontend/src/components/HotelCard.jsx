import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  return (
    <div className="glass-panel fade-in" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden',
      height: '100%',
      transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid var(--outline-variant)'
    }}
    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
    onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Image Container */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img 
          src={hotel.photos[0] || 'https://picsum.photos/seed/hotel/400/300'} 
          alt={hotel.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ 
          position: 'absolute', 
          bottom: '12px', 
          right: '12px', 
          background: 'var(--primary)', 
          color: '#fff', 
          padding: '4px 10px', 
          borderRadius: 'var(--radius-sm)', 
          fontWeight: 700,
          fontSize: '0.85rem'
        }}>
          {hotel.rating.toFixed(1)} ★
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', whiteSpace: 'normal', wordBreak: 'break-word' }}>{hotel.name}</h3>
          <p style={{ color: 'var(--on-surface-subtle)', fontSize: '0.8rem', fontWeight: 500 }}>
            📍 {hotel.city}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>{hotel.starRating} ★</span>
          {hotel.featured && <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>Exclusive</span>}
          {hotel.amenities?.slice(0, 3).map(a => (
            <span key={a} className="badge badge-gray" style={{ fontSize: '0.65rem', opacity: 0.8 }}>{a}</span>
          ))}
          {hotel.amenities?.length > 3 && <span style={{ fontSize: '0.65rem', color: 'var(--on-surface-subtle)' }}>+{hotel.amenities.length - 3} more</span>}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--outline-variant)', paddingTop: '1rem' }}>
          <div>
            <span className="label-mono" style={{ fontSize: '0.65rem' }}>Per Night</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--on-surface)' }}>
              ₹{hotel.cheapestPrice.toLocaleString()}
            </div>
          </div>
          
          <Link to={`/hotel/${hotel._id}`}>
            <button className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
              View Stay
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
