import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiCheck, FiLock } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';
import './Checkout.css';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
    paymentMethod: 'cod'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      toast.error('Please fill all required fields');
      return;
    }
    setOrderPlaced(true);
    clearCart();
    toast.success('Order placed successfully!');
  };

  const shipping = cartTotal >= 10000 ? 0 : 500;
  const tax = cartTotal * 0.18;
  const grandTotal = cartTotal + shipping + tax;

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <div className="success-icon"><FiCheck /></div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. We'll send you a confirmation email shortly.</p>
            <p className="order-id">Order ID: WH-{Date.now().toString(36).toUpperCase()}</p>
            <Link to="/" className="btn btn-primary btn-lg">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <h2>Your cart is empty</h2>
            <p>Add some items before checking out.</p>
            <Link to="/products" className="btn btn-primary btn-lg">Shop Now</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container" style={{ paddingTop: '100px' }}>
        <h1 className="checkout-title">Checkout</h1>

        <form onSubmit={handleSubmit} className="checkout-layout">
          {/* Shipping Form */}
          <div className="checkout-form glass-card">
            <h3>Shipping Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Address *</label>
              <textarea name="address" value={formData.address} onChange={handleChange} className="form-input" rows="3" required />
            </div>
            <div className="form-row form-row-3">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">PIN Code *</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="form-input" required />
              </div>
            </div>

            <h3 style={{ marginTop: '1.5rem' }}>Payment Method</h3>
            <div className="payment-options">
              {[
                { value: 'cod', label: 'Cash on Delivery', icon: '💵' },
                { value: 'upi', label: 'UPI Payment', icon: '📱' },
                { value: 'card', label: 'Card Payment', icon: '💳' }
              ].map(opt => (
                <label key={opt.value} className={`payment-option ${formData.paymentMethod === opt.value ? 'active' : ''}`}>
                  <input type="radio" name="paymentMethod" value={opt.value} checked={formData.paymentMethod === opt.value} onChange={handleChange} />
                  <span className="payment-icon">{opt.icon}</span>
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-summary glass-card">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {cartItems.map(item => (
                <div key={item.id} className="checkout-item">
                  <img src={item.images?.[0] || item.image} alt={item.name} />
                  <div className="checkout-item-info">
                    <span className="checkout-item-name">{item.name}</span>
                    <span className="checkout-item-qty">Qty: {item.quantity}</span>
                  </div>
                  <span className="checkout-item-price">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="summary-divider" />
            <div className="summary-rows">
              <div className="summary-row"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
              <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
              <div className="summary-row"><span>Tax (18% GST)</span><span>{formatPrice(tax)}</span></div>
              <div className="summary-divider" />
              <div className="summary-row total-row"><span>Total</span><span>{formatPrice(grandTotal)}</span></div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg checkout-btn" id="place-order">
              <FiLock /> Place Order — {formatPrice(grandTotal)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
