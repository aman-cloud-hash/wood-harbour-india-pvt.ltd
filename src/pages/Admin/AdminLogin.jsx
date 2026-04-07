import { useState } from 'react';
import { FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Admin.css';

export default function AdminLogin({ onDemoLogin }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back, Admin!');
    } catch (err) {
      // If Firebase isn't configured, allow demo mode
      if (err.code === 'auth/invalid-api-key' || err.code === 'auth/api-key-not-valid' || !err.code) {
        onDemoLogin?.();
        toast.success('Logged in (Demo Mode)');
      } else {
        toast.error('Invalid credentials');
      }
    }
    setLoading(false);
  };

  const handleDemoLogin = () => {
    onDemoLogin?.();
    toast.success('Welcome to Demo Admin Panel!');
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card glass-card">
          <div className="admin-login-header">
            <div className="admin-logo">🪵</div>
            <h1>Admin Panel</h1>
            <p>Woodharbour India Pvt. Ltd.</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-with-icon">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  className="form-input"
                  placeholder="admin@woodharbour.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="admin-email"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="admin-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading} id="admin-login-btn">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="demo-login">
            <p>For demo purposes:</p>
            <button className="btn btn-gold btn-sm" onClick={handleDemoLogin} id="demo-login-btn">
              Enter Demo Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
