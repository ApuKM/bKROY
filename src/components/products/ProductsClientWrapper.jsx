"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductFilterBar from "./ProductsFilter";
import ProductCard from "./ProductCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaginationWithSummary } from "./Pagination";

export default function ProductsClientWrapper({ products, total }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  const [filters, setFilters] = useState({
    searchQuery: searchParams.get("searchQuery") || "",
    category: searchParams.get("category") || "All",
    sort: searchParams.get("sort") || "latest",
    page: parseInt(searchParams.get("page") || "1"),
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const newSearchQuery = searchParams.get("searchQuery") || "";
    const newCategory = searchParams.get("category") || "All";
    const newSort = searchParams.get("sort") || "latest";
    const newPage = parseInt(searchParams.get("page") || "1");

    setFilters((prev) => {
      if (
        prev.searchQuery === newSearchQuery &&
        prev.category === newCategory &&
        prev.sort === newSort &&
        prev.page === newPage
      ) {
        return prev;
      }
      return {
        searchQuery: newSearchQuery,
        category: newCategory,
        sort: newSort,
        page: newPage,
      };
    });
  }, [searchParams]);
  // 2. Handle state updates from the filter bar
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, ...newFilters };
      const changedFilterKeys = Object.keys(newFilters).filter(
        (key) => key !== "page"
      );

      if (changedFilterKeys.length > 0) {
        updatedFilters.page = 1;
      }

      return updatedFilters;
    });
  };
  // Dedicated handler for pagination clicks
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();

      if (filters.searchQuery) params.set("searchQuery", filters.searchQuery);
      if (filters.category !== "All") params.set("category", filters.category);
      if (filters.sort !== "latest") params.set("sort", filters.sort);
      if (filters.page > 1) params.set("page", filters.page.toString()); // Only add page if > 1

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      const currentUrl = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      if (newUrl !== currentUrl) {
        router.replace(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, pathname, router, searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      {/* Renders your marketplace search and filter inputs */}
      <ProductFilterBar filters={filters} onFilterChange={handleFilterChange} />

      {products?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-8">
            <PaginationWithSummary
              totalItems={total}
              currentPage={filters.page}
              onPageChange={handlePageChange}
            />
          </div>
        </>
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
