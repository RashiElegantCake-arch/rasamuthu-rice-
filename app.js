/**
 * රසමුතු Rice Mills (Rasamuthu Rice Mills)
 * World-Class Interactive Website Scripts
 * Target WhatsApp: +94767136323
 */

// ==========================================================================
// 1. Product Catalog Data
// ==========================================================================
function getInitialProducts() {
  const defaultProducts = [
    {
      id: 'sudu-kakulu',
      nameSi: 'සුදු කැකුළු',
      nameEn: 'White Raw Rice',
      fullName: 'සුදු කැකුළු (White Raw Rice)',
      pricePerKg: 220,
      badge: '100% Organic',
      badgeColor: 'bg-emerald-600',
      rating: 4.9,
      reviewsCount: 148,
      image: 'images/sudu-kakulu.jpg',
      description: 'අපගේ මෝලෙන් නැවුම්ව පිරිසිදු කරන ලද උසස්ම තත්ත්වයේ සුදු කැකුළු සහල්. ගල් වැලි හා කුණු රහිතව පෝෂණය ඉහළින්ම රැකගෙන ඇත.',
      features: ['100% Stone-Free & Dust-Free', 'High Nutritional Value', 'Fluffy Daily Staple', 'Direct Mill Freshness'],
      sizes: [5, 25],
      cookingRatio: '1 Cup Rice : 2 Cups Water',
      grainLength: 'Medium Grain (Pearly White)',
      purity: '99.9% Impurity Free',
      inStock: true
    },
    {
      id: 'sudu-samba',
      nameSi: 'සුදු සම්බා කැකුළු',
      nameEn: 'White Samba Raw Rice',
      fullName: 'සුදු සම්බා කැකුළු (White Samba Raw Rice)',
      pricePerKg: 240,
      badge: 'Daily Favorite',
      badgeColor: 'bg-amber-600',
      rating: 4.9,
      reviewsCount: 230,
      image: 'images/sudu-samba.jpg',
      description: 'මුතු කැට සේ දිදුලන කුඩා ප්‍රමාණයේ සම්බා කැට. සුවඳවත්, මෘදු හා රසවත් බතක් සඳහා ශ්‍රී ලාංකික නිවෙස් වල ප්‍රමුඛතම තේරීම.',
      features: ['Uniform Small Pearl Grains', 'Fragrant & Soft Texture', 'Double De-stoned', 'Hygienically Packed'],
      sizes: [5, 25],
      cookingRatio: '1 Cup Rice : 2.2 Cups Water',
      grainLength: 'Short Round Pearl Grain',
      purity: '99.9% Impurity Free',
      inStock: true
    },
    {
      id: 'keeri-samba',
      nameSi: 'කීරි සම්බා කැකුළු',
      nameEn: 'Keeri Samba Raw Rice',
      fullName: 'කීරි සම්බා කැකුළු (Keeri Samba Raw Rice)',
      pricePerKg: 310,
      badge: 'Best Seller ⭐',
      badgeColor: 'bg-gradient-to-r from-amber-500 to-amber-700',
      rating: 5.0,
      reviewsCount: 412,
      image: 'images/keeri-samba.jpg',
      description: 'ශ්‍රී ලංකාවේ අංක 1 උත්සව හා විශේෂ අවස්ථා සඳහා තෝරාගන්නා සුපිරි කීරි සම්බා සහල්. ඇලෙන්නේ නැති, එකිනෙකට වෙන්වන මුතු කැට බතක්.',
      features: ['Superior Fine Grain', 'Non-Sticky Fluffy Grains', 'Aromatic & Digestible', 'Ideal for Yellow Rice & Biryani'],
      sizes: [5, 25],
      cookingRatio: '1 Cup Rice : 1.8 Cups Water',
      grainLength: 'Fine Delicate Grain',
      purity: '99.9% Impurity Free',
      inStock: true
    },
    {
      id: 'basmati',
      nameSi: 'බාස්මති කැකුළු සහල්',
      nameEn: 'Basmati Raw Rice',
      fullName: 'බාස්මති කැකුළු සහල් (Basmati Raw Rice)',
      pricePerKg: 340,
      badge: 'Royal Premium',
      badgeColor: 'bg-emerald-800',
      rating: 4.95,
      reviewsCount: 185,
      image: 'images/basmati.jpg',
      description: 'සුවඳ විහිදෙන දිගටි කැට සහිත රාජකීය බාස්මති සහල්. ෆ්‍රයිඩ් රයිස්, බුරියානි සහ විශේෂ ආහාර පාන සඳහා කදිම වටිනාකම සහ රසය.',
      features: ['Extra Long Slender Grains', 'Naturally Aromatic', 'Zero Starch Breakage', 'Restaurant Chef Grade'],
      sizes: [5, 25],
      cookingRatio: '1 Cup Rice : 1.7 Cups Water',
      grainLength: 'Extra Long Slender Grain',
      purity: '99.9% Impurity Free',
      inStock: true
    }
  ];

  try {
    const saved = localStorage.getItem('rasamuthu_products');
    if (saved) {
      const parsed = JSON.parse(saved);
      return defaultProducts.map(p => {
        const found = parsed.find(item => item.id === p.id);
        if (found) {
          return {
            ...p,
            pricePerKg: Number(found.pricePerKg) || p.pricePerKg,
            inStock: found.inStock !== undefined ? found.inStock : true
          };
        }
        return p;
      });
    }
  } catch(e) {}
  return defaultProducts;
}

const RICE_PRODUCTS = getInitialProducts();

const WHATSAPP_PHONE = localStorage.getItem('rasamuthu_phone') || '94767136323';

/**
 * Creates formatted WhatsApp URL using the required Sinhala template:
 * "හලෝ රසමුතු Rice Mills, මට [Product Name] (ප්‍රමාණය: [Quantity] kg) ඇණවුම් කිරීමට අවශ්‍යයි. කරුණාකර විස්තර ලබා දෙන්න."
 */
