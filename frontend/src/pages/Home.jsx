import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DESTINATIONS = [
  { name: 'Mumbai', image: 'https://picsum.photos/seed/mumbai/600/400', properties: 42, path: '/search?city=Mumbai' },
  { name: 'Goa', image: 'https://picsum.photos/seed/goa/600/400', properties: 128, path: '/search?city=Goa' },
  { name: 'Dubai', image: 'https://picsum.photos/seed/dubai/600/400', properties: 85, path: '/search?city=Dubai' },
  { name: 'Delhi', image: 'https://picsum.photos/seed/delhi/600/400', properties: 64, path: '/search?city=Delhi' },
];

const Home = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const overlayOpacity = Math.min(0.8, 0.2 + scrollY / 800);
  const parallaxY = scrollY * 0.4;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'url("/global-bg.png") fixed center/cover no-repeat',
      color: 'var(--on-surface)',
      position: 'relative'
    }}>
      {/* Light-Translucent Aesthetic Layer for Readability */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(255, 255, 255, 0.1)', // Soften the background for professional contrast
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar isTransparent={scrollY < 100} />

        {/* Hero Section - Dynamic Scroll Linked Parallax */}
        <div style={{
          position: 'relative',
          height: '100vh',
          minHeight: '700px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'url("/hero.png") center/cover no-repeat fixed',
          color: '#fff',
          overflow: 'hidden',
          backgroundPosition: `center calc(50% + ${parallaxY}px)`,
        }}>
          {/* Dynamic Darkened Overlay on Scroll */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,${overlayOpacity + 0.3}))`,
            zIndex: 1,
            transition: 'background 0.1s ease-out'
          }}></div>

          <div style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            width: '100%',
            maxWidth: '1000px',
            padding: '0 2rem',
            opacity: heroOpacity,
            transform: `translateY(${-scrollY * 0.2}px)`,
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
          }}>
            <h1 className="fade-in" style={{
              color: '#fff',
              fontSize: 'max(3rem, 5vw)',
              marginBottom: '1rem',
              fontWeight: 800,
              textShadow: '0 4px 40px rgba(0,0,0,0.6)',
              letterSpacing: '-0.03em'
            }}>
              Luminous <span style={{ fontWeight: 300, color: 'var(--primary)', textShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>Logic</span> Stays
            </h1>
            <p className="fade-in" style={{
              color: 'rgba(255,255,255,1)',
              fontSize: '1.25rem',
              marginBottom: '3rem',
              fontWeight: 500,
              maxWidth: '600px',
              margin: '0 auto 3rem',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)'
            }}>
              Experience the future of travel with curated, premium hotel listings across the globe.
            </p>

            {/* Simplified Discovery Section - Clean & Direct */}
            <div className="glass-card fade-in" style={{
              maxWidth: '700px',
              margin: '0 auto',
              padding: '2.5rem 3rem',
              borderRadius: '100px', // Pill-shaped for a modern discover look
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '2rem'
            }}>
              <p style={{ color: 'rgba(0,0,0,0.7)', fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>
                Ready to find your next escape?
              </p>
              <button className="btn-primary" style={{ height: '60px', padding: '0 50px', borderRadius: '100px', fontSize: '1.1rem', fontWeight: 700 }} onClick={() => navigate('/search')}>
                Explore Now
              </button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem' }}>

          {/* Trending Destinations - Cinematic Video Background Section */}
          <section style={{
            margin: '0 -2rem 8rem',
            position: 'relative',
            padding: '8rem 2rem',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            minHeight: '800px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {/* Cinematic Background Image (Ken Burns Effect) */}
            <div className="ken-burns" style={{
              position: 'absolute',
              inset: 0,
              background: 'url("/discovery-bg.png") center/cover no-repeat',
              zIndex: 0
            }}></div>

            {/* Optional Video Layer (Hidden if blocked, or lower opacity) */}
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
                opacity: 0.5 // Blends with the high-res image
              }}
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-top-aerial-view-of-a-luxury-resort-and-pools-4422-large.mp4" type="video/mp4" />
            </video>

            {/* Refined Dark Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
              zIndex: 1
            }}></div>

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
              <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '0.75rem', color: '#fff', fontWeight: 800 }}>Trending Destinations</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', fontWeight: 500 }}>Curated list of most-loved cities this month.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
                {DESTINATIONS.map((dest) => (
                  <div
                    key={dest.name}
                    className="img-hover-zoom"
                    onClick={() => navigate(dest.path)}
                    style={{
                      position: 'relative',
                      borderRadius: 'var(--radius-md)',
                      height: '450px',
                      cursor: 'pointer',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '2.5rem',
                      color: '#fff'
                    }}>
                      <h3 style={{ color: '#fff', fontSize: '1.75rem', marginBottom: '0.4rem', fontWeight: 700 }}>{dest.name}</h3>
                      <p style={{ opacity: 0.8, fontSize: '1rem', fontWeight: 500 }}>{dest.properties} Properties</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us - Now in a Premium Glass Container */}
          <section className="glass-card" style={{
            marginBottom: '8rem',
            padding: '5rem 3rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255,255,255,0.2)',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem', fontWeight: 800, color: 'var(--on-surface)' }}>
              Why Choose <span className="text-gradient">Luminous Logic</span>?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
              {[
                { icon: '💎', title: 'Premium Selection', desc: 'Every property is hand-verified for quality and aesthetic excellence.' },
                { icon: '🌙', title: 'Smart Booking', desc: 'Fast, secure, and intuitive interface designed for modern travelers.' },
                { icon: '🏷️', title: 'Best Price Always', desc: 'Direct partnership with property owners ensure you get the best deal.' }
              ].map(feature => (
                <div key={feature.title} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', opacity: 0.9 }}>{feature.icon}</div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 700 }}>{feature.title}</h3>
                  <p style={{ color: 'var(--on-surface-subtle)', lineHeight: '1.6', fontSize: '1.05rem', margin: 0 }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action - For Owners */}
          <section className="glass-card" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '5rem 4rem',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            border: '1px solid var(--outline-variant)'
          }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>Host your space and join the <span className="text-gradient">Luminous</span> network.</h2>
              <p style={{ color: 'var(--on-surface-subtle)', marginBottom: '3rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                We partner with homeowners and boutique hotels to offer unique stays. Get started with our expert listing assistant in minutes.
              </p>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <button className="btn-primary" style={{ padding: '16px 40px', fontSize: '1rem' }} onClick={() => navigate('/list-hotel')}>Start Hosting</button>
                <button className="btn-secondary" style={{ padding: '16px 40px', fontSize: '1rem' }} onClick={() => navigate('/search')}>Learn More</button>
              </div>
            </div>
            <div style={{ position: 'relative', height: '400px' }}>
              <img
                src="https://picsum.photos/seed/host/800/600"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                alt="Become a host"
              />
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                width: '120px',
                height: '120px',
                background: 'var(--primary)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '2rem',
                boxShadow: 'var(--shadow-lg)'
              }}>
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
            </div>
          </section>

        </div>

        {/* Modern Footer */}
        <footer style={{
          padding: '4rem 2rem 3rem',
          background: 'rgba(255, 255, 255, 0.50)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{
                fontSize: '1.85rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                fontFamily: 'var(--font-display)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.2rem'
              }}>
                <span className="branding-luminous">Luminous</span>
                <span className="branding-logic">Logic</span>
              </div>
              <p style={{ color: 'var(--on-surface-subtle)', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 500 }}>© 2026 Luminous Logic Inc. All rights reserved.</p>
            </div>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', fontWeight: 600 }}>
              <span className="footer-link">Privacy Policy</span>
              <span className="footer-link">Terms of Service</span>
              <span className="footer-link">Support</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
