# රසමුතු Rice Mills (Rasamuthu Rice Mills) - Official Website & Admin Portal

A world-class, responsive, conversion-optimized, and animation-rich modern e-commerce and landing page website crafted for **රසමුතු Rice Mills** (Sri Lanka), architected for **GitHub Pages hosting** with **Supabase Cloud Database (PostgreSQL)** integration.

- **Mill Address**: රසමුතු Rice Mills, වේදිනිගම, කුඩා කත්නෝරුව, මීගලෑව
- **Official WhatsApp Hotline**: +94 76 713 6323 (`076 713 6323`)
- **Packaging Standards**: **05kg Bag & 25kg Bag ONLY** (No 10kg or 50kg bags)
- **Deployment Platform**: **GitHub Pages** (100% static, client-side, $0 hosting cost)
- **Database Engine**: **Supabase Cloud (PostgreSQL)** with offline LocalStorage fallback

---

## 🌾 Highlights & Features

1. **Brand Identity & Streamlined Navigation**:
   - Distinctive brand logo with glowing hover aura and authentic rice sheaf emblem.
   - Clean top navigation bar with direct links: `Home`, `Our Products`, `Price Calculator`, `Contact`, `ඇණවුම (Cart)`, `WhatsApp`, and `Admin Portal`.
   - Mobile navigation drawer and sticky bottom app navigation bar.

2. **Authentic High-Resolution Product Images**:
   - Custom-branded burlap sack photography for all 4 core Sri Lankan rice varieties:
     - **සුදු කැකුළු (White Raw Rice)** (`images/sudu-kakulu.jpg`) - *100% Organic*
     - **සුදු සම්බා කැකුළු (White Samba Raw Rice)** (`images/sudu-samba.jpg`) - *Family Favorite*
     - **කීරි සම්බා කැකුළු (Keeri Samba Raw Rice)** (`images/keeri-samba.jpg`) - *Best Seller ⭐*
     - **බාස්මති කැකුළු සහල් (Basmati Raw Rice)** (`images/basmati.jpg`) - *Royal Premium*

3. **05kg & 25kg Bags Only**:
   - Every product card offers 1-tap `+ 05kg Bag` and `+ 25kg Bag` buttons with calculated prices.
   - Multi-Variety Order Matrix with 2-column steppers for 05kg and 25kg bags.
   - Price Calculator presets configured for 05kg and 25kg packages.

4. **Dedicated Customer Delivery Address Entry**:
   - Full delivery address (`බෙදාහැරීමේ ලිපිනය`) inputs and validation in Cart Drawer, Multi-Variety Matrix checkout, Price Calculator, and Contact forms.
   - Real-time synchronization across all inputs and local cache persistence.

5. **⚡ Supabase Cloud Database Integration**:
   - **Cloud Orders Storage**: Every order placed by a customer automatically saves into Supabase `orders` table.
   - **Dynamic Price Synchronization**: Rice prices updated in the Admin Dashboard sync to Supabase `products` table and reflect across the storefront instantly.
   - **Real-time Live Orders**: Supabase Realtime channel pushes incoming customer orders directly to the Admin Dashboard without needing page refreshes.
   - **Offline-Safe Graceful Fallback**: If Supabase credentials are not yet entered or network is offline, the site functions seamlessly on `localStorage`.

6. **🔐 Admin Dashboard (`admin.html`)**:
   - **PIN-Protected Access**: Protected with an admin PIN (Default PIN: `1234`), change PIN functionality built-in.
   - **Overview KPIs**: Total orders count, total revenue in Rs., total volume sold in kg, and active in-stock varieties.
   - **Products Management**: Edit base `pricePerKg` for all 4 varieties. 05kg and 25kg bag prices auto-calculate in real time and sync instantly to the cloud. Toggle stock availability (In Stock / Out of Stock).
   - **Orders Management**: View, search, and filter orders (`Pending`, `Confirmed`, `Delivered`, `Cancelled`). Includes 1-tap customer call and WhatsApp dispatch, printable invoice/receipt modal, CSV export, and a test demo order generator.
   - **Supabase Cloud Manager**: 1-click test connection, sync local orders to cloud, and live status badge (`🟢 Supabase Cloud` / `🟡 Local Mode`).

7. **Interactive Visuals & UX**:
   - Floating HTML5 Canvas rice particle physics with golden and pearl-white grains.
   - Floating WhatsApp quick-chat widget with pre-configured Sinhala inquiry chips.
   - Slide-over order cart drawer with customer address/date entry and direct WhatsApp ordering.

---

## 🚀 Quick Setup & Deployment Guides

- **Supabase Cloud Setup**: Follow the complete guide in [SUPABASE_SETUP.md](SUPABASE_SETUP.md) to set up tables and API keys.
- **GitHub Pages Deployment**: Follow the step-by-step guide in [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) to push code and activate GitHub Pages.

---

## 📁 File Structure

```text
c:/Users/MCM/Desktop/new website/
├── index.html            # Main customer storefront & ordering portal
├── admin.html            # Admin Dashboard interface
├── admin.js              # Admin logic, PIN gate, Supabase sync, orders table
├── app.js                # Rice particle canvas, price sync, cart manager, modals
├── style.css             # Custom styling, animations, range slider styles
├── supabaseClient.js     # Unified Supabase DB persistence layer & realtime events
├── supabaseConfig.js     # Supabase Project URL & Anon Public Key configuration
├── supabase_schema.sql   # PostgreSQL table schemas, RLS security policies & seed data
├── .nojekyll             # Bypasses Jekyll on GitHub Pages
├── SUPABASE_SETUP.md     # Step-by-step Supabase database configuration guide
├── DEPLOYMENT_GUIDE.md   # GitHub Pages deployment instructions
├── images/               # Authentic burlap rice sack photography
│   ├── sudu-kakulu.jpg
│   ├── sudu-samba.jpg
│   ├── keeri-samba.jpg
│   └── basmati.jpg
└── README.md             # Project documentation
```
