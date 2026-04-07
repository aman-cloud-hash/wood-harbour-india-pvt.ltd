import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Wishlist() {
  const { wishlistItems } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <span style={{ fontSize: '5rem', display: 'block', marginBottom: '1.5rem' }}>💝</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>Your wishlist is empty</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>Save your favorite items to come back to them later</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            <FiShoppingBag /> Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', paddingBottom: '4rem' }}>
      <div className="container" style={{ paddingTop: '100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-primary-dark)' }}>
            <FiHeart style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> My Wishlist
          </h1>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading)', padding: '0.3rem 0.8rem', background: 'var(--color-surface)', borderRadius: '999px' }}>
            {wishlistItems.length} item{wishlistItems.length > 1 ? 's' : ''}
          </span>
        </div>
        <div className="product-grid">
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
