import { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ isTransparent }) => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserPopup, setShowUserPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowUserPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setShowUserPopup(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav style={{
      background: isTransparent ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.50)',
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '0.75rem 2rem',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxShadow: isTransparent ? 'none' : 'var(--shadow-sm)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo Section */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <svg width="42" height="42" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 188, 212, 0.25))', transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08) rotate(-4deg)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}>
            <defs>
              <linearGradient id="hotelXpressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#2962FF', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#00BCD4', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            {/* Location pin shape */}
            <path d="M256 40C160 40 100 120 100 200c0 100 156 272 156 272s156-172 156-272c0-80-60-160-156-160z" fill="url(#hotelXpressGrad)"/>
            {/* Bed icon */}
            <rect x="170" y="210" width="172" height="60" rx="10" fill="white"/>
            <rect x="170" y="180" width="60" height="40" rx="8" fill="white"/>
            {/* Speed lines */}
            <path d="M140 260 Q256 300 372 260" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round"/>
          </svg>
          <div className="branding-container" style={{
            fontSize: '1.85rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            fontFamily: 'var(--font-display)',
            display: 'flex',
            alignItems: 'center',
            gap: '0rem'
          }}>
            <span className="branding-luminous">Hotel</span>
            <span className="branding-logic">Xpress</span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/search" className={`nav-link ${isActive('/search')}`} style={{ color: isTransparent ? 'rgba(255,255,255,0.85)' : 'var(--on-surface-subtle)' }}>Hotels</Link>
          <Link to="/bookings" className={`nav-link ${isActive('/bookings')}`} style={{ color: isTransparent ? 'rgba(255,255,255,0.85)' : 'var(--on-surface-subtle)' }}>My Bookings</Link>
          <Link to="/list-hotel" className={`nav-link ${isActive('/list-hotel')}`} style={{ color: isTransparent ? 'rgba(255,255,255,0.85)' : 'var(--on-surface-subtle)' }}>List Property</Link>
          <Link to="/settings" className={`nav-link ${isActive('/settings')}`} style={{ color: isTransparent ? 'rgba(255,255,255,0.85)' : 'var(--on-surface-subtle)' }}>Settings</Link>
          {user?.role === 'admin' && (
            <Link to="/admin/users" className={`nav-link ${isActive('/admin/users')}`} style={{ color: isTransparent ? 'rgba(255,255,255,0.85)' : 'var(--on-surface-subtle)' }}>Manage Users</Link>
          )}
        </div>

        {/* User Auth Section */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }} ref={popupRef}>
          {user ? (
            <div style={{ position: 'relative' }}>
              {/* Profile Avatar Trigger */}
              <div
                onClick={() => setShowUserPopup(!showUserPopup)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--primary-container)',
                  color: 'var(--primary-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  border: `2px solid ${isTransparent ? 'rgba(255,255,255,0.3)' : 'var(--primary-light)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {user.username.charAt(0).toUpperCase()}
              </div>

              {/* Gmail-Style User Popup */}
              {showUserPopup && (
                <div className="user-popup">
                  <div className="user-popup-avatar-large">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="user-popup-name">Hi, {user.username}!</h3>
                  <p className="user-popup-email">{user.email}</p>
                  <span className="user-popup-role">{user.role}</span>

                  <Link to="/settings" className="user-popup-action" onClick={() => setShowUserPopup(false)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Manage Account
                  </Link>

                  <div className="user-popup-footer">
                    <button className="user-popup-logout" onClick={handleLogout}>
                      Sign out of HotelXpress
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-secondary" style={{ padding: '6px 16px' }} onClick={() => navigate('/login')}>Login</button>
              <button className="btn-primary" style={{ padding: '6px 16px' }} onClick={() => navigate('/register')}>Sign Up</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

