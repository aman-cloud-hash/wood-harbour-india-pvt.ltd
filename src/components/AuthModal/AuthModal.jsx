import { useNavigate } from 'react-router-dom';
import { FiX, FiLock } from 'react-icons/fi';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay animate-fade-in">
      <div className="auth-modal-glass animate-zoom-in">
        <button className="auth-modal-close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>
        
        <div className="auth-modal-content">
          <div className="auth-modal-icon">
            <FiLock />
          </div>
          <h2>Authentication Required</h2>
          <p>Please login to your account to add items to your cart or place an order.</p>
          
          <div className="auth-modal-actions">
            <button 
              className="btn-login" 
              onClick={() => {
                onClose();
                navigate('/login');
              }}
            >
              Login Now
            </button>
            <button className="btn-cancel" onClick={onClose}>
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
