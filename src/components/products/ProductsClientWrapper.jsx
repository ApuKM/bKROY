"use client";

import React, { useMemo, useState } from "react";
import ProductFilterBar from "./ProductsFilter";
import ProductCard from "./ProductCard";

export default function ProductsClientWrapper({ initialProducts }) {
  const [filters, setFilters] = useState({
    searchQuery: "",
    category: "All",
    sort: "latest",
  });
  // 2. Handle state updates from the filter bar
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const products = useMemo(() => {
    const filtered = initialProducts.filter((product) => {
      const search = filters.searchQuery.toLowerCase();

      const matchesSearch = product.title.toLowerCase().includes(search);

      const matchesCategory =
        filters.category === "All" || product.category === filters.category;

      return matchesSearch && matchesCategory;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sort) {
        case "price_asc":
          return a.price - b.price;

        case "price_desc":
          return b.price - a.price;

        default:
          return 0;
      }
    });

    return sorted;
  }, [initialProducts, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      {/* Renders your marketplace search and filter inputs */}
      <ProductFilterBar filters={filters} onFilterChange={handleFilterChange}/>

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
