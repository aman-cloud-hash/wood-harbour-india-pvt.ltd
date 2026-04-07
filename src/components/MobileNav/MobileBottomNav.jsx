import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiShoppingCart, FiHeart, FiUser } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './MobileNav.css';

export default function MobileBottomNav() {
  const location = useLocation();
  const { cartItems: items } = useCart();
  const { isAdmin } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="mobile-bottom-nav">
      <Link to="/" className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}>
        <FiHome />
        <span>Home</span>
      </Link>
      <Link to="/products" className={`mobile-nav-item ${isActive('/products') ? 'active' : ''}`}>
        <FiShoppingBag />
        <span>Shop</span>
      </Link>
      <Link to="/cart" className={`mobile-nav-item ${isActive('/cart') ? 'active' : ''}`}>
        <div className="nav-icon-wrapper">
          <FiShoppingCart />
          {items.length > 0 && <span className="nav-badge">{items.length}</span>}
        </div>
        <span>Cart</span>
      </Link>
      <Link to="/wishlist" className={`mobile-nav-item ${isActive('/wishlist') ? 'active' : ''}`}>
        <FiHeart />
        <span>Saved</span>
      </Link>
      {isAdmin && (
        <Link to="/admin" className={`mobile-nav-item ${isActive('/admin') ? 'active' : ''}`}>
          <FiUser />
          <span>Admin</span>
        </Link>
      )}
    </nav>
  );
}
