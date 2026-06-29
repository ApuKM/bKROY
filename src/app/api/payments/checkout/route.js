import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getProductById } from "@/lib/api/products";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const body = await request.json();
    const { buyerInfo, sellerInfo, productId } = body;

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Fetch product details to ensure accurate pricing
    const product = await getProductById(productId);
    
    if (!product || product.error) {
       return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Amount should be in cents (assuming product.price is in BDT or standard currency)
    // 120 is delivery charge hardcoded in frontend, we should include it
    const unitAmount = Math.round((product.price) * 100); 
    const deliveryAmount = Math.round(120 * 100);

    console.log("buyerInfo.userId:", buyerInfo.userId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: buyerInfo.email,
      line_items: [
        {
          price_data: {
            currency: "bdt", // Change to usd if your Stripe account requires it
            product_data: {
              name: product.title || product.name,
              images: product.image && product.image.length > 0 ? [product.image[0]] : [],
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
        {
          price_data: {
             currency: "bdt",
             product_data: {
               name: "Delivery Charge",
             },
             unit_amount: deliveryAmount,
          },
          quantity: 1,
        }
      ],
      mode: "payment",
      metadata: {
        productId: productId,
        buyerId: buyerInfo.userId,
        sellerId: sellerInfo.userId,
        sellerName: sellerInfo.name,
        sellerEmail: sellerInfo.email,
        buyerName: buyerInfo.name,
        buyerPhone: buyerInfo.phone || "",
        buyerLocation: buyerInfo.location || "",
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products/${productId}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
