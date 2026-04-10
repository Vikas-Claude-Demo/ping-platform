# Ping — International Payment Translation Platform

> **Pay anywhere. Like a local.**

Ping is a mobile-first payment translation platform that enables international travelers to interact with native payment ecosystems in foreign countries — without requiring a local SIM card, bank account, or separate app.

---

## 🌍 What is Ping?

When you travel internationally, local payment rails like **M-Pesa** (Zambia/Kenya), **UPI** (India), or **MTN MoMo** (Ghana) are deeply embedded in everyday commerce — but completely inaccessible to foreign visitors.

**Ping bridges that gap.** It authenticates you using your home payment card, detects your destination's payment ecosystem, and translates every transaction through the appropriate local rail in under 30 seconds.

---

## ✨ Features (MVP)

| Feature | Status |
|---|---|
| User Registration & OTP Verification | ✅ Live |
| Lightweight KYC (ID + Selfie) | ✅ Live |
| Link Home Payment Method (Stripe) | ✅ Live |
| M-Pesa Zambia & Kenya Integration | ✅ Live |
| QR Code Scanner (Camera + Manual) | ✅ Live |
| Live Exchange Rate Display | ✅ Live |
| Animated Payment Review & Confirmation | ✅ Live |
| Real-time Payment Status (Success/Pending/Failed) | ✅ Live |
| Transaction History with Status Badges | ✅ Live |
| Notifications Centre | ✅ Live |
| Payment Network Status Dashboard | ✅ Live |
| Exchange Rates Dashboard | ✅ Live |
| Explore / Destinations Screen | ✅ Live |
| UPI (India) | 🔜 Phase 2 |
| MTN MoMo (Ghana) | 🔜 Phase 2 |
| NFC Tap-to-Pay | 🔜 Phase 3 |

---

## 🏗️ Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | React Native (Expo SDK 54) |
| Navigation | Expo Router (file-based) |
| Camera / QR | expo-camera + BarcodeDetector API |
| Animations | React Native Animated API |
| Icons | @expo/vector-icons (MaterialCommunityIcons) |
| Styling | React Native StyleSheet (no external CSS) |
| Build Target | iOS · Android · Web (PWA-ready) |

### Backend
| Layer | Technology |
|---|---|
| Framework | NestJS (Node.js) |
| ORM | TypeORM |
| Database | PostgreSQL 15 |
| Auth | Firebase Auth |
| KYC | Smile ID / Onfido |
| Home Payments | Stripe |
| Payment Rail | M-Pesa Daraja API v2 |
| Notifications | Firebase Cloud Messaging |
| Infrastructure | AWS (EC2 / RDS / S3) |
| CI/CD | GitHub Actions |
| Monitoring | Sentry + Datadog |

---

## 📁 Project Structure

```
ping-platform/
├── frontend/                   # Expo React Native app
│   ├── app/
│   │   ├── (auth)/             # Onboarding screens
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx       # Register screen
│   │   │   └── kyc.tsx         # KYC & card linking
│   │   ├── (tabs)/             # Main app tabs
│   │   │   ├── _layout.tsx     # Tab navigator
│   │   │   ├── index.tsx       # Home dashboard
│   │   │   ├── pay.tsx         # Send money + review + success
│   │   │   ├── history.tsx     # Transaction history
│   │   │   └── explore.tsx     # Destinations & travel tips
│   │   ├── _layout.tsx         # Root stack navigator
│   │   ├── index.tsx           # Root redirect
│   │   ├── qr-scanner.tsx      # QR camera scanner
│   │   ├── rates.tsx           # Exchange rates dashboard
│   │   ├── network.tsx         # Payment rail status
│   │   └── notifications.tsx   # Notification centre
│   └── constants/
│       └── Theme.ts            # Design system tokens
│
├── backend/                    # NestJS API server
│   ├── src/
│   │   ├── users/              # User module (entity, service, controller)
│   │   ├── transactions/       # Transaction module
│   │   ├── payments/           # Payment rail module
│   │   └── app.module.ts       # Root module with TypeORM config
│   └── .env.example
│
└── docker-compose.yml          # PostgreSQL local development DB
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 10+
- Docker & Docker Compose (for local database)
- Expo Go app (for mobile testing)

### 1. Clone & Install

```bash
git clone https://github.com/your-org/ping-platform.git
cd ping-platform
```

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Start the Database

```bash
# From project root
docker-compose up -d
```

This starts a PostgreSQL 15 instance on `localhost:5432` with:
- Database: `ping_db`
- User: `ping_user`
- Password: `ping_password`

### 3. Configure Environment

Copy the example env file for the backend:
```bash
cd backend
cp .env.example .env
```

Edit `.env` with your API credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=ping_user
DB_PASSWORD=ping_password
DB_DATABASE=ping_db

FIREBASE_PROJECT_ID=your-firebase-project-id
STRIPE_SECRET_KEY=sk_test_...
MPESA_CONSUMER_KEY=...
MPESA_CONSUMER_SECRET=...
MPESA_SHORTCODE=...
MPESA_PASSKEY=...
```

