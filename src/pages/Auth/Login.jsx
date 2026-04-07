import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiLock, FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/'); // Redirect to home on success
    } catch (err) {
      setError(err.code === 'auth/invalid-credential' 
        ? 'Incorrect email or password. Please try again.' 
        : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to sign in with Google or account creation error.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container glass-card animate-fade-in-up">
        <div className="auth-header text-center">
          <h2>Welcome Back</h2>
          <p>Login to your account to manage orders and track your furniture.</p>
        </div>

        {error && (
          <div className="auth-error animate-fade-in">
            <FiAlertCircle /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <FiMail />
              <input 
                type="email" 
                className="form-input" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-flex">
              <label className="form-label">Password</label>
              <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>Forgot?</Link>
            </div>
            <div className="input-with-icon">
              <FiLock />
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <button className="btn-primary full-width" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'} <FiArrowRight />
          </button>
        </form>

        <div className="auth-divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <button 
          type="button" 
          onClick={handleGoogleLogin} 
          className="btn-google full-width"
        >
          <FcGoogle size={22} /> Sign in with Google
        </button>

        <p className="auth-footer text-center">
          Don't have an account? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}
