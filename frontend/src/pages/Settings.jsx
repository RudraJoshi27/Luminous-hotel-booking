import { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Settings = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (formData.password && formData.password !== formData.confirmPassword) {
            setMessage({ text: "Passwords don't match!", type: 'error' });
            return;
        }

        setLoading(true);
        try {
            const { confirmPassword, ...updatePayload } = formData;
            // Remove password if empty
            if (!updatePayload.password) delete updatePayload.password;

            const res = await axios.put(`http://localhost:5000/api/users/${user._id}`, updatePayload, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            const updatedUser = { ...res.data, token: user.token };
            dispatch({ type: "UPDATE_USER", payload: updatedUser });
            setMessage({ text: 'Profile updated successfully!', type: 'success' });
            setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
        } catch (err) {
            setMessage({ text: err.response?.data?.message || 'Update failed.', type: 'error' });
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--background)', paddingTop: '80px' }}>
            <Navbar />
            <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '0 2rem' }}>
                <div className="glass-panel fade-in" style={{ padding: '3rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Account Settings</h1>
                        <p style={{ color: 'var(--on-surface-subtle)', lineHeight: '1.5' }}>
                            {user?.role === 'admin' 
                                ? "Update your administrative credentials and profile information." 
                                : "Manage your account details and profile information."
                            }
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label className="label-mono" style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
                            <input 
                                type="text" id="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                style={{ width: '100%', padding: '12px' }} 
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label className="label-mono" style={{ display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                            <input 
                                type="email" id="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                style={{ width: '100%', padding: '12px' }} 
                            />
                        </div>

                        <div style={{ padding: '1.5rem', background: 'var(--surface-container-low)', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
                            <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Change Password</h4>
                            <div style={{ marginBottom: '1rem' }}>
                                <label className="label-mono" style={{ display: 'block', marginBottom: '0.5rem' }}>New Password</label>
                                <input 
                                    type="password" id="password" 
                                    placeholder="Leave blank to keep current"
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    style={{ width: '100%', padding: '12px' }} 
                                />
                            </div>
                            <div>
                                <label className="label-mono" style={{ display: 'block', marginBottom: '0.5rem' }}>Confirm New Password</label>
                                <input 
                                    type="password" id="confirmPassword" 
                                    placeholder="Confirm new password"
                                    value={formData.confirmPassword} 
                                    onChange={handleChange} 
                                    style={{ width: '100%', padding: '12px' }} 
                                />
                            </div>
                        </div>

                        {message.text && (
                            <div style={{ 
                                padding: '1rem', borderRadius: 'var(--radius-sm)', 
                                background: message.type === 'success' ? 'var(--success-light)' : 'var(--error-light)', 
                                color: message.type === 'success' ? 'var(--success)' : 'var(--error)', 
                                marginBottom: '1.5rem', fontWeight: 600 
                            }}>
                                {message.type === 'success' ? '✅' : '⚠️'} {message.text}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="btn-primary" 
                            disabled={loading}
                            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                        >
                            {loading ? 'Saving Changes...' : 'Save Profile Settings'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
