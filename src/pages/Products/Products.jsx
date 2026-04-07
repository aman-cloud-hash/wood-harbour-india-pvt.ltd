import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter, FiX, FiCheck, FiLoader } from 'react-icons/fi';
import { categories } from '../../data/products';
import { productService } from '../../services/supabaseService';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import SEO from '../../components/SEO';
import './Products.css';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync category state with URL search params
  useEffect(() => {
    const cat = searchParams.get('category');
    setSelectedCategory(cat || 'all');
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Load products from manifest.json
  useEffect(() => {
    const loadLocalProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/manifest.json');
        if (!response.ok) throw new Error('Manifest not found');
        const manifest = await response.json();
        
        let allProducts = [];
        
        // Convert manifest entries to product objects
        Object.entries(manifest).forEach(([slug, categoryData]) => {
          const categoryProducts = categoryData.files.map((file, index) => ({
            id: `${slug}-${index}`,
            title: file.name.replace(/[-_]/g, ' '),
            description: `Handcrafted premium ${slug.replace('-', ' ')} product.`,
            price: file.price || Math.floor(Math.random() * (50000 - 5000) + 5000), // Random price for demo
            category: slug,
            image: encodeURI(file.path),
            images: [encodeURI(file.path)],
            is_featured: index < 2
          }));
          allProducts = [...allProducts, ...categoryProducts];
        });

        setProducts(allProducts);
      } catch (err) {
        console.error('Error loading local products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLocalProducts();
  }, []);

  const handleCategoryChange = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug === 'all') {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    setSearchParams(params);
    setSelectedCategory(slug);
    setIsFilterOpen(false);
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'featured') result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="products-page">
      <SEO
        title="Explore Our Premium Collection | Woodharbour India"
        description="Browse through our wide range of handcrafted wooden furniture, decor, and interior services."
      />

      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <div className="hero-flex">
            <div className="hero-text-side">
              <h1>Our Collection</h1>
              <p>Explore handcrafted elegance designed to elevate your living spaces.</p>
            </div>
            <div className="search-wrapper glass-card">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && <FiX className="clear-search" onClick={() => setSearchQuery('')} />}
            </div>
          </div>
        </div>
      </section>

      <section className="products-main-layout">
        <div className="container">
          <div className="layout-grid">

            {/* Sidebar Filters - Desktop */}
            <aside className="sidebar-filters desktop-only">
              <div className="filter-group">
                <h3>Categories</h3>
                <ul className="category-list">
                  <li
                    className={selectedCategory === 'all' ? 'active' : ''}
                    onClick={() => handleCategoryChange('all')}
                  >
                    All Products
                    {selectedCategory === 'all' && <FiCheck />}
                  </li>
                  {categories.map(cat => (
                    <li
                      key={cat.id}
                      className={selectedCategory === cat.slug ? 'active' : ''}
                      onClick={() => handleCategoryChange(cat.slug)}
                    >
                      {cat.name}
                      {selectedCategory === cat.slug && <FiCheck />}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Main Content */}
            <main className="products-content">
              {/* Toolbar */}
              <div className="products-toolbar">
                <div className="toolbar-left">
                  {loading
                    ? <span>Loading products...</span>
                    : <span>Showing <strong>{filteredProducts.length}</strong> items</span>
                  }
                </div>

                <div className="toolbar-right">
                  <button className="mobile-filter-btn" onClick={() => setIsFilterOpen(true)}>
                    <FiFilter /> Filters
                  </button>

                  <div className="sort-wrapper">
                    <span>Sort by:</span>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="newest">New Arrivals</option>
                      <option value="featured">Featured First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="product-grid">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="skeleton-card" />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="no-results-box glass-card text-center">
                  <div className="no-res-icon">🪑</div>
                  <h3>No products found</h3>
                  <p>
                    {products.length === 0
                      ? 'No products have been added yet. Check back soon!'
                      : 'Try adjusting your search or category filters.'}
                  </p>
                  {products.length > 0 && (
                    <button className="btn-primary" onClick={() => {
                      setSearchQuery('');
                      handleCategoryChange('all');
                    }}>
                      Clear all filters
                    </button>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="mobile-filter-overlay animate-fade-in">
          <div className="mobile-filter-panel animate-slide-right">
            <div className="filter-panel-header">
              <h3>Filters</h3>
              <button className="close-panel" onClick={() => setIsFilterOpen(false)}>
                <FiX />
              </button>
            </div>
            <div className="filter-panel-content">
              <div className="filter-section">
                <h4>Categories</h4>
                <ul className="mobile-cat-list">
                  <li
                    className={selectedCategory === 'all' ? 'active' : ''}
                    onClick={() => handleCategoryChange('all')}
                  >
                    All Products
                  </li>
                  {categories.map(cat => (
                    <li
                      key={cat.id}
                      className={selectedCategory === cat.slug ? 'active' : ''}
                      onClick={() => handleCategoryChange(cat.slug)}
                    >
                      {cat.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="filter-panel-footer">
              <button className="btn-primary full-width" onClick={() => setIsFilterOpen(false)}>
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
