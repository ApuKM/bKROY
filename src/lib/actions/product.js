'use server'

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createProduct = async (newProduct) => {
    return serverMutation('/api/products', newProduct);
}

export const updateProduct = async (
  id,
  updatedData,
) => {
  const result = serverMutation(`/api/products/${id}`, updatedData, "PATCH");
  revalidatePath("/dashboard/seller/my-products");
  return result;
};