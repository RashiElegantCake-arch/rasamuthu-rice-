/**
 * රසමුතු Rice Mills (Rasamuthu Rice Mills)
 * Admin Dashboard Control Logic
 * Pure Client-Side Architecture (localStorage + sessionStorage)
 */

// ==========================================================================
// 1. Core State & Constants
// ==========================================================================
const DEFAULT_PRODUCTS = [
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

let currentFilter = 'All';
let currentSearch = '';

// ==========================================================================
// 2. Authentication & PIN Security (Default: 1234)
// ==========================================================================
function getAdminPin() {
  return localStorage.getItem('rasamuthu_admin_pin') || '1234';
}

function checkAdminAuth() {
  const isLoggedIn = sessionStorage.getItem('rasamuthu_admin_logged_in') === 'true';
  const pinModal = document.getElementById('pin-modal');
  const dashboardApp = document.getElementById('dashboard-app');

  if (isLoggedIn) {
    if (pinModal) pinModal.classList.add('hidden');
    if (dashboardApp) dashboardApp.classList.remove('hidden');
    initAdminDashboard();
  } else {
    if (pinModal) pinModal.classList.remove('hidden');
    if (dashboardApp) dashboardApp.classList.add('hidden');
    const input = document.getElementById('admin-pin-input');
    if (input) setTimeout(() => input.focus(), 100);
  }
}

window.verifyAdminPin = function() {
  const input = document.getElementById('admin-pin-input');
  const errorMsg = document.getElementById('pin-error-msg');
  if (!input) return;

  const entered = input.value.trim();
  const correct = getAdminPin();

  if (entered === correct) {
    sessionStorage.setItem('rasamuthu_admin_logged_in', 'true');
    if (errorMsg) errorMsg.classList.add('hidden');
    input.value = '';
    checkAdminAuth();
    showAdminToast('🔐 සාදරයෙන් පිළිගනිමු! පරිපාලක පුවරුව විවෘත විය.');
  } else {
    if (errorMsg) errorMsg.classList.remove('hidden');
    input.classList.add('border-red-500', 'animate-shake');
    setTimeout(() => input.classList.remove('border-red-500', 'animate-shake'), 600);
    input.value = '';
    input.focus();
  }
};

window.adminLogout = function() {
  if (confirm('පරිපාලක පුවරුවෙන් ඉවත් වීමට (Logout) අවශ්‍යද?')) {
    sessionStorage.removeItem('rasamuthu_admin_logged_in');
    checkAdminAuth();
  }
};

window.changeAdminPin = function() {
  const currentInput = document.getElementById('pin-current');
  const newInput = document.getElementById('pin-new');
  const confirmInput = document.getElementById('pin-confirm');
  const msgEl = document.getElementById('pin-change-msg');

  const currentPin = getAdminPin();
  const enteredCurrent = currentInput.value.trim();
  const enteredNew = newInput.value.trim();
  const enteredConfirm = confirmInput.value.trim();

  if (enteredCurrent !== currentPin) {
    msgEl.textContent = '❌ වත්මන් PIN අංකය වැරදියි!';
    msgEl.className = 'text-xs font-medium text-red-600 block';
    return;
  }

  if (enteredNew.length < 4) {
    msgEl.textContent = '❌ නව PIN අංකය අවම වශයෙන් ඉලක්කම් 4ක් විය යුතුය!';
    msgEl.className = 'text-xs font-medium text-red-600 block';
    return;
  }

  if (enteredNew !== enteredConfirm) {
    msgEl.textContent = '❌ නව PIN අංක දෙක නොගැලපේ!';
    msgEl.className = 'text-xs font-medium text-red-600 block';
    return;
  }

  localStorage.setItem('rasamuthu_admin_pin', enteredNew);
  msgEl.textContent = '✅ PIN අංකය සාර්ථකව යාවත්කාලීන විය!';
  msgEl.className = 'text-xs font-medium text-emerald-600 block';

  currentInput.value = '';
  newInput.value = '';
  confirmInput.value = '';
  showAdminToast('✅ PIN අංකය සාර්ථකව වෙනස් කරන ලදී.');
};

// ==========================================================================
// 3. Tab Switching
// ==========================================================================
window.switchAdminTab = function(tabName) {
  const panes = document.querySelectorAll('.admin-tab-pane');
  const buttons = document.querySelectorAll('.admin-tab-btn');

  panes.forEach(pane => pane.classList.add('hidden'));
  buttons.forEach(btn => {
    btn.classList.remove('bg-amber-500', 'text-slate-950', 'shadow-xs');
    btn.classList.add('text-slate-600', 'hover:bg-slate-100');
  });

  const activePane = document.getElementById(`tab-${tabName}`);
  const activeBtn = document.getElementById(`nav-btn-${tabName}`);

  if (activePane) activePane.classList.remove('hidden');
  if (activeBtn) {
    activeBtn.classList.add('bg-amber-500', 'text-slate-950', 'shadow-xs');
    activeBtn.classList.remove('text-slate-600', 'hover:bg-slate-100');
  }

  if (tabName === 'overview') {
    updateKPIs();
  } else if (tabName === 'products') {
    renderProductsTab();
  } else if (tabName === 'orders') {
    renderOrdersTab();
  }

  if (window.lucide) lucide.createIcons();
};

// ==========================================================================
// 4. Products Management (05kg & 25kg Bags Only)
// ==========================================================================
function getStoredProducts() {
  try {
    const raw = localStorage.getItem('rasamuthu_products');
    if (raw) {
      const parsed = JSON.parse(raw);
      return DEFAULT_PRODUCTS.map(p => {
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
  return [...DEFAULT_PRODUCTS];
}

function saveStoredProducts(products) {
  try {
    const dataToSave = products.map(p => ({
      id: p.id,
      pricePerKg: Number(p.pricePerKg),
      inStock: Boolean(p.inStock)
    }));
    localStorage.setItem('rasamuthu_products', JSON.stringify(dataToSave));
  } catch (e) {
    console.error(e);
  }
}

window.resetProductsToDefault = async function() {
  if (confirm('සියලුම සහල් වර්ග වල මුල් පෙරනිමි මිල ගණන් (Default Prices) යළි සකසන්නද?')) {
    localStorage.removeItem('rasamuthu_products');
    if (window.RasamuthuDB && typeof window.RasamuthuDB.saveProduct === 'function') {
      for (const p of DEFAULT_PRODUCTS) {
        await window.RasamuthuDB.saveProduct(p);
      }
    }
    renderProductsTab();
    updateKPIs();
    showAdminToast('🔄 පෙරනිමි මිල ගණන් යළි පිහිටුවන ලදී.');
  }
};

function renderProductsTab() {
  const container = document.getElementById('admin-products-container');
  if (!container) return;

  const products = getStoredProducts();

  container.innerHTML = products.map(product => {
    const p5 = product.pricePerKg * 5;
    const p25 = product.pricePerKg * 25;

    return `
      <div class="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-all" id="prod-card-${product.id}">
        <div>
          <!-- Header with Image & Title -->
          <div class="flex items-start gap-4 pb-4 border-b border-slate-200">
            <div class="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-sm bg-white">
              <img src="${product.image}" alt="${product.nameEn}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="font-sinhala font-bold text-base text-slate-900 truncate">${product.nameSi}</h3>
                <span class="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full shrink-0">${product.badge}</span>
              </div>
              <p class="text-xs text-slate-500 font-medium">${product.nameEn}</p>
              
              <!-- Stock Status Pill -->
              <div class="mt-2 flex items-center gap-2">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="stock-${product.id}" class="sr-only peer" ${product.inStock ? 'checked' : ''} onchange="window.saveSingleProduct('${product.id}')">
                  <div class="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-600"></div>
                  <span class="ml-2 text-xs font-semibold ${product.inStock ? 'text-emerald-700' : 'text-slate-400'}" id="stock-label-${product.id}">
                    ${product.inStock ? '● In Stock' : '○ Out of Stock'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <!-- Price per KG Input -->
          <div class="mt-4 space-y-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-sinhala">
                කිලෝ 1ක මිල (Rate per 1 kg):
              </label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Rs.</span>
                <input 
                  type="number" 
                  id="rate-${product.id}" 
                  value="${product.pricePerKg}" 
                  min="50" 
                  max="5000" 
                  step="5"
                  oninput="window.previewBagPrices('${product.id}')"
                  class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm font-bold text-slate-900"
                >
              </div>
            </div>

            <!-- Auto-Calculated Bag Sizes (05kg & 25kg Only) -->
            <div class="grid grid-cols-2 gap-3 pt-2">
              <div class="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-2xs">
                <div class="text-[11px] font-bold text-slate-500 uppercase">05 kg Bag</div>
                <div id="preview-5kg-${product.id}" class="text-sm font-black text-amber-700 mt-0.5">
                  Rs. ${p5.toLocaleString()}
                </div>
                <div class="text-[10px] text-slate-400">Rate x 5</div>
              </div>

              <div class="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-2xs">
                <div class="text-[11px] font-bold text-slate-500 uppercase">25 kg Bag</div>
                <div id="preview-25kg-${product.id}" class="text-sm font-black text-amber-700 mt-0.5">
                  Rs. ${p25.toLocaleString()}
                </div>
                <div class="text-[10px] text-slate-400">Rate x 25</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <div class="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between">
          <span class="text-[11px] text-slate-400">Changes apply instantly</span>
          <button 
            type="button" 
            onclick="window.saveSingleProduct('${product.id}')" 
            class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <i data-lucide="save" class="w-3.5 h-3.5"></i>
            <span>මිල සුරකින්න (Save)</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

window.previewBagPrices = function(id) {
  const rateInput = document.getElementById(`rate-${id}`);
  const preview5 = document.getElementById(`preview-5kg-${id}`);
  const preview25 = document.getElementById(`preview-25kg-${id}`);
  if (!rateInput) return;

  const rate = Number(rateInput.value) || 0;
  if (preview5) preview5.textContent = `Rs. ${(rate * 5).toLocaleString()}`;
  if (preview25) preview25.textContent = `Rs. ${(rate * 25).toLocaleString()}`;
};

window.saveSingleProduct = function(id) {
  const rateInput = document.getElementById(`rate-${id}`);
  const stockInput = document.getElementById(`stock-${id}`);
  const stockLabel = document.getElementById(`stock-label-${id}`);
  if (!rateInput) return;

  const newRate = Number(rateInput.value);
  const inStock = stockInput ? stockInput.checked : true;

  if (stockLabel) {
    stockLabel.textContent = inStock ? '● In Stock' : '○ Out of Stock';
    stockLabel.className = `ml-2 text-xs font-semibold ${inStock ? 'text-emerald-700' : 'text-slate-400'}`;
  }

  const products = getStoredProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index].pricePerKg = newRate;
    products[index].inStock = inStock;
    saveStoredProducts(products);

    if (window.RasamuthuDB && typeof window.RasamuthuDB.saveProduct === 'function') {
      window.RasamuthuDB.saveProduct(products[index]);
    }

    showAdminToast(`✅ ${products[index].nameSi} නව මිල (1kg = Rs. ${newRate}) සුරකින ලදී!`);
    updateKPIs();
  }
};

// ==========================================================================
// 5. Customer Orders Management
// ==========================================================================
function getStoredOrders() {
  try {
    const raw = localStorage.getItem('rasamuthu_orders');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

function saveStoredOrders(orders) {
  try {
    localStorage.setItem('rasamuthu_orders', JSON.stringify(orders));
  } catch (e) {
    console.error(e);
  }
}

function renderOrdersTab() {
  const tbody = document.getElementById('orders-table-body');
  const emptyState = document.getElementById('orders-empty-state');
  if (!tbody) return;

  let orders = getStoredOrders();

  // Update count badges on filter buttons
  updateOrderFilterCounts(orders);

  // Apply Status Filter
  if (currentFilter !== 'All') {
    orders = orders.filter(o => o.status === currentFilter);
  }

  // Apply Search Filter
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    orders = orders.filter(o => 
      (o.id && o.id.toLowerCase().includes(q)) ||
      (o.customerName && o.customerName.toLowerCase().includes(q)) ||
      (o.customerPhone && o.customerPhone.toLowerCase().includes(q)) ||
      (o.deliveryAddress && o.deliveryAddress.toLowerCase().includes(q))
    );
  }

  if (orders.length === 0) {
    tbody.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  tbody.innerHTML = orders.map(order => {
    const dateFormatted = order.createdAt ? new Date(order.createdAt).toLocaleString('si-LK', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'N/A';

    // Status styling
    let statusBadgeClass = 'bg-amber-100 text-amber-900 border-amber-200';
    if (order.status === 'Confirmed') statusBadgeClass = 'bg-blue-100 text-blue-900 border-blue-200';
    if (order.status === 'Delivered') statusBadgeClass = 'bg-emerald-100 text-emerald-900 border-emerald-200';
    if (order.status === 'Cancelled') statusBadgeClass = 'bg-red-100 text-red-900 border-red-200';

    // Itemized bags
    const itemsHtml = (order.items || []).map(item => `
      <div class="flex items-center gap-1.5 py-0.5">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        <span class="font-sinhala font-semibold text-slate-800">${item.productNameSi || item.fullName || 'සහල්'}:</span>
        <span class="text-slate-600 font-bold">${item.bagSize}kg x ${item.quantity} Bags</span>
        <span class="text-slate-400">(${item.bagSize * item.quantity}kg)</span>
      </div>
    `).join('');

    // WhatsApp Direct Message URL
    const waPhone = (order.customerPhone || '').replace(/\D/g, '');
    const cleanWaNumber = waPhone.startsWith('0') ? '94' + waPhone.substring(1) : waPhone;
    const waMsg = `හලෝ ${order.customerName || 'පාරිභෝගික භවතා'}, රසමුතු Rice Mills වෙතින් ඔබ ඇණවුම් කළ (${order.id}) සහල් ඇණවුම අපට ලැබී ඇත. විස්තර: මුළු බර ${order.totalWeight}kg, මුළු මුදල Rs. ${(order.totalAmount || 0).toLocaleString()}. බෙදාහැරීම පිළිබඳව වැඩිදුර විමසීම සඳහා අප හා සම්බන්ධ වන්න.`;
    const waUrl = cleanWaNumber ? `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waMsg)}` : '#';

    return `
      <tr class="hover:bg-slate-50/80 transition-colors">
        
        <!-- Order ID & Date -->
        <td class="py-3.5 px-4 align-top">
          <div class="font-mono font-bold text-amber-700 text-xs">${order.id}</div>
          <div class="text-[11px] text-slate-400 mt-0.5">${dateFormatted}</div>
          ${order.deliveryDate ? `<div class="text-[10px] text-emerald-700 font-semibold mt-1">Due: ${order.deliveryDate}</div>` : ''}
        </td>

        <!-- Customer Details -->
        <td class="py-3.5 px-4 align-top">
          <div class="font-sinhala font-bold text-slate-900 text-sm">${order.customerName || 'නොදන්වා ඇත'}</div>
          ${order.customerPhone ? `<div class="text-xs text-slate-600 mt-0.5 flex items-center gap-1 font-mono"><i data-lucide="phone" class="w-3 h-3 text-slate-400"></i> ${order.customerPhone}</div>` : ''}
          ${order.deliveryAddress ? `<div class="text-[11px] text-slate-500 font-sinhala mt-1 max-w-xs leading-relaxed truncate" title="${order.deliveryAddress}"><i data-lucide="map-pin" class="w-3 h-3 inline text-slate-400 mr-0.5"></i> ${order.deliveryAddress}</div>` : ''}
        </td>

        <!-- Bags & Varieties -->
        <td class="py-3.5 px-4 align-top text-xs">
          <div class="space-y-0.5">
            ${itemsHtml || '<span class="text-slate-400">විස්තර නොමැත</span>'}
          </div>
        </td>

        <!-- Total Weight -->
        <td class="py-3.5 px-4 align-top">
          <span class="inline-block bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-lg text-xs">
            ${order.totalWeight || 0} kg
          </span>
        </td>

        <!-- Total Amount -->
        <td class="py-3.5 px-4 align-top">
          <div class="font-extrabold text-slate-900 text-sm">
            Rs. ${(order.totalAmount || 0).toLocaleString()}
          </div>
        </td>

        <!-- Status Dropdown -->
        <td class="py-3.5 px-4 align-top">
          <select 
            onchange="window.updateOrderStatus('${order.id}', this.value)" 
            class="text-xs font-bold py-1.5 px-2.5 rounded-xl border ${statusBadgeClass} focus:outline-none cursor-pointer"
          >
            <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>⏳ Pending</option>
            <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>🔹 Confirmed</option>
            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>✅ Delivered</option>
            <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
          </select>
        </td>

        <!-- Actions -->
        <td class="py-3.5 px-4 align-top text-right">
          <div class="flex items-center justify-end gap-1.5">
            ${order.customerPhone ? `
              <a href="tel:${order.customerPhone}" class="p-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors" title="Call Customer">
                <i data-lucide="phone-outgoing" class="w-4 h-4"></i>
              </a>
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors" title="Send WhatsApp Message">
                <i data-lucide="message-circle" class="w-4 h-4"></i>
              </a>
            ` : ''}
            <button onclick="window.openReceiptModal('${order.id}')" class="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors" title="Print Invoice / Receipt">
              <i data-lucide="printer" class="w-4 h-4"></i>
            </button>
            <button onclick="window.deleteOrder('${order.id}')" class="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors" title="Delete Order">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </td>

      </tr>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function updateOrderFilterCounts(allOrders) {
  const countAll = document.getElementById('count-all');
  const countPending = document.getElementById('count-pending');
  const countConfirmed = document.getElementById('count-confirmed');
  const countDelivered = document.getElementById('count-delivered');
  const countCancelled = document.getElementById('count-cancelled');
  const navBadge = document.getElementById('tab-orders-badge');

  const pendingCount = allOrders.filter(o => o.status === 'Pending').length;

  if (countAll) countAll.textContent = allOrders.length;
  if (countPending) countPending.textContent = pendingCount;
  if (countConfirmed) countConfirmed.textContent = allOrders.filter(o => o.status === 'Confirmed').length;
  if (countDelivered) countDelivered.textContent = allOrders.filter(o => o.status === 'Delivered').length;
  if (countCancelled) countCancelled.textContent = allOrders.filter(o => o.status === 'Cancelled').length;

  if (navBadge) navBadge.textContent = pendingCount;
}

window.filterOrders = function(status) {
  currentFilter = status;
  const buttons = document.querySelectorAll('.order-filter-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-filter') === status) {
      btn.classList.add('bg-amber-500', 'text-slate-950', 'shadow-xs');
      btn.classList.remove('text-slate-600', 'hover:bg-slate-100');
    } else {
      btn.classList.remove('bg-amber-500', 'text-slate-950', 'shadow-xs');
      btn.classList.add('text-slate-600', 'hover:bg-slate-100');
    }
  });
  renderOrdersTab();
};

window.searchOrders = function(query) {
  currentSearch = query.trim();
  renderOrdersTab();
};

window.updateOrderStatus = async function(orderId, newStatus) {
  const orders = getStoredOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    saveStoredOrders(orders);

    if (window.RasamuthuDB && typeof window.RasamuthuDB.updateOrderStatus === 'function') {
      await window.RasamuthuDB.updateOrderStatus(orderId, newStatus);
    }

    showAdminToast(`✅ ඇණවුම (${orderId}) තත්ත්වය '${newStatus}' ලෙස යාවත්කාලීන විය.`);
    renderOrdersTab();
    updateKPIs();
  }
};

window.deleteOrder = async function(orderId) {
  if (confirm(`ඇණවුම් අංක ${orderId} මකා දැමීමට (Delete) අවශ්‍යද?`)) {
    let orders = getStoredOrders();
    orders = orders.filter(o => o.id !== orderId);
    saveStoredOrders(orders);

    if (window.RasamuthuDB && typeof window.RasamuthuDB.deleteOrder === 'function') {
      await window.RasamuthuDB.deleteOrder(orderId);
    }

    showAdminToast(`🗑️ ඇණවුම (${orderId}) මකා දමන ලදී.`);
    renderOrdersTab();
    updateKPIs();
  }
};

window.clearAllOrders = async function() {
  if (confirm('⚠️ සියලුම ඇණවුම් ස්ථිරවම මකා දැමීමට ඔබට විශ්වාසද?')) {
    localStorage.removeItem('rasamuthu_orders');

    if (window.RasamuthuDB && typeof window.RasamuthuDB.clearAllOrders === 'function') {
      await window.RasamuthuDB.clearAllOrders();
    }

    showAdminToast('🗑️ සියලුම ඇණවුම් මකා දමන ලදී.');
    renderOrdersTab();
    updateKPIs();
  }
};

window.addDemoOrder = async function() {
  const demoOrdersPool = [
    {
      customerName: 'කසුන් ජයවර්ධන',
      customerPhone: '0714859632',
      deliveryAddress: 'නො. 45, ගාලු පාර, කළුතර දකුණ',
      deliveryDate: '2026-10-18',
      items: [
        {
          productId: 'keeri-samba',
          fullName: 'කීරි සම්බා කැකුළු (Keeri Samba Raw Rice)',
          productNameSi: 'කීරි සම්බා කැකුළු',
          bagSize: 25,
          quantity: 2,
          pricePerKg: 310
        },
        {
          productId: 'sudu-kakulu',
          fullName: 'සුදු කැකුළු (White Raw Rice)',
          productNameSi: 'සුදු කැකුළු',
          bagSize: 5,
          quantity: 1,
          pricePerKg: 220
        }
      ]
    },
    {
      customerName: 'කුමාරි විජේසිංහ මහත්මිය',
      customerPhone: '0778945612',
      deliveryAddress: 'වේදිනිගම පාර, කුඩා කත්නෝරුව, මීගලෑව',
      deliveryDate: '2026-10-17',
      items: [
        {
          productId: 'sudu-samba',
          fullName: 'සුදු සම්බා කැකුළු (White Samba Raw Rice)',
          productNameSi: 'සුදු සම්බා කැකුළු',
          bagSize: 25,
          quantity: 1,
          pricePerKg: 240
        },
        {
          productId: 'basmati',
          fullName: 'බාස්මති කැකුළු සහල් (Basmati Raw Rice)',
          productNameSi: 'බාස්මති කැකුළු සහල්',
          bagSize: 5,
          quantity: 2,
          pricePerKg: 340
        }
      ]
    }
  ];

  const template = demoOrdersPool[Math.floor(Math.random() * demoOrdersPool.length)];
  const totalWeight = template.items.reduce((sum, item) => sum + (item.bagSize * item.quantity), 0);
  const totalAmount = template.items.reduce((sum, item) => sum + (item.bagSize * item.quantity * item.pricePerKg), 0);
  const orderId = 'RM-' + Math.floor(1000 + Math.random() * 9000);

  const newOrder = {
    id: orderId,
    createdAt: new Date().toISOString(),
    customerName: template.customerName,
    customerPhone: template.customerPhone,
    deliveryAddress: template.deliveryAddress,
    deliveryDate: template.deliveryDate,
    items: template.items,
    totalWeight,
    totalAmount,
    status: 'Pending'
  };

  const orders = getStoredOrders();
  orders.unshift(newOrder);
  saveStoredOrders(orders);

  if (window.RasamuthuDB && typeof window.RasamuthuDB.insertOrder === 'function') {
    await window.RasamuthuDB.insertOrder(newOrder);
  }

  showAdminToast(`✨ Demo ඇණවුම (${orderId}) එක් කරන ලදී!`);
  renderOrdersTab();
  updateKPIs();
};

window.exportOrdersCSV = function() {
  const orders = getStoredOrders();
  if (orders.length === 0) {
    alert('Export කිරීමට කිසිදු ඇණවුමක් නොමැත.');
    return;
  }

  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'Order ID,Date,Customer Name,Phone,Address,Delivery Date,Total KG,Total Rs,Status,Items\n';

  orders.forEach(o => {
    const itemsSummary = (o.items || []).map(i => `${i.productNameSi || i.fullName} (${i.bagSize}kg x ${i.quantity})`).join('; ');
    const row = [
      o.id,
      `"${o.createdAt || ''}"`,
      `"${o.customerName || ''}"`,
      `"${o.customerPhone || ''}"`,
      `"${(o.deliveryAddress || '').replace(/"/g, '""')}"`,
      `"${o.deliveryDate || ''}"`,
      o.totalWeight || 0,
      o.totalAmount || 0,
      o.status || 'Pending',
      `"${itemsSummary.replace(/"/g, '""')}"`
    ].join(',');
    csvContent += row + '\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `rasamuthu_orders_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showAdminToast('📥 ඇණවුම් CSV ගොනුවක් ලෙස බාගත විය.');
};

// ==========================================================================
// 6. Invoice / Receipt Modal
// ==========================================================================
window.openReceiptModal = function(orderId) {
  const orders = getStoredOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const modal = document.getElementById('receipt-modal');
  const content = document.getElementById('receipt-content');
  if (!modal || !content) return;

  const dateFormatted = order.createdAt ? new Date(order.createdAt).toLocaleString('si-LK') : 'N/A';

  content.innerHTML = `
    <div class="text-center pb-4 border-b border-slate-200">
      <div class="text-2xl font-black font-sinhala text-slate-900">රසමුතු Rice Mills</div>
      <div class="text-xs text-slate-500 font-sinhala">වේදිනිගම, කුඩා කත්නෝරුව, මීගලෑව</div>
      <div class="text-xs text-slate-500">Hotline: 076 713 6323 • Official Order Receipt</div>
    </div>

    <div class="py-4 space-y-2 text-xs border-b border-slate-100">
      <div class="flex justify-between">
        <span class="text-slate-500">Receipt No:</span>
        <span class="font-mono font-bold text-slate-900">${order.id}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-slate-500">Date:</span>
        <span class="text-slate-800">${dateFormatted}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-slate-500">Customer:</span>
        <span class="font-sinhala font-bold text-slate-900">${order.customerName || 'N/A'}</span>
      </div>
      ${order.customerPhone ? `
        <div class="flex justify-between">
          <span class="text-slate-500">Phone:</span>
          <span class="font-mono text-slate-800">${order.customerPhone}</span>
        </div>
      ` : ''}
      ${order.deliveryAddress ? `
        <div class="flex justify-between">
          <span class="text-slate-500">Delivery Address:</span>
          <span class="font-sinhala text-slate-800 text-right max-w-xs">${order.deliveryAddress}</span>
        </div>
      ` : ''}
      ${order.deliveryDate ? `
        <div class="flex justify-between">
          <span class="text-slate-500">Required Date:</span>
          <span class="font-bold text-emerald-700">${order.deliveryDate}</span>
        </div>
      ` : ''}
    </div>

    <!-- Items Table -->
    <div class="py-4">
      <table class="w-full text-left text-xs">
        <thead>
          <tr class="border-b border-slate-200 text-slate-500 text-[10px] uppercase">
            <th class="py-1">Rice Variety</th>
            <th class="py-1 text-center">Bags</th>
            <th class="py-1 text-center">Weight</th>
            <th class="py-1 text-right">Price</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          ${(order.items || []).map(item => {
            const weight = item.bagSize * item.quantity;
            const itemTotal = weight * (item.pricePerKg || 0);
            return `
              <tr>
                <td class="py-2 font-sinhala font-medium text-slate-800">
                  ${item.productNameSi || item.fullName}
                  <span class="block text-[10px] text-slate-400 font-sans">${item.bagSize}kg Bag pack</span>
                </td>
                <td class="py-2 text-center font-bold text-slate-700">${item.quantity}</td>
                <td class="py-2 text-center text-slate-600">${weight} kg</td>
                <td class="py-2 text-right font-bold text-slate-900">Rs. ${itemTotal.toLocaleString()}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <!-- Total Summary -->
    <div class="pt-3 border-t-2 border-slate-900 space-y-1.5 text-xs">
      <div class="flex justify-between text-slate-600">
        <span>Total Rice Volume:</span>
        <span class="font-bold text-slate-900">${order.totalWeight || 0} kg</span>
      </div>
      <div class="flex justify-between text-base font-black text-slate-900 pt-1 border-t border-slate-200">
        <span class="font-sinhala">ගෙවිය යුතු මුදල:</span>
        <span class="text-amber-800">Rs. ${(order.totalAmount || 0).toLocaleString()}</span>
      </div>
      <div class="text-center text-[10px] text-slate-400 pt-4 font-sinhala">
        රසමුතු සහල් තෝරාගැනීම පිළිබඳව ස්තූතියි! 100% ගල් වැලි රහිත පිරිසිදු සහල්.
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  if (window.lucide) lucide.createIcons();
};

window.closeReceiptModal = function() {
  const modal = document.getElementById('receipt-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

// ==========================================================================
// 7. Hotline & Mill Settings
// ==========================================================================
window.saveHotlineSettings = function() {
  const phoneInput = document.getElementById('setting-phone-input');
  if (!phoneInput) return;

  const phone = phoneInput.value.replace(/\D/g, '');
  if (phone.length < 9) {
    alert('කරුණාකර වලංගු WhatsApp දුරකථන අංකයක් ඇතුළත් කරන්න.');
    return;
  }

  localStorage.setItem('rasamuthu_phone', phone);
  showAdminToast(`📞 WhatsApp අංකය (+${phone}) සාර්ථකව සුරකින ලදී!`);
};

// ==========================================================================
// 8. Overview KPIs & Realtime Sync
// ==========================================================================
function updateKPIs() {
  const orders = getStoredOrders();
  const products = getStoredProducts();

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalWeight = orders.reduce((sum, o) => sum + (o.totalWeight || 0), 0);
  const activeProductsCount = products.filter(p => p.inStock).length;

  const kpiOrders = document.getElementById('kpi-orders-count');
  const kpiRevenue = document.getElementById('kpi-revenue');
  const kpiWeight = document.getElementById('kpi-weight');
  const kpiActive = document.getElementById('kpi-active-products');

  if (kpiOrders) kpiOrders.textContent = totalOrders.toLocaleString();
  if (kpiRevenue) kpiRevenue.textContent = `Rs. ${totalRevenue.toLocaleString()}`;
  if (kpiWeight) kpiWeight.textContent = `${totalWeight.toLocaleString()} kg`;
  if (kpiActive) kpiActive.textContent = `${activeProductsCount} / 4`;

  // Render Recent Orders Mini Table
  const recentContainer = document.getElementById('recent-orders-preview');
  if (recentContainer) {
    if (orders.length === 0) {
      recentContainer.innerHTML = `
        <div class="py-8 text-center text-xs text-slate-400">
          ඇණවුම් කිසිවක් නොමැත. Test Order එකක් එක් කරන්න.
        </div>
      `;
    } else {
      const top4 = orders.slice(0, 4);
      recentContainer.innerHTML = top4.map(o => `
        <div class="py-3 flex items-center justify-between gap-3 text-xs">
          <div>
            <div class="font-bold text-slate-900 font-sinhala">${o.customerName || 'පාරිභෝගිකයා'}</div>
            <div class="text-[11px] text-slate-400">${o.id} • ${o.totalWeight || 0} kg</div>
          </div>
          <div class="text-right">
            <div class="font-bold text-amber-800">Rs. ${(o.totalAmount || 0).toLocaleString()}</div>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
              ${o.status || 'Pending'}
            </span>
          </div>
        </div>
      `).join('');
    }
  }

  // Render Overview Price Summary
  const priceListContainer = document.getElementById('overview-price-list');
  if (priceListContainer) {
    priceListContainer.innerHTML = products.map(p => `
      <div class="flex items-center justify-between text-xs py-2 border-b border-slate-100 last:border-0">
        <div>
          <div class="font-bold font-sinhala text-slate-800">${p.nameSi}</div>
          <div class="text-[10px] text-slate-400">05kg: Rs. ${(p.pricePerKg * 5).toLocaleString()} | 25kg: Rs. ${(p.pricePerKg * 25).toLocaleString()}</div>
        </div>
        <div class="text-right">
          <span class="font-black text-slate-900 text-xs bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
            Rs. ${p.pricePerKg} / kg
          </span>
        </div>
      </div>
    `).join('');
  }
}

// ==========================================================================
// 9. Toast Notification System
// ==========================================================================
let toastTimer = null;
function showAdminToast(message) {
  const toast = document.getElementById('admin-toast');
  const toastText = document.getElementById('admin-toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('flex');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3000);
}

// ==========================================================================
// 10. Supabase Cloud Database Management
// ==========================================================================
function updateSupabaseStatusUI() {
  const isConnected = window.RasamuthuDB && window.RasamuthuDB.isConfigured();
  const credentials = window.RasamuthuDB ? window.RasamuthuDB.getCredentials() : { url: '', key: '' };

  // Header status badge
  const headerBtn = document.getElementById('admin-supabase-status-btn');
  const headerDot = document.getElementById('admin-supabase-dot');
  const headerLabel = document.getElementById('admin-supabase-label');

  if (headerBtn && headerDot && headerLabel) {
    if (isConnected) {
      headerDot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
      headerLabel.textContent = 'Supabase Cloud';
      headerBtn.className = 'flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-xl transition-all border bg-slate-900 border-emerald-500/40 text-emerald-300 hover:border-emerald-400 shadow-2xs cursor-pointer';
    } else {
      headerDot.className = 'w-2 h-2 rounded-full bg-amber-400';
      headerLabel.textContent = 'Local Storage';
      headerBtn.className = 'flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-xl transition-all border bg-slate-900 border-slate-700 text-amber-300 hover:border-amber-400 cursor-pointer';
    }
  }

  // Settings tab status badge
  const settingsBadge = document.getElementById('supabase-status-badge');
  if (settingsBadge) {
    if (isConnected) {
      settingsBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5';
      settingsBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span><span>Cloud Connected</span>';
    } else {
      settingsBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1.5';
      settingsBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-amber-500"></span><span>Local Mode</span>';
    }
  }

  // Populate inputs if empty
  const urlInput = document.getElementById('supabase-url-input');
  const keyInput = document.getElementById('supabase-key-input');
  if (urlInput && !urlInput.value && credentials.url) {
    urlInput.value = credentials.url;
  }
  if (keyInput && !keyInput.value && credentials.key) {
    keyInput.value = credentials.key;
  }
}

window.scrollToSupabaseSettings = function() {
  setTimeout(() => {
    const el = document.getElementById('supabase-config-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-amber-400');
      setTimeout(() => el.classList.remove('ring-2', 'ring-amber-400'), 1500);
    }
  }, 100);
};

window.handleSupabaseConnect = async function() {
  const urlInput = document.getElementById('supabase-url-input');
  const keyInput = document.getElementById('supabase-key-input');
  const feedbackMsg = document.getElementById('supabase-feedback-msg');
  const btn = document.getElementById('btn-save-supabase');

  if (!urlInput || !keyInput) return;

  const url = urlInput.value.trim();
  const key = keyInput.value.trim();

  if (!url || !key) {
    if (feedbackMsg) {
      feedbackMsg.textContent = '❌ කරුණාකර Supabase Project URL සහ Anon Key දෙකම ඇතුළත් කරන්න.';
      feedbackMsg.className = 'text-xs font-semibold p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 block';
    }
    return;
  }

  if (feedbackMsg) {
    feedbackMsg.textContent = '⏳ Supabase සම්බන්ධතාවය පරීක්ෂා කරමින් පවතී...';
    feedbackMsg.className = 'text-xs font-semibold p-3 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 block';
  }
  if (btn) btn.disabled = true;

  try {
    const testRes = await window.RasamuthuDB.testConnection(url, key);

    if (testRes.success) {
      window.RasamuthuDB.setCredentials(url, key);
      updateSupabaseStatusUI();

      if (feedbackMsg) {
        feedbackMsg.textContent = '✅ සාර්ථකයි! Supabase Cloud Database සමඟ සම්බන්ධ විය.';
        feedbackMsg.className = 'text-xs font-semibold p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 block';
      }

      showAdminToast('🟢 Supabase Cloud Database සාර්ථකව සම්බන්ධ විය!');

      await syncDataFromCloud();
      setupRealtimeOrdersListener();
    } else {
      if (feedbackMsg) {
        feedbackMsg.textContent = `❌ සම්බන්ධ වීමේ දෝෂයකි: ${testRes.error}. (කරුණාකර supabase_schema.sql run කර ඇති බවත් API keys නිවැරදි බවත් පරීක්ෂා කරන්න)`;
        feedbackMsg.className = 'text-xs font-semibold p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 block';
      }
    }
  } catch (err) {
    if (feedbackMsg) {
      feedbackMsg.textContent = `❌ Exception: ${err.message}`;
      feedbackMsg.className = 'text-xs font-semibold p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 block';
    }
  } finally {
    if (btn) btn.disabled = false;
  }
};

window.handleSyncLocalToSupabase = async function() {
  if (!window.RasamuthuDB || !window.RasamuthuDB.isConfigured()) {
    alert('කරුණාකර පළමුව Supabase Cloud වෙත සම්බන්ධ වන්න (Test & Connect).');
    return;
  }

  const btn = document.getElementById('btn-sync-supabase');
  if (btn) btn.disabled = true;

  showAdminToast('☁️ දත්ත Supabase වෙත Sync කරමින් පවතී...');

  try {
    const res = await window.RasamuthuDB.syncLocalToSupabase();
    if (res.success) {
      showAdminToast(`✅ Sync සාර්ථකයි! (ඇණවුම්: ${res.ordersCount}, සහල් වර්ග: ${res.productsCount})`);
      renderOrdersTab();
      updateKPIs();
    } else {
      alert(`Sync දෝෂයකි: ${res.error}`);
    }
  } catch (e) {
    alert(`Sync දෝෂයකි: ${e.message}`);
  } finally {
    if (btn) btn.disabled = false;
  }
};

window.handleDisconnectSupabase = function() {
  if (confirm('Supabase Cloud වෙතින් විසන්ධි වී Local Storage පමණක් භාවිතා කිරීමට අවශ්‍යද?')) {
    if (window.RasamuthuDB) {
      window.RasamuthuDB.setCredentials('', '');
    }
    const urlInput = document.getElementById('supabase-url-input');
    const keyInput = document.getElementById('supabase-key-input');
    const feedbackMsg = document.getElementById('supabase-feedback-msg');
    if (urlInput) urlInput.value = '';
    if (keyInput) keyInput.value = '';
    if (feedbackMsg) feedbackMsg.classList.add('hidden');

    updateSupabaseStatusUI();
    showAdminToast('🟡 Supabase විසන්ධි විය. Local Storage වෙත මාරු විය.');
  }
};

async function syncDataFromCloud() {
  if (window.RasamuthuDB && window.RasamuthuDB.isConfigured()) {
    try {
      const [cloudProducts, cloudOrders] = await Promise.all([
        window.RasamuthuDB.getProducts(),
        window.RasamuthuDB.getOrders()
      ]);
      renderProductsTab();
      renderOrdersTab();
      updateKPIs();
    } catch (e) {
      console.warn('Cloud sync error:', e);
    }
  }
}

function setupRealtimeOrdersListener() {
  if (window.RasamuthuDB && typeof window.RasamuthuDB.subscribeOrders === 'function') {
    window.RasamuthuDB.subscribeOrders(
      (newOrder) => {
        showAdminToast(`🔔 නව ඇණවුමක් ලැබුණි! #${newOrder.id} (${newOrder.customerName || 'Customer'})`);
        renderOrdersTab();
        updateKPIs();
      },
      (updatedOrder) => {
        renderOrdersTab();
        updateKPIs();
      },
      () => {
        renderOrdersTab();
        updateKPIs();
      }
    );
  }
}

// ==========================================================================
// 11. Dashboard Initializer
// ==========================================================================
function initAdminDashboard() {
  if (window.lucide) lucide.createIcons();
  
  // Set saved hotline in settings
  const phoneSetting = document.getElementById('setting-phone-input');
  if (phoneSetting) {
    phoneSetting.value = localStorage.getItem('rasamuthu_phone') || '94767136323';
  }

  updateSupabaseStatusUI();
  updateKPIs();
  renderProductsTab();
  renderOrdersTab();

  // Async load from cloud & attach realtime listener
  syncDataFromCloud();
  setupRealtimeOrdersListener();
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  checkAdminAuth();
});
