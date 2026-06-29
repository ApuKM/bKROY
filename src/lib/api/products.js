import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async (filters) => {
  const params = new URLSearchParams();

  if (filters.searchQuery) params.append("searchQuery", filters.searchQuery);
  if (filters.category && filters.category !== "All")
    params.append("category", filters.category.toLowerCase());
  if (filters.sort)
    params.append("sort", filters.sort);

  // NEW: Append Pagination Parameters
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("perPage", filters.limit.toString());

  const queryString = params.toString();
  const url = queryString ? `/api/products?${queryString}` : "/api/products";
  return serverFetch(url);
};

export const getFeaturedProducts = async () => {
  return serverFetch(`/api/products/featured`);
};

export const getProductById = async (id) => {
  return serverFetch(`/api/products/${id}`);
};

export const getProductsOfSeller = async (sellerId) => {
  if (!sellerId) return [];
  return serverFetch(`/api/products/seller/${sellerId}`);
};
