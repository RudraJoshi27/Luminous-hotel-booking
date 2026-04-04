import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users.');
    }
    setLoading(false);
  };

  const handleDelete = async (id, targetUsername) => {
    if (targetUsername === user.username) {
        alert("You cannot delete your own admin account!");
        return;
    }

    if (window.confirm(`Are you sure you want to delete user "${targetUsername}"?`)) {
      try {
        console.log("DEBUG: handleDelete started for ID:", id);
        console.log("DEBUG: Current User:", user);
        console.log("DEBUG: Requesting DELETE http://localhost:5000/api/users/" + id);
        
        const res = await axios.delete(`http://localhost:5000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        
        console.log("DEBUG: Delete success:", res.data);
        setUsers(users.filter(u => u._id !== id));
      } catch (err) {
        console.error("DEBUG: Delete error details:", err);
        alert(err.response?.data?.message || 'Failed to delete user.');
      }
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  if (user?.role !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
        <Navbar />
        <div style={{ maxWidth: '500px', margin: '4rem auto', textAlign: 'center' }}>
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</h1>
            <h2>Access Denied</h2>
            <p style={{ color: 'var(--on-surface-subtle)', marginTop: '1rem' }}>Only administrators can access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Manage Users</h1>
          <p style={{ color: 'var(--on-surface-subtle)', fontWeight: 500 }}>
            {users.length} registered accounts in the system
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <h3>Loading user database...</h3>
          </div>
        ) : error ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--error)' }}>
            <p>⚠️ {error}</p>
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--outline-variant)' }}>
                  <th style={{ padding: '1rem', color: 'var(--on-surface-subtle)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User</th>
                  <th style={{ padding: '1rem', color: 'var(--on-surface-subtle)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</th>
                  <th style={{ padding: '1rem', color: 'var(--on-surface-subtle)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</th>
                  <th style={{ padding: '1rem', color: 'var(--on-surface-subtle)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Joined</th>
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} style={{ borderBottom: '1px solid var(--outline-variant)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1.25rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ 
                          width: '36px', height: '36px', borderRadius: '50%', 
                          background: u.role === 'admin' ? 'var(--primary-container)' : 'var(--surface-container-high)',
                          color: u.role === 'admin' ? 'var(--primary-dark)' : 'var(--on-surface)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem'
                        }}>
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600 }}>{u.username}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1rem', color: 'var(--on-surface-variant)', fontSize: '0.9rem' }}>{u.email}</td>
                    <td style={{ padding: '1.25rem 1rem' }}>
                      <span className={`badge ${u.role === 'admin' ? 'badge-cyan' : 'badge-gray'}`} style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1rem', color: 'var(--on-surface-variant)', fontSize: '0.9rem' }}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1.25rem 1rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleDelete(u._id, u.username)}
                        style={{ 
                          background: 'none', border: 'none', color: 'var(--error)', 
                          cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                          padding: '6px 12px', borderRadius: 'var(--radius-sm)',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'var(--error-container)'}
                        onMouseLeave={(e) => e.target.style.background = 'none'}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
