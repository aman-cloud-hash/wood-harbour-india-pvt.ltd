import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiRefreshCw, FiMinus, FiPlus, FiChevronRight, FiLoader } from 'react-icons/fi';
import { productService } from '../../services/supabaseService';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice, getDiscountPercent } from '../../utils/helpers';
import ProductCard from '../../components/ProductCard/ProductCard';
import AuthModal from '../../components/AuthModal/AuthModal';
import SEO from '../../components/SEO';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAction = (actionType) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    if (actionType === 'add') {
      addToCart({ ...product, quantity });
    } else if (actionType === 'buy') {
      addToCart({ ...product, quantity });
      navigate('/cart');
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setSelectedImage(0);

        // Check if data was passed via state first for instant load
        if (location.state) {
          setProduct(location.state);
        }

        // Always load the manifest to handle related products or fallbacks (page refreshes)
        const response = await fetch('/manifest.json');
        if (!response.ok) throw new Error('Manifest not found');
        const manifest = await response.json();

        let foundProduct = null;
        let allRelated = [];

        Object.entries(manifest).forEach(([slug, categoryData]) => {
          categoryData.files.forEach((file, index) => {
            const productId = `${slug}-${index}`;
            
            const productObj = {
              id: productId,
              title: file.name.replace(/[-_]/g, ' '),
              description: `Handcrafted premium ${slug.replace('-', ' ')} product. Exceptional attention to detail and traditional wood crafting techniques define this limited collection piece.`,
              price: file.price || Math.floor(Math.random() * (50000 - 5000) + 5000),
              category: slug,
              image: encodeURI(file.path),
              images: [encodeURI(file.path), encodeURI(file.path)],
              rating: 4.5 + Math.random() * 0.5,
              reviews: Math.floor(Math.random() * 50) + 10,
              stock: true,
              sku: `WH-${slug.toUpperCase().slice(0, 3)}-${index}`
            };

            if (productId === id) {
              foundProduct = productObj;
            } else {
              allRelated.push(productObj);
            }
          });
        });

        // Fallback for direct URL visits or refreshes
        if (!location.state) {
          if (!foundProduct) {
            setNotFound(true);
            return;
          }
          setProduct(foundProduct);
        }

        // Refresh related products based on final category
        const finalCategory = location.state?.category || foundProduct?.category;
        const filteredRelated = allRelated
          .filter(p => p.category === finalCategory)
          .slice(0, 4);
        setRelatedProducts(filteredRelated);
      } catch (err) {
        console.error('Error loading product detail:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, location.state]);

  if (loading) {
    return (
      <div className="product-detail-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
          <FiLoader size={40} style={{ animation: 'spin 0.8s linear infinite' }} />
          <p style={{ marginTop: '1rem' }}>Loading product...</p>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="not-found-page">
        <div className="container" style={{ paddingTop: '200px', textAlign: 'center' }}>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or may have been removed.</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Shop</Link>
        </div>
      </div>
    );
  }

  const discount = product.original_price ? getDiscountPercent(product.original_price, product.price) : 0;
  const images = product.image_url ? [product.image_url] : (product.images || []);
  const productName = product.title || product.name || 'Product';

  return (
    <div className="product-detail-page">
      <SEO
        title={`${productName} | Woodharbour India`}
        description={product.description}
      />
      <div className="container" style={{ paddingTop: '100px' }}>
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav">
          <Link to="/">Home</Link>
          <FiChevronRight size={14} />
          <Link to="/products">Shop</Link>
          <FiChevronRight size={14} />
          <Link to={`/products?category=${product.category}`}>{product.category?.replace(/-/g, ' ')}</Link>
          <FiChevronRight size={14} />
          <span>{productName}</span>
        </nav>

        {/* Product Content */}
        <div className="product-detail-grid">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="gallery-main">
              <img
                src={images[selectedImage] || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'}
                alt={productName}
                id="product-main-image"
              />
              {discount > 0 && <span className="detail-badge">{discount}% OFF</span>}
              {product.is_featured && <span className="detail-badge" style={{ top: 'auto', bottom: '1rem', background: 'linear-gradient(135deg, #D4A853, #B08D3A)', color: '#1A1209' }}>⭐ Featured</span>}
              {product.is_trending && <span className="detail-badge" style={{ top: 'auto', bottom: discount > 0 ? '3.5rem' : '1rem', right: '1rem', left: 'auto', background: 'linear-gradient(135deg, #6B4226, #4A2C17)' }}>🔥 Trending</span>}
            </div>
            {images.length > 1 && (
              <div className="gallery-thumbs">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={`thumb ${i === selectedImage ? 'active' : ''}`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <img src={img} alt={`${productName} ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-detail-info">
            <span className="detail-category">{product.category?.replace(/-/g, ' ')}</span>
            <h1 id="product-name">{productName}</h1>

            <div className="detail-rating">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    fill={i < Math.floor(product.rating || 0) ? '#D4A853' : 'none'}
                    stroke={i < Math.floor(product.rating || 0) ? '#D4A853' : '#ccc'}
                  />
                ))}
              </div>
              <span>{product.rating || 'New'} {product.reviews ? `(${product.reviews} reviews)` : ''}</span>
            </div>

            <div className="detail-price">
              <span className="detail-current-price">{formatPrice(product.price)}</span>
              {product.original_price && (
                <>
                  <span className="detail-original-price">{formatPrice(product.original_price)}</span>
                  <span className="detail-discount">Save {discount}%</span>
                </>
              )}
            </div>

            <p className="detail-description">{product.description}</p>

            {/* Specs */}
            <div className="detail-specs">
              {product.dimensions && (
                <div className="spec-row">
                  <span className="spec-label">Dimensions</span>
                  <span className="spec-value">{product.dimensions}</span>
                </div>
              )}
              {product.material && (
                <div className="spec-row">
                  <span className="spec-label">Material</span>
                  <span className="spec-value">{product.material}</span>
                </div>
              )}
              {product.weight && (
                <div className="spec-row">
                  <span className="spec-label">Weight</span>
                  <span className="spec-value">{product.weight}</span>
                </div>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="detail-actions">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} id="qty-minus"><FiMinus /></button>
                <span className="qty-value">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} id="qty-plus"><FiPlus /></button>
              </div>

              <div className="product-actions">
                <button 
                  className="add-to-cart-btn-detail" 
                  onClick={() => handleAction('add')}
                >
                  <FiShoppingCart /> Add to Cart
                </button>
                <button 
                  className="buy-now-btn-detail"
                  onClick={() => handleAction('buy')}
                >
                  Buy Now
                </button>
              </div>

              <button
                className={`btn btn-icon wishlist-detail-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                id="detail-wishlist"
              >
                <FiHeart />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-item"><FiTruck /> <span>Free Delivery</span></div>
              <div className="trust-item"><FiShield /> <span>5-Year Warranty</span></div>
              <div className="trust-item"><FiRefreshCw /> <span>30-Day Returns</span></div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-section">
            <div className="section-header">
              <h2>You May Also Like</h2>
              <span className="accent-line" />
            </div>
            <div className="product-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
