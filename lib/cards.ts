import { cache } from "react";
import { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "./firebase-admin";

export type GiftCard = {
  id: string;
  label: string;
  balance: number;
  originalBalance: number;
  archived: boolean;
  updatedAt: Date | null;
};

export type CardStatus = "active" | "redeemed" | "inactive" | "archived";

/** Firestore rejects these IDs, so treat them as "not found" instead of erroring. */
function isValidDocId(id: string): boolean {
  return (
    id.length > 0 &&
    id.length <= 1500 &&
    !id.includes("/") &&
    id !== "." &&
    id !== ".." &&
    !/^__.*__$/.test(id)
  );
}

/**
 * Cached per request, so generateMetadata and the page share one Firestore read.
 * Throws if the document exists but is missing required fields.
 */
export const getCard = cache(async (id: string): Promise<GiftCard | null> => {
  if (!isValidDocId(id)) return null;

  const snap = await adminDb.collection("giftCards").doc(id).get();
  if (!snap.exists) return null;

  const data = snap.data()!;
  if (
    typeof data.balance !== "number" ||
    typeof data.originalBalance !== "number"
  ) {
    throw new Error(`Gift card ${id} is missing balance fields`);
  }

  return {
    id: snap.id,
    label: typeof data.label === "string" ? data.label : "",
    balance: data.balance,
    originalBalance: data.originalBalance,
    archived: data.archived === true,
    updatedAt:
      data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : null,
  };
});

/** Rounds to whole cents so float leftovers like 7e-15 count as zero. */
function toCents(amount: number): number {
  return Math.round(amount * 100);
}

export function formatMoney(amount: number): string {
  return `$${(toCents(amount) / 100).toFixed(2)}`;
}

export function getCardStatus(card: GiftCard): CardStatus {
  if (card.archived) return "archived";
  const cents = toCents(card.balance);
  if (cents > 0) return "active";
  if (cents === 0 && card.originalBalance > 0) return "redeemed";
  return "inactive";
}
