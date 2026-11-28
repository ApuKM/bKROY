"use client";

import { useState } from "react";
import Link from "next/link";
import { FiTrash2, FiShoppingCart, FiClock } from "react-icons/fi";
import { deleteAWishList } from "@/lib/actions/orders";
import { toast } from "@heroui/react";
import Image from "next/image";

export default function WishlistCard({ item, userId }) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Handle fallback if the _id represents the wishlist doc instead of the product
  const productId = item.productId || item._id;
  const isAvailable = item.status === "available" && item.stockQuantity > 0;

  const handleRemove = async (e) => {
    e.preventDefault(); // Prevents the Link wrapping the card from triggering
    setIsDeleting(true);
    try {
      await deleteAWishList(productId, userId);
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item");
      console.error(error);
      setIsDeleting(false); // Only re-enable if it failed
    }
  };

  return (
    <div className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#18181b] transition-all hover:border-zinc-700 hover:shadow-xl hover:shadow-[#0A7C6E]/5 ${isDeleting ? "opacity-50 pointer-events-none scale-95" : ""}`}>
      
      {/* Interactive Remove Button */}
      <button
        onClick={handleRemove}
        disabled={isDeleting}
        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-zinc-300 backdrop-blur-md transition-all hover:bg-red-500/20 hover:text-red-500"
        aria-label="Remove from wishlist"
      >
        <FiTrash2 size={16} />
      </button>

      <Link href={`/products/${productId}`} className="flex h-full flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#27272a]">
          {item.image && item.image[0] ? (
            <Image
              src={item.image[0]}
              alt={item.title}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-600 font-medium">
              No Image
            </div>
          )}
          
          {/* Out of Stock Overlay */}
          <div className="absolute left-3 top-3 z-10 flex gap-2">
            {!isAvailable && (
              <span className="rounded-md bg-red-500/90 px-2.5 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-md">
                Sold Out
              </span>
            )}
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex items-center justify-between text-xs font-medium text-zinc-500">
            <span className="rounded-md bg-zinc-800 px-2 py-1 capitalize">
              {item.category || "General"}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock size={12} />
              {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>

          <h3 className="mb-4 line-clamp-2 text-base font-semibold text-zinc-100">
            {item.title}
          </h3>

          <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-800/60">
            <div className="text-lg font-bold text-[#0A7C6E]">
              ৳ {item.price?.toLocaleString()}
            </div>
            
            {/* Quick Action Indicator */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-all group-hover:bg-[#0A7C6E] group-hover:text-white">
              <FiShoppingCart size={14} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}