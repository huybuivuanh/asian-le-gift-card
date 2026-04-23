import type { Metadata } from 'next';
import { getCard } from '@/lib/cards';
import BalanceCard from '@/components/BalanceCard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const card = await getCard(id);
  return {
    title: card ? `Gift Card — ${card.label || 'Asian LE'}` : 'Gift Card',
    description: card ? `Balance: $${card.balance.toFixed(2)}` : 'Gift card not found',
  };
}

export default async function CardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let card = null;
  let fetchError = false;

  try {
    card = await getCard(id);
  } catch {
    fetchError = true;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4 py-12">
      <div className="w-full max-w-[400px]">
        {fetchError ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-neutral-800">Something went wrong</p>
            <p className="mt-2 text-sm text-neutral-500">Please try again.</p>
          </div>
        ) : card === null ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-neutral-800">Card not found</p>
            <p className="mt-2 text-sm text-neutral-500">
              This QR code doesn&apos;t match any gift card. Please check with the restaurant.
            </p>
          </div>
        ) : (
          <BalanceCard card={card} />
        )}
      </div>
    </main>
  );
}
