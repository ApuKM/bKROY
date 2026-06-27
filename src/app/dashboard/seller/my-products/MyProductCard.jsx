"use client";

import { Button, Chip } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const MyProductCard = ({ product }) => {
  return (
    <div className="group flex flex-col gap-5 rounded-3xl border border-white/10 bg-[#111827] p-5 transition-all duration-300 hover:border-[#0A7C6E]/40 hover:shadow-[0_20px_60px_rgba(10,124,110,0.18)] md:flex-row">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-[#1A2234] md:h-40 md:w-40 md:flex-shrink-0">
        <Image
          src={product.image?.[0]}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {product.title}
              </h2>

              <p className=" text-sm capitalize text-zinc-400">
                {product.category}
              </p>
            </div>

            <Chip
              variant="soft"
              classNames={{
                base:
                  product.stockQuantity
                    ? "bg-[#0A7C6E]/15 border border-[#0A7C6E]/30"
                    : "bg-red-500/15 border border-red-500/30",
                content: product.stockQuantity
                  ? "text-[#30C9B4] font-medium"
                  : "text-red-400 font-medium",
              }}
            >
              {product.stockQuantity ? "Available" : "Sold Out"}
            </Chip>
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-400">
            {product.description}
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-2 flex flex-col gap-4 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Price:
            </p>

            <h3 className="text-2xl font-bold text-[#0A7C6E]">
              ৳{product.price}
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={`/products/${product._id}`}>
              <Button
                className="bg-[#0A7C6E] font-semibold text-white hover:bg-[#09685d]"
                size="sm"
              >
                View Details
              </Button>
            </Link>

            <Link href={`/dashboard/seller/my-products/edit/${product._id}`}>
              <Button
                variant="tertiary"
                size="sm"
                className="border-white/15 text-zinc-500 bg-zinc-800"
              >
                Edit
              </Button>
            </Link>

            <Button
              variant="danger-soft"
              size="sm"
              onPress={() => handleDelete(product._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MyProductCard;