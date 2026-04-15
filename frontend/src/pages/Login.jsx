import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginCall } from '../api/auth';
import Navbar from '../components/Navbar';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorLocal, setErrorLocal] = useState('');
  const { loading, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await loginCall(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { ...res.details, token: res.token } });
      navigate('/');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response?.data });
      setErrorLocal(err.response?.data?.message || 'Login failed. Check your credentials.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '80px' }}>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)', padding: '2rem' }}>
        <div className="glass-panel fade-in" style={{ padding: '3rem', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--on-surface)' }}>Welcome Back</h2>
            <p style={{ color: 'var(--on-surface-subtle)', fontSize: '0.95rem' }}>Login to your HotelXpress account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="label-mono" style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
              <input type="text" id="username" value={credentials.username} onChange={handleChange} required placeholder="Enter username"
                style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--outline)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }} />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <label className="label-mono" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
              <input type="password" id="password" value={credentials.password} onChange={handleChange} required placeholder="Enter password"
                style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--outline)', borderRadius: 'var(--radius-sm)', fontSize: '1rem' }} />
            </div>

            {errorLocal && (
              <div style={{ background: 'var(--error-light)', color: 'var(--error)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                ⚠️ {errorLocal}
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '14px', fontSize: '1.1rem' }}>
              {loading ? 'Thinking...' : 'Log In'}
            </button>
          </form>

          <p style={{ marginTop: '2rem', fontSize: '0.95rem', color: 'var(--on-surface-subtle)' }}>
            New here?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
