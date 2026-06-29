import { serverFetch } from "../core/server";

const normalizeBuyerId = (value) => {
  if (typeof value !== "string") return "";

  return value.replace(/[}\s]+$/g, "").trim();
};

export const getPaymentsOfBuyer = async (buyerId) => {
  const normalizedBuyerId = normalizeBuyerId(buyerId);

  if (!normalizedBuyerId) return [];

  const data = await serverFetch(`/api/transactions?buyerId=${encodeURIComponent(normalizedBuyerId)}`);

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.transactions)) return data.transactions;
  if (Array.isArray(data?.payments)) return data.payments;

  return [];
};