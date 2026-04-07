import { FiPackage, FiBox } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Orders.css';

export default function Orders() {
  const { user } = useAuth();

  return (
    <div className="orders-page relative">
      {/* Background Decor */}
      <div className="orders-decorative-circle absolute top-0 right-0"></div>
      <div className="orders-decorative-circle absolute bottom-0 left-0" style={{ transform: 'scale(0.8)' }}></div>

      <div className="container relative z-10">
        <div className="orders-header text-center animate-fade-in">
          <h1 className="page-title text-gradient">My Orders</h1>
          <p className="page-subtitle">Track your premium Woodharbour furniture requests</p>
        </div>

        <div className="orders-content animate-slide-up">
          <div className="empty-state glass-card">
            <div className="empty-icon-wrapper">
              <FiBox className="empty-icon" />
            </div>
            <h3>No Orders Yet</h3>
            <p>You haven't placed any orders yet. Discover our exclusive collection of premium furniture.</p>
            <Link to="/products" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
