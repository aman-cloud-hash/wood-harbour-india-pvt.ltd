import { supabase } from '../config/supabase';

export const authService = {
  async signUp(email, password, fullName) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
    if (error) throw error;
    if (data?.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([{ id: data.user.id, email: data.user.email, role: 'user', full_name: fullName }]);
      if (profileError) console.error('Profile creation error:', profileError);
    }
    return data;
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) throw error;
    return data;
  },

  async getProfile(userId) {
    const { data, error } = await supabase
      .from('users').select('*').eq('id', userId).single();
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};

export const productService = {
  // Fetch ALL products (latest first)
  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  // Fetch latest N products
  async getLatestProducts(limit = 8) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  },

  // Fetch featured products
  async getFeaturedProducts(limit = 8) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  },

  // Fetch trending products
  async getTrendingProducts(limit = 4) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_trending', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  },

  // Fetch single product by ID
  async getProductById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  // Fetch related products (same category, different id)
  async getRelatedProducts(category, excludeId, limit = 4) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .neq('id', excludeId)
      .limit(limit);
    if (error) throw error;
    return data || [];
  },

  // Fetch products by category
  async getProductsByCategory(category) {
    const query = supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (category && category !== 'all') {
      query.eq('category', category);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // Add new product
  async addProduct(product) {
    const { data, error } = await supabase
      .from('products')
      .insert([{ ...product, is_featured: product.is_featured || false, is_trending: product.is_trending || false }])
      .select();
    if (error) throw error;
    return data[0];
  },

  // Update product
  async updateProduct(id, updates) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  // Toggle isFeatured
  async toggleFeatured(id, currentValue) {
    const { data, error } = await supabase
      .from('products')
      .update({ is_featured: !currentValue })
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  // Toggle isTrending
  async toggleTrending(id, currentValue) {
    const { data, error } = await supabase
      .from('products')
      .update({ is_trending: !currentValue })
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  // Delete product
  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }
};

export const storageService = {
  async uploadProductImage(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `products/${fileName}`;
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);
    return data.publicUrl;
  },

  async deleteImage(url) {
    if (!url) return;
    const path = url.split('product-images/').pop();
    if (!path) return;
    const { error } = await supabase.storage
      .from('product-images')
      .remove([path]);
    if (error) throw error;
  }
};

export const orderService = {
  async createOrder(orderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async getMyOrders(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
};
