import ProductsClientWrapper from "@/components/products/ProductsClientWrapper";
import { getProducts } from "@/lib/api/products";
import { Spinner } from "@heroui/react";
import { Suspense } from "react";

export default async function JobsPage() {
    
  const products = await getProducts();
    // console.log(products)
  return (
    <div className="min-h-screen bg-[#09090b] ">
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-18 ">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
            Explore Products
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Browse quality products from trusted sellers and find exactly what
            you are looking for.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex h-[60vh] items-center justify-center">
              <Spinner size="lg" />
            </div>
          }
        >
          <ProductsClientWrapper initialProducts={products}/>
        </Suspense>
      </main>
    </div>
  );
}
