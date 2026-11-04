import { adminDb } from "./firebase-admin";
import type { Timestamp } from "firebase-admin/firestore";

export type GiftCard = {
  id: string;
  label: string;
  balance: number;
  originalBalance: number;
  archived: boolean;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
};

export async function getCard(id: string): Promise<GiftCard | null> {
  const snap = await adminDb.collection("giftCards").doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as GiftCard;
}
