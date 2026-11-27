// src/app/checkout/success/page.jsx
import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { FiCheckCircle, FiPackage, FiShoppingBag, FiArrowRight } from "react-icons/fi";

export default async function CheckoutSuccessPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams?.session_id;

  if (!sessionId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-white">
        <h1 className="text-2xl font-bold text-red-500">Invalid Session</h1>
      </div>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-white">
        <h1 className="text-2xl font-bold text-yellow-500">Payment Pending</h1>
      </div>
    );
  }

  const { metadata, amount_total, payment_intent } = session;
  const paymentAmount = amount_total / 100;
  
  const paymentDateFormatted = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-[#09090b] py-16 px-4 font-sans text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-zinc-800 bg-[#18181b] p-8 shadow-2xl md:p-12 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10 text-green-500">
            <FiCheckCircle size={48} />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">Payment Successful!</h1>
          
          <div className="mb-8 mt-8 rounded-2xl border border-zinc-800/50 bg-[#27272a]/30 p-6 text-left">
            <h2 className="mb-4 text-xl font-bold text-white border-b border-zinc-800/60 pb-3">Order Summary</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
              <div>
                <span className="block text-zinc-500">Transaction ID</span>
                <span className="font-medium text-zinc-300">{payment_intent}</span>
              </div>
              <div>
                <span className="block text-zinc-500">Amount Paid</span>
                <span className="font-bold text-[#0A7C6E]">৳ {paymentAmount.toLocaleString()}</span>
              </div>
              {/* Add other summary fields as needed */}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href={`/dashboard/buyer/my-orders`} className="flex items-center justify-center gap-2 rounded-xl bg-[#0A7C6E] py-3 px-6 font-bold text-white transition-all hover:bg-[#08685d]">
              <FiShoppingBag /> View My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}