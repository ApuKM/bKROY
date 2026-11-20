import { Suspense } from "react";
import BuyerPaymentHistory from "./BuyerPaymentHistory";
import { getPaymentsOfBuyer } from "@/lib/api/payments";


// 1. Inner async component that awaits params & fetches dynamic data
async function PaymentHistoryLoader({ paramsPromise }) {
  const { id } = await paramsPromise;
  let transactions = [];

  try {
    transactions = await getPaymentsOfBuyer(id);
  } catch (error) {
    console.error("Failed to load payment history:", error);
  }

  return <BuyerPaymentHistory transactions={transactions} />;
}

// 2. Clean skeleton fallback shown while dynamic data streams in
function PaymentHistorySkeleton() {
  return (
    <div className="p-6">
      <div className="mb-6 h-8 w-48 animate-pulse rounded-lg bg-zinc-800" />
      <div className="h-64 w-full animate-pulse rounded-xl border border-zinc-800 bg-[#18181b]" />
    </div>
  );
}

// 3. Outer Page stays synchronous so Next.js 16 can prerender the static shell
export default function PaymentHistoryPage({ params }) {
  return (
    <Suspense fallback={<PaymentHistorySkeleton />}>
      <PaymentHistoryLoader paramsPromise={params} />
    </Suspense>
  );
}