import ProductsClientWrapper from "@/components/products/ProductsClientWrapper";
import ProductsSkeleton from "@/components/products/ProductsSkeleton";
import { getProducts } from "@/lib/api/products";
import { Spinner } from "@heroui/react";
import { Suspense } from "react";

export default async function ProductsPage({ searchParams }) {
  const resolvedParams = await searchParams;

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

        <Suspense fallback={<ProductsSkeleton />}>
          <AsyncProductsList searchParams={resolvedParams} />
        </Suspense>
      </main>
    </div>
  );
}

// ২. ডাটা ফেচ করার জন্য আলাদা সার্ভার কম্পোনেন্ট
async function AsyncProductsList({ searchParams }) {
  const searchQuery = searchParams.searchQuery || "";
  const category = searchParams.category || "All";
  const sort = searchParams.sort || "latest";
  const page = parseInt(searchParams.page) || 1;
  const limit = 12;

  // এখানে Promise থ্রো হবে, যা উপরের Suspense ক্যাচ করবে
  const { total, products } = await getProducts({
    searchQuery,
    category,
    sort,
    page,
    limit,
  });

  return <ProductsClientWrapper products={products} total={total} />;
}
