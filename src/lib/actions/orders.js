"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

//Order
export const makeAnOrder = async (orderInfo) => {
  revalidatePath("/api/orders");
  return serverMutation("/api/orders", orderInfo);
};

export const deleteAnOrder = async (orderId) => {
  console.log("orderIs from deleteAnOrder", orderId)
  const result = serverMutation(`/api/orders/${orderId}`, null, "DELETE");
  revalidatePath("/api/orders");
  return result;
};

//Wishlist
export const createAWishList = async (wishListInfo) => {
  revalidatePath("/api/wish-list");
  return serverMutation("/api/wish-list", wishListInfo);
};

export const deleteAWishList = async (productId, userId) => {
  revalidatePath("/api/wish-list"); 
  return serverMutation(`/api/wish-list/${productId}/${userId}`, null, "DELETE");
};