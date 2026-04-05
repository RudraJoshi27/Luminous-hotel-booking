import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Simple booking state
  const [dates, setDates] = useState({
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/hotels/find/${id}`);
        setHotel(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchHotel();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    try {
      const token = user?.token || '';
      const nights = Math.ceil((new Date(dates.checkOut) - new Date(dates.checkIn)) / (1000 * 60 * 60 * 24));
      const totalPrice = hotel.cheapestPrice * (nights > 0 ? nights : 1);

      await axios.post('http://localhost:5000/api/bookings', {
        hotelId: hotel._id,
        roomNumber: Math.floor(Math.random() * 500) + 101, // Mock room number
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        totalPrice
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage({ text: 'Booking confirmed! Redirecting to your bookings...', type: 'success' });
      setTimeout(() => navigate('/bookings'), 2000);
    } catch (err) {
      setMessage({ text: 'Booking failed. Please try again.', type: 'error' });
    }
    setBookingLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!hotel) return <div>Hotel not found!</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '80px' }}>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        <div className="fade-in">
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, marginBottom: '1rem' }}>
            ← Back to Search
          </button>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
            {/* Left side: Images and Info */}
            <div>
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '400px', marginBottom: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
                <img src={hotel.photos[0] || 'https://picsum.photos/seed/hotel/800/400'} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h1 style={{ fontSize: '2.5rem' }}>{hotel.name}</h1>
                  <div className="badge badge-cyan" style={{ fontSize: '1rem' }}>{hotel.rating.toFixed(1)} ★</div>
                </div>
                <p style={{ color: 'var(--on-surface-subtle)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  📍 {hotel.address}, {hotel.city}
                </p>
                
                <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '0.5rem' }}>Description</h3>
                <p style={{ lineHeight: 1.8, color: 'var(--on-surface-variant)' }}>{hotel.desc}</p>
              </div>
            </div>

            {/* Right side: Booking Card */}
            <div>
              <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--secondary)' }}>Book Your Stay</h2>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="label-mono" style={{ display: 'block', marginBottom: '0.5rem' }}>Check In</label>
                  <input 
                    type="date" 
                    value={dates.checkIn} 
                    onChange={e => setDates({...dates, checkIn: e.target.value})}
                    style={{ width: '100%', padding: '12px' }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="label-mono" style={{ display: 'block', marginBottom: '0.5rem' }}>Check Out</label>
                  <input 
                    type="date" 
                    value={dates.checkOut} 
                    onChange={e => setDates({...dates, checkOut: e.target.value})}
                    style={{ width: '100%', padding: '12px' }}
                  />
                </div>

                <div style={{ padding: '1.5rem', background: 'var(--surface-container-low)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 500 }}>Price per night</span>
                    <span style={{ fontWeight: 700 }}>₹{hotel.cheapestPrice.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--outline)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Total Price</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                      ₹{(hotel.cheapestPrice * (Math.ceil((new Date(dates.checkOut) - new Date(dates.checkIn)) / (1000 * 60 * 60 * 24)) || 1)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {message.text && (
                  <div style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', background: message.type === 'success' ? 'var(--success-light)' : 'var(--error-light)', color: message.type === 'success' ? 'var(--success)' : 'var(--error)', marginBottom: '1rem', fontWeight: 600 }}>
                    {message.text}
                  </div>
                )}

                <button 
                  className="btn-primary" 
                  style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem' }}
                  onClick={handleBooking}
                  disabled={bookingLoading}
                >
                  {bookingLoading ? 'Processing...' : 'Confirm Reservation'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
