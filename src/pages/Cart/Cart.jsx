import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice, extractPrice } from '../../utils/helpers';
import AuthModal from '../../components/AuthModal/AuthModal';
import { useState } from 'react';
import './Cart.css';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="container">
          <div className="empty-state">
            <span className="empty-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              <FiShoppingBag /> Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container" style={{ paddingTop: '100px' }}>
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <span className="cart-count-label">{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</span>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item glass-card" id={`cart-item-${item.id}`}>
                <Link to={`/product/${item.id}`} className="cart-item-image">
                  <img src={item.images?.[0] || item.image} alt={item.name} loading="lazy" />
                </Link>

                <div className="cart-item-info">
                  <Link to={`/product/${item.id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                  <span className="cart-item-category">{item.category?.replace(/-/g, ' ')}</span>
                  <span className="cart-item-price">{formatPrice(item.price)}</span>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-selector">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><FiMinus /></button>
                    <span className="qty-value">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><FiPlus /></button>
                  </div>

                  <span className="cart-item-total">{formatPrice(extractPrice(item.price) * item.quantity)}</span>

                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}

            <button className="clear-cart-btn" onClick={clearCart}>
              <FiTrash2 /> Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="order-summary glass-card">
            <h3>Order Summary</h3>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">{cartTotal >= 10000 ? 'FREE' : formatPrice(500)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (GST 18%)</span>
                <span>{formatPrice(cartTotal * 0.18)}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row total-row">
                <span>Total</span>
                <span>{formatPrice(cartTotal + (cartTotal >= 10000 ? 0 : 500) + cartTotal * 0.18)}</span>
              </div>
            </div>

            {cartTotal < 10000 && (
              <p className="shipping-note">
                Add {formatPrice(10000 - cartTotal)} more for free shipping!
              </p>
            )}

            <button 
              className="btn btn-primary btn-lg checkout-btn" 
              onClick={handleCheckout}
              id="proceed-checkout"
            >
              Proceed to Checkout <FiArrowRight />
            </button>

            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}