function buildWhatsAppOrderUrl(productName, quantity) {
  const message = `හලෝ රසමුතු Rice Mills, මට ${productName} (ප්‍රමාණය: ${quantity} kg) ඇණවුම් කිරීමට අවශ්‍යයි. කරුණාකර විස්තර ලබා දෙන්න.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

// ==========================================================================
// 2. Interactive Floating Rice Grains Canvas Animation
// ==========================================================================
class RiceGrainsCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.grains = [];
    this.maxGrains = 42;
    this.mouseX = -1000;
    this.mouseY = -1000;
    this.isHeroVisible = true;
    this.animationFrameId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Mouse interaction
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });

    // Pause canvas when out of viewport for max efficiency
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isHeroVisible = entry.isIntersecting;
        if (this.isHeroVisible && !this.animationFrameId) {
          this.animate();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.canvas);

    // Populate initial grains
    for (let i = 0; i < this.maxGrains; i++) {
      this.grains.push(this.createGrain(Math.random() * this.canvas.width, Math.random() * this.canvas.height));
    }

    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
  }

  createGrain(x, y) {
    const isGold = Math.random() > 0.45;
    return {
      x: x !== undefined ? x : Math.random() * this.canvas.width,
      y: y !== undefined ? y : -20,
      length: 8 + Math.random() * 8, // length of rice grain
      width: 2.8 + Math.random() * 1.8,  // thickness of grain
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.025,
      speedY: 0.45 + Math.random() * 0.85,
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: 0.25 + Math.random() * 0.65,
      color: isGold 
        ? `rgba(245, 158, 11, ${0.4 + Math.random() * 0.45})` // Golden grain
        : `rgba(255, 255, 255, ${0.5 + Math.random() * 0.4})`, // Pearl white grain
      swayOffset: Math.random() * 100,
      swaySpeed: 0.02 + Math.random() * 0.02
    };
  }

  drawGrain(g) {
    this.ctx.save();
    this.ctx.translate(g.x, g.y);
    this.ctx.rotate(g.angle);

    this.ctx.beginPath();
    // Elliptical rice grain geometry
    this.ctx.ellipse(0, 0, g.length / 2, g.width / 2, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = g.color;
    this.ctx.shadowColor = 'rgba(217, 119, 6, 0.25)';
    this.ctx.shadowBlur = 6;
    this.ctx.fill();

    // Subtle grain sheen line
    this.ctx.beginPath();
    this.ctx.ellipse(0, -g.width / 4, g.length / 3, g.width / 6, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    this.ctx.fill();

    this.ctx.restore();
  }

  animate() {
    if (!this.isHeroVisible) {
      this.animationFrameId = null;
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.grains.length; i++) {
      const g = this.grains[i];

      // Natural sway
      g.swayOffset += g.swaySpeed;
      g.y += g.speedY;
      g.x += g.speedX + Math.sin(g.swayOffset) * 0.4;
      g.angle += g.angularSpeed;

      // Mouse repulsion/interaction
      const dx = g.x - this.mouseX;
      const dy = g.y - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        const force = (110 - dist) / 110;
        g.x += (dx / dist) * force * 3.5;
        g.y += (dy / dist) * force * 3.5;
      }

      // Recycle grain if out of viewport
      if (g.y > this.canvas.height + 25 || g.x < -30 || g.x > this.canvas.width + 30) {
        this.grains[i] = this.createGrain(Math.random() * this.canvas.width, -20);
      }

      this.drawGrain(g);
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

// ==========================================================================
// 3. Interactive Rice Quantity & Price Calculator
// ==========================================================================
class RiceCalculator {
  constructor() {
    this.selectedProduct = RICE_PRODUCTS[2]; // Default: Keeri Samba (Best Seller)
    this.quantity = 25; // Default: 25 kg bag

    this.initElements();
    this.renderProductOptions();
    this.attachEventListeners();
    this.updateCalculation();
  }

  initElements() {
    this.productSelect = document.getElementById('calc-product-select');
    this.productChips = document.getElementById('calc-product-chips');
    this.rangeSlider = document.getElementById('calc-range-slider');
    this.numberInput = document.getElementById('calc-number-input');
    this.presetButtons = document.querySelectorAll('.calc-preset-btn');
    
    // Result displays
    this.displayVariety = document.getElementById('calc-result-variety');
    this.displayUnitRate = document.getElementById('calc-result-unit-rate');
    this.displayQty = document.getElementById('calc-result-qty');
    this.displaySubtotal = document.getElementById('calc-result-subtotal');
    this.displayDiscount = document.getElementById('calc-result-discount');
    this.displayDiscountRow = document.getElementById('calc-discount-row');
    this.displayTotal = document.getElementById('calc-result-total');
    this.orderBtn = document.getElementById('calc-order-whatsapp-btn');
    this.addToCartBtn = document.getElementById('calc-add-to-cart-btn');
    this.bulkSavingsBanner = document.getElementById('calc-bulk-savings-banner');
  }

  renderProductOptions() {
    if (!this.productChips) return;
    this.productChips.innerHTML = '';

    RICE_PRODUCTS.forEach(product => {
      const isSelected = product.id === this.selectedProduct.id;
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `px-4 py-3 rounded-xl border text-left transition-all duration-200 flex items-center justify-between gap-3 ${
        isSelected
          ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-500/20 text-amber-950 font-semibold'
          : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700 hover:bg-amber-50/40'
      }`;
      chip.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg overflow-hidden shrink-0 shadow-sm border border-amber-200/50">
            <img src="${product.image}" alt="${product.nameSi}" class="w-full h-full object-cover">
          </div>
          <div>
            <div class="font-sinhala font-bold text-sm leading-tight">${product.nameSi}</div>
            <div class="text-xs text-slate-500 font-normal">${product.nameEn}</div>
          </div>
        </div>
        <div class="text-right">
          <span class="text-xs px-2 py-0.5 rounded-full ${isSelected ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-600'} font-bold">
            Rs. ${product.pricePerKg}/kg
          </span>
        </div>
      `;

      chip.addEventListener('click', () => {
        this.setProduct(product);
      });

      this.productChips.appendChild(chip);
    });
  }

  setProduct(product) {
    this.selectedProduct = product;
    this.renderProductOptions();
    this.updateCalculation();
  }

  setQuantity(qty) {
    const val = Math.max(1, Math.min(1000, parseInt(qty, 10) || 1));
    this.quantity = val;
    if (this.rangeSlider) this.rangeSlider.value = Math.min(val, 100);
    if (this.numberInput) this.numberInput.value = val;
    this.updatePresetButtons();
    this.updateCalculation();
  }

  updatePresetButtons() {
    this.presetButtons.forEach(btn => {
      const kg = parseInt(btn.getAttribute('data-kg'), 10);
      if (kg === this.quantity) {
        btn.classList.add('bg-amber-600', 'text-white', 'border-amber-600', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
      } else {
        btn.classList.remove('bg-amber-600', 'text-white', 'border-amber-600', 'shadow-sm');
        btn.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      }
    });
  }

  attachEventListeners() {
    if (this.rangeSlider) {
      this.rangeSlider.addEventListener('input', (e) => {
        this.setQuantity(e.target.value);
      });
    }

    if (this.numberInput) {
      this.numberInput.addEventListener('input', (e) => {
        this.setQuantity(e.target.value);
      });
    }

    this.presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const kg = parseInt(btn.getAttribute('data-kg'), 10);
        this.setQuantity(kg);
      });
    });

    if (this.addToCartBtn) {
      this.addToCartBtn.addEventListener('click', () => {
        if (window.cartManager) {
          window.cartManager.addItem(this.selectedProduct.id, this.quantity, 1);
          window.cartManager.openDrawer();
          const addressInput = document.getElementById('cart-cust-address');
          if (addressInput && !addressInput.value) {
            setTimeout(() => addressInput.focus(), 350);
          }
        }
      });
    }

    if (this.orderBtn) {
      this.orderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const addressEl = document.getElementById('calc-cust-address');
        const nameEl = document.getElementById('calc-cust-name');
        const phoneEl = document.getElementById('calc-cust-phone');

        const address = (addressEl ? addressEl.value.trim() : '') || localStorage.getItem('rasamuthu_cust_address') || '';
        const name = (nameEl ? nameEl.value.trim() : '') || localStorage.getItem('rasamuthu_cust_name') || '';
        const phone = (phoneEl ? phoneEl.value.trim() : '') || localStorage.getItem('rasamuthu_cust_phone') || '';

        if (!address) {
          if (addressEl) {
            addressEl.focus();
            addressEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            addressEl.classList.add('ring-2', 'ring-red-500', 'border-red-500');
            setTimeout(() => addressEl.classList.remove('ring-2', 'ring-red-500', 'border-red-500'), 4000);
          }
          if (window.cartManager) {
            window.cartManager.showToast('⚠️ කරුණාකර ඔබගේ බෙදාහැරීමේ ලිපිනය (Delivery Address) ඇතුළත් කරන්න!');
          }
          return;
        }

        // Save customer details
        if (name) localStorage.setItem('rasamuthu_cust_name', name);
        if (phone) localStorage.setItem('rasamuthu_cust_phone', phone);
        localStorage.setItem('rasamuthu_cust_address', address);

        const qty = this.quantity;
        const total = qty * this.selectedProduct.pricePerKg;
        const orderId = 'RM-' + Math.floor(1000 + Math.random() * 9000);

        // Record order in rasamuthu_orders for Admin Dashboard
        const newOrder = {
          id: orderId,
          createdAt: new Date().toISOString(),
          customerName: name || 'Customer',
          customerPhone: phone || '',
          deliveryAddress: address,
          deliveryDate: 'හැකි ඉක්මනින් (Prompt Delivery)',
          items: [{
            productId: this.selectedProduct.id,
            fullName: this.selectedProduct.fullName,
            productNameSi: this.selectedProduct.nameSi,
            bagSize: qty,
            quantity: 1,
            pricePerKg: this.selectedProduct.pricePerKg
          }],
          totalWeight: qty,
          totalAmount: total,
          status: 'Pending'
        };

        if (window.RasamuthuDB && typeof window.RasamuthuDB.insertOrder === 'function') {
          window.RasamuthuDB.insertOrder(newOrder);
        } else {
          try {
            const orders = JSON.parse(localStorage.getItem('rasamuthu_orders') || '[]');
            orders.unshift(newOrder);
            localStorage.setItem('rasamuthu_orders', JSON.stringify(orders));
          } catch(err) {}
        }

        let lines = [];
        lines.push('🌾 *රසමුතු Rice Mills - නව සහල් ඇණවුම*');
        lines.push(`🔖 ඇණවුම් අංකය: ${orderId}`);
        lines.push('----------------------------------------');
        lines.push(`👤 පාරිභෝගික නම: ${name || 'නොදන්වා ඇත'}`);
        if (phone) lines.push(`📞 දුරකථන අංකය: ${phone}`);
        lines.push(`📍 බෙදාහැරීමේ ලිපිනය: ${address}`);
        lines.push('----------------------------------------');
        lines.push(`🌾 සහල් වර්ගය: ${this.selectedProduct.fullName}`);
        lines.push(`⚖️ ඇණවුම් ප්‍රමාණය: ${qty} kg`);
        lines.push(`💰 ගෙවිය යුතු මුදල: Rs. ${total.toLocaleString()}`);
        lines.push('');
        lines.push('කරුණාකර ඇණවුම තහවුරු කර Delivery විස්තර ලබා දෙන්න.');

        const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(lines.join('\n'))}`;
        if (window.cartManager) {
          window.cartManager.showToast('✅ ඇණවුම සටහන් විය! WhatsApp විවෘත වේ...');
        }
        window.open(url, '_blank');
      });
    }
  }

  updateCalculation() {
    const qty = this.quantity;
    const baseRate = this.selectedProduct.pricePerKg;
    const total = qty * baseRate;

    // Update UI elements
    if (this.displayVariety) this.displayVariety.textContent = `${this.selectedProduct.nameSi} (${this.selectedProduct.nameEn})`;
    if (this.displayUnitRate) this.displayUnitRate.textContent = `Rs. ${baseRate.toLocaleString()} / kg`;
    if (this.displayQty) this.displayQty.textContent = `${qty} kg`;
    if (this.displaySubtotal) this.displaySubtotal.textContent = `Rs. ${total.toLocaleString()}`;

    // Bulk discount row and banners permanently hidden (no discounts)
    if (this.displayDiscountRow) this.displayDiscountRow.classList.add('hidden');
    if (this.bulkSavingsBanner) this.bulkSavingsBanner.classList.add('hidden');

    if (this.displayTotal) {
      this.displayTotal.textContent = `Rs. ${total.toLocaleString()}`;
    }
  }
}

// ==========================================================================
// 4. Testimonials Slider Logic
// ==========================================================================
class TestimonialsSlider {
  constructor() {
    this.track = document.getElementById('testimonials-track');
    this.prevBtn = document.getElementById('testimonials-prev');
    this.nextBtn = document.getElementById('testimonials-next');
    this.dotsContainer = document.getElementById('testimonials-dots');
    this.currentIndex = 0;
    this.totalSlides = this.track ? this.track.children.length : 3;
    this.autoPlayInterval = null;

    if (!this.track) return;
    this.init();
  }

  init() {
    this.renderDots();
    this.updatePosition();

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prev();
        this.resetAutoPlay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.next();
        this.resetAutoPlay();
      });
    }

    this.startAutoPlay();
  }

  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `h-2.5 rounded-full transition-all duration-300 ${i === this.currentIndex ? 'w-8 bg-amber-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`;
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => {
        this.currentIndex = i;
        this.updatePosition();
        this.resetAutoPlay();
      });
      this.dotsContainer.appendChild(dot);
    }
  }

  updatePosition() {
    if (!this.track) return;
    const offset = -(this.currentIndex * 100);
    this.track.style.transform = `translateX(${offset}%)`;

    // Update dots
    if (this.dotsContainer) {
      const dots = this.dotsContainer.children;
      for (let i = 0; i < dots.length; i++) {
        if (i === this.currentIndex) {
          dots[i].className = 'h-2.5 rounded-full transition-all duration-300 w-8 bg-amber-600';
        } else {
          dots[i].className = 'h-2.5 rounded-full transition-all duration-300 w-2.5 bg-slate-300 hover:bg-slate-400';
        }
      }
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updatePosition();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updatePosition();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.next(), 6000);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }
}

