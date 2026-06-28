
import CheckoutPageClient from "@/components/products/CheckoutPage";
import { getProductById } from "@/lib/api/products";
import { getUserSession } from "@/lib/core/session";

export default async function Page({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  const user = await getUserSession();

  return (
    <CheckoutPageClient 
      buyer={user} 
      product={product} 
    />
  );
}