import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiAward, FiRefreshCw, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useScrollAnimation, useParallax, formatPrice } from '../../utils/helpers';
import { categories, testimonials } from '../../data/products';
import { productService } from '../../services/dataService';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import SEO from '../../components/SEO';
import { useState, useEffect } from 'react';
import './Home.css';

function AnimatedSection({ children, className = '', animation = 'fade-up' }) {
  const [ref, isVisible] = useScrollAnimation(0.1);
  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? `animate-visible animate-${animation}` : 'animate-hidden'}`}
    >
      {children}
    </div>
  );
}

function ProductSectionSkeleton() {
  return (
    <div className="product-grid">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="product-card skeleton-card" style={{ minHeight: '360px', background: 'rgba(200,149,108,0.08)', borderRadius: '16px', animation: 'shimmer 1.5s infinite linear', backgroundSize: '200% 100%' }} />
      ))}
    </div>
  );
}

export default function Home() {
  const [parallaxRef, offset] = useParallax(0.3);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products from manifest.json AND backend
  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch from backend
        let backendProducts = [];
        try {
          backendProducts = await productService.getAllProducts();
        } catch (err) {
          console.warn('Backend home fetch failed', err);
        }

        // 2. Combine and Filter
        const allProducts = [...backendProducts];

        
        const featured = allProducts.filter(p => p.is_featured === true || p.is_featured === 'true').slice(0, 8);
        const trending = allProducts.filter(p => p.is_trending === true || p.is_trending === 'true').slice(0, 4);
        const latest = allProducts.slice(0, 8);

        setFeaturedProducts(featured.length > 0 ? featured : allProducts.slice(0, 8));
        setTrendingProducts(trending.length > 0 ? trending : allProducts.slice(8, 12));
        setLatestProducts(latest);

      } catch (err) {
        console.error('Home load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page">
      <SEO
        title="Premium Wood Furniture & Interior Solutions"
        description="Experience the finest handcrafted wood furniture and premium interior design services in Bengaluru. Woodharbour India - Where tradition meets innovation."
      />

      {/* ========== HERO SECTION ========== */}
      <section className="hero" id="hero" ref={parallaxRef}>
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
            alt="Premium Wood Furniture"
            style={{ transform: `translateY(${offset}px)` }}
          />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content container">
          <div className="hero-text">
            <span className="hero-badge">Premium Craftsmanship Since 2026</span>
            <h1>Crafting Timeless<br /><span className="gold-text">Wooden Elegance</span></h1>
            <p>
              Discover handcrafted premium wood furniture and interior solutions
              that transform your spaces into works of art. Every piece tells a story.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-gold btn-lg" id="hero-shop-btn">
                Explore Collection <FiArrowRight />
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg hero-secondary-btn" id="hero-about-btn">
                Our Story
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-num">500+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num">2K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num">50+</span>
                <span className="stat-label">Designers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      <section className="scroll-spacer" style={{ height: '80px' }} />

      {/* ========== FEATURED PRODUCTS (Local) ========== */}
      {(loading || featuredProducts.length > 0) && (
        <section className="section featured-section" id="featured-section">
          <div className="container">
            <AnimatedSection>
              <div className="section-header">
                <h2>Featured Products</h2>
                <span className="accent-line" />
                <p>Curated selections from our handcrafted collections</p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              {loading ? (
                <ProductSectionSkeleton />
              ) : (
                <div className="product-grid">
                  {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </AnimatedSection>

            <AnimatedSection className="section-cta">
              <Link to="/products" className="btn btn-secondary btn-lg" id="view-all-products">
                View All Products <FiArrowRight />
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ========== PARALLAX BANNER ========== */}
      <section className="parallax-banner" id="parallax-banner">
        <div className="parallax-bg">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80"
            alt="Interior Design"
          />
        </div>
        <div className="parallax-overlay" />
        <div className="parallax-content container">
          <AnimatedSection animation="fade-up">
            <span className="parallax-label">Design & Execution</span>
            <h2>Transform Your Space</h2>
            <p>From concept to completion, our expert designers and craftsmen bring your vision to life</p>
            <Link to="/products?category=design-services" className="btn btn-gold btn-lg">
              Get a Free Consultation <FiArrowRight />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== TRENDING PRODUCTS (Local) ========== */}
      {(loading || trendingProducts.length > 0) && (
        <section className="section trending-section" id="trending-section">
          <div className="container">
            <AnimatedSection>
              <div className="section-header">
                <h2>Trending Now</h2>
                <span className="accent-line" />
                <p>Most popular picks from our latest work</p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              {loading ? (
                <ProductSectionSkeleton />
              ) : (
                <div className="product-grid">
                  {trendingProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ========== LATEST PRODUCTS (Local) ========== */}
      {(loading || latestProducts.length > 0) && (
        <section className="section latest-section" id="latest-section">
          <div className="container">
            <AnimatedSection>
              <div className="section-header">
                <h2>Latest Products</h2>
                <span className="accent-line" />
                <p>Fresh additions to our handcrafted gallery</p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              {loading ? (
                <ProductSectionSkeleton />
              ) : (
                <div className="product-grid">
                  {latestProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </AnimatedSection>

            <AnimatedSection className="section-cta">
              <Link to="/products" className="btn btn-secondary btn-lg" id="view-all-latest">
                Browse All Products <FiArrowRight />
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ========== COLLECTION BY CATEGORY ========== */}
      <section className="section categories-full-section" id="categories-full-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2>Browse Our Collection</h2>
              <span className="accent-line" />
              <p>Explore handcrafted elegance across every category</p>
            </div>
          </AnimatedSection>
          
          <div className="categorized-collection">
            {categories.map(cat => {
              const catProducts = latestProducts.filter(p => p.category === cat.slug).slice(0, 4);
              if (catProducts.length === 0) return null;
              
              return (
                <div key={cat.id} className="category-row">
                  <div className="category-row-header">
                    <h3>{cat.name}</h3>
                    <Link to={`/products?category=${cat.slug}`} className="view-more">View All <FiArrowRight /></Link>
                  </div>
                  <div className="product-grid">
                    {catProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CATEGORIES SHOWCASE ========== */}

      <section className="section categories-section" id="categories-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2>Shop by Category</h2>
              <span className="accent-line" />
              <p>Explore our diverse range of handcrafted collections</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="category-grid">
              {categories.slice(0, 6).map((cat) => (
                <Link key={cat.id} to={`/products?category=${cat.slug}`} className="category-card-mini glass-card">
                  <span className="cat-icon-mini">{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="section why-section" id="why-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2>Why Choose Woodharbour</h2>
              <span className="accent-line" />
              <p>We deliver excellence in every piece we craft</p>
            </div>
          </AnimatedSection>

          <div className="why-grid">
            {[
              { icon: <FiAward />, title: 'Premium Quality', desc: 'Only the finest woods and materials, hand-selected by our experts for lasting beauty and durability' },
              { icon: <FiTruck />, title: 'Free Delivery', desc: 'Complimentary doorstep delivery and assembly on all orders above ₹10,000 across India' },
              { icon: <FiShield />, title: '5-Year Warranty', desc: 'Every product comes with our comprehensive warranty covering defects and structural issues' },
              { icon: <FiRefreshCw />, title: 'Easy Returns', desc: '30-day hassle-free return policy. Not satisfied? We will make it right, guaranteed' }
            ].map((item, i) => (
              <AnimatedSection key={i} animation="fade-up" className="why-card glass-card">
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="section testimonials-section" id="testimonials-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <h2>What Our Customers Say</h2>
              <span className="accent-line" />
              <p>Real stories from real homes</p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="testimonials-carousel">
              <button
                className="carousel-btn prev"
                onClick={() => setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)}
                aria-label="Previous testimonial"
              >
                <FiChevronLeft />
              </button>

              <div className="testimonial-slide">
                <div className="testimonial-card glass-card">
                  <div className="testimonial-stars">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <FiStar key={i} fill="#D4A853" stroke="#D4A853" />
                    ))}
                  </div>
                  <p className="testimonial-text">"{testimonials[currentTestimonial].text}"</p>
                  <div className="testimonial-author">
                    <span className="author-avatar">{testimonials[currentTestimonial].avatar}</span>
                    <div>
                      <h4>{testimonials[currentTestimonial].name}</h4>
                      <span>{testimonials[currentTestimonial].location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="carousel-btn next"
                onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)}
                aria-label="Next testimonial"
              >
                <FiChevronRight />
              </button>

              <div className="carousel-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`dot ${i === currentTestimonial ? 'active' : ''}`}
                    onClick={() => setCurrentTestimonial(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="cta-section" id="cta-section">
        <div className="cta-bg">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Beautiful Interior"
          />
        </div>
        <div className="cta-overlay" />
        <div className="cta-content container">
          <AnimatedSection animation="fade-up">
            <h2>Ready to Transform Your Space?</h2>
            <p>Book a free consultation with our expert designers today</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-gold btn-lg" id="cta-contact">
                Get in Touch <FiArrowRight />
              </Link>
              <a href="tel:7676503429" className="btn btn-secondary btn-lg cta-call-btn" id="cta-call">
                Call: 76765 03429
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
