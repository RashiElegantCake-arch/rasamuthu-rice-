# රසමුතු Rice Mills - Supabase Cloud Database Setup Guide
# (පියවරෙන් පියවර Supabase Database සැකසුම් මාර්ගෝපදේශය)

මෙම වෙබ් අඩවිය GitHub Pages හරහා Host කරන විට කිසිදු backend server එකක් (Node/PHP/Python) අවශ්‍ය නොවී, **Supabase Cloud (PostgreSQL)** සමඟ සෘජුවම සම්බන්ධ වී දත්ත සුරැකීමට හැකි වන පරිදි සකස් කර ඇත.

---

## 📌 අවශ්‍ය වන පියවර 4 (Summary of 4 Steps):

```text
1. supabase.com හි Project එකක් සාදන්න
   ↓
2. supabase_schema.sql Run කරන්න (Tables & RLS Policies නිර්මාණය)
   ↓
3. Project URL & Anon Public Key ලබාගන්න
   ↓
4. Admin Dashboard හෝ supabaseConfig.js හරහා සම්බන්ධ කරන්න
```

---

## 🚀 පියවර 1: Supabase ගිණුමක් සහ Project එකක් සෑදීම
1. [https://supabase.com](https://supabase.com) වෙත පිවිසෙන්න.
2. **"Start your project"** හෝ **"Sign In"** ක්ලික් කර ඔබගේ GitHub ගිණුමෙන් හෝ Email එකෙන් නොමිලේ ලියාපදිංචි වන්න.
3. **"New Project"** බොත්තම ක්ලික් කරන්න.
4. පහත විස්තර ඇතුළත් කරන්න:
   - **Name**: `rasamuthu-rice`
   - **Database Password**: ශක්තිමත් මුරපදයක් ලබා දී එය සටහන් කර තබා ගන්න.
   - **Region**: `Singapore (ap-southeast-1)` හෝ ශ්‍රී ලංකාවට ආසන්නතම කලාපය තෝරන්න.
   - **Pricing Plan**: **Free Plan** ($0 / month).
5. **"Create new project"** ක්ලික් කර විනාඩි 1-2ක් Project එක setup වන තෙක් රැඳී සිටින්න.

---

## 💾 පියවර 2: Database Schema එක Run කිරීම
1. Supabase වම්පස මෙනුවේ ඇති **"SQL Editor"** (ටැබ්ලට්/කේත අයිකනය) ක්ලික් කරන්න.
2. **"New query"** ක්ලික් කරන්න.
3. මෙම ව්‍යාපෘතියේ ඇති **`supabase_schema.sql`** ගොනුව විවෘත කර එහි ඇති සම්පූර්ණ SQL කේතය පිටපත් (Copy) කර Supabase SQL Editor එකට Paste කරන්න.
4. පහළ දකුණු කෙළවරේ ඇති **"Run"** (කොළ පැහැති බොත්තම) ක්ලික් කරන්න.
5. සාර්ථකව ක්‍රියාත්මක වූ පසු `Success. No rows returned` යන පණිවිඩය දිස්වේ.
   - දැන් ඔබගේ Supabase හි `products`, `orders`, සහ `settings` යන වගු 3ම නිර්මාණය වී ඇත.
   - පාරිභෝගිකයින්ට Login වීමකින් තොරව ඇණවුම් ඇතුළත් කිරීමට සහ Admin හට ඒවා පාලනය කිරීමට අවශ්‍ය ආරක්ෂිත **RLS (Row Level Security)** නීති ස්වයංක්‍රීයව සක්‍රීය වේ.

---

## 🔑 පියවර 3: API Keys ලබා ගැනීම
1. Supabase වම්පස මෙනුවේ පහළින් ඇති **"Project Settings"** (⚙️ අයිකනය) ක්ලික් කරන්න.
2. **"API"** මෙනුව තෝරන්න.
3. එහි ඇති පහත අගයන් 2 පිටපත් (Copy) කර ගන්න:
   - **Project URL**: (උදා: `https://abcdefghijklmnop.supabase.co`)
   - **Project API Keys** යටතේ ඇති **`anon` `public`** key එක (දිගු code එකක්).
   *(⚠️ වැදගත්: කිසිවිටෙක `service_role` secret key එක Frontend එකට ලබා නොදෙන්න. `anon` key එක පමණක් භාවිතා කරන්න).*

---

## ⚙️ පියවර 4: වෙබ් අඩවියට Supabase සම්බන්ධ කිරීම (ක්‍රම 2ක් ඇත)

### ක්‍රමය A: Admin Dashboard හරහා (වඩාත් පහසුම ක්‍රමය - 1-Click UI)
1. ඔබගේ වෙබ් අඩවියේ Admin Portal එකට පිවිසෙන්න (`admin.html` - Default PIN: **`1234`**).
2. ඉහළ මෙනුවේ **"සැකසුම් (Settings)"** ටැබ් එක වෙත යන්න.
3. **"⚡ Supabase Cloud Database සැකසුම්"** කොටස වෙත යන්න.
4. පියවර 3 දී ලබාගත් **Project URL** සහ **anon key** කොටු 2ට Paste කරන්න.
5. **"සම්බන්ධ කරන්න (Test & Connect)"** ක්ලික් කරන්න.
   - සාර්ථක වූ විට `🟢 Supabase Cloud` ලාංඡනය ඉහළින් දිස්වේ.
6. ඔබ සතුව දැනටමත් Local Demo Orders ඇත්නම් **"දත්ත Cloud වෙත Sync කරන්න (Upload Local Orders)"** ක්ලික් කරන්න.

### ක්‍රමය B: `supabaseConfig.js` ගොනුව මඟින් (Permanent Config)
වෙබ් අඩවියේ කේතය තුළම ස්ථිරව තැබීමට අවශ්‍ය නම්:
1. ව්‍යාපෘතියේ ඇති **`supabaseConfig.js`** ගොනුව විවෘත කරන්න.
2. පහත පරිදි ඔබගේ URL සහ Key එක ඇතුළත් කර Save කරන්න:
   ```javascript
   window.SUPABASE_CONFIG = {
     url: 'https://xxxxxxxxxxxx.supabase.co',
     anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
   };
   ```
3. GitHub වෙත Push කරන්න. සියලුම පරිශීලකයින්ට සහ Admin හට ස්වයංක්‍රීයව Cloud Database එක සම්බන්ධ වේ.

---

## 🔔 Real-Time Order Alerts (ස්වයංක්‍රීයව ඇණවුම් ලැබීම)
- පාරිභෝගිකයෙකු Storefront එකෙන් ඇණවුමක් දමා WhatsApp වෙත ගිය විගස, එම ඇණවුම ක්ෂණිකව Supabase Cloud Database හි තැන්පත් වේ.
- ඔබ Admin Dashboard එක විවෘත කරගෙන සිටින විට කිසිදු Page Refresh එකකින් තොරව ක්ෂණිකව **"🔔 නව ඇණවුමක් ලැබුණි!"** යනුවෙන් ශබ්ද/දැනුම්දීමක් සහිතව Table එක යාවත්කාලීන වේ.

---

## 🛡️ ආරක්ෂාව සහ Offline Fallback (Graceful Degradation)
- Supabase සබඳතාවය බිඳ වැටුණද හෝ Keys ඇතුළත් කර නොතිබුණද වෙබ් අඩවිය කිසි විටෙක crash නොවේ.
- එය ස්වයංක්‍රීයව Browser එකේ **Local Storage** වෙත මාරු වී සුමටව ක්‍රියාත්මක වේ.
