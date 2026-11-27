import { serverFetch } from "../core/server";


export const getOrdersOfBuyer = async (buyerId) => {
  // console.log("buyerid", buyerId)
  if (!buyerId) return [];
  return serverFetch(`/api/orders/buyer/${buyerId}`);
};