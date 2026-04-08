import { useState, useEffect } from 'react';
import {
  FiPackage, FiDollarSign, FiPlus, FiEdit2, FiTrash2,
  FiLogOut, FiBarChart2, FiBox, FiLoader, FiStar, FiTrendingUp, FiImage, FiX
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { productService, storageService } from '../../services/dataService';
import { categories } from '../../data/products';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';
import AdminProductForm from './AdminProductForm';
import './Admin.css';



export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [togglingId, setTogglingId] = useState(null);

  // Filter products locally for search and category
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });


  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSyncLocalProducts = async () => {
    if (!window.confirm('This will import all products from manifest.json into your database. Continue?')) return;
    
    setBtnLoading(true);
    let count = 0;
    try {
      const response = await fetch('/manifest.json');
      const manifest = await response.json();
      
      for (const [slug, categoryData] of Object.entries(manifest)) {
        for (const [index, file] of categoryData.files.entries()) {
          const productData = {
            title: file.name.replace(/[-_]/g, ' '),
            description: `Handcrafted premium ${slug.replace('-', ' ')} product.`,
            price: file.price || Math.floor(Math.random() * (50000 - 5000) + 5000),
            category: slug,
            image_url: encodeURI(file.path),
            is_featured: index < 2,
            is_trending: index % 5 === 0
          };
          
          await fetch('http://localhost:3000/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
          });
          count++;
        }
      }
      toast.success(`Successfully imported ${count} products!`);
      fetchProducts();
    } catch (err) {
      console.error('Sync error:', err);
      toast.error('Sync failed');
    } finally {
      setBtnLoading(false);
    }
  };

  const fetchProducts = async () => {

    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data || []);
    } catch (err) {
      console.error('Admin fetch error:', err);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };



  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, productData);
        toast.success('Product updated successfully!');
      } else {
        await productService.addProduct(productData);
        toast.success('Product added successfully!');
      }
      fetchProducts();
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (err) {
      toast.error(err.message || 'Action failed');
      throw err; // Pass error back to form for loading state handling
    }
  };

  const closeForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const deleteProduct = async (id, url) => {
    if (!window.confirm('Are you sure you want to delete this product? This cannot be undone.')) return;
    try {
      await productService.deleteProduct(id);
      if (url) await storageService.deleteImage(url).catch(() => {});
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const openEdit = (p) => {
    setEditingProduct(p);
    setShowProductForm(true);
  };

  const handleToggleFeatured = async (p) => {
    setTogglingId(`featured-${p.id}`);
    try {
      await productService.toggleFeatured(p.id, p.is_featured);
      toast.success(p.is_featured ? 'Removed from Featured' : 'Marked as Featured ⭐');
      fetchProducts();
    } catch {
      toast.error('Toggle failed');
    } finally {
      setTogglingId(null);
    }
  };

  const handleToggleTrending = async (p) => {
    setTogglingId(`trending-${p.id}`);
    try {
      await productService.toggleTrending(p.id, p.is_trending);
      toast.success(p.is_trending ? 'Removed from Trending' : 'Marked as Trending 🔥');
      fetchProducts();
    } catch {
      toast.error('Toggle failed');
    } finally {
      setTogglingId(null);
    }
  };

  const adminEmail = user?.email || 'Admin';

  if (loading) {
    return (
      <div className="admin-loading">
        <FiLoader className="spin" size={32} />
        <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)' }}>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-logo">🪵</span>
          <div>
            <h3>Woodharbour</h3>
            <span>Admin Panel</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button className={`sidebar-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <FiBarChart2 /><span>Dashboard</span>
          </button>
          <button className={`sidebar-link ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            <FiBox /><span>Products</span>
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <h2 style={{ textTransform: 'capitalize' }}>{activeTab}</h2>
          <div className="admin-user">👤 Admin ({adminEmail})</div>
        </div>

        <div className="admin-content">

          {/* ========== DASHBOARD ========== */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="stats-grid">
                <div className="stat-card" style={{ '--accent': '#6B4226' }}>
                  <FiPackage />
                  <div className="stat-card-info">
                    <b>{products.length}</b>
                    <span>Total Products</span>
                  </div>
                </div>
                <div className="stat-card" style={{ '--accent': '#D4A853' }}>
                  <FiStar />
                  <div className="stat-card-info">
                    <b>{products.filter(p => p.is_featured).length}</b>
                    <span>Featured</span>
                  </div>
                </div>
                <div className="stat-card" style={{ '--accent': '#C62828' }}>
                  <FiTrendingUp />
                  <div className="stat-card-info">
                    <b>{products.filter(p => p.is_trending).length}</b>
                    <span>Trending</span>
                  </div>
                </div>
                <div className="stat-card" style={{ '--accent': '#2E7D4F' }}>
                  <FiDollarSign />
                  <div className="stat-card-info">
                    <b>{formatPrice(products.reduce((s, p) => s + (p.price || 0), 0))}</b>
                    <span>Total Value</span>
                  </div>
                </div>
              </div>

              {/* Recent Products */}
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>Recent Products</h3>
                {products.slice(0, 5).map(p => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderBottom: '1px solid rgba(107,66,38,0.1)', borderRadius: '8px' }}>
                    <img src={p.image_url} alt={p.title} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div style={{ flex: 1 }}>
                      <strong>{p.title}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{p.category}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {p.is_featured && <span style={{ fontSize: '0.7rem', background: 'rgba(212,168,83,0.15)', color: '#B08D3A', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>⭐ Featured</span>}
                      {p.is_trending && <span style={{ fontSize: '0.7rem', background: 'rgba(198,40,40,0.1)', color: '#C62828', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>🔥 Trending</span>}
                    </div>
                    <strong>{formatPrice(p.price)}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========== PRODUCTS ========== */}
          {activeTab === 'products' && (
            <div className="products-view">
              <div className="products-header">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="admin-search-input"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <div className="header-actions">
                  <button 
                    className="btn-btn-secondary" 
                    onClick={handleSyncLocalProducts}
                    disabled={btnLoading}
                  >
                    <FiPackage /> {btnLoading ? 'Syncing...' : 'Sync Stock Collection'}
                  </button>
                  <button className="btn-primary" onClick={() => setShowProductForm(true)}>
                    <FiPlus /> Add Product
                  </button>
                </div>
              </div>

              {/* ===== PRODUCT FORM MODAL ===== */}
              {showProductForm && (
                <AdminProductForm 
                  onClose={closeForm}
                  onSave={handleSaveProduct}
                  initialData={editingProduct}
                />
              )}

              {/* ===== PRODUCTS GRID ===== */}
              <div className="admin-products-grid">
                {filteredProducts.length === 0 ? (
                  <div className="empty-state">
                    <FiPackage size={48} />
                    <p>{products.length === 0 ? 'No products yet. Click "+ New Product" to add one.' : 'No products match your search.'}</p>
                  </div>
                ) : (
                  filteredProducts.map(p => (
                    <div key={p.id} className="admin-product-card glass-card">
                      <div className="product-card-image">
                        <img src={p.image_url} alt={p.title} loading="lazy" />
                        <div className="product-card-badges">
                          {p.is_featured && <span className="badge featured">Featured</span>}
                          {p.is_trending && <span className="badge trending">Trending</span>}
                        </div>
                      </div>
                      
                      <div className="product-card-content">
                        <div className="product-card-info">
                          <span className="product-card-category">{p.category}</span>
                          <h4 className="product-card-title">{p.title}</h4>
                          <span className="product-card-price">{formatPrice(p.price)}</span>
                        </div>
                        
                        <div className="product-card-actions">
                          <button 
                            className="btn-icon edit" 
                            onClick={() => openEdit(p)}
                            title="Edit Product"
                          >
                            <FiEdit2 /> <span>Edit</span>
                          </button>
                          <button 
                            className="btn-icon delete" 
                            onClick={() => deleteProduct(p.id, p.image_url)}
                            title="Delete Product"
                          >
                            <FiTrash2 /> <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
