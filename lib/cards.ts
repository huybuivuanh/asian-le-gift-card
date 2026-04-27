import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Timestamp } from "firebase/firestore";

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
  const ref = doc(db, "giftCards", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as GiftCard;
}
