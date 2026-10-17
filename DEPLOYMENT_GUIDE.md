# රසමුතු Rice Mills - GitHub Pages Deployment Guide
# (GitHub Pages මඟින් වෙබ් අඩවිය Live කරන ආකාරය පිළිබඳ මාර්ගෝපදේශය)

මෙම වෙබ් අඩවිය 100% Client-Side Static Architecture එකකින් නිර්මාණය කර ඇති බැවින් **GitHub Pages** හරහා $0 වියදමකින් ඉතාම පහසුවෙන් සහ වේගවත්ව Host කළ හැක.

---

## 📌 පියවරෙන් පියවර උපදෙස් (Step-by-Step Guide):

### පියවර 1: GitHub හි නව Repository එකක් සෑදීම
1. ඔබගේ [GitHub ගිණුමට (github.com)](https://github.com) පිවිසෙන්න.
2. ඉහළ දකුණු කෙළවරේ ඇති **`+`** ලකුණ ක්ලික් කර **"New repository"** තෝරන්න.
3. Repository name ලෙස කැමති නමක් ලබා දෙන්න (උදා: `rasamuthu-rice` හෝ `new-website`).
4. **Public** තෝරන්න (නොමිලේ GitHub Pages භාවිතා කිරීමට).
5. "Initialize this repository with README" යන්න **Uncheck** කර තබන්න (අප සතුව දැනටමත් files ඇත).
6. **"Create repository"** බොත්තම ක්ලික් කරන්න.

---

### පියවර 2: Files GitHub වෙත Upload කිරීම (ක්‍රම 2ක් ඇත)

#### ක්‍රමය A: Git Command Line මඟින් (Git ස්ථාපනය කර ඇත්නම්)
ඔබගේ පරිගණකයේ මෙම project folder එක (`c:\Users\MCM\Desktop\new website`) තුළ PowerShell හෝ Git Bash විවෘත කර:

```bash
# 1. Git ආරම්භ කිරීම
git init

# 2. සියලුම ගොනු Stage කිරීම
git add .

# 3. Commit කිරීම
git commit -m "Production release: 05kg & 25kg bags, Admin Dashboard, and Supabase Cloud DB"

# 4. ප්‍රධාන ශාඛාව 'main' ලෙස නම් කිරීම
git branch -M main

# 5. ඔබගේ GitHub repository එක සම්බන්ධ කිරීම (ඔබගේ username සහ repo නම යොදන්න)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git

# 6. GitHub වෙත Upload කිරීම
git push -u origin main
```

#### ක්‍රමය B: GitHub වෙබ් අඩවියෙන් සෘජුවම Drag & Drop කිරීම (Git නැතිව වුවද කළ හැක - ඉතා පහසුයි)
1. ඔබ සාදාගත් GitHub repository පිටුවේ **"uploading an existing file"** ලින්ක් එක ක්ලික් කරන්න.
2. ඔබගේ පරිගණකයේ `c:\Users\MCM\Desktop\new website` ෆෝල්ඩරය විවෘත කර, එහි ඇති **සියලුම files සහ images ෆෝල්ඩරය** Select කර GitHub පිටුවට **Drag and Drop (අදින්න)**.
3. පිටුවේ පහළින් ඇති **"Commit changes"** (කොළ පැහැති බොත්තම) ක්ලික් කරන්න.

---

### පියවර 3: GitHub Pages සක්‍රීය කිරීම (Enable GitHub Pages)
1. ඔබගේ GitHub repository පිටුවේ ඉහළ මෙනුවේ ඇති **"Settings"** (⚙️) ටැබ් එක ක්ලික් කරන්න.
2. වම්පස මෙනුවේ **"Code and automation"** යටතේ ඇති **"Pages"** ක්ලික් කරන්න.
3. **"Build and deployment"** කොටස යටතේ:
   - **Source**: `Deploy from a branch` තෝරන්න.
   - **Branch**: `main` තෝරා, ෆෝල්ඩරය `/ (root)` ලෙස තබන්න.
4. **"Save"** බොත්තම ක්ලික් කරන්න.
5. තත්පර 30 - 60ක් ඇතුළත GitHub විසින් වෙබ් අඩවිය Build කර Live කරනු ඇත.

---

### පියවර 4: ඔබගේ Live වෙබ් අඩවියට පිවිසීම!
- **පාරිභෝගික මුහුණත (Storefront):**
  ```text
  https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/
  ```
- **පරිපාලක පුවරුව (Admin Portal):**
  ```text
  https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/admin.html
  ```
  *(Default PIN: **`1234`**)*

---

## 💡 වැදගත් කරුණු (Important Notes):
1. **`.nojekyll` ගොනුව:** GitHub Pages විසින් Jekyll මඟින් ගොනු සීමා කිරීම වැළැක්වීම සඳහා මෙම ව්‍යාපෘතියේ `.nojekyll` ගොනුවක් දැනටමත් අන්තර්ගත කර ඇත.
2. **Relative Paths:** සියලුම CSS, JS, සහ Images සාපේක්ෂ (relative) මාර්ග වලින් සම්බන්ධ කර ඇති බැවින් GitHub Pages subpath (උදා: `/rasamuthu-rice/`) යටතේ වුවද කිසිදු බිඳවැටීමකින් තොරව ක්‍රියාත්මක වේ.
3. **Cloud Database:** වෙබ් අඩවිය Live වූ පසු [SUPABASE_SETUP.md](SUPABASE_SETUP.md) හි දක්වා ඇති පරිදි Supabase සම්බන්ධ කරන්න.
