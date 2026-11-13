import Image from "next/image";
import { formatMoney, getCardStatus, type GiftCard } from "@/lib/cards";
import StatusBadge from "./StatusBadge";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-t border-neutral-100 py-2 text-sm">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium text-neutral-800">{value}</span>
    </div>
  );
}

// Rendered on the server (UTC), so pin the restaurant's time zone.
const dateFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Regina",
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function BalanceCard({ card }: { card: GiftCard }) {
  const status = getCardStatus(card);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6 text-center">
        {/* "Asian [logo] Le Gift Cards" wordmark, matching the rewards app. */}
        <h1
          className="flex items-center justify-center gap-1.5 text-2xl font-bold text-black"
          aria-label="Asian Le Gift Cards"
        >
          <span aria-hidden="true">Asian</span>
          <Image src="/logo.png" alt="" width={24} height={48} aria-hidden="true" />
          <span aria-hidden="true">Le Gift Cards</span>
        </h1>
      </div>

      <div className="mb-6 rounded-xl bg-neutral-50 px-6 py-5 text-center">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Remaining Balance
        </p>
        <p
          className={`text-5xl font-bold tracking-tight ${
            status === "redeemed" || status === "archived"
              ? "text-neutral-400"
              : "text-emerald-600"
          }`}
        >
          {formatMoney(card.balance)}
        </p>
        <div className="mt-3">
          <StatusBadge status={status} />
        </div>
      </div>
      <div className="mb-4">
        <Row label="Card Title" value={card.label || "—"} />
        <Row label="Original Value" value={formatMoney(card.originalBalance)} />
        <Row
          label="Last Redeemed"
          value={card.updatedAt ? dateFormat.format(card.updatedAt) : "—"}
        />
        <Row label="Card ID" value={card.id} />
      </div>

      <p className="text-center text-xs text-neutral-400">
        Show this to your server when redeeming
      </p>
    </div>
  );
}
