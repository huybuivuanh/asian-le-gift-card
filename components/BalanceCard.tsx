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

export default function BalanceCard({ card }: { card: GiftCard }) {
  const isRedeemed = card.balance === 0 && card.originalBalance > 0;
  const isDeactivated = !card.active;

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
            isRedeemed || isDeactivated
              ? "text-neutral-400"
              : "text-emerald-600"
          }`}
        >
          ${card.balance.toFixed(2)}
        </p>
        {isRedeemed && (
          <div className="mt-3">
            <StatusBadge status="redeemed" />
          </div>
        )}
        {isDeactivated && !isRedeemed && (
          <div className="mt-3">
            <StatusBadge status="deactivated" />
          </div>
        )}
        {!isRedeemed && !isDeactivated && (
          <div className="mt-3">
            <StatusBadge status="active" />
          </div>
        )}
      </div>

      {isDeactivated && (
        <p className="mb-4 text-center text-sm text-red-600">
          This card has been deactivated. Please contact the restaurant.
        </p>
      )}

      <div className="mb-4">
        <Row label="Card Name" value={card.label || "—"} />
        <Row
          label="Original Value"
          value={`$${card.originalBalance.toFixed(2)}`}
        />
        <Row
          label="Card ID"
          value={`${card.id.slice(0, 8)}${card.id.length > 8 ? "…" : ""}`}
        />
      </div>

      <p className="text-center text-xs text-neutral-400">
        Show this to your server when redeeming
      </p>
    </div>
  );
}
