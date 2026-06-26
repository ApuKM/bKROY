import React from "react";
import ProductFilterBar from "./ProductsFilter";
import ProductCard from "./ProductCard";

export default function ProductsClientWrapper({ products }) {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      {/* Renders your marketplace search and filter inputs */}
      <ProductFilterBar />

      {products?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 mt-6 text-center border border-dashed border-zinc-800 rounded-2xl">
          <p className="text-lg font-medium text-white mb-1">No items found</p>
          <p className="text-sm text-zinc-400">
            Try adjusting your filters or search query to find the item you are
            looking for.
          </p>
        </div>
      )}
    </div>
  );
}
