"use server";

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

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
