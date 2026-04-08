import { useState, useRef } from 'react';
import { FiX, FiImage, FiPlus, FiLoader } from 'react-icons/fi';
import { storageService } from '../../services/dataService';
import toast from 'react-hot-toast';

export default function AdminProductForm({ onClose, onSave, initialData }) {
  const isEditing = !!initialData;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || 'furniture',
    price: initialData?.price || '',
    description: initialData?.description || '',
    material: initialData?.material || 'Teak Wood',
    dimensions: initialData?.dimensions || '',
    is_featured: initialData?.is_featured || false,
    is_trending: initialData?.is_trending || false,
    image_url: initialData?.image_url || ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image_url || null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large (max 5MB)');
        return;
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return toast.error('Please enter product name');
    if (!formData.price) return toast.error('Please enter price');
    if (!isEditing && !selectedFile) return toast.error('Please select an image');

    setLoading(true);
    try {
      let finalImageUrl = formData.image_url;

      // Upload image if a new one was selected
      if (selectedFile) {
        finalImageUrl = await storageService.uploadProductImage(selectedFile);
      }

      await onSave({
        ...formData,
        price: Number(formData.price),
        image_url: finalImageUrl
      });
      
      onClose();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.message || 'Error saving product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-overlay">
      <div className="product-form-modal glass-card">
        <div className="modal-header">
          <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <FiX />
          </button>
        </div>

        <form className="product-form" onSubmit={handleSubmit}>
          {/* Image Upload Area */}
          <div className="form-group">
            <label className="form-label">Product Image</label>
            <div 
              className={`image-upload-zone ${imagePreview ? 'has-image' : ''}`}
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  <FiImage size={40} />
                  <p>Click to upload image</p>
                  <span>Max size: 5MB</span>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                hidden 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="Ex: Teakwood Dining Table"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                name="category" 
                className="form-input" 
                value={formData.category}
                onChange={handleChange}
              >
                <option value="furniture">Furniture</option>
                <option value="home-decor">Home Decor</option>
                <option value="modular-kitchen">Modular Kitchen</option>
                <option value="office-interior">Office Interior</option>
                <option value="wooden-toys">Wooden Toys</option>
                <option value="hanging-products">Hanging Products</option>
                <option value="design-services">Design Services</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                name="price"
                className="form-input"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Material</label>
              <input
                type="text"
                name="material"
                className="form-input"
                placeholder="Ex: Premium Sheesham Wood"
                value={formData.material}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-input"
              rows="3"
              placeholder="Describe the product details..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-row-checks">
            <label className="check-label">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
              />
              <span>Mark as Featured Product</span>
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                name="is_trending"
                checked={formData.is_trending}
                onChange={handleChange}
              />
              <span>Mark as Trending Product</span>
            </label>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading ? (
                <><FiLoader className="spin" /> Saving...</>
              ) : (
                <><FiPlus /> {isEditing ? 'Update Product' : 'Add Product'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