// ==========================================================================
// 5. Product Quick View Modal
// ==========================================================================
function openProductModal(productId) {
  const product = RICE_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const modalContent = document.getElementById('product-modal-content');
  if (!modal || !modalContent) return;

  const defaultQty = 25;
  const whatsappUrl = buildWhatsAppOrderUrl(product.fullName, defaultQty);

  modalContent.innerHTML = `
    <div class="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full border border-amber-100 animate-fadeIn">
      <button onclick="closeProductModal()" class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur transition-colors">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div class="grid md:grid-cols-2">
        <div class="relative h-64 md:h-auto min-h-[260px] bg-slate-900">
          <img src="${product.image}" alt="${product.nameEn}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <span class="absolute top-4 left-4 ${product.badgeColor} text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
            ${product.badge}
          </span>
          <div class="absolute bottom-4 left-4 right-4 text-white">
            <span class="text-xs bg-amber-500/90 text-amber-950 font-bold px-2 py-0.5 rounded">Rs. ${product.pricePerKg} / kg</span>
            <div class="font-sinhala text-xl font-bold mt-1">${product.nameSi}</div>
            <div class="text-xs text-amber-200">${product.nameEn}</div>
          </div>
        </div>

        <div class="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-1.5 text-amber-500 mb-2">
              <i data-lucide="star" class="w-4 h-4 fill-amber-400 text-amber-400"></i>
              <span class="text-sm font-bold text-slate-800">${product.rating}</span>
              <span class="text-xs text-slate-400">(${product.reviewsCount} customer reviews)</span>
            </div>

            <p class="font-sinhala text-sm text-slate-600 leading-relaxed mb-4">
              ${product.description}
            </p>

            <div class="space-y-2 mb-6">
              <div class="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                <span class="text-slate-500 font-medium">Grain Specs:</span>
                <span class="font-semibold text-slate-800">${product.grainLength}</span>
              </div>
              <div class="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                <span class="text-slate-500 font-medium">Cooking Ratio:</span>
                <span class="font-semibold text-slate-800">${product.cookingRatio}</span>
              </div>
              <div class="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                <span class="text-slate-500 font-medium">Purity Guarantee:</span>
                <span class="font-semibold text-emerald-700">${product.purity}</span>
              </div>
              <div class="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                <span class="text-slate-500 font-medium">Available Bags:</span>
                <span class="font-semibold text-slate-800">5kg, 25kg Bags</span>
              </div>
            </div>
          </div>

          <div class="mb-4 pt-3 border-t border-slate-100">
            <div class="text-xs font-bold text-slate-700 mb-2 font-sinhala">පැක් ප්‍රමාණය තෝරා ඇණවුමට එකතු කරන්න:</div>
            <div class="grid grid-cols-2 gap-2.5">
              <button onclick="window.addBagToCart('${product.id}', 5); closeProductModal(); window.openCartDrawer();" class="py-2.5 px-2 text-center bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl text-xs font-bold text-amber-900 transition-colors shadow-xs">
                + 5kg Bag (Rs. ${(product.pricePerKg * 5).toLocaleString()})
              </button>
              <button onclick="window.addBagToCart('${product.id}', 25); closeProductModal(); window.openCartDrawer();" class="py-2.5 px-2 text-center bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl text-xs font-bold text-amber-900 transition-colors shadow-xs">
                + 25kg Bag (Rs. ${(product.pricePerKg * 25).toLocaleString()})
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <button onclick="window.addBagToCart('${product.id}', 25); closeProductModal(); window.openCartDrawer();" class="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 text-xs sm:text-sm font-sinhala">
              <i data-lucide="shopping-bag" class="w-5 h-5"></i>
              <span>ඇණවුම් කරන්න (බෙදාහැරීමේ ලිපිනය එක්කරන්න)</span>
            </button>
            <button onclick="selectProductInCalculator('${product.id}')" class="w-full text-center text-xs font-semibold text-amber-700 hover:text-amber-800 py-1.5 font-sinhala">
              🌾 තොග මිල ගණනය කර බලන්න (Price Calculator)
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

function selectProductInCalculator(productId) {
  closeProductModal();
  if (window.switchOrderTab) {
    window.switchOrderTab('single');
  }
  const prod = RICE_PRODUCTS.find(p => p.id === productId);
  if (prod && window.globalRiceCalculator) {
    window.globalRiceCalculator.setProduct(prod);
    const calcSection = document.getElementById('calculator');
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// ==========================================================================
// 6. Floating WhatsApp Quick-Chat Widget
// ==========================================================================
class WhatsAppWidget {
  constructor() {
    this.button = document.getElementById('whatsapp-widget-toggle');
    this.panel = document.getElementById('whatsapp-widget-panel');
    this.closeBtn = document.getElementById('whatsapp-widget-close');
    this.input = document.getElementById('whatsapp-widget-input');
    this.sendBtn = document.getElementById('whatsapp-widget-send');
    this.promptChips = document.querySelectorAll('.whatsapp-chip-btn');
    this.badge = document.getElementById('whatsapp-ping-badge');

    if (!this.button || !this.panel) return;
    this.init();
  }

  init() {
    this.button.addEventListener('click', () => {
      this.toggle();
      if (this.badge) this.badge.classList.add('hidden');
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => this.sendMessage());
    }

    if (this.input) {
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    this.promptChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const queryText = chip.getAttribute('data-query') || chip.textContent.trim();
        this.openWhatsAppWithQuery(queryText);
      });
    });
  }

  toggle() {
    const isHidden = this.panel.classList.contains('hidden');
    if (isHidden) {
      this.panel.classList.remove('hidden');
      setTimeout(() => this.input && this.input.focus(), 150);
    } else {
      this.panel.classList.add('hidden');
    }
  }

  close() {
    this.panel.classList.add('hidden');
  }

  sendMessage() {
    if (!this.input) return;
    const val = this.input.value.trim();
    if (!val) return;
    this.openWhatsAppWithQuery(val);
    this.input.value = '';
    this.close();
  }

  openWhatsAppWithQuery(text) {
    const defaultGreeting = `හලෝ රසමුතු Rice Mills, ${text}`;
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(defaultGreeting)}`;
    window.open(url, '_blank');
  }
}

