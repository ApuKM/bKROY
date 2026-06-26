import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;


export const getProducts = async () =>{
    return serverFetch(`/api/products`);
}