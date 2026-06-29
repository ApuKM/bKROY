import { stripe } from "@/lib/stripe";
import { serverMutation } from "@/lib/core/server";
import Link from "next/link";
import {
  FiCheckCircle,
  FiPackage,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";
import { makeAnOrder } from "@/lib/actions/orders";

export default async function CheckoutSuccessPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams?.session_id;

  if (!sessionId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Invalid Session</h1>
          <p className="mt-2 text-zinc-400">No payment session ID provided.</p>
          <Link
            href="/"
            className="mt-4 inline-block text-[#0A7C6E] hover:underline"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="mt-2 text-zinc-400">
            Failed to retrieve payment details.
          </p>
        </div>
      </div>
    );
  }

  if (session.payment_status !== "paid") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-yellow-500">
            Payment Pending
          </h1>
          <p className="mt-2 text-zinc-400">
            Your payment has not been completed yet.
          </p>
        </div>
      </div>
    );
  }

  // --- Payment is confirmed as "paid" by Stripe ---
  // Save the transaction to the Express backend
  const { metadata, amount_total } = session;
  const transactionId = session.payment_intent;
  const paymentAmount = amount_total / 100;
  const paymentDate = new Date();
  const buyerId = String(metadata?.buyerId || "")
    .replace(/[}\s]+$/g, "")
    .trim();
  const sellerId = String(metadata?.sellerId || "")
    .replace(/[}\s]+$/g, "")
    .trim();

  const orderInfo = {
    buyerInfo: {
      userId: buyerId,
      name: metadata.buyerName,
      email: session.customer_details?.email,
    },
    sellerInfo: {
      userId: sellerId,
      name: metadata.sellerName,
      email: metadata.sellerEmail,
    },
    productId: metadata.productId,
    paymentStatus: "paid",
    orderStatus: "processing",
  };

  try {
    const res = await makeAnOrder(orderInfo);

    if (!res.insertedId) {
      throw new Error("Order creation failed");
    }

    await serverMutation("/api/transactions", {
      transactionId: transactionId,
      orderId: res.insertedId,  
      buyerId,
      sellerId: metadata.sellerId,
      productId: metadata.productId,
      paymentAmount: paymentAmount,
      paymentStatus: "Paid",
      paymentMethod: "Stripe",
      paymentDate: paymentDate.toISOString(),
      sessionId: session.id,
      buyerDetails: {
        name: metadata.buyerName,
        phone: metadata.buyerPhone,
        location: metadata.buyerLocation,
        email: session.customer_details?.email,
      },
    });
  } catch (err) {
    console.error("Failed to save transaction to backend:", err);
    // We still show the success page even if backend save fails,
    // because the payment itself DID succeed on Stripe.
  }

  const paymentDateFormatted = paymentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-[#09090b] py-16 px-4 font-sans text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-zinc-800 bg-[#18181b] p-8 shadow-2xl md:p-12 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10 text-green-500">
            <FiCheckCircle size={48} />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
            Payment Successful!
          </h1>
          <p className="mb-8 text-zinc-400">
            Thank you for your purchase. Your order has been processed.
          </p>

          <div className="mb-8 rounded-2xl border border-zinc-800/50 bg-[#27272a]/30 p-6 text-left">
            <h2 className="mb-4 text-xl font-bold text-white border-b border-zinc-800/60 pb-3">
              Order Summary
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
              <div>
                <span className="block text-zinc-500">Transaction ID</span>
                <span className="font-medium text-zinc-300">
                  {transactionId}
                </span>
              </div>
              <div>
                <span className="block text-zinc-500">Payment Date</span>
                <span className="font-medium text-zinc-300">
                  {paymentDateFormatted}
                </span>
              </div>
              <div>
                <span className="block text-zinc-500">Amount Paid</span>
                <span className="font-bold text-[#0A7C6E]">
                  ৳ {paymentAmount.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="block text-zinc-500">Product ID</span>
                <span className="font-medium text-zinc-300">
                  {metadata.productId}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={`/dashboard/buyer/${buyerId}/payment-history`}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#0A7C6E] py-3 px-6 font-bold text-white transition-all hover:bg-[#08685d]"
            >
              <FiShoppingBag /> View My Orders
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-transparent py-3 px-6 font-bold text-white transition-all hover:bg-zinc-800"
            >
              <FiPackage /> Continue Shopping <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
