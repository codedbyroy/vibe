# 🔮 Vibe — Premium Personal Finance & Expense Tracker

**Vibe** is a high-fidelity, production-grade expense manager mobile application designed with editorial precision, vibrant dark mode aesthetics, and fluid physics-based micro-interactions. Built for developers and finance-conscious users alike, Vibe combines local offline privacy with instant cloud backup when connected to Firebase.

---

## 🚀 The Vibe Coding Journey

This project was built entirely through **vibe coding**—guided by high-level specifications and design instructions. Here is how the prompting and iteration unfolded:

### 1. The Prompting Strategy
The build began by providing the AI agent with a strict **Master Build Context** (`BUILDPLAN.md`). This outline established:
- **Design Tokens**: Specifying exact HEX colors (e.g., `#08090C` for Midnight Slate, `#C084FC` for Amethyst Orchid) to enforce a premium, dark editorial style.
- **Dependencies**: Forcing the use of Expo SDK 54, React Native 0.81+, Zustand for state management, Reanimated for physics-based tap transitions, and Gifted Charts for data visualization.
- **Offline-First Rule**: Specifying that the database must fallback gracefully to local SQLite and `AsyncStorage` if Firebase API keys are left blank.

### 2. What Happened During Development
- **Layout and Grid Sync**: The agent designed and structured the file-system router under `app/(tabs)` and `app/(auth)`.
- **Passcode & Secure Vault**: The agent implemented a secure numeric passcode keypad. To lock it down, the agent leveraged `expo-secure-store` to encrypt the user's login state.
- **Micro-Animations**: Custom spring values and scale shrink animations were configured using `Moti` and `Reanimated` on transaction card buttons to make interactions feel fluid.
- **API and Sync Handlers**: Firebase connections were abstracted into `/services/firebase.ts` so that components only interact with the reactive Zustand stores, keeping database synchronization decoupled from UI rendering.

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
expense-tracker/
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
