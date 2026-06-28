"use server";

import { serverMutation } from "../core/server";

export const makeAnOrder = async (orderInfo) => {
  return serverMutation("/api/orders", orderInfo);
};