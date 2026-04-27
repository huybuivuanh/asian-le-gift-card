import type { GiftCard } from "@/lib/cards";
import StatusBadge from "./StatusBadge";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-t border-neutral-100 py-2 text-sm">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium text-neutral-800">{value}</span>
    </div>
  );
}

/** Remaining balance spent; original value was positive. */
export function giftCardIsRedeemed(card: GiftCard): boolean {
  return card.balance === 0 && card.originalBalance > 0;
}

/** Matches green "Active" badge: spendable balance, not archived. */
export function giftCardIsActive(card: GiftCard): boolean {
  return !card.archived && card.balance > 0;
}

export default function BalanceCard({ card }: { card: GiftCard }) {
  const isRedeemed = giftCardIsRedeemed(card);
  const isActive = giftCardIsActive(card);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-black">
          Asian Le Restaurant Gift Card
        </h1>
      </div>

      <div className="mb-6 rounded-xl bg-neutral-50 px-6 py-5 text-center">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Remaining Balance
        </p>
        <p
          className={`text-5xl font-bold tracking-tight ${
            isRedeemed || card.archived
              ? "text-neutral-400"
              : "text-emerald-600"
          }`}
        >
          ${card.balance.toFixed(2)}
        </p>
        {card.archived ? (
          <div className="mt-3">
            <StatusBadge status="archived" />
          </div>
        ) : isRedeemed ? (
          <div className="mt-3">
            <StatusBadge status="redeemed" />
          </div>
        ) : isActive ? (
          <div className="mt-3">
            <StatusBadge status="active" />
          </div>
        ) : (
          <div className="mt-3">
            <StatusBadge status="inactive" />
          </div>
        )}
      </div>
      <div className="mb-4">
        <Row label="Card Title" value={card.label || "—"} />
        <Row
          label="Original Value"
          value={`$${card.originalBalance.toFixed(2)}`}
        />
        <Row
          label="Last Redeemed"
          value={card.updatedAt?.toDate().toLocaleDateString() || "—"}
        />
        <Row label="Card ID" value={card.id} />
      </div>

      <p className="text-center text-xs text-neutral-400">
        Show this to your server when redeeming
      </p>
    </div>
  );
}
