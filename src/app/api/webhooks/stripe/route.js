import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { serverMutation } from "@/lib/core/server";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  let event;

  try {
    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } else {
      // For local testing without webhook secret, just parse it
      event = JSON.parse(body);
    }
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Fulfill the purchase...
    try {
      // Extract metadata
      const { productId, buyerId, sellerId, buyerName, buyerPhone, buyerLocation } = session.metadata;
      console.log(productId, buyerName)
      const transactionData = {
        transactionId: session.payment_intent,
        buyerId: buyerId,
        sellerId: sellerId,
        productId: productId,
        paymentAmount: session.amount_total / 100,
        paymentStatus: session.payment_status === "paid" ? "Paid" : "Pending",
        paymentMethod: "Stripe",
        paymentDate: new Date(),
        sessionId: session.id,
        // Include buyer/order details so the backend can process the full order
        buyerDetails: {
          name: buyerName,
          phone: buyerPhone,
          location: buyerLocation,
          email: session.customer_details?.email,
        }
      };

      // Send the transaction data to the Express backend to handle DB storage
      await serverMutation("/api/transactions", transactionData, "POST");

    } catch (backendError) {
      console.error("Backend operation failed in webhook:", backendError);
      return NextResponse.json({ error: "Backend error" }, { status: 500 });
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
