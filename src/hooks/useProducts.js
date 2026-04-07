import { useState, useEffect } from 'react';

/**
 * useProducts — fetches products from Supabase
 * @param {Function} fetchFn  — which service method to call (e.g., productService.getAllProducts)
 * @param {Array}    args     — arguments to pass to fetchFn
 */
export function useProducts(fetchFn, args = []) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      // Ensure we call the function with the provided args
      const data = await fetchFn(...args);
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Fetch only once on mount as per requirement
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { products, loading, error, refetch: loadData };
}
