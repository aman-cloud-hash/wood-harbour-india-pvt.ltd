import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar, FiEye } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice, getDiscountPercent } from '../../utils/helpers';
import AuthModal from '../AuthModal/AuthModal';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    addToCart(product);
  };

  const discount = product.originalPrice
    ? getDiscountPercent(product.originalPrice, product.price)
    : 0;

  return (
    <div className="product-card" id={`product-${product.id}`}>
      <div className="product-image">
        <Link to={`/product/${product.id}`} state={product}>
          <img
            src={product.image_url || product.image || (product.images && product.images[0])}
            alt={product.title || product.name}
            loading="lazy"
          />
        </Link>

        {discount > 0 && (
          <span className="product-badge badge-sale">{discount}% OFF</span>
        )}

        <div className="product-actions">
          <button
            className={`action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
            onClick={() => toggleWishlist(product)}
            aria-label="Add to wishlist"
          >
            <FiHeart />
          </button>
          <Link to={`/product/${product.id}`} state={product} className="action-btn" aria-label="View product">
            <FiEye />
          </Link>
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">
          {product.category?.replace(/-/g, ' ')}
        </span>
        <Link to={`/product/${product.id}`} state={product}>
          <h3 className="product-name">{product.title || product.name}</h3>
        </Link>

        <div className="product-rating">
          <span className="stars">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                fill={i < Math.floor(product.rating) ? '#D4A853' : 'none'}
                stroke={i < Math.floor(product.rating) ? '#D4A853' : '#ccc'}
                size={14}
              />
            ))}
          </span>
          <span className="review-count">({product.reviews})</span>
        </div>

        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
          {discount > 0 && (
            <span className="discount">Save {discount}%</span>
          )}
        </div>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          id={`add-to-cart-${product.id}`}
        >
          <FiShoppingCart size={16} />
          Add to Cart
        </button>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}
