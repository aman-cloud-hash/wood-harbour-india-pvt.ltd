import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiSearch, FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiPackage, FiChevronDown } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const { cartCount, wishlistItems } = useCart();
  const { user, profile, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Shop' },
    { path: '/categories', label: 'Categories' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} id="main-navbar">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo" id="navbar-logo">
            <div className="logo-icon">🪵</div>
            <div className="logo-text">
              <span className="logo-name">Woodharbour</span>
              <span className="logo-tagline">India Pvt. Ltd.</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="navbar-links">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            <button
              className="nav-action-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              id="search-toggle"
              aria-label="Search"
            >
              <FiSearch />
            </button>

            <Link to="/wishlist" className="nav-action-btn" id="wishlist-btn" aria-label="Wishlist">
              <FiHeart />
              {wishlistItems.length > 0 && (
                <span className="badge">{wishlistItems.length}</span>
              )}
            </Link>

            <Link to="/cart" className="nav-action-btn" id="cart-btn" aria-label="Cart">
              <FiShoppingCart />
              {cartCount > 0 && (
                <span className="badge">{cartCount}</span>
              )}
            </Link>

            {user ? (
              <div className="user-dropdown-container" ref={dropdownRef}>
                <button 
                  className="avatar-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <div className="user-avatar">
                    {(profile?.full_name?.charAt(0) || user.email.charAt(0)).toUpperCase()}
                  </div>
                  <FiChevronDown className={`dropdown-arrow ${userDropdownOpen ? 'rotate' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className="user-dropdown-menu">
                    <div className="dropdown-header">
                      <span className="user-name">{profile?.full_name || 'User'}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                    
                    <div className="dropdown-divider" />
                    
                    <Link to="/profile" className="dropdown-item">
                      <FiUser /> Profile
                    </Link>

                    <Link to="/orders" className="dropdown-item">
                      <FiPackage /> My Orders
                    </Link>
                    
                    {isAdmin && (
                      <Link to="/admin" className="dropdown-item">
                        <FiSettings /> Admin Dashboard
                      </Link>
                    )}
                    
                    <div className="dropdown-divider" />
                    
                    <button onClick={logout} className="dropdown-item logout-btn">
                      <FiLogOut /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="auth-nav-btn">
                Login
              </Link>
            )}

            <button
              className="nav-action-btn mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              id="mobile-menu-toggle"
              aria-label="Menu"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`search-bar ${searchOpen ? 'search-open' : ''}`}>
          <form onSubmit={handleSearch} className="search-form">
            <FiSearch className="search-icon" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search for furniture, decor, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              id="search-input"
            />
            <button type="button" className="search-close" onClick={() => setSearchOpen(false)}>
              <FiX />
            </button>
          </form>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-user-section">
            {user ? (
              <div className="mobile-user-card">
                <div className="user-avatar" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>
                  {(profile?.full_name?.charAt(0) || user.email.charAt(0)).toUpperCase()}
                </div>
                <div className="mobile-user-info">
                   <span className="user-name">{profile?.full_name || 'User'}</span>
                   <span className="user-email">{user.email}</span>
                </div>
              </div>
            ) : (
              <Link to="/login" className="auth-nav-btn" style={{ width: '100%', textAlign: 'center' }}>Login / Signup</Link>
            )}
          </div>

          <div className="mobile-links-list">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <>
                <Link to="/profile" className="mobile-link">My Profile</Link>
                <Link to="/orders" className="mobile-link">My Orders</Link>
                {isAdmin && <Link to="/admin" className="mobile-link admin-link-mobile">Admin Panel</Link>}
                <button onClick={logout} className="mobile-link logout-link">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  );
}
