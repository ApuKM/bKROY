import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

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
      const client = await clientPromise;
      const db = client.db("bkroy_db");

      // Extract metadata
      const { productId, buyerId, sellerId, buyerName, buyerPhone, buyerLocation } = session.metadata;

      // 1. Create a Transaction record
      const transaction = {
        transactionId: session.payment_intent,
        buyerId: buyerId,
        sellerId: sellerId,
        productId: productId,
        paymentAmount: session.amount_total / 100, // stored in standard currency (e.g., BDT)
        paymentStatus: session.payment_status === "paid" ? "Paid" : "Pending",
        paymentMethod: "Stripe",
        paymentDate: new Date(),
        sessionId: session.id,
      };

      await db.collection("transactions").insertOne(transaction);

      // 2. Create or Update Order
      const order = {
        buyerId,
        sellerId,
        productId,
        buyerDetails: {
          name: buyerName,
          phone: buyerPhone,
          location: buyerLocation,
          email: session.customer_details?.email,
        },
        transactionId: session.payment_intent,
        totalAmount: session.amount_total / 100,
        status: "processing", // Order status
        paymentStatus: session.payment_status === "paid" ? "Paid" : "Pending",
        createdAt: new Date(),
      };

      await db.collection("orders").insertOne(order);

      // 3. (Optional) Update Product status or stock
      if (productId) {
         await db.collection("products").updateOne(
           { _id: new ObjectId(productId) },
           { $inc: { stockQuantity: -1 } }
         );
      }

    } catch (dbError) {
      console.error("Database operation failed in webhook:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
