type Status = "active" | "redeemed" | "inactive" | "archived";

const styles: Record<Status, string> = {
  active: "bg-emerald-100 text-emerald-800",
  redeemed: "bg-neutral-100 text-neutral-600",
  inactive: "bg-red-100 text-red-700",
  archived: "bg-neutral-100 text-neutral-600",
};

const labels: Record<Status, string> = {
  active: "Active",
  redeemed: "Fully Redeemed",
  inactive: "Inactive",
  archived: "Archived",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
