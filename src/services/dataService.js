const API_URL = 'http://localhost:3000';

export const productService = {
  // Fetch ALL products (latest first)
  async getAllProducts() {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('Error getting all products:', error);
      throw error;
    }
  },

  // Fetch latest N products
  async getLatestProducts(limitCount = 8) {
    try {
      const products = await this.getAllProducts();
      return products.slice(0, limitCount);
    } catch (error) {
      console.error('Error getting latest products:', error);
      throw error;
    }
  },

  // Fetch featured products
  async getFeaturedProducts(limitCount = 8) {
    try {
      const products = await this.getAllProducts();
      return products
        .filter(p => p.is_featured === true || p.is_featured === 'true')
        .slice(0, limitCount);
    } catch (error) {
      console.error('Error getting featured products:', error);
      throw error;
    }
  },

  // Fetch trending products
  async getTrendingProducts(limitCount = 4) {
    try {
      const products = await this.getAllProducts();
      return products
        .filter(p => p.is_trending === true || p.is_trending === 'true')
        .slice(0, limitCount);
    } catch (error) {
      console.error('Error getting trending products:', error);
      throw error;
    }
  },

  // Fetch single product by ID
  async getProductById(id) {
    try {
      const response = await fetch(`${API_URL}/products`);
      const products = await response.json();
      const product = products.find(p => p.id === id);
      if (product) return product;
      throw new Error('Product not found');
    } catch (error) {
      console.error('Error getting product by ID:', error);
      throw error;
    }
  },

  // Fetch related products (same category, different id)
  async getRelatedProducts(category, excludeId, limitCount = 4) {
    try {
      const products = await this.getAllProducts();
      return products
        .filter(p => p.category === category && p.id !== excludeId)
        .slice(0, limitCount);
    } catch (error) {
      console.error('Error getting related products:', error);
      throw error;
    }
  },

  // Fetch products by category
  async getProductsByCategory(category) {
    try {
      const products = await this.getAllProducts();
      if (!category || category === 'all') return products;
      return products.filter(p => p.category === category);
    } catch (error) {
      console.error('Error getting products by category:', error);
      throw error;
    }
  },

  // Add new product
  async addProduct(product) {
    try {
      // In the new system, we upload the image first which calls the backend
      // But if we're calling this from the Admin panel, we might already have the image_url
      // The backend expects a multipart form for /upload, but let's assume we want a JSON endpoint too
      // For now, I'll update the Admin panel to use /upload with all fields
      
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });

      if (!response.ok) throw new Error('Failed to add product');
      const data = await response.json();
      return data.product;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  // Update product
  async updateProduct(id, updates) {
    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, id })
      });
      if (!response.ok) throw new Error('Failed to update product');
      const data = await response.json();
      return data.product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Toggle isFeatured
  async toggleFeatured(id, currentValue) {
    return this.updateProduct(id, { is_featured: !currentValue });
  },

  // Toggle isTrending
  async toggleTrending(id, currentValue) {
    return this.updateProduct(id, { is_trending: !currentValue });
  },

  // Delete product
  async deleteProduct(id) {
    try {
      const response = await fetch(`${API_URL}/delete/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete product');
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

export const storageService = {
  // Legacy alias
  async uploadProductImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data.product.image_url;
  },

  async uploadProductAndGetDetails(file, productDetails) {
    const formData = new FormData();
    formData.append('image', file);
    
    // Add product details to formData
    Object.keys(productDetails).forEach(key => {
      formData.append(key, productDetails[key]);
    });

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upload product');
    }

    const data = await response.json();
    return data.product;
  },

  async deleteImage(url) {
    // Backend handles image deletion from Cloudinary automatically
    // when the product is deleted from the database.
    console.log("Image deletion request received for:", url);
    return true;
  }
};



export const orderService = {
  // Orders can be implemented the same way if needed, 
  // but for now let's keep them as dummy or local storage
  async createOrder(orderData) {
    console.log('Order created locally:', orderData);
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = { ...orderData, id: Date.now().toString(), created_at: new Date().toISOString() };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    return newOrder;
  },

  async getMyOrders(userId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return orders.filter(o => o.user_id === userId);
  }
};