// ==========================================================================
// 7. Stat Number Counters on Scroll
// ==========================================================================
function initCounters() {
  const counterElements = document.querySelectorAll('.stat-counter');
  const statsSection = document.getElementById('stats-bar');
  if (!counterElements.length || !statsSection) return;

  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterElements.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 2000;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current).toLocaleString();
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

/**
 * Dynamically synchronizes prices on the storefront cards and matrix
 * with any admin-edited pricePerKg from localStorage
 */
function syncStorefrontPrices() {
  if (!Array.isArray(RICE_PRODUCTS)) return;

  RICE_PRODUCTS.forEach(product => {
    const p5 = product.pricePerKg * 5;
    const p25 = product.pricePerKg * 25;

    // 1. Showcase Card: 05kg Bag Button Price
    const btn5 = document.querySelector(`button[onclick*="addBagToCart('${product.id}', 5)"]`);
    if (btn5) {
      const priceTag = btn5.querySelector('span:nth-child(2)');
      if (priceTag) priceTag.textContent = `Rs. ${p5.toLocaleString()}`;
    }

    // 2. Showcase Card: 25kg Bag Button Price
    const btn25 = document.querySelector(`button[onclick*="addBagToCart('${product.id}', 25)"]`);
    if (btn25) {
      const priceTag = btn25.querySelector('span:nth-child(2)');
      if (priceTag) priceTag.textContent = `Rs. ${p25.toLocaleString()}`;
    }

    // 3. Showcase Card: 1kg Badge
    const detailBtn = document.querySelector(`button[onclick*="openProductModal('${product.id}')"]`);
    if (detailBtn) {
      const card = detailBtn.closest('.group');
      if (card) {
        const rateBadge = card.querySelector('.bg-amber-500');
        if (rateBadge && rateBadge.textContent.includes('/ 1kg')) {
          rateBadge.textContent = `Rs. ${product.pricePerKg} / 1kg`;
        }
      }
    }

    // 4. Multi-Order Matrix: 05kg Stepper Box Price
    const matrixCount5 = document.querySelector(`.matrix-count[data-pid="${product.id}"][data-size="5"]`);
    if (matrixCount5) {
      const box5 = matrixCount5.closest('.matrix-bag-box');
      if (box5) {
        const pLabel = box5.querySelector('.text-amber-700');
        if (pLabel) pLabel.textContent = `Rs. ${p5.toLocaleString()}`;
      }
      const varietyCard = matrixCount5.closest('.rounded-3xl');
      if (varietyCard) {
        const rateTag = varietyCard.querySelector('.bg-amber-100');
        if (rateTag && rateTag.textContent.includes('/ kg')) {
          rateTag.textContent = `Rs. ${product.pricePerKg} / kg`;
        }
      }
    }

    // 5. Multi-Order Matrix: 25kg Stepper Box Price
    const matrixCount25 = document.querySelector(`.matrix-count[data-pid="${product.id}"][data-size="25"]`);
    if (matrixCount25) {
      const box25 = matrixCount25.closest('.matrix-bag-box');
      if (box25) {
        const pLabel = box25.querySelector('.text-amber-700');
        if (pLabel) pLabel.textContent = `Rs. ${p25.toLocaleString()}`;
      }
    }
  });
}