### 4. Run the App

**Start the backend API:**
```bash
cd backend
npm run start:dev
# API available at http://localhost:3000
```

**Start the Expo development server:**
```bash
cd frontend
npm run web          # for browser
npm start            # for Expo Go (scan QR with your phone)
```

---

## 📱 Core User Flows

### 1. Onboarding
```
Register (email + phone) → OTP → KYC (ID + selfie) → Link card → Dashboard
```

### 2. Making a Payment
```
Home → Send / Scan QR → Enter recipient → Enter amount → Review (rate + fee) → Confirm → Animated success
```

### 3. Checking Rates
```
Home → Rates tile → Exchange Rates dashboard (all corridors with live rate, fee, trend)
```

### 4. Network Status
```
Home → Network tile (or M-Pesa banner) → Rail health dashboard (Operational / Degraded / Outage)
```

---

## 🔐 Security

- All data in transit: **TLS 1.2+**
- PII & payment credentials at rest: **AES-256 encrypted**
- Payment card data: **PCI DSS compliant via Stripe tokenisation** (no raw card numbers stored)
- Session tokens: expire after **30 minutes of inactivity**
- Rate limiting: all authentication and payment endpoints

---

## 🌐 Deployment

### Web (Expo)
```bash
cd frontend
npx expo export --platform web
# Output in frontend/dist/
```

### Backend (Docker)
```bash
cd backend
docker build -t ping-api .
docker run -p 3000:3000 --env-file .env ping-api
```

---

## 📊 Payment Rail Coverage

| Country | Currency | Rail | Phase | Status |
|---|---|---|---|---|
| 🇿🇲 Zambia | ZMW | M-Pesa (Safaricom Daraja v2) | 1 | ✅ Live |
| 🇰🇪 Kenya | KES | M-Pesa (Lipa na M-Pesa) | 1 | ✅ Live |
| 🇮🇳 India | INR | UPI | 2 | 🔜 Q3 2026 |
| 🇹🇿 Tanzania | TZS | M-Pesa Tanzania | 2 | 🔜 Q3 2026 |
| 🇬🇭 Ghana | GHS | MTN Mobile Money | 2 | 🔜 Q3 2026 |

---

## 🤝 Project Credits & Attribution

| Role | Name / Organization |
|---|---|
| **Client** | Luipa Mondoka (Ping) |
| **Development Partner** | [Brilworks](https://brilworks.com) |
| **AI Expert & Technical Advisor** | **Dr. Dhaval Trivedi** |
| **AI-Assisted Development** | Google Gemini (Antigravity) |

> **Developer: Dr. Dhaval Trivedi**
> 
> This platform was architected and developed with the AI expertise of **Dr. Dhaval Trivedi**, a leading AI expert and practitioner, whose guidance on AI-assisted software development, product architecture, and intelligent system design was instrumental in delivering the Ping MVP.
>
> Dr. Trivedi's contributions span AI system design, model-assisted code generation strategy, and the integration of intelligent workflows into real-world fintech products.
>
> 🔗 [drdhaval.in](https://drdhaval.in)

---

## 📄 Document History

| Version | Date | Author | Notes |
|---|---|---|---|
| 1.0 | April 10, 2026 | Brilworks | Initial SOW + TRD |
| 1.1 | April 10, 2026 | Brilworks | Frontend MVP scaffolded |
| 1.2 | April 10, 2026 | Brilworks | All screens + QR + animations complete |

---

## 📜 License

Proprietary — All rights reserved © 2026 Ping / Luipa Mondoka. Built by Brilworks.
