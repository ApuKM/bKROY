import { getProductsOfSeller } from "@/lib/api/products";
import { getUserSession } from "@/lib/core/session";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";
import MyProductsWrapper from "./MyProductsWrapper";

const MyProductsPage = async () => {
  const user = await getUserSession();
  const products = user?.id ? await getProductsOfSeller(user.id) : [];
  const sellerProducts = Array.isArray(products) ? products : [];

  return (
    <div className="max-w-7xl mx-auto bg-black text-white px-4 sm:px-6 ">
      <div className="text-center  mb-8 space-y-5">
        <h1 className="text-3xl md:text-4xl font-bold">My Products</h1>
        <p className="text-zinc-400 font-medium">
          Manage and review all your products.
        </p>
      </div>
      <div className="">
        {sellerProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-900 p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-400">
              <svg
                className="h-8 w-8 text-slate-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-zinc-300">
              No products found
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              Start selling by adding your first product.
            </p>

            <div className="mt-6">
              <Link href="/dashboard/seller/add-product">
                <Button className=" bg-white text-zinc-800 rounded-full px-6">
                  Add Product
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <MyProductsWrapper initialProducts={sellerProducts} />
        )}
      </div>
    </div>
  );
};

export default MyProductsPage;
