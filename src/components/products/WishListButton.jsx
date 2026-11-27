"use client";

import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { createAWishList, deleteAWishList } from "@/lib/actions/orders";
import { toast } from "@heroui/react";

export default function WishlistButton({ productId, userId, initialIsSaved }) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleWishlist = async () => {
    if (!userId) {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const previousState = isSaved;
      setIsSaved(!isSaved);
      const wishListInfo = { productId, userId };

      if (previousState) {
        // It was saved, so we need to DELETE it
        await deleteAWishList(productId, userId);
        toast.success("Removed from wishlist");
      } else {
        // It was not saved, so we CREATE it
        await createAWishList(wishListInfo);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      setIsSaved(isSaved);
      console.error("Failed to update wishlist", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={isLoading}
      className={`flex w-full items-center justify-center gap-2 rounded-xl border py-3 px-4 font-bold transition-all ${
        isSaved
          ? "border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20"
          : "border-zinc-700 bg-transparent text-white hover:bg-zinc-800"
      }`}
    >
      <FiHeart size={20} className={isSaved ? "fill-current" : ""} />
      {isSaved ? "Saved to Wishlist" : "Save to Wishlist"}
    </button>
  );
}