// ==========================================================================
// 8. Multi-Item & Multi-Pack Cart Manager
// ==========================================================================
class CartManager {
  constructor() {
    this.items = []; // { productId, productNameSi, productNameEn, fullName, bagSize, quantity, pricePerKg, image }
    this.drawerEl = document.getElementById('cart-drawer');
    this.backdropEl = document.getElementById('cart-drawer-backdrop');
    this.panelEl = document.getElementById('cart-drawer-panel');
    this.itemsContainer = document.getElementById('cart-drawer-items');
    this.emptyStateEl = document.getElementById('cart-empty-state');
    this.bodyEl = document.getElementById('cart-body');
    this.footerEl = document.getElementById('cart-footer');
    
    // Summary elements
    this.totalWeightEl = document.getElementById('cart-total-weight');
    this.subtotalEl = document.getElementById('cart-subtotal');
    this.discountRowEl = document.getElementById('cart-discount-row');
    this.discountValEl = document.getElementById('cart-discount-val');
    this.finalTotalEl = document.getElementById('cart-final-total');
    this.checkoutBtn = document.getElementById('cart-whatsapp-checkout-btn');
    
    // Badges & Floating bar
    this.badges = document.querySelectorAll('.cart-count-badge');
    this.floatingBar = document.getElementById('mobile-floating-cart-bar');
    this.floatingText = document.getElementById('mobile-floating-cart-text');
    this.floatingTotal = document.getElementById('mobile-floating-cart-total');

    this.init();
  }

