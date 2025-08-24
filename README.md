# 📱 QR Scanner

<div align="center">

![QR Scanner Logo](public/logo.png)

**A modern, professional QR Code scanner and generator application**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Capacitor](https://img.shields.io/badge/Capacitor-6.2.0-119EFF?style=for-the-badge&logo=capacitor)](https://capacitorjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.14-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[🚀 Live Demo](#) • [📖 Documentation](#installation) • [🤝 Contributing](#contributing)

</div>

---

## ✨ Features

### 📷 **QR Code Scanner**
- **Real-time QR detection** using device camera
- **Instant content display** in beautiful modal overlay
- **Copy to clipboard** functionality
- **Auto URL detection** with direct opening capability
- **iOS & Android optimized** camera access

### 🎨 **QR Code Generator**
- **Multiple QR types support:**
  - 📝 **Simple Text** - Plain text messages
  - 🌐 **Website URLs** - Direct links with validation
  - 📧 **Email** - Pre-filled email composition
  - 👤 **Contact Cards** - vCard format with full contact info
  - 📶 **WiFi Networks** - Easy network sharing with password
- **High-quality QR codes** with customizable sizing
- **Instant download** as PNG images
- **Live preview** with real-time updates

### 🌍 **Internationalization**
- **Multi-language support** (English & Spanish)
- **Auto-detection** based on browser/system language
- **Persistent language selection** with localStorage
- **Professional translations** for all UI elements

### 📱 **Cross-Platform Ready**
- **Progressive Web App (PWA)** capabilities
- **iOS App Store ready** with proper assets and permissions
- **Google Play Store ready** with adaptive icons
- **Responsive design** for all screen sizes
- **iOS Safe Area** optimized for modern devices

### 🎭 **Modern UI/UX**
- **Glassmorphism design** with gradient backgrounds
- **Dark mode support** across all platforms
- **Smooth animations** and transitions
- **Professional branding** with custom icons
- **Intuitive navigation** with React Router

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/QRScanner.git
   cd QRScanner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 📖 Usage Guide

### 🔍 **Scanning QR Codes**

1. Navigate to the **Scanner** page
2. Click **"Start Camera"** to activate your device camera
3. Point your camera at a QR code
4. View the scanned content in the popup modal
5. **Copy content** or **open URLs** directly

### 🎯 **Generating QR Codes**

1. Go to the **Generator** page
2. Select your desired **QR type**:
   - **Text**: Enter any text message
   - **Website**: Add a valid URL
   - **Email**: Set recipient, subject, and message
   - **Contact**: Fill in contact details
   - **WiFi**: Enter network credentials
3. **Generate** your QR code
4. **Download** as PNG image

### 🌐 **Language Selection**

- Language is **auto-detected** from your browser
- Supports **English** and **Spanish**
- Preference is **automatically saved**

---

## 🛠️ Tech Stack

<div align="center">

| **Category** | **Technology** | **Purpose** |
|--------------|----------------|-------------|
| **Frontend** | React 18 + TypeScript | Modern component-based UI |
| **Styling** | Tailwind CSS | Utility-first styling framework |
| **Build Tool** | Vite | Fast development and building |
| **Routing** | React Router DOM | Client-side navigation |
| **QR Scanning** | jsQR | Real-time QR code detection |
| **QR Generation** | qrcode | High-quality QR code creation |
| **Internationalization** | react-i18next | Multi-language support |
| **Mobile** | Capacitor | Cross-platform mobile deployment |
| **Code Quality** | ESLint + Prettier | Consistent code formatting |

</div>

---

## 📁 Project Structure

```
QRScanner/
├── 📱 android/                 # Android mobile app
├── 🍎 ios/                     # iOS mobile app  
├── 🌐 public/                  # Static assets
│   ├── logo.png               # App logo
│   └── manifest.webmanifest   # PWA manifest
├── 📦 src/
│   ├── 🧩 components/         # Reusable components
│   │   └── QRModal.tsx        # QR result modal
│   ├── 📄 pages/              # Application pages
│   │   ├── HomePage.tsx       # Landing page
│   │   ├── QRScannerPage.tsx  # Camera scanner
│   │   └── QRGeneratorPage.tsx # QR generator
│   ├── 🌍 i18n/               # Internationalization
│   │   ├── config.ts          # i18n setup
│   │   ├── types.ts           # Translation types
│   │   └── locales/           # Language files
│   │       ├── en.ts          # English translations
│   │       └── es.ts          # Spanish translations
│   ├── 🔧 utils/              # Utility functions
│   │   └── qrFormatters.ts    # QR data formatting
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # App entry point
│   └── index.css              # Global styles
├── ⚙️ capacitor.config.ts      # Mobile app config
├── 🎨 tailwind.config.js       # Styling configuration
├── 📋 package.json             # Dependencies
└── 📖 README.md               # You are here!
```

---

## 📱 Mobile Development

### iOS Deployment

```bash
# Build for iOS
npm run build
npx cap add ios
npx cap sync ios
npx cap open ios
```

**Features:**
- ✅ App Store ready icons and splash screens
- ✅ Camera permissions properly configured
- ✅ Safe area handling for modern iPhones
- ✅ Dark mode support

### Android Deployment

```bash
# Build for Android  
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

**Features:**
- ✅ Google Play Store ready adaptive icons
- ✅ Camera permissions and hardware requirements
- ✅ Night mode splash screens
- ✅ All density variations included

---

## 🌍 Internationalization

### Supported Languages

- 🇺🇸 **English** (en) - Default
- 🇪🇸 **Spanish** (es) - Complete translation

### Adding New Languages

1. Create translation file in `src/i18n/locales/[lang].ts`
2. Implement the `TranslationKeys` interface
3. Add language to `src/i18n/config.ts`
4. Update supported languages array

```typescript
// Example: Adding French support
import { fr } from './locales/fr'

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr }, // New language
}
```

---

## 🧪 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality  
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
npm run format:check    # Check code formatting

# Mobile Development
npx cap add ios         # Add iOS platform
npx cap add android     # Add Android platform
npx cap sync           # Sync web assets to mobile
npx cap open ios       # Open iOS project in Xcode
npx cap open android   # Open Android project in Android Studio
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. Create a **feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `chore:` Maintenance tasks
- `style:` Code formatting
- `docs:` Documentation updates

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](license.md) file for details.

---

## 🎯 Roadmap

- [ ] **QR Code History** - Save and manage scanned codes
- [ ] **Batch QR Generation** - Generate multiple codes at once
- [ ] **Custom QR Styling** - Colors, logos, and patterns
- [ ] **QR Analytics** - Track scan statistics
- [ ] **Cloud Sync** - Sync data across devices
- [ ] **API Integration** - Connect with external services

---

## 💝 Support

If you find this project helpful, please consider:

- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs and issues
- 💡 **Suggesting** new features
- 🤝 **Contributing** code improvements

---

<div align="center">

**Made with ❤️ for the QR code community**

[⬆️ Back to Top](#-qr-scanner)

</div>

## Follow me

[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/channel/UC5MAQWU2s2VESTXaUo-ysgg)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://www.github.com/danny270793/)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwLDAsMjU2LDI1NiIgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgZmlsbC1ydWxlPSJub256ZXJvIj48ZyBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48ZyB0cmFuc2Zvcm09InNjYWxlKDUuMTIsNS4xMikiPjxwYXRoIGQ9Ik00MSw0aC0zMmMtMi43NiwwIC01LDIuMjQgLTUsNXYzMmMwLDIuNzYgMi4yNCw1IDUsNWgzMmMyLjc2LDAgNSwtMi4yNCA1LC01di0zMmMwLC0yLjc2IC0yLjI0LC01IC01LC01ek0xNywyMHYxOWgtNnYtMTl6TTExLDE0LjQ3YzAsLTEuNCAxLjIsLTIuNDcgMywtMi40N2MxLjgsMCAyLjkzLDEuMDcgMywyLjQ3YzAsMS40IC0xLjEyLDIuNTMgLTMsMi41M2MtMS44LDAgLTMsLTEuMTMgLTMsLTIuNTN6TTM5LDM5aC02YzAsMCAwLC05LjI2IDAsLTEwYzAsLTIgLTEsLTQgLTMuNSwtNC4wNGgtMC4wOGMtMi40MiwwIC0zLjQyLDIuMDYgLTMuNDIsNC4wNGMwLDAuOTEgMCwxMCAwLDEwaC02di0xOWg2djIuNTZjMCwwIDEuOTMsLTIuNTYgNS44MSwtMi41NmMzLjk3LDAgNy4xOSwyLjczIDcuMTksOC4yNnoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==&logoColor=white&style=for-the-badge)](https://www.linkedin.com/in/danny270793)
