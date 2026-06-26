
import { Button } from "@heroui/react";
import { Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const sellerProducts = []

const MyProductsPage = async () => {
  return (
    <div className="max-w-7xl mx-auto bg-black text-white px-4 sm:px-6 py-16">
      <div className="text-center  mb-8 space-y-5">
        <h1 className="text-3xl md:text-4xl font-bold">My Products</h1>
        <p className="text-zinc-400 font-medium">
          Manage and review all your products.
        </p>
      </div>
      <div className="">
        {sellerProducts?.length === 0 ? (
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
          <div
            key={product._id}
            className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-5 p-5">
              {/* Product Image */}

              <div className="h-36 w-36 overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={150}
                  height={150}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {product.title}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      {product.category}
                    </p>
                  </div>

                  <Chip
                    color={product.stockQuantity > 0 ? "success" : "danger"}
                    variant="flat"
                  >
                    {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
                  </Chip>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Price</p>
                    <p className="font-semibold text-lg text-(--primary)">
                      ${product.price}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Stock</p>
                    <p className="font-semibold">{product.stockQuantity}</p>
                  </div>

                  <div>
                    <p className="text-slate-500">Condition</p>
                    <p>{product.condition}</p>
                  </div>

                  <div>
                    <p className="text-slate-500">Created</p>
                    <p>{new Date(product.createdAt).toDateString()}</p>
                  </div>
                </div>

                {/* Actions */}

                <div className="mt-6 flex gap-3">
                  <Link href={`/seller/products/edit/${product._id}`}>
                    <Button color="primary">Edit</Button>
                  </Link>

                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProductsPage;
