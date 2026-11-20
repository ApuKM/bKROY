import { Suspense } from "react";
import ProductDetailsContent from "@/components/products/ProductDetailsContent";

export default function ProductDetailsPage({ params }) {
  return (
    <Suspense fallback={<div className="min-h-screen animate-pulse bg-zinc-950" />}>
      {/* Pass the params promise inside the Suspense boundary */}
      <ProductDetailsContent paramsPromise={params} />
    </Suspense>
  );
}

