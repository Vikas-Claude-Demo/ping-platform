# Ping — Investor Demo (Mexico → USA)

> **Pay anywhere. Like a local.**

Ping is a mobile-first payment platform that enables Mexican travelers to spend money seamlessly in the United States. This repository contains the **Lean Demo Build**, architected specifically for a 90-second investor showcase.

---

## 🌍 Investor Demo Focus
This build focuses on the **Mexico → United States** corridor, allowing a user (Luipa) to load Pesos (MXN) via Stripe, receive a virtual USD Visa card, and perform a simulated tap-to-pay transaction at a US merchant.

---

## ✨ Demo Features (Lean Build)

| Feature | Details | Status |
|---|---|---|
| **Demo Account Login** | Pre-seeded user, skips auth flow for instant demo starts | ✅ Included |
| **Wallet Home** | Real-time USD balance, virtual card preview, and recent activity | ✅ Included |
| **Load Money Flow** | MXN entry, live FX conversion, Stripe sandbox charge, success animation | ✅ Included |
| **Stripe Issuing Sandbox** | Real virtual Visa card issued via Stripe Issuing Test Mode | ✅ Included |
| **Card Display** | Polished front/back flip animation showing full card details | ✅ Included |
| **Simulated Tap-to-Pay** | Animated NFC reader UI with haptic feedback and simulated beep | ✅ Included |
| **In-App Notifications** | Push-style slide-in banner for transaction confirmation | ✅ Included |
| **Transaction History** | Chronological ledger of all demo transactions | ✅ Included |

---

## ⏱️ The 90-Second Demo Flow

1.  **0:00** — Open Ping. Wallet shows **$0 USD**.
2.  **0:10** — Tap **Load Money**. Enter `5,000 MXN`. See live FX rate.
3.  **0:20** — Confirm with **Face ID**. Real Stripe sandbox charge executes.
4.  **0:25** — Balance updates to **$290 USD** with subtle confetti.
5.  **0:30** — Tap the **Virtual Card**. It flips to show the Visa details.
6.  **0:40** — Tap **Tap to Pay**. Hold near simulated reader. Haptic vibration + Beep.
7.  **0:50** — Transaction posts: **$12.50 at Starbucks**. Balance updates to **$277.50**.
8.  **1:00** — **Push Notification** slides in from the top.
9.  **1:10** — Open **Activity**. The Starbucks transaction is at the top.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+
- npm 10+
- Expo Go app (for mobile testing)
- **Stripe Account (Test Mode)** with [Issuing enabled](https://dashboard.stripe.com/issuing/overview)

### 2. Environment Setup
Create a `.env` file in the `frontend/` directory:

```env
# In frontend/.env
EXPO_PUBLIC_STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
```

### 3. Seed the Demo Card
To issue a real virtual test card to the app, run the seed script from the project root:

```bash
export STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
node backend/scripts/seed-demo.js
```
*This will generate `frontend/constants/demo-data.json` with your real Stripe sandbox card details.*

### 4. Run the App
```bash
cd frontend
npm install
npm start
```
Scan the QR code with the **Expo Go** app to run the demo on your iPhone.

---

## 🏗️ Tech Stack

- **Mobile App:** React Native (Expo SDK 54)
- **Navigation:** Expo Router
- **Payments:** Stripe Payments (Sandbox) + Stripe Issuing (Sandbox)
- **Animations:** React Native Reanimated + Animated API
- **Design:** Fintech-grade custom UI with Haptic Feedback

---

## 📁 Key Files
- `frontend/app/(tabs)/index.tsx` — Main Wallet Dashboard
- `frontend/app/load-money.tsx` — Stripe Load Flow
- `frontend/app/tap-to-pay.tsx` — NFC Simulator
- `frontend/components/VirtualCard.tsx` — Flippable Visa Card
- `backend/scripts/seed-demo.js` — Stripe Issuing Setup Script

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
> This platform was architected and developed with the AI expertise of **Dr. Dhaval Trivedi**, a leading AI expert and practitioner, whose guidance on AI-assisted software development, product architecture, and intelligent system design was instrumental in delivering the Ping Investor Demo.
>
> 🔗 [drdhaval.in](https://drdhaval.in)

---

## 📄 Document History

| Version | Date | Author | Notes |
|---|---|---|---|
| 1.0 | April 10, 2026 | Brilworks | Initial SOW + TRD |
| 2.0 | April 27, 2026 | Brilworks | Lean Demo Build for Fundraise complete |

---

## 📜 License
Proprietary — All rights reserved © 2026 Ping / Luipa Mondoka. Built by Brilworks.
