// src/app/dashboard/buyer/wishlist/page.jsx
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { getProductById } from "@/lib/api/products";
import WishlistCard from "./WishListCard";
import { getWishListOfBuyer } from "@/lib/api/orders";

export const metadata = {
  title: "My Wishlist | bKroy",
  description: "View your saved products",
};

export default async function WishlistPage() {
  const user = await getUserSession();

  if (!user?.id) {
    redirect("/login");
  }

  let populatedWishlist = [];
  try {
    // 1. Fetch the raw wishlist items { productId, userId, createdAt }
    const rawWishlistItems = await getWishListOfBuyer(user.id);

    // 2. Fetch the actual product details for each saved productId
    if (rawWishlistItems && rawWishlistItems.length > 0) {
      const populatedPromises = rawWishlistItems.map(async (wishItem) => {
        try {
          const productData = await getProductById(wishItem.productId);
          
          // Return null if the product was deleted by the seller
          if (!productData) return null;

          // Merge the product data with the wishlist metadata
          return {
            ...productData,
            wishlistAddedAt: wishItem.createdAt,
            wishlistItemId: wishItem._id, 
            productId: wishItem.productId // Ensure this exists for the delete button
          };
        } catch (err) {
          console.error(`Failed to fetch product ${wishItem.productId}`, err);
          return null;
        }
      });

      // 3. Resolve all promises and filter out any nulls (deleted products)
      const results = await Promise.all(populatedPromises);
      populatedWishlist = results.filter(Boolean);
    }
  } catch (error) {
    console.error("Failed to process wishlist:", error);
  }

  return (
    <div className="min-h-screen bg-[#09090b] py-0 px-4 font-sans text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-10 border-b border-zinc-800/80 pb-6">
          <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A7C6E]/10 text-[#0A7C6E]">
              <FiHeart size={24} />
            </div>
            My Wishlist
          </h1>
          <p className="mt-3 text-zinc-400">
            Keep track of the products you love and want to purchase later.
          </p>
        </div>

        {/* Content Area */}
        {populatedWishlist.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {populatedWishlist.map((item) => (
              // item now contains the full product data!
              <WishlistCard key={item.productId} item={item} userId={user.id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-800 bg-[#18181b]/50 py-24 px-6 text-center shadow-xl">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800/50 text-zinc-500 shadow-inner">
              <FiHeart size={40} />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-white">Your wishlist is empty</h2>
            <p className="mb-8 max-w-md text-zinc-400 leading-relaxed">
              You havent saved any items yet. Browse our marketplace to find products youd like to save for later.
            </p>
            <Link
              href="/products"
              className="flex items-center gap-2 rounded-xl bg-[#0A7C6E] py-3.5 px-8 font-bold text-white shadow-[0_0_15px_rgba(10,124,110,0.3)] transition-all hover:bg-[#08685d] hover:shadow-[0_0_25px_rgba(10,124,110,0.5)]"
            >
              <FiShoppingBag size={18} /> Explore Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}