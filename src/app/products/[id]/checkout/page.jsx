import CheckoutPageClient from "@/components/products/CheckoutPage";
import { getProductById } from "@/lib/api/products";
import { getUserSession } from "@/lib/core/session";
import { Suspense } from "react";

export default async function Page({ params }) {
  return (
    <Suspense
      fallback={<div className="min-h-screen animate-pulse bg-zinc-950" />}
    >
      <CheckOutPageWrapper paramsPromise={params} />
    </Suspense>
  );
}

const CheckOutPageWrapper = async ({ paramsPromise }) => {
  const { id } = await paramsPromise;
  const product = await getProductById(id);
  const user = await getUserSession();
  return <CheckoutPageClient buyer={user} product={product} />;
};
