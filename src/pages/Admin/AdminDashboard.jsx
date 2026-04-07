import { useState, useEffect } from 'react';
import {
  FiPackage, FiDollarSign, FiPlus, FiEdit2, FiTrash2,
  FiLogOut, FiBarChart2, FiBox, FiLoader, FiStar, FiTrendingUp, FiImage, FiX
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { productService, storageService } from '../../services/supabaseService';
import { categories } from '../../data/products';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';
import './Admin.css';

const EMPTY_FORM = {
  title: '', category: 'furniture', price: '',
  description: '', material: '', dimensions: '',
  image_url: '', is_featured: false, is_trending: false,
};

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const [productForm, setProductForm] = useState({ ...EMPTY_FORM });

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.title.trim()) return toast.error('Title is required');
    if (!productForm.price || isNaN(productForm.price)) return toast.error('Valid price is required');
    if (!editingProduct && !selectedFile && !productForm.image_url) return toast.error('Image is required');

    setBtnLoading(true);
    try {
      let finalImageUrl = productForm.image_url;

      if (selectedFile) {
        finalImageUrl = await storageService.uploadProductImage(selectedFile);
      }

      if (!finalImageUrl) throw new Error('Image upload failed');

      const productData = {
        title: productForm.title.trim(),
        category: productForm.category,
        price: Number(productForm.price),
        description: productForm.description.trim(),
        material: productForm.material.trim(),
        dimensions: productForm.dimensions.trim(),
        image_url: finalImageUrl,
        is_featured: productForm.is_featured,
        is_trending: productForm.is_trending,
      };

      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, productData);
        toast.success('Product updated successfully!');
      } else {
        await productService.addProduct(productData);
        toast.success('Product added successfully!');
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      toast.error(err.message || 'Action failed');
    } finally {
      setBtnLoading(false);
    }
  };

  const resetForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
    setSelectedFile(null);
    setImagePreview(null);
    setProductForm({ ...EMPTY_FORM });
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
    setProductForm({
      title: p.title || '',
      category: p.category || 'furniture',
      price: p.price || '',
      description: p.description || '',
      material: p.material || '',
      dimensions: p.dimensions || '',
      image_url: p.image_url || '',
      is_featured: p.is_featured || false,
      is_trending: p.is_trending || false,
    });
    setImagePreview(p.image_url || null);
    setSelectedFile(null);
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

  const filteredProducts = products.filter(p =>
    (p.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <button className="sidebar-logout" onClick={() => logout()}>
          <FiLogOut /><span>Logout</span>
        </button>
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
                <button className="btn btn-primary" onClick={() => { resetForm(); setShowProductForm(true); }}>
                  <FiPlus /> New Product
                </button>
              </div>

              {/* ===== PRODUCT FORM MODAL ===== */}
              {showProductForm && (
                <div className="product-form-overlay">
                  <div className="product-form-modal glass-card" style={{ maxWidth: '680px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                      <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: 'var(--color-text-secondary)' }}><FiX /></button>
                    </div>

                    <form onSubmit={handleProductSubmit}>
                      {/* Title */}
                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">Product Title *</label>
                        <input
                          type="text"
                          placeholder="e.g. Royal Teak Dining Table"
                          value={productForm.title}
                          onChange={e => setProductForm({ ...productForm, title: e.target.value })}
                          required
                          className="form-input"
                        />
                      </div>

                      {/* Category + Price */}
                      <div className="form-row" style={{ marginBottom: '1rem' }}>
                        <div className="form-group">
                          <label className="form-label">Category *</label>
                          <select
                            value={productForm.category}
                            onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                            className="form-input"
                          >
                            {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Price (₹) *</label>
                          <input
                            type="number"
                            placeholder="e.g. 45999"
                            value={productForm.price}
                            onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                            required
                            min="0"
                            className="form-input"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">Description</label>
                        <textarea
                          placeholder="Product description..."
                          value={productForm.description}
                          onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                          className="form-input"
                          rows="3"
                        />
                      </div>

                      {/* Material + Dimensions */}
                      <div className="form-row" style={{ marginBottom: '1rem' }}>
                        <div className="form-group">
                          <label className="form-label">Material</label>
                          <input
                            type="text"
                            placeholder="e.g. Premium Teak Wood"
                            value={productForm.material}
                            onChange={e => setProductForm({ ...productForm, material: e.target.value })}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Dimensions</label>
                          <input
                            type="text"
                            placeholder="e.g. 180cm x 90cm x 76cm"
                            value={productForm.dimensions}
                            onChange={e => setProductForm({ ...productForm, dimensions: e.target.value })}
                            className="form-input"
                          />
                        </div>
                      </div>

                      {/* Image Upload */}
                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <label className="form-label">Product Image *</label>
                        <div className="image-upload-section">
                          <label className="image-upload-box" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1.5rem', border: '2px dashed var(--color-accent)', borderRadius: '12px' }}>
                            {imagePreview ? (
                              <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: '160px', objectFit: 'cover', borderRadius: '8px' }} />
                            ) : (
                              <>
                                <FiImage size={32} style={{ color: 'var(--color-accent)' }} />
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                  {selectedFile ? selectedFile.name : 'Click to choose image'}
                                </span>
                              </>
                            )}
                            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
                          </label>
                          {imagePreview && (
                            <button type="button" onClick={() => { setSelectedFile(null); setImagePreview(null); setProductForm({ ...productForm, image_url: '' }); }}
                              style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-error)', background: 'none', border: 'none', cursor: 'pointer' }}>
                              Remove image
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Featured + Trending Toggles */}
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.75rem 1.25rem', borderRadius: '10px', border: `2px solid ${productForm.is_featured ? '#D4A853' : 'var(--color-surface-dark)'}`, background: productForm.is_featured ? 'rgba(212,168,83,0.1)' : 'transparent', transition: 'all 0.2s', userSelect: 'none' }}>
                          <input
                            type="checkbox"
                            checked={productForm.is_featured}
                            onChange={e => setProductForm({ ...productForm, is_featured: e.target.checked })}
                            style={{ accentColor: '#D4A853', width: '16px', height: '16px' }}
                          />
                          <FiStar style={{ color: productForm.is_featured ? '#D4A853' : 'var(--color-text-secondary)' }} />
                          <span style={{ fontWeight: 600, color: productForm.is_featured ? '#B08D3A' : 'var(--color-text-secondary)' }}>Featured Product</span>
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.75rem 1.25rem', borderRadius: '10px', border: `2px solid ${productForm.is_trending ? '#C62828' : 'var(--color-surface-dark)'}`, background: productForm.is_trending ? 'rgba(198,40,40,0.08)' : 'transparent', transition: 'all 0.2s', userSelect: 'none' }}>
                          <input
                            type="checkbox"
                            checked={productForm.is_trending}
                            onChange={e => setProductForm({ ...productForm, is_trending: e.target.checked })}
                            style={{ accentColor: '#C62828', width: '16px', height: '16px' }}
                          />
                          <FiTrendingUp style={{ color: productForm.is_trending ? '#C62828' : 'var(--color-text-secondary)' }} />
                          <span style={{ fontWeight: 600, color: productForm.is_trending ? '#C62828' : 'var(--color-text-secondary)' }}>Trending Product</span>
                        </label>
                      </div>

                      {/* Actions */}
                      <div className="form-actions">
                        <button type="button" onClick={resetForm} className="btn btn-secondary">Cancel</button>
                        <button type="submit" disabled={btnLoading} className="btn btn-primary">
                          {btnLoading ? <><FiLoader style={{ animation: 'spin 0.8s linear infinite' }} /> Saving...</> : (editingProduct ? 'Update Product' : 'Add Product')}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ===== PRODUCTS TABLE ===== */}
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th style={{ textAlign: 'center' }}>⭐ Featured</th>
                      <th style={{ textAlign: 'center' }}>🔥 Trending</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-secondary)' }}>
                          {products.length === 0 ? 'No products yet. Click "+ New Product" to add one.' : 'No products match your search.'}
                        </td>
                      </tr>
                    ) : filteredProducts.map(p => (
                      <tr key={p.id}>
                        <td>
                          <img
                            src={p.image_url}
                            alt={p.title}
                            className="table-product-img"
                            style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '8px' }}
                          />
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, marginBottom: '2px' }}>{p.title}</div>
                          {p.material && <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>{p.material}</div>}
                        </td>
                        <td>
                          <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '0.78rem', background: 'rgba(107,66,38,0.08)', color: 'var(--color-primary)' }}>
                            {p.category}
                          </span>
                        </td>
                        <td><strong>{formatPrice(p.price)}</strong></td>

                        {/* Featured Toggle */}
                        <td style={{ textAlign: 'center' }}>
                          <button
                            onClick={() => handleToggleFeatured(p)}
                            disabled={togglingId === `featured-${p.id}`}
                            title={p.is_featured ? 'Remove from Featured' : 'Mark as Featured'}
                            style={{
                              padding: '5px 12px',
                              borderRadius: '20px',
                              border: 'none',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.78rem',
                              background: p.is_featured ? 'rgba(212,168,83,0.2)' : 'rgba(107,66,38,0.05)',
                              color: p.is_featured ? '#B08D3A' : 'var(--color-text-muted)',
                              transition: 'all 0.2s',
                            }}
                          >
                            {togglingId === `featured-${p.id}` ? '...' : (p.is_featured ? '⭐ ON' : '☆ OFF')}
                          </button>
                        </td>

                        {/* Trending Toggle */}
                        <td style={{ textAlign: 'center' }}>
                          <button
                            onClick={() => handleToggleTrending(p)}
                            disabled={togglingId === `trending-${p.id}`}
                            title={p.is_trending ? 'Remove from Trending' : 'Mark as Trending'}
                            style={{
                              padding: '5px 12px',
                              borderRadius: '20px',
                              border: 'none',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.78rem',
                              background: p.is_trending ? 'rgba(198,40,40,0.1)' : 'rgba(107,66,38,0.05)',
                              color: p.is_trending ? '#C62828' : 'var(--color-text-muted)',
                              transition: 'all 0.2s',
                            }}
                          >
                            {togglingId === `trending-${p.id}` ? '...' : (p.is_trending ? '🔥 ON' : '— OFF')}
                          </button>
                        </td>

                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              className="admin-action-edit"
                              onClick={() => openEdit(p)}
                              title="Edit"
                              style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(107,66,38,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)' }}
                            >
                              <FiEdit2 size={14} /> Edit
                            </button>
                            <button
                              className="admin-action-delete"
                              onClick={() => deleteProduct(p.id, p.image_url)}
                              title="Delete"
                              style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(198,40,40,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-error)' }}
                            >
                              <FiTrash2 size={14} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
