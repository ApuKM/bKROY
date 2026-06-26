'use server'

import { serverMutation } from "../core/server";

export const createProduct = async (newProduct) => {
    return serverMutation('/api/products', newProduct);
}