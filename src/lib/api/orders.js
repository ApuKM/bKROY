import { serverFetch } from "../core/server";

export const getOrdersOfBuyer = async (buyerId) => {
  // console.log("buyerid", buyerId)
  if (!buyerId) return [];
  return serverFetch(`/api/orders/buyer/${buyerId}`);
};

export const getWishListOfBuyer = async (buyerId) => {
  // console.log("buyerid", buyerId)
  if (!buyerId) return [];
  return serverFetch(`/api/wish-list/${buyerId}`);
};

export const getBuyerStats = async (buyerId) => {
  if (!buyerId)
    return {
      totalOrders: 0,
      totalWishlist: 0,
      recentPurchases: 0,
      totalSpent: 0,
    };
  try {
    return await serverFetch(`/api/buyer-stats/${buyerId}`);
  } catch (error) {
    console.error("Failed to fetch buyer stats:", error);
    return {
      totalOrders: 0,
      totalWishlist: 0,
      recentPurchases: 0,
      totalSpent: 0,
    };
  }
};
