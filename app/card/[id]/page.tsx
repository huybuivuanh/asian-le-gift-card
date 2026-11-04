import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCard, type GiftCard } from "@/lib/cards";
import BalanceCard from "@/components/BalanceCard";
import CardShell from "@/components/CardShell";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  let card: GiftCard | null = null;
  try {
    card = await getCard(id);
  } catch {
    // The page shows the error state; metadata just falls back to defaults.
  }
  return {
    title: card ? `Gift Card — ${card.label || "Asian Le"}` : "Gift Card",
    // Keep the balance out of link previews and search results.
    description: "Check your Asian Le Restaurant gift card balance.",
    robots: { index: false, follow: false },
  };
}

export default async function CardPage({ params }: Props) {
  const { id } = await params;

  let card: GiftCard | null;
  try {
    card = await getCard(id);
  } catch (error) {
    console.error(`Failed to load gift card ${id}`, error);
    return (
      <CardShell>
        <div className="text-center">
          <p className="text-lg font-semibold text-neutral-800">
            Something went wrong
          </p>
          <p className="mt-2 text-sm text-neutral-500">Please try again.</p>
        </div>
      </CardShell>
    );
  }

  if (!card) notFound();

  return (
    <CardShell>
      <BalanceCard card={card} />
    </CardShell>
  );
}
