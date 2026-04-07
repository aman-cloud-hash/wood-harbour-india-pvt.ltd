import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiLock, FiUser, FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      await signup(email, password, fullName);
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.code === 'auth/email-already-in-use' 
        ? 'This email is already in use. Please login instead.' 
        : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to sign up with Google. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-container glass-card text-center animate-fade-in">
          <div className="success-icon">✨</div>
          <h2>Registration Successful</h2>
          <p>Your account has been created. Redirecting to home...</p>
          <div className="loader-spinner" style={{ margin: '20px auto' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container glass-card animate-fade-in-up">
        <div className="auth-header text-center">
          <h2>Create Account</h2>
          <p>Join Woodharbour India to explore our premium collections.</p>
        </div>

        {error && (
          <div className="auth-error animate-fade-in">
            <FiAlertCircle /> {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-with-icon">
              <FiUser />
              <input 
                type="text" 
                className="form-input" 
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
            </div>
          </div>

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
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <FiLock />
              <input 
                type="password" 
                className="form-input" 
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="input-with-icon">
              <FiLock />
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <button className="btn-primary full-width" disabled={loading}>
            {loading ? 'Creating Account...' : 'Continue'} <FiArrowRight />
          </button>
        </form>

        <div className="auth-divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <button 
          type="button" 
          onClick={handleGoogleSignup} 
          className="btn-google full-width"
        >
          <FcGoogle size={22} /> Sign up with Google
        </button>

        <p className="auth-footer text-center">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
