// src/app/api/verify-payment/route.js
import { stripe } from "@/lib/stripe";
import { makeAnOrder } from "@/lib/actions/orders";
import { serverMutation } from "@/lib/core/server";
import { redirect } from "next/navigation";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    redirect("/?error=invalid_session");
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    redirect("/?error=stripe_error");
  }

  if (session.payment_status === "paid") {
    const { metadata, amount_total } = session;
    
    // Clean up IDs
    const buyerId = String(metadata?.buyerId || "").replace(/[}\s]+$/g, "").trim();
    const sellerId = String(metadata?.sellerId || "").replace(/[}\s]+$/g, "").trim();

    const orderInfo = {
      buyerInfo: { userId: buyerId, name: metadata.buyerName, email: session.customer_details?.email },
      sellerInfo: { userId: sellerId, name: metadata.sellerName, email: metadata.sellerEmail },
      productId: metadata.productId,
      paymentStatus: "paid",
      orderStatus: "processing",
    };

    try {
      // 1. Make the order (this handles revalidatePath internally)
      const res = await makeAnOrder(orderInfo);

      if (res.insertedId) {
        // 2. Save the transaction
        await serverMutation("/api/transactions", {
          transactionId: session.payment_intent,
          orderId: res.insertedId,
          buyerId,
          sellerId,
          productId: metadata.productId,
          paymentAmount: amount_total / 100,
          paymentStatus: "Paid",
          paymentMethod: "Stripe",
          paymentDate: new Date().toISOString(),
          sessionId: session.id,
          buyerDetails: {
            name: metadata.buyerName,
            phone: metadata.buyerPhone,
            location: metadata.buyerLocation,
            email: session.customer_details?.email,
          },
        });
      }
    } catch (err) {
      console.error("Failed to save transaction:", err);
      // Let it fall through to redirect so the user still sees success
    }
  }

  // 3. Redirect to the actual UI page to render
  redirect(`/checkout/success?session_id=${sessionId}`);
}