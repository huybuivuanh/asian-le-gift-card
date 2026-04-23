type Status = 'active' | 'redeemed' | 'deactivated' | 'not-found';

const styles: Record<Status, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  redeemed: 'bg-neutral-100 text-neutral-600',
  deactivated: 'bg-red-100 text-red-700',
  'not-found': 'bg-neutral-100 text-neutral-600',
};

const labels: Record<Status, string> = {
  active: 'Active',
  redeemed: 'Fully Redeemed',
  deactivated: 'Deactivated',
  'not-found': 'Not Found',
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
