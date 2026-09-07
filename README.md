# 🎓 UMA Learnology — Premier Coaching Institute & EdTech Platform

> **Where Learning Never Ends.** A full-featured, high-performance coaching institute web and mobile app ecosystem equipped with student dossiers, smart QR student ID badges, fee collection & invoice generation, YouTube video hub, 24x7 AI counseling, and real-time administrative editing suite.

---

## 🌟 Key Highlights

- 📱 **Progressive Web App (PWA):** Installable on Android, iOS, Windows, and macOS with offline caching.
- 🔐 **Passcode-Protected Admin Suite:** Protected administrative suite (Default Passcode: `2026`).
- 💳 **Fee Management & GST Invoices:** Installment tracker, digital receipts, and GST PDF invoice generator.
- 🪪 **Smart Student ID Card Studio:** Printable A4 batch sheets and digital badges with tamper-proof QR verification and hologram seals.
- 📺 **YouTube Video Lecture Hub:** Embedded video classroom with search, duration filters, and instructor badges.
- 🤖 **Interactive Tools:** Free English Fluency Level Test, Fee Calculator, and Live AI Counselor.
- 📸 **Direct Image Uploads:** Canvas-compressed local file & camera uploads without requiring third-party cloud hosting.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Production Build
```bash
npm run build
```
Generates production assets in the `dist/` directory.

---

## 🌐 Deploy to GitHub & GitHub Pages

### Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit of UMA Learnology App"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY_NAME>.git
git push -u origin main
```

### Enable Free GitHub Pages Deployment:
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. The included `.github/workflows/deploy.yml` will automatically build and deploy your live site!

---

## ☁️ 1-Click Deployment to Vercel / Netlify

### Deploy with Vercel:
```bash
npx vercel
```

### Deploy with Netlify:
```bash
npx netlify deploy --prod --dir=dist
```
Or drag and drop the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 📲 Generate Android APK (Play Store Ready)
1. Go to [PWABuilder.com](https://www.pwabuilder.com/).
2. Enter your live deployment URL.
3. Click **Package for Stores** > **Android** > **Generate APK**.