  init() {
    try {
      const saved = localStorage.getItem('rasamuthu_cart');
      if (saved) {
        this.items = JSON.parse(saved);
      }
    } catch (e) {
      this.items = [];
    }

    // Attach drawer close events
    const closeBtn = document.getElementById('cart-drawer-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }
    if (this.backdropEl) {
      this.backdropEl.addEventListener('click', () => this.closeDrawer());
    }

    const clearBtn = document.getElementById('cart-clear-all-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clear());
    }

    this.render();
  }

  save() {
    try {
      localStorage.setItem('rasamuthu_cart', JSON.stringify(this.items));
    } catch(e) {}
  }

  addItem(productId, bagSize, quantity = 1) {
    const product = RICE_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    bagSize = parseInt(bagSize, 10);
    quantity = parseInt(quantity, 10) || 1;

    const existingIndex = this.items.findIndex(item => item.productId === productId && item.bagSize === bagSize);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        productId,
        productNameSi: product.nameSi,
        productNameEn: product.nameEn,
        fullName: product.fullName,
        bagSize,
        quantity,
        pricePerKg: product.pricePerKg,
        image: product.image
      });
    }

    this.save();
    this.render();
    this.triggerBadgeAnimation();
    this.showToast(`🌾 ${product.nameSi} (${bagSize}kg x ${quantity}) ඇණවුමට එකතු විය!`);
  }

  updateQty(productId, bagSize, delta) {
    bagSize = parseInt(bagSize, 10);
    const item = this.items.find(i => i.productId === productId && i.bagSize === bagSize);
    if (!item) {
      if (delta > 0) {
        this.addItem(productId, bagSize, delta);
      }
      return;
    }

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.items = this.items.filter(i => !(i.productId === productId && i.bagSize === bagSize));
    }

    this.save();
    this.render();
  }

  removeItem(productId, bagSize) {
    bagSize = parseInt(bagSize, 10);
    this.items = this.items.filter(i => !(i.productId === productId && i.bagSize === bagSize));
    this.save();
    this.render();
  }

  clear() {
    this.items = [];
    this.save();
    this.render();
  }

  getTotalItemsCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalWeight() {
    return this.items.reduce((sum, item) => sum + (item.bagSize * item.quantity), 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.bagSize * item.quantity * item.pricePerKg), 0);
  }

  getDiscountInfo() {
    const subtotal = this.getSubtotal();
    return { percent: 0, label: '', amount: 0, netTotal: subtotal };
  }

  saveOrderToStorage(customerData) {
    const totalWeight = this.getTotalWeight();
    const totalAmount = this.getSubtotal();
    const orderId = 'RM-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName: customerData.name || 'Customer',
      customerPhone: customerData.phone || '',
      deliveryAddress: customerData.address || '',
      deliveryDate: customerData.deliveryDate || '',
      items: JSON.parse(JSON.stringify(this.items)),
      totalWeight,
      totalAmount,
      status: 'Pending'
    };

    if (window.RasamuthuDB && typeof window.RasamuthuDB.insertOrder === 'function') {
      window.RasamuthuDB.insertOrder(newOrder);
    } else {
      try {
        const orders = JSON.parse(localStorage.getItem('rasamuthu_orders') || '[]');
        orders.unshift(newOrder);
        localStorage.setItem('rasamuthu_orders', JSON.stringify(orders));
      } catch (e) {
        console.error(e);
      }
    }
    return newOrder;
  }

  handleCheckout(source = 'drawer') {
    if (this.items.length === 0) {
      this.showToast('⚠️ කරුණාකර අවම වශයෙන් එක් සහල් වර්ගයක් හෝ තෝරන්න!');
      return;
    }

    let nameEl, phoneEl, addressEl, dateEl;
    if (source === 'matrix') {
      nameEl = document.getElementById('matrix-cust-name');
      phoneEl = document.getElementById('matrix-cust-phone');
      addressEl = document.getElementById('matrix-cust-address');
      dateEl = document.getElementById('matrix-cust-date');
    } else {
      nameEl = document.getElementById('cart-cust-name');
      phoneEl = document.getElementById('cart-cust-phone');
      addressEl = document.getElementById('cart-cust-address');
      dateEl = document.getElementById('cart-cust-date');
    }

    const name = (nameEl ? nameEl.value.trim() : '') || localStorage.getItem('rasamuthu_cust_name') || '';
    const phone = (phoneEl ? phoneEl.value.trim() : '') || localStorage.getItem('rasamuthu_cust_phone') || '';
    const address = (addressEl ? addressEl.value.trim() : '') || localStorage.getItem('rasamuthu_cust_address') || '';
    const deliveryDate = (dateEl && dateEl.value) ? dateEl.value : 'හැකි ඉක්මනින් (Prompt Delivery)';

    if (!address) {
      if (addressEl) {
        addressEl.focus();
        addressEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        addressEl.classList.add('ring-2', 'ring-red-500', 'border-red-500');
        setTimeout(() => addressEl.classList.remove('ring-2', 'ring-red-500', 'border-red-500'), 4000);
      }
      this.showToast('⚠️ කරුණාකර ඔබගේ බෙදාහැරීමේ ලිපිනය (Delivery Address) ඇතුළත් කරන්න!');
      return;
    }

    // Save details to localStorage
    if (name) localStorage.setItem('rasamuthu_cust_name', name);
    if (phone) localStorage.setItem('rasamuthu_cust_phone', phone);
    localStorage.setItem('rasamuthu_cust_address', address);

    const customerData = { name, phone, address, deliveryDate };
    const savedOrder = this.saveOrderToStorage(customerData);

    const totalWeight = this.getTotalWeight();
    const totalAmount = this.getSubtotal();

    let lines = [];
    lines.push('🌾 *රසමුතු Rice Mills - නව සහල් ඇණවුම*');
    lines.push(`🔖 ඇණවුම් අංකය: ${savedOrder ? savedOrder.id : 'RM-ORDER'}`);
    lines.push('----------------------------------------');
    lines.push(`👤 පාරිභෝගික නම: ${name || 'නොදන්වා ඇත'}`);
    if (phone) lines.push(`📞 දුරකථන අංකය: ${phone}`);
    lines.push(`📍 බෙදාහැරීමේ ලිපිනය: ${address}`);
    lines.push(`📅 අවශ්‍ය දිනය: ${deliveryDate}`);
    lines.push('----------------------------------------');
    lines.push('*තෝරාගත් සහල් ලැයිස්තුව:*');

    this.items.forEach((item, idx) => {
      const itemTotal = item.bagSize * item.quantity * item.pricePerKg;
      lines.push(`${idx + 1}. ${item.fullName}`);
      lines.push(`   • ඇසුරුම: ${item.bagSize}kg x බෑග් ${item.quantity} = ${item.bagSize * item.quantity}kg (Rs. ${itemTotal.toLocaleString()})`);
    });

    lines.push('----------------------------------------');
    lines.push(`🌾 මුළු බර: ${totalWeight} kg`);
    lines.push(`💰 ගෙවිය යුතු මුළු මුදල: Rs. ${totalAmount.toLocaleString()}`);
    lines.push('');
    lines.push('කරුණාකර ඇණවුම තහවුරු කර Delivery විස්තර ලබා දෙන්න.');

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(lines.join('\n'))}`;

    this.showToast('✅ ඇණවුම සටහන් විය! WhatsApp විවෘත වේ...');
    window.open(whatsappUrl, '_blank');
    this.clear();
    this.closeDrawer();
  }

  generateWhatsAppUrl() {
    return '#';
  }

  render() {
    const totalCount = this.getTotalItemsCount();
    const totalWeight = this.getTotalWeight();
    const subtotal = this.getSubtotal();

    // Update Badges across desktop nav & mobile bottom bar
    this.badges.forEach(b => {
      b.textContent = totalCount;
      if (totalCount > 0) {
        b.classList.remove('hidden');
      } else {
        b.classList.add('hidden');
      }
    });

    // Update Mobile Floating Cart Pill
    if (this.floatingBar) {
      if (totalCount > 0) {
        this.floatingBar.classList.remove('translate-y-28', 'opacity-0');
        this.floatingBar.classList.add('translate-y-0', 'opacity-100');
        if (this.floatingText) this.floatingText.textContent = `${totalCount} Bags (${totalWeight}kg)`;
        if (this.floatingTotal) this.floatingTotal.textContent = `Rs. ${subtotal.toLocaleString()}`;
      } else {
        this.floatingBar.classList.add('translate-y-28', 'opacity-0');
        this.floatingBar.classList.remove('translate-y-0', 'opacity-100');
      }
    }

    // Update Drawer Elements
    if (!this.itemsContainer) return;

    if (this.items.length === 0) {
      if (this.emptyStateEl) this.emptyStateEl.classList.remove('hidden');
      if (this.bodyEl) this.bodyEl.classList.add('hidden');
      if (this.footerEl) this.footerEl.classList.add('hidden');
      this.itemsContainer.innerHTML = '';
      return;
    }

    if (this.emptyStateEl) this.emptyStateEl.classList.add('hidden');
    if (this.bodyEl) this.bodyEl.classList.remove('hidden');
    if (this.footerEl) this.footerEl.classList.remove('hidden');

    this.itemsContainer.innerHTML = this.items.map(item => {
      const bagPrice = item.bagSize * item.pricePerKg;
      const rowTotal = bagPrice * item.quantity;
      return `
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-3">
          <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
            <img src="${item.image}" alt="${item.productNameEn}" class="w-full h-full object-cover">
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-sinhala font-bold text-xs sm:text-sm text-slate-900 truncate">${item.productNameSi}</div>
            <div class="text-[11px] text-slate-500 font-medium">${item.bagSize}kg Bag (Rs. ${bagPrice.toLocaleString()})</div>
            <div class="text-xs font-bold text-amber-700 mt-0.5">Rs. ${rowTotal.toLocaleString()}</div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <div class="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
              <button onclick="window.cartManager.updateQty('${item.productId}', ${item.bagSize}, -1)" class="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors qty-stepper-btn">
                -
              </button>
              <span class="w-7 text-center font-bold text-xs text-slate-800">${item.quantity}</span>
              <button onclick="window.cartManager.updateQty('${item.productId}', ${item.bagSize}, 1)" class="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors qty-stepper-btn">
                +
              </button>
            </div>
            <button onclick="window.cartManager.removeItem('${item.productId}', ${item.bagSize})" class="p-1.5 text-slate-400 hover:text-red-500 transition-colors" title="Remove Item">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Update Summary
    if (this.totalWeightEl) this.totalWeightEl.textContent = `${totalWeight} kg`;
    if (this.subtotalEl) this.subtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;

    // Discounts are permanently removed
    if (this.discountRowEl) this.discountRowEl.classList.add('hidden');

    if (this.finalTotalEl) this.finalTotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;

    if (this.checkoutBtn) {
      this.checkoutBtn.onclick = (e) => {
        e.preventDefault();
        this.handleCheckout('drawer');
      };
    }

    // Update On-Page Multi-Order Builder Elements
    const multiSummaryContainer = document.getElementById('multi-summary-items');
    const multiWeightEl = document.getElementById('multi-total-weight');
    const multiSubtotalEl = document.getElementById('multi-subtotal');
    const multiDiscountRow = document.getElementById('multi-discount-row');
    const multiFinalTotal = document.getElementById('multi-final-total');
    const multiWhatsAppBtn = document.getElementById('multi-whatsapp-checkout-btn');

    if (multiSummaryContainer) {
      if (this.items.length === 0) {
        multiSummaryContainer.innerHTML = `
          <div class="py-6 text-center text-slate-400 text-xs font-sinhala leading-relaxed">
            <i data-lucide="package-plus" class="w-7 h-7 mx-auto mb-2 text-slate-500 opacity-60"></i>
            ඔබ තවමත් සහල් වර්ග තෝරාගෙන නැත.<br>වම්පස ඇති 5kg හෝ 25kg බෑග් වල <b class="text-amber-400">+</b> බොත්තම ඔබන්න.
          </div>
        `;
      } else {
        multiSummaryContainer.innerHTML = this.items.map((item, idx) => {
          const itemTotal = item.bagSize * item.quantity * item.pricePerKg;
          return `
            <div class="flex items-center justify-between text-xs py-2 border-b border-white/10 gap-2">
              <div class="min-w-0">
                <div class="font-bold text-amber-300 font-sinhala truncate">${idx + 1}. ${item.productNameSi}</div>
                <div class="text-[11px] text-slate-400 font-medium">${item.bagSize}kg x බෑග් ${item.quantity} (${item.bagSize * item.quantity}kg)</div>
              </div>
              <div class="text-right shrink-0">
                <div class="font-bold text-slate-200">Rs. ${itemTotal.toLocaleString()}</div>
                <button type="button" onclick="window.cartManager.removeItem('${item.productId}', ${item.bagSize})" class="text-[10px] text-red-400 hover:text-red-300 underline">ඉවත් කරන්න</button>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    if (multiWeightEl) multiWeightEl.textContent = `${totalWeight} kg`;
    if (multiSubtotalEl) multiSubtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
    if (multiDiscountRow) multiDiscountRow.classList.add('hidden');
    if (multiFinalTotal) multiFinalTotal.textContent = `Rs. ${subtotal.toLocaleString()}`;

    if (multiWhatsAppBtn) {
      multiWhatsAppBtn.onclick = (e) => {
        e.preventDefault();
        this.handleCheckout('matrix');
      };
    }

    // Update all .matrix-count on page
    document.querySelectorAll('.matrix-count').forEach(span => {
      const pid = span.getAttribute('data-pid');
      const size = parseInt(span.getAttribute('data-size'), 10);
      const found = this.items.find(i => i.productId === pid && i.bagSize === size);
      const qty = found ? found.quantity : 0;
      span.textContent = qty;
      const box = span.closest('.matrix-bag-box');
      if (box) {
        if (qty > 0) {
          box.classList.add('bg-amber-100', 'border-amber-500', 'ring-1', 'ring-amber-500/30');
          box.classList.remove('bg-white', 'border-slate-200');
        } else {
          box.classList.remove('bg-amber-100', 'border-amber-500', 'ring-1', 'ring-amber-500/30');
          box.classList.add('bg-white', 'border-slate-200');
        }
      }
    });

    if (window.lucide) lucide.createIcons();
  }

  openDrawer() {
    if (!this.drawerEl) return;
    this.drawerEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (this.backdropEl) this.backdropEl.classList.remove('opacity-0');
      if (this.panelEl) this.panelEl.classList.remove('translate-x-full');
    }, 15);
  }

  closeDrawer() {
    if (!this.drawerEl) return;
    if (this.backdropEl) this.backdropEl.classList.add('opacity-0');
    if (this.panelEl) this.panelEl.classList.add('translate-x-full');
    setTimeout(() => {
      this.drawerEl.classList.add('hidden');
      document.body.style.overflow = '';
    }, 320);
  }

  triggerBadgeAnimation() {
    this.badges.forEach(b => {
      b.classList.add('animate-badge-bounce');
      setTimeout(() => b.classList.remove('animate-badge-bounce'), 400);
    });
  }

  showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/40 text-xs sm:text-sm font-bold flex items-center gap-3 backdrop-blur-md animate-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <i data-lucide="check-circle" class="w-5 h-5 text-emerald-400 shrink-0"></i>
      <span class="font-sinhala">${message}</span>
    `;
    if (window.lucide) lucide.createIcons();
    toast.style.display = 'flex';
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.style.display = 'none';
    }, 3200);
  }
}

