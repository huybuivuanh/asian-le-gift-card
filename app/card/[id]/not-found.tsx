import CardShell from "@/components/CardShell";

export default function CardNotFound() {
  return (
    <CardShell>
      <div className="text-center">
        <p className="text-lg font-semibold text-neutral-800">Card not found</p>
        <p className="mt-2 text-sm text-neutral-500">
          This QR code doesn&apos;t match any gift card. Please check with the
          restaurant.
        </p>
      </div>
    </CardShell>
  );
}
