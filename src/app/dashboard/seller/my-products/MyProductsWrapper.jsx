"use client";

import React, { useMemo, useState } from "react";
import MyProductCard from "./MyProductCard";
import SearchAndFilterBar from "@/components/products/SearchAndFilter";

const MyProductsWrapper = ({ initialProducts = [] }) => {
  const [filters, setFilters] = useState({
    searchQuery: "",
    category: "All",
  });

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const filteredProducts = useMemo(() => {
    const safeProducts = Array.isArray(initialProducts) ? initialProducts : [];

    return safeProducts.filter((product) => {
      const search = (filters.searchQuery || "").toLowerCase();
      const matchesSearch =
        (product.title || "").toLowerCase().includes(search);
      const matchesCategory =
        filters.category === "All" || product.category.toLowerCase() === filters.category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, filters]);

  return (
    <div className="flex flex-col gap-4">
      <SearchAndFilterBar  filters={filters} onFilterChange={handleFilterChange}/>
      {filteredProducts.map((product) => (
        <div key={product._id}>
          <MyProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default MyProductsWrapper;