// ==========================================================================
// 9. Mobile Navigation Drawer & Smooth Scrolling
// ==========================================================================
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-menu-close');
  const navLinks = document.querySelectorAll('.nav-link-item');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  // Header scroll shadow toggle
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('shadow-md', 'bg-white/95');
      header.classList.remove('bg-[#FAF8F5]/85');
    } else {
      header.classList.remove('shadow-md', 'bg-white/95');
      header.classList.add('bg-[#FAF8F5]/85');
    }
  });
}

// ==========================================================================
// 10. Multi-Order vs Single Calculator Tabs
// ==========================================================================
function initOrderTabs() {
  const btnMulti = document.getElementById('tab-btn-multi');
  const btnSingle = document.getElementById('tab-btn-single');
  const tabMulti = document.getElementById('order-tab-multi');
  const tabSingle = document.getElementById('order-tab-single');

  if (!btnMulti || !btnSingle || !tabMulti || !tabSingle) return;

  function switchTab(mode) {
    if (mode === 'multi') {
      btnMulti.classList.add('bg-amber-600', 'text-white', 'shadow-md');
      btnMulti.classList.remove('text-slate-700', 'hover:text-slate-900', 'bg-transparent');
      btnSingle.classList.remove('bg-amber-600', 'text-white', 'shadow-md');
      btnSingle.classList.add('text-slate-700', 'hover:text-slate-900', 'bg-transparent');

      tabMulti.classList.remove('hidden');
      tabSingle.classList.add('hidden');
    } else {
      btnSingle.classList.add('bg-amber-600', 'text-white', 'shadow-md');
      btnSingle.classList.remove('text-slate-700', 'hover:text-slate-900', 'bg-transparent');
      btnMulti.classList.remove('bg-amber-600', 'text-white', 'shadow-md');
      btnMulti.classList.add('text-slate-700', 'hover:text-slate-900', 'bg-transparent');

      tabSingle.classList.remove('hidden');
      tabMulti.classList.add('hidden');
    }
  }

  btnMulti.addEventListener('click', () => switchTab('multi'));
  btnSingle.addEventListener('click', () => switchTab('single'));

  window.switchOrderTab = switchTab;
}

