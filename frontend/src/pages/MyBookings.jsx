import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token || '';
        const res = await axios.get('http://localhost:5000/api/bookings/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchBookings();
  }, [user, navigate]);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token || '';
        await axios.patch(`http://localhost:5000/api/bookings/cancel/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(bookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
      } catch (err) {
        alert('Failed to cancel booking.');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '80px' }}>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>My Reservations</h1>

        {loading ? (
          <div>Loading your reservations...</div>
        ) : bookings.length === 0 ? (
          <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
            <h3>No bookings found</h3>
            <p style={{ color: 'var(--on-surface-subtle)', marginBottom: '2rem' }}>You haven't made any reservations yet.</p>
            <button className="btn-primary" onClick={() => navigate('/search')}>Start Exploring</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {bookings.map(booking => (
              <div key={booking._id} className="glass-panel fade-in" style={{ padding: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ width: '180px', height: '120px', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <img src={booking.hotel?.photos?.[0] || 'https://picsum.photos/seed/hotel/200/150'} alt="Hotel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.3rem' }}>{booking.hotel?.name || 'Unknown Hotel'}</h3>
                    <div className="badge" style={{ background: booking.status === 'confirmed' ? 'var(--success-light)' : 'var(--error-light)', color: booking.status === 'confirmed' ? 'var(--success)' : 'var(--error)' }}>
                      {booking.status}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '2rem', color: 'var(--on-surface-variant)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    <div>📅 **In:** {new Date(booking.checkInDate).toLocaleDateString()}</div>
                    <div>📅 **Out:** {new Date(booking.checkOutDate).toLocaleDateString()}</div>
                    <div>🏢 **Room:** #{booking.roomNumber}</div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <span className="label-mono">Total Paid</span>
                      <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-dark)' }}>₹{booking.totalPrice.toLocaleString()}</div>
                    </div>
                    
                    {booking.status === 'confirmed' && (
                      <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.85rem', borderColor: 'var(--error)', color: 'var(--error)' }} onClick={() => handleCancel(booking._id)}>
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
