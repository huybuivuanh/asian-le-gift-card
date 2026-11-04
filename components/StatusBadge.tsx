import type { CardStatus } from "@/lib/cards";

const styles: Record<CardStatus, string> = {
  active: "bg-emerald-100 text-emerald-800",
  redeemed: "bg-neutral-100 text-neutral-600",
  inactive: "bg-red-100 text-red-700",
  archived: "bg-neutral-100 text-neutral-600",
};

const labels: Record<CardStatus, string> = {
  active: "Active",
  redeemed: "Fully Redeemed",
  inactive: "Inactive",
  archived: "Archived",
};

export default function StatusBadge({ status }: { status: CardStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