// ==========================================================================
// 11. Customer Details & Delivery Address Synchronizer
// ==========================================================================
function initCustomerInputsSync() {
  const nameFields = [
    document.getElementById('cart-cust-name'),
    document.getElementById('matrix-cust-name'),
    document.getElementById('calc-cust-name')
  ].filter(Boolean);

  const phoneFields = [
    document.getElementById('cart-cust-phone'),
    document.getElementById('matrix-cust-phone'),
    document.getElementById('calc-cust-phone')
  ].filter(Boolean);

  const addressFields = [
    document.getElementById('cart-cust-address'),
    document.getElementById('matrix-cust-address'),
    document.getElementById('calc-cust-address')
  ].filter(Boolean);

  const dateFields = [
    document.getElementById('cart-cust-date'),
    document.getElementById('matrix-cust-date')
  ].filter(Boolean);

  // Restore saved details from localStorage
  const savedName = localStorage.getItem('rasamuthu_cust_name') || '';
  const savedPhone = localStorage.getItem('rasamuthu_cust_phone') || '';
  const savedAddress = localStorage.getItem('rasamuthu_cust_address') || '';

  if (savedName) nameFields.forEach(f => { if (!f.value) f.value = savedName; });
  if (savedPhone) phoneFields.forEach(f => { if (!f.value) f.value = savedPhone; });
  if (savedAddress) addressFields.forEach(f => { if (!f.value) f.value = savedAddress; });

  // Two-way synchronization on input
  nameFields.forEach(f => {
    f.addEventListener('input', (e) => {
      const val = e.target.value;
      localStorage.setItem('rasamuthu_cust_name', val);
      nameFields.forEach(other => { if (other !== e.target) other.value = val; });
    });
  });

  phoneFields.forEach(f => {
    f.addEventListener('input', (e) => {
      const val = e.target.value;
      localStorage.setItem('rasamuthu_cust_phone', val);
      phoneFields.forEach(other => { if (other !== e.target) other.value = val; });
    });
  });

  addressFields.forEach(f => {
    f.addEventListener('input', (e) => {
      const val = e.target.value;
      localStorage.setItem('rasamuthu_cust_address', val);
      addressFields.forEach(other => { if (other !== e.target) other.value = val; });
    });
  });

  dateFields.forEach(f => {
    f.addEventListener('input', (e) => {
      const val = e.target.value;
      dateFields.forEach(other => { if (other !== e.target) other.value = val; });
    });
  });
}

// ==========================================================================
// 12. Document Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Floating Rice Grains Particle System
  new RiceGrainsCanvas('rice-canvas');

  // Interactive Rice Quantity & Price Calculator
  window.globalRiceCalculator = new RiceCalculator();

  // Multi-Item & Multi-Pack Cart Manager
  window.cartManager = new CartManager();

  // Testimonials Slider
  new TestimonialsSlider();

  // Floating WhatsApp Quick-Chat Widget
  new WhatsAppWidget();

  // Stat Counters
  initCounters();

  // Dynamic Price Synchronization (Local Cache)
  syncStorefrontPrices();

  // Cloud Price Synchronization from Supabase Database
  if (window.RasamuthuDB && typeof window.RasamuthuDB.getProducts === 'function') {
    window.RasamuthuDB.getProducts().then(products => {
      if (Array.isArray(products) && products.length > 0) {
        products.forEach(p => {
          const target = RICE_PRODUCTS.find(rp => rp.id === p.id);
          if (target) {
            target.pricePerKg = p.pricePerKg;
            target.inStock = p.inStock;
          }
        });
        syncStorefrontPrices();
        if (window.globalRiceCalculator) {
          window.globalRiceCalculator.updateSummary();
        }
      }
    }).catch(err => console.warn('Supabase products fetch warning:', err));
  }

  // Customer Details & Delivery Address Sync
  initCustomerInputsSync();

  // Mobile Navigation
  initNavigation();

  // Order Tabs Initialization
  initOrderTabs();

  // Global helper functions
  window.addBagToCart = (productId, bagSize) => {
    if (window.cartManager) {
      window.cartManager.addItem(productId, bagSize, 1);
    }
  };
  window.updateMatrixQty = (productId, bagSize, delta) => {
    if (window.cartManager) {
      window.cartManager.updateQty(productId, bagSize, delta);
    }
  };
  window.openCartDrawer = () => {
    if (window.cartManager) {
      window.cartManager.openDrawer();
    }
  };
  window.closeCartDrawer = () => {
    if (window.cartManager) {
      window.cartManager.closeDrawer();
    }
  };

  // Expose modal functions to window
  window.openProductModal = openProductModal;
  window.closeProductModal = closeProductModal;
  window.selectProductInCalculator = selectProductInCalculator;
});
