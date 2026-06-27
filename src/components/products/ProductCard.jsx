import React from "react";
import {
  FiTag,
  FiTool,
  FiBox,
  FiArrowRight,
} from "react-icons/fi";
import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const productId = product?._id?.$oid || product?._id;
  
  // Use the first image in the array, fallback to a placeholder if empty
  const mainImage = product?.image?.[0] || "/placeholder-image.jpg";

  return (
    <Card className="w-full max-w-md bg-[#18181b] border-none rounded-2xl overflow-hidden text-white shadow-lg font-sans">
      {/* Product Image Section - Sits flush at the top */}
      <div className="relative w-full h-52 bg-zinc-900">
        <Image
          src={mainImage}
          alt={product?.title || "Product image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        {/* Floating Price Tag over the image */}
        <div className="absolute bottom-3 right-3 bg-[#18181b]/90 backdrop-blur-md border border-[#0A7C6E]/30 text-[#0A7C6E] px-3 py-1.5 rounded-lg text-lg font-bold shadow-xl">
          ৳ {product?.price?.toLocaleString() || 0}
        </div>
      </div>

      {/* Content wrapper to replace the 'p-6' padding from your JobCard */}
      <div className="p-6 pt-5">
        <Card.Header className="flex flex-col items-start gap-2 pb-4 p-0">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-zinc-500 mb-1">
              Seller: <span className="text-zinc-300">{product?.sellerInfo?.name}</span>
            </span>
            <Card.Title className="text-2xl font-semibold tracking-tight text-white leading-none capitalize">
              {product?.title}
            </Card.Title>
          </div>

          <Card.Description className="text-sm text-zinc-400 leading-tight mb-2 line-clamp-2">
            {product?.description}
          </Card.Description>
        </Card.Header>

        <Card.Content className="flex flex-wrap gap-3 py-3 p-0">
          {/* Category Badge */}
          <div className="flex items-center gap-2 bg-[#27272a] px-3 py-1.5 rounded-full text-xs font-medium capitalize">
            <FiTag className="text-[#0A7C6E]" size={14} />
            <span>{product?.category}</span>
          </div>

          {/* Condition Badge */}
          <div className="flex items-center gap-2 bg-[#27272a] px-3 py-1.5 rounded-full text-xs font-medium capitalize">
            <FiTool className="text-[#0A7C6E]" size={14} />
            <span>{product?.condition}</span>
          </div>

          {/* Stock Badge */}
          <div className="flex items-center gap-2 bg-[#27272a] px-3 py-1.5 rounded-full text-xs font-medium">
            <FiBox className="text-[#0A7C6E]" size={14} />
            <span>Qty: {product?.stockQuantity}</span>
          </div>
        </Card.Content>

        <Card.Footer className="pt-4 p-0 mt-2 border-t border-zinc-800/60">
          <Link href={`/products/${productId}`} className="w-full mt-2">
            <button className="flex items-center justify-between w-full text-sm font-medium text-white hover:text-[#0A7C6E] transition-colors group">
              View Item Details
              <FiArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={16}
              />
            </button>
          </Link>
        </Card.Footer>
      </div>
    </Card>
  );
}