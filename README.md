# Asian Le Gift Card

A QR-code-based gift card balance checker for [Asian Le Restaurant](https://www.asianle.ca/) in Prince Albert, SK.

Each gift card has a unique URL (`/card/[id]`) that customers access by scanning a QR code. The page shows their remaining balance, original card value, and redemption status in real time.

**Live:** https://giftcard.asianle.ca/

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, SSR)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) — server-side Firestore reads
- [Tailwind CSS v4](https://tailwindcss.com/)
- Hosted on Firebase App Hosting

## Features

- Real-time balance lookup via Firestore on every scan
- Card status: Active, Redeemed, Archived, or Inactive
- Dynamic `<meta>` tags per card (balance in description for link previews)
- QR-code friendly — mobile-optimized single-page layout

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env.local` file:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
```

`FIREBASE_SERVICE_ACCOUNT_JSON` is a Firebase service account key (JSON on one line). Generate one from Firebase Console → Project Settings → Service Accounts.
