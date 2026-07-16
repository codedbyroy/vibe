# 🔮 Vibe — Premium Personal Finance & Expense Tracker

[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000000.svg?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB.svg?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev)
[![Firebase](https://img.shields.io/badge/Firebase-v11.2.0-FFCA28.svg?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**Vibe** is a high-fidelity, production-grade expense manager mobile application designed with editorial precision, vibrant dark mode aesthetics, and fluid physics-based micro-interactions. Built for developers and finance-conscious users alike, Vibe combines local offline privacy with instant cloud backup when connected to Firebase.

---

## ✨ Key Features

- **📶 Dual-Mode Offline-First Architecture**: 100% operational offline out-of-the-box. If Firebase is not configured, it gracefully falls back to local SQLite & `AsyncStorage` with zero disruption.
- **💎 Midnight Slate & Amethyst Orchid Styling**: Custom theme designed around high-contrast deep slate tones (`#08090C`) and electric purple highlights (`#C084FC`), adhering to professional design principles.
- **🌀 Physics-Based Micro-Interactions**: Features custom spring-loaded sliders, squash-and-stretch button taps, and a haptic-like numeric keypad powered by `react-native-reanimated`.
- **📊 Rich Interactive Visualizations**: Beautiful, custom category-grouped pie charts and monthly transaction breakdowns powered by `react-native-gifted-charts`.
- **🔒 PIN Guard Access**: Secure, animated passcode verification using React Native's secure storage keychain APIs (`expo-secure-store`).
- **☁️ Real-time Firestore Sync**: Instantly backs up transactions, custom categories, and budgets to the cloud once authenticated.

---

## 🎨 Design Language & Theme

Vibe employs a curated, harmonious color system that avoids generic colors in favor of high-contrast, premium, dark-editorial styling.

| Token Name | Color / Value | Purpose |
| :--- | :--- | :--- |
| **Slate Background** | `#08090C` | App-wide screen background |
| **Card Elevate** | `#12131A` | Glassmorphic card body |
| **Amethyst Primary** | `#C084FC` | Highlights, active icons, primary CTAs |
| **Emerald Accent** | `#34D399` | Income metrics & gains indicators |
| **Rose Accent** | `#F87171` | Expense metrics & alert states |
| **Text Primary** | `#F3F4F6` | Primary headers and legible content |

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **Expo SDK 54** | Modern managed workflow, React Native 0.76+ |
| **Navigation** | **Expo Router v3** | File-system based typed routing |
| **Animations** | **Reanimated + Moti** | Physics-based spring animations and layouts |
| **State** | **Zustand** | Ultra-lightweight reactive global store |
| **Secure Keyring** | **expo-secure-store** | Encrypted key-value storage for lock codes |
| **Database** | **SQLite + AsyncStorage** | Robust local transactional client and state persistence |
| **Cloud Engine** | **Firebase SDK v11** | High-performance auth, firestore, offline-caching |

---

## 📂 Project Architecture

```
vibe/
├── assets/                  # Custom brand vectors, splash screen and app icons
├── app/                     # File-based router screen segments
│   ├── _layout.tsx          # Root container & automatic state routing gate
│   ├── index.tsx            # Initial mounting redirect controller
│   ├── (auth)/              # Security gateway screens
│   │   ├── welcome.tsx      # Premium onboarding / feature preview slider
│   │   ├── login.tsx        # Email-based account authentication
│   │   ├── register.tsx     # Secure user signup portal
│   │   └── pin.tsx          # Animated secure PIN lock-keypad
│   └── (tabs)/              # Application main modules
│       ├── home.tsx         # Dashboard displaying balance displays & quick actions
│       ├── add.tsx          # Interactive spring-based transaction entry form
│       ├── history.tsx      # Searchable, filtered list of all past receipts
│       ├── charts.tsx       # Analytics & category pie chart breakouts
│       └── settings.tsx     # Local account backup control & security adjustments
├── components/              # Reusable UI elements
│   ├── ui/                  # Cards, buttons and customized text representations
│   ├── charts/              # Layered wrappers for data visualization charts
│   └── transaction/         # Specialized items for list cards and transaction flows
├── store/                   # Zustand store definitions (auth, transactions, categories)
├── services/                # Local data models & Remote Firebase synchronization layer
├── constants/               # Global design tokens (fonts, spacing, layout sizing)
└── utils/                   # Financial math formatting and date processing helpers
```

---

## 🚀 Getting Started

Follow these steps to run Vibe locally on your machine or deploy it to a physical device:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org) and `npm` installed.

### 1. Clone & Install Dependencies
Navigate to the project folder and install dependencies:
```bash
npm install --legacy-peer-deps
```

### 2. Configure Firebase (Optional Cloud Mode)
To enable cloud backup and email sync, create a file named `firebase.config.js` in the root folder (or customize the existing one):
```javascript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```
*Note: If no Firebase configuration is supplied or variables are left empty, Vibe automatically initializes in **Local Offline Demo Mode**.*

### 3. Start Development Server
```bash
npx expo start
```
- Press **`i`** to open the simulator for iOS (requires macOS and Xcode).
- Press **`a`** to open the emulator for Android (requires Android Studio).
- Scan the QR code using the **Expo Go** application on your physical iOS or Android device.

---

## 📦 Building Standalone Binaries (EAS)

Vibe is fully pre-configured for **Expo Application Services (EAS)**:

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```
2. **Log in to Expo**:
   ```bash
   eas login
   ```
3. **Configure Project**:
   ```bash
   eas project:init
   ```
4. **Build APK/AAB for Android**:
   ```bash
   eas build --platform android --profile preview
   ```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
