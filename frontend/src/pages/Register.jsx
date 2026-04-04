import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerCall } from '../api/auth';
import Navbar from '../components/Navbar';

const Register = () => {
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
  const [errorLocal, setErrorLocal] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerCall(credentials);
      navigate('/login');
    } catch (err) {
      setErrorLocal(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)', padding: '2rem' }}>
        <div className="glass-panel fade-in" style={{ padding: '3rem', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', color: 'var(--on-surface)' }}>Create Account</h2>
            <p style={{ color: 'var(--on-surface-subtle)', fontSize: '1rem' }}>Join our vibrant community</p>
          </div>

          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            {[
              { label: 'Username', id: 'username', type: 'text', placeholder: 'Choose a username' },
              { label: 'Email', id: 'email', type: 'email', placeholder: 'your@email.com' },
              { label: 'Password', id: 'password', type: 'password', placeholder: 'Create a password' },
            ].map(field => (
              <div key={field.id} style={{ marginBottom: '1.5rem' }}>
                <label className="label-mono" style={{ display: 'block', marginBottom: '0.5rem' }}>{field.label}</label>
                <input type={field.type} id={field.id} value={credentials[field.id]} onChange={handleChange} required placeholder={field.placeholder}
                  style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--outline)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }} />
              </div>
            ))}

            {errorLocal && (
              <div style={{ background: 'var(--error-light)', color: 'var(--error)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                ⚠️ {errorLocal}
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '15px', fontSize: '1.1rem', marginTop: '1rem' }}>
              {loading ? 'Thinking...' : 'Get Started'}
            </button>
          </form>

          <p style={{ marginTop: '2rem', fontSize: '1rem', color: 'var(--on-surface-subtle)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
