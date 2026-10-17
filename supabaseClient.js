/**
 * රසමුතු Rice Mills (Rasamuthu Rice Mills)
 * Supabase Cloud Database Client & Persistence Layer
 *
 * Fully static, zero-backend, GitHub Pages compatible.
 * Works seamlessly with Supabase Cloud DB with automatic fallback to localStorage.
 */

(function() {
  'use strict';

  // In-memory reference to initialized Supabase client
  let supabaseInstance = null;
  let activeRealtimeChannel = null;

  /**
   * Retrieves active Supabase credentials from localStorage or supabaseConfig.js
   */
  function getCredentials() {
    let url = localStorage.getItem('rasamuthu_supabase_url') || '';
    let key = localStorage.getItem('rasamuthu_supabase_key') || '';

    if (!url && window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) {
      url = window.SUPABASE_CONFIG.url.trim();
    }
    if (!key && window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey) {
      key = window.SUPABASE_CONFIG.anonKey.trim();
    }

    return { url: url.trim(), key: key.trim() };
  }

  /**
   * Initializes or returns the existing Supabase Client instance
   */
  function getClient() {
    if (supabaseInstance) return supabaseInstance;

    const { url, key } = getCredentials();
    if (!url || !key) return null;

    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      console.warn('Supabase JS library is not loaded from CDN yet.');
      return null;
    }

    try {
      supabaseInstance = window.supabase.createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      });
      return supabaseInstance;
    } catch (err) {
      console.error('Error creating Supabase client:', err);
      return null;
    }
  }

  /**
   * Checks if Supabase credentials are configured
   */
  function isConfigured() {
    const { url, key } = getCredentials();
    return Boolean(url && key);
  }

  /**
   * Tests connection to Supabase instance
   */
  async function testConnection(testUrl, testKey) {
    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      return { success: false, error: 'Supabase JS CDN library not loaded.' };
    }

    const url = (testUrl || '').trim();
    const key = (testKey || '').trim();

    if (!url || !key) {
      return { success: false, error: 'URL සහ Anon Key දෙකම අවශ්‍ය වේ.' };
    }

    try {
      const tempClient = window.supabase.createClient(url, key, {
        auth: { persistSession: false }
      });

      // Simple probe to products table
      const { data, error } = await tempClient
        .from('products')
        .select('id')
        .limit(1);

      if (error) {
        return { success: false, error: error.message || 'Supabase Query Failed' };
      }

      return { success: true, count: data ? data.length : 0 };
    } catch (err) {
      return { success: false, error: err.message || 'Network error' };
    }
  }

  /**
   * Save credentials to localStorage and re-initialize
   */
  function setCredentials(url, key) {
    if (url && key) {
      localStorage.setItem('rasamuthu_supabase_url', url.trim());
      localStorage.setItem('rasamuthu_supabase_key', key.trim());
    } else {
      localStorage.removeItem('rasamuthu_supabase_url');
      localStorage.removeItem('rasamuthu_supabase_key');
    }
    supabaseInstance = null;
    return getClient();
  }

  // =========================================================================
  // Products API (05kg & 25kg Rice Varieties)
  // =========================================================================

  const FALLBACK_PRODUCTS = [
    {
      id: 'sudu-kakulu',
      nameSi: 'සුදු කැකුළු',
      nameEn: 'White Raw Rice',
      fullName: 'සුදු කැකුළු (White Raw Rice)',
      pricePerKg: 220,
      image: 'images/sudu-kakulu.jpg',
      badge: '100% Organic',
      inStock: true
    },
    {
      id: 'sudu-samba',
      nameSi: 'සුදු සම්බා කැකුළු',
      nameEn: 'White Samba Raw Rice',
      fullName: 'සුදු සම්බා කැකුළු (White Samba Raw Rice)',
      pricePerKg: 240,
      image: 'images/sudu-samba.jpg',
      badge: 'Family Favorite',
      inStock: true
    },
    {
      id: 'keeri-samba',
      nameSi: 'කීරි සම්බා කැකුළු',
      nameEn: 'Keeri Samba Raw Rice',
      fullName: 'කීරි සම්බා කැකුළු (Keeri Samba Raw Rice)',
      pricePerKg: 310,
      image: 'images/keeri-samba.jpg',
      badge: 'Best Seller ⭐',
      inStock: true
    },
    {
      id: 'basmati',
      nameSi: 'බාස්මති කැකුළු සහල්',
      nameEn: 'Basmati Raw Rice',
      fullName: 'බාස්මති කැකුළු සහල් (Basmati Raw Rice)',
      pricePerKg: 340,
      image: 'images/basmati.jpg',
      badge: 'Royal Premium',
      inStock: true
    }
  ];

  /**
   * Fetch all products: tries Supabase first, falls back to localStorage/defaults
   */
  async function dbGetProducts() {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('products')
          .select('*')
          .order('price_per_kg', { ascending: true });

        if (!error && Array.isArray(data) && data.length > 0) {
          const mapped = data.map(row => {
            const fallback = FALLBACK_PRODUCTS.find(f => f.id === row.id) || {};
            return {
              id: row.id,
              nameSi: row.name_si || fallback.nameSi || row.id,
              nameEn: row.name_en || fallback.nameEn || row.id,
              fullName: `${row.name_si || ''} (${row.name_en || ''})`.trim(),
              pricePerKg: Number(row.price_per_kg) || fallback.pricePerKg || 250,
              image: row.image || fallback.image || 'images/sudu-kakulu.jpg',
              badge: row.badge || fallback.badge || 'Fresh Harvest',
              inStock: row.in_stock !== undefined ? Boolean(row.in_stock) : true
            };
          });

          // Cache to localStorage for offline speed
          try {
            const dataToSave = mapped.map(p => ({
              id: p.id,
              pricePerKg: p.pricePerKg,
              inStock: p.inStock
            }));
            localStorage.setItem('rasamuthu_products', JSON.stringify(dataToSave));
          } catch(e) {}

          return mapped;
        }
      } catch (err) {
        console.warn('Supabase getProducts failed, falling back to localStorage:', err);
      }
    }

    // LocalStorage Fallback
    try {
      const raw = localStorage.getItem('rasamuthu_products');
      if (raw) {
        const parsed = JSON.parse(raw);
        return FALLBACK_PRODUCTS.map(p => {
          const found = parsed.find(item => item.id === p.id);
          if (found) {
            return {
              ...p,
              pricePerKg: Number(found.pricePerKg) || p.pricePerKg,
              inStock: found.inStock !== undefined ? Boolean(found.inStock) : true
            };
          }
          return p;
        });
      }
    } catch (e) {
      console.error(e);
    }

    return [...FALLBACK_PRODUCTS];
  }

  /**
   * Save a single product (or update rate/stock)
   */
  async function dbSaveProduct(product) {
    // 1. Update localStorage cache
    try {
      const raw = localStorage.getItem('rasamuthu_products');
      let products = raw ? JSON.parse(raw) : [];
      const idx = products.findIndex(p => p.id === product.id);
      const itemData = {
        id: product.id,
        pricePerKg: Number(product.pricePerKg),
        inStock: Boolean(product.inStock)
      };

      if (idx !== -1) {
        products[idx] = itemData;
      } else {
        products.push(itemData);
      }
      localStorage.setItem('rasamuthu_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }

    // 2. Sync to Supabase if connected
    const client = getClient();
    if (client) {
      try {
        const updatePayload = {
          id: product.id,
          price_per_kg: Number(product.pricePerKg),
          in_stock: Boolean(product.inStock),
          updated_at: new Date().toISOString()
        };
        if (product.nameSi) updatePayload.name_si = product.nameSi;
        if (product.nameEn) updatePayload.name_en = product.nameEn;
        if (product.image) updatePayload.image = product.image;
        if (product.badge) updatePayload.badge = product.badge;

        const { error } = await client
          .from('products')
          .upsert(updatePayload);

        if (error) {
          console.error('Supabase product upsert error:', error);
          return { success: false, error: error.message };
        }
        return { success: true };
      } catch (err) {
        console.error('Supabase product save failed:', err);
        return { success: false, error: err.message };
      }
    }

    return { success: true, localOnly: true };
  }

  // =========================================================================
  // Orders API (Customer orders with Delivery Address)
  // =========================================================================

  /**
   * Helper to transform Supabase snake_case row to App camelCase Order
   */
  function mapOrderFromDb(row) {
    return {
      id: row.id,
      createdAt: row.created_at,
      customerName: row.customer_name || 'Customer',
      customerPhone: row.customer_phone || '',
      deliveryAddress: row.delivery_address || '',
      deliveryDate: row.delivery_date || '',
      notes: row.notes || '',
      items: Array.isArray(row.items) ? row.items : [],
      totalWeight: Number(row.total_weight) || 0,
      totalAmount: Number(row.total_amount) || 0,
      status: row.status || 'Pending'
    };
  }

  /**
   * Helper to transform App camelCase Order to Supabase snake_case row
   */
  function mapOrderToDb(order) {
    return {
      id: order.id,
      created_at: order.createdAt || new Date().toISOString(),
      customer_name: order.customerName || '',
      customer_phone: order.customerPhone || '',
      delivery_address: order.deliveryAddress || '',
      delivery_date: order.deliveryDate || '',
      notes: order.notes || '',
      items: order.items || [],
      total_weight: Number(order.totalWeight) || 0,
      total_amount: Number(order.totalAmount) || 0,
      status: order.status || 'Pending'
    };
  }

  /**
   * Fetch all orders: Supabase first, falls back to localStorage
   */
  async function dbGetOrders() {
    const client = getClient();
    if (client) {
      try {
        const { data, error } = await client
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data)) {
          const mappedOrders = data.map(mapOrderFromDb);
          // Cache to localStorage
          try {
            localStorage.setItem('rasamuthu_orders', JSON.stringify(mappedOrders));
          } catch (e) {}
          return mappedOrders;
        }
      } catch (err) {
        console.warn('Supabase getOrders failed, falling back to localStorage:', err);
      }
    }

    // LocalStorage Fallback
    try {
      const raw = localStorage.getItem('rasamuthu_orders');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  /**
   * Insert new order (Storefront checkout)
   */
  async function dbInsertOrder(order) {
    // 1. Immediately store in localStorage so customer never loses order
    try {
      const orders = JSON.parse(localStorage.getItem('rasamuthu_orders') || '[]');
      const filtered = orders.filter(o => o.id !== order.id);
      filtered.unshift(order);
      localStorage.setItem('rasamuthu_orders', JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }

    // 2. Push to Supabase if connected
    const client = getClient();
    if (client) {
      try {
        const payload = mapOrderToDb(order);
        const { error } = await client
          .from('orders')
          .insert([payload]);

        if (error) {
          console.error('Supabase order insert error:', error);
          return { success: false, error: error.message };
        }
        return { success: true };
      } catch (err) {
        console.error('Supabase order insert exception:', err);
        return { success: false, error: err.message };
      }
    }

    return { success: true, localOnly: true };
  }

  /**
   * Update order status (Pending, Confirmed, Delivered, Cancelled)
   */
  async function dbUpdateOrderStatus(orderId, status) {
    // 1. Update localStorage
    try {
      const orders = JSON.parse(localStorage.getItem('rasamuthu_orders') || '[]');
      const idx = orders.findIndex(o => o.id === orderId);
      if (idx !== -1) {
        orders[idx].status = status;
        localStorage.setItem('rasamuthu_orders', JSON.stringify(orders));
      }
    } catch (e) {
      console.error(e);
    }

    // 2. Update Supabase
    const client = getClient();
    if (client) {
      try {
        const { error } = await client
          .from('orders')
          .update({ status: status })
          .eq('id', orderId);

        if (error) {
          console.error('Supabase order update status error:', error);
          return { success: false, error: error.message };
        }
        return { success: true };
      } catch (err) {
        console.error('Supabase status update failed:', err);
        return { success: false, error: err.message };
      }
    }

    return { success: true, localOnly: true };
  }

  /**
   * Delete an order
   */
  async function dbDeleteOrder(orderId) {
    // 1. Remove from localStorage
    try {
      const orders = JSON.parse(localStorage.getItem('rasamuthu_orders') || '[]');
      const filtered = orders.filter(o => o.id !== orderId);
      localStorage.setItem('rasamuthu_orders', JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }

    // 2. Remove from Supabase
    const client = getClient();
    if (client) {
      try {
        const { error } = await client
          .from('orders')
          .delete()
          .eq('id', orderId);

        if (error) {
          console.error('Supabase delete error:', error);
          return { success: false, error: error.message };
        }
        return { success: true };
      } catch (err) {
        console.error('Supabase delete exception:', err);
        return { success: false, error: err.message };
      }
    }

    return { success: true, localOnly: true };
  }

  /**
   * Clear all orders
   */
  async function dbClearAllOrders() {
    localStorage.removeItem('rasamuthu_orders');

    const client = getClient();
    if (client) {
      try {
        await client.from('orders').delete().neq('id', '');
        return { success: true };
      } catch (err) {
        console.error('Supabase clear all orders failed:', err);
        return { success: false, error: err.message };
      }
    }

    return { success: true, localOnly: true };
  }

  /**
   * Sync existing localStorage data (orders & products) to Supabase
   */
  async function dbSyncLocalToSupabase() {
    const client = getClient();
    if (!client) {
      return { success: false, error: 'Supabase සබඳතාවය සක්‍රීය නැත.' };
    }

    let syncedOrdersCount = 0;
    let syncedProductsCount = 0;

    try {
      // 1. Sync Products
      const localProducts = await dbGetProducts();
      for (const p of localProducts) {
        const res = await dbSaveProduct(p);
        if (res.success) syncedProductsCount++;
      }

      // 2. Sync Orders
      const rawOrders = localStorage.getItem('rasamuthu_orders');
      if (rawOrders) {
        const localOrders = JSON.parse(rawOrders);
        for (const o of localOrders) {
          const payload = mapOrderToDb(o);
          const { error } = await client
            .from('orders')
            .upsert(payload, { onConflict: 'id' });
          if (!error) syncedOrdersCount++;
        }
      }

      return {
        success: true,
        ordersCount: syncedOrdersCount,
        productsCount: syncedProductsCount
      };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  /**
   * Realtime Subscription for Admin Dashboard (Orders updates)
   */
  function subscribeToRealtimeOrders(onInsert, onUpdate, onDelete) {
    const client = getClient();
    if (!client) return null;

    try {
      if (activeRealtimeChannel) {
        activeRealtimeChannel.unsubscribe();
      }

      activeRealtimeChannel = client
        .channel('public:orders')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'orders' },
          payload => {
            if (payload.eventType === 'INSERT' && typeof onInsert === 'function') {
              onInsert(mapOrderFromDb(payload.new));
            } else if (payload.eventType === 'UPDATE' && typeof onUpdate === 'function') {
              onUpdate(mapOrderFromDb(payload.new));
            } else if (payload.eventType === 'DELETE' && typeof onDelete === 'function') {
              onDelete(payload.old);
            }
          }
        )
        .subscribe();

      return activeRealtimeChannel;
    } catch (err) {
      console.warn('Realtime subscription error:', err);
      return null;
    }
  }

  // =========================================================================
  // Expose to window namespace
  // =========================================================================
  window.RasamuthuDB = {
    isConfigured,
    getCredentials,
    setCredentials,
    getClient,
    testConnection,
    getProducts: dbGetProducts,
    saveProduct: dbSaveProduct,
    getOrders: dbGetOrders,
    insertOrder: dbInsertOrder,
    updateOrderStatus: dbUpdateOrderStatus,
    deleteOrder: dbDeleteOrder,
    clearAllOrders: dbClearAllOrders,
    syncLocalToSupabase: dbSyncLocalToSupabase,
    subscribeOrders: subscribeToRealtimeOrders
  };

})();
