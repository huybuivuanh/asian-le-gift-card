import "server-only";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  // On Firebase App Hosting, initializeApp() picks up credentials automatically,
  // so the service account JSON is only required for local development.
  initializeApp(
    serviceAccountJson
      ? { credential: cert(JSON.parse(serviceAccountJson)) }
      : undefined,
  );
}

export const adminDb = getFirestore();
