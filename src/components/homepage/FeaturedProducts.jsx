import { getFeaturedProducts } from "@/lib/api/products";
import ProductCard from "../products/ProductCard";
import Link from "next/link";

export default async function FeaturedPage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="border-y border-zinc-800 bg-linear-to-b from-black to-zinc-950 py-16 text-white">
      <main className="w-full max-w-7xl mx-auto px-4 md:px-8 ">
        <div className="mb-8 text-center">
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
            Explore Featured Products
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Browse quality products from trusted sellers and find exactly what
            you are looking for.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/products">
            <button className="rounded-xl border border-zinc-700 px-6 py-3 transition hover:border-[#0A7C6E] hover:text-[#0A7C6E]">
              View All Products
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
