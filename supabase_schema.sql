-- =============================================================================
-- රසමුතු Rice Mills (Rasamuthu Rice Mills) - Supabase Cloud Database Schema
-- Run this entire script in Supabase Dashboard -> SQL Editor -> Click 'Run'
-- =============================================================================

-- 1. Create 'products' Table (සහල් වර්ග සහ මිල ගණන්)
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name_si TEXT NOT NULL,
    name_en TEXT NOT NULL,
    price_per_kg NUMERIC NOT NULL,
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    image TEXT,
    badge TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create 'orders' Table (පාරිභෝගික ඇණවුම් සහ බෙදාහැරීමේ ලිපින)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    customer_name TEXT,
    customer_phone TEXT,
    delivery_address TEXT,
    delivery_date TEXT,
    notes TEXT,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_weight NUMERIC NOT NULL DEFAULT 0,
    total_amount NUMERIC NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'Pending'
);

-- 3. Create 'settings' Table (මෝලේ සැකසුම් - Hotline, Address ආදිය)
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- Row Level Security (RLS) Configuration
-- Allows the static GitHub Pages website to read/write with the Anon Public Key
-- =============================================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Public can view products" ON public.products;
DROP POLICY IF EXISTS "Anon can update products" ON public.products;
DROP POLICY IF EXISTS "Anon can insert products" ON public.products;

DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Public can view orders" ON public.orders;
DROP POLICY IF EXISTS "Anon can update orders" ON public.orders;
DROP POLICY IF EXISTS "Anon can delete orders" ON public.orders;

DROP POLICY IF EXISTS "Public can view settings" ON public.settings;
DROP POLICY IF EXISTS "Anon can update settings" ON public.settings;
DROP POLICY IF EXISTS "Anon can insert settings" ON public.settings;

-- Products Policies: Public read, Anon write (for Admin dashboard)
CREATE POLICY "Public can view products" ON public.products
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anon can update products" ON public.products
    FOR UPDATE TO anon, authenticated USING (true);

CREATE POLICY "Anon can insert products" ON public.products
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Orders Policies: Anyone can place an order (INSERT), Admin can read/update/delete
CREATE POLICY "Public can insert orders" ON public.orders
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Public can view orders" ON public.orders
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anon can update orders" ON public.orders
    FOR UPDATE TO anon, authenticated USING (true);

CREATE POLICY "Anon can delete orders" ON public.orders
    FOR DELETE TO anon, authenticated USING (true);

-- Settings Policies: Public read, Anon update
CREATE POLICY "Public can view settings" ON public.settings
    FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anon can update settings" ON public.settings
    FOR UPDATE TO anon, authenticated USING (true);

CREATE POLICY "Anon can insert settings" ON public.settings
    FOR INSERT TO anon, authenticated WITH CHECK (true);

-- =============================================================================
-- Realtime Subscriptions (Live sync when customer orders)
-- =============================================================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'orders'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' AND tablename = 'products'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
    END IF;
END $$;

-- =============================================================================
-- Seed Initial Data (පෙරනිමි සහල් වර්ග සහ සැකසුම්)
-- =============================================================================

INSERT INTO public.products (id, name_si, name_en, price_per_kg, in_stock, image, badge)
VALUES
    ('sudu-kakulu', 'සුදු කැකුළු', 'White Raw Rice', 220, true, 'images/sudu-kakulu.jpg', '100% Organic'),
    ('sudu-samba', 'සුදු සම්බා කැකුළු', 'White Samba Raw Rice', 240, true, 'images/sudu-samba.jpg', 'Family Favorite'),
    ('keeri-samba', 'කීරි සම්බා කැකුළු', 'Keeri Samba Raw Rice', 310, true, 'images/keeri-samba.jpg', 'Best Seller ⭐'),
    ('basmati', 'බාස්මති කැකුළු සහල්', 'Basmati Raw Rice', 340, true, 'images/basmati.jpg', 'Royal Premium')
ON CONFLICT (id) DO UPDATE SET
    name_si = EXCLUDED.name_si,
    name_en = EXCLUDED.name_en,
    image = EXCLUDED.image,
    badge = EXCLUDED.badge;

INSERT INTO public.settings (key, value)
VALUES
    ('hotline', '94767136323'),
    ('mill_address', 'රසමුතු Rice Mills, වේදිනිගම, කුඩා කත්නෝරුව, මීගලෑව'),
    ('admin_pin', '1234')
ON CONFLICT (key) DO NOTHING;
