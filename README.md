# Ping — Investor Demo (Mexico → USA)

> **Pay anywhere. Like a local.**

Ping is a mobile-first payment platform that enables Mexican travelers to spend money seamlessly in the United States. This repository contains the **Lean Demo Build**, architected specifically for a 90-second investor showcase.

---

## 🌍 Investor Demo Focus
This build focuses on the **Mexico → United States** corridor, allowing a user (Luipa) to walk through a complete onboarding flow, load Pesos (MXN) via Stripe, receive a virtual USD Visa card, and perform a simulated tap-to-pay transaction.

---

## ✨ Demo Features (Lean Build)

| Feature | Details | Status |
|---|---|---|
| **Premium Onboarding** | Redesigned Registration & KYC screens with stunning fintech aesthetics | ✅ Included |
| **Wallet Home** | Real-time USD balance, virtual card preview, and recent activity | ✅ Included |
| **Load Money Flow** | MXN entry, live FX conversion, Stripe sandbox charge, success animation | ✅ Included |
| **Stripe Issuing Sandbox** | Real virtual Visa card issued via Stripe Issuing Test Mode | ✅ Included |
| **Card Display** | Polished front/back flip animation showing full card details | ✅ Included |
| **Simulated Tap-to-Pay** | Animated NFC reader UI with haptic feedback and simulated beep | ✅ Included |
| **In-App Notifications** | Push-style slide-in banner for transaction confirmation | ✅ Included |
| **Transaction History** | Chronological ledger of all demo transactions | ✅ Included |

---

## ⏱️ The 90-Second Demo Flow

1.  **0:00** — Open Ping. Start with a premium **Welcome** screen.
2.  **0:10** — Walk through the **Verification** flow (Identity + Funding).
3.  **0:20** — Land on Wallet dashboard. Balance shows **$0 USD**.
4.  **0:30** — Tap **Load Money**. Enter `5,000 MXN`. Real Stripe sandbox charge executes.
5.  **0:40** — Balance updates to **$290 USD** with subtle confetti.
6.  **0:50** — Tap the **Virtual Card**. It flips to show the Visa details.
7.  **1:00** — Tap **Tap to Pay**. Hold near simulated reader. Haptic vibration + Beep.
8.  **1:10** — Transaction posts: **$12.50 at Starbucks**. Balance updates to **$277.50**.
9.  **1:20** — **Push Notification** slides in. Check **Activity** to see the final ledger.

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

### 4. Android Build (APK)
You can download the latest Android build directly for your device:
👉 **[Download Ping Android APK](https://expo.dev/accounts/dhaval29/projects/ping-platform/builds/0fd49952-ec11-42fb-adf0-60ffb2948b70)**

---

## 🏗️ Tech Stack

- **Mobile App:** React Native (Expo SDK 54)
- **Navigation:** Expo Router
- **Payments:** Stripe Payments (Sandbox) + Stripe Issuing (Sandbox)
- **Animations:** React Native Reanimated + Animated API
- **Haptics:** expo-haptics for tactile interaction feedback

---

## 📁 Key Files
- `frontend/app/(auth)/index.tsx` — Premium Onboarding
- `frontend/app/(tabs)/index.tsx` — Main Wallet Dashboard
- `frontend/app/load-money.tsx` — Stripe Load Flow
- `frontend/app/tap-to-pay.tsx` — NFC Simulator
- `frontend/components/VirtualCard.tsx` — Flippable Visa Card

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
| 2.1 | April 27, 2026 | Brilworks | Redesigned Auth/KYC + Android APK build |

---

## 📜 License
Proprietary — All rights reserved © 2026 Ping / Luipa Mondoka. Built by Brilworks.
