import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPackage, FiLogOut, FiShield } from 'react-icons/fi';
import './Profile.css';

export default function Profile() {
  const { user, profile, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-container container">
        <div className="profile-header text-center animate-fade-in">
          <div className="profile-avatar-large">
             {(profile?.full_name?.charAt(0) || user.email.charAt(0)).toUpperCase()}
          </div>
          <h1 className="profile-name">{profile?.full_name || 'User'}</h1>
          <p className="profile-email">{user.email}</p>
          {isAdmin && <span className="admin-badge"><FiShield /> Admin</span>}
        </div>

        <div className="profile-grid">
          {/* Info Card */}
          <div className="profile-card info-card glass-card animate-scale-up">
            <h3><FiUser /> Personal Details</h3>
            <div className="info-item">
              <label>Full Name</label>
              <span>{profile?.full_name || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <label>Email Address</label>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <label>User ID</label>
              <code className="user-id">{user.uid}</code>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="profile-card actions-card glass-card animate-scale-up" style={{ animationDelay: '0.1s' }}>
            <h3><FiPackage /> My Activity</h3>
            <button className="profile-action-btn" onClick={() => navigate('/orders')}>
              <FiPackage /> View Order History
            </button>
            <button className="profile-action-btn" onClick={() => navigate('/wishlist')}>
              <FiUser /> Manage Wishlist
            </button>
            <div className="spacer" />
            <button className="btn-logout" onClick={handleLogout}>
              <FiLogOut /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
