import ProductImageGallery from "@/components/products/ProductImageGallery";
import { getProductById } from "@/lib/api/products";
import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import {
  FiTag,
  FiTool,
  FiBox,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiPhone,
  FiMail,
  FiShoppingCart,
} from "react-icons/fi";

// --- Helper Functions ---
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-white">
        Product not found.
      </div>
    );
  }

  const isAvailable = product?.status === "available" && product?.stockQuantity > 0;

  return (
    <div className="min-h-screen bg-[#09090b] py-16 px-4 font-sans text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* --- 1. Header Section --- */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-[#18181b] p-6 shadow-2xl sm:p-10">
          {/* Decorative background glow */}
          <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#0A7C6E] opacity-5 blur-[100px]" />

          <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
            {/* Title & Badges */}
            <div>
              <h1 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight capitalize">
                {product?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-zinc-400">
                <span className="font-medium text-zinc-300">
                  Sold by {product?.sellerInfo?.name}
                </span>
                <span>•</span>
                <span className="rounded-md bg-[#0A7C6E]/10 px-3 py-1 text-sm font-medium text-[#0A7C6E] capitalize">
                  {product?.category}
                </span>
              </div>
            </div>

            {/* Price Display */}
            <div className="flex w-full flex-col md:w-auto md:items-end">
              <div className="rounded-xl border border-[#0A7C6E]/20 bg-[#0A7C6E]/10 px-6 py-3 text-3xl font-bold text-[#0A7C6E]">
                ৳ {product?.price?.toLocaleString()}
              </div>
              <p className="mt-3 flex items-center justify-center gap-1 text-xs text-zinc-500 md:justify-end">
                <FiClock /> Posted{" "}
                {formatDate(product?.createdAt.$date || product?.createdAt)}
              </p>
            </div>
          </div>

          {/* --- 2. Quick Info Badges --- */}
          <div className="mt-10 grid grid-cols-2 gap-3 border-t border-zinc-800/80 pt-8 md:grid-cols-4">
            <div className="flex flex-col gap-1 rounded-xl border border-zinc-800/50 bg-[#27272a]/50 p-4">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <FiTag className="text-[#0A7C6E]" /> Category
              </div>
              <div className="font-medium capitalize">{product?.category}</div>
            </div>

            <div className="flex flex-col gap-1 rounded-xl border border-zinc-800/50 bg-[#27272a]/50 p-4">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <FiTool className="text-[#0A7C6E]" /> Condition
              </div>
              <div className="font-medium capitalize">{product?.condition}</div>
            </div>

            <div className="flex flex-col gap-1 rounded-xl border border-zinc-800/50 bg-[#27272a]/50 p-4">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <FiBox className="text-[#0A7C6E]" /> Stock
              </div>
              <div className="font-medium">{product?.stockQuantity} Unit(s)</div>
            </div>

            <div className="flex flex-col gap-1 rounded-xl border border-zinc-800/50 bg-[#27272a]/50 p-4">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <FiCalendar className="text-[#0A7C6E]" /> Listed On
              </div>
              <div className="font-medium">
                {formatDate(product?.createdAt?.$date || product?.createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. Main Content Area --- */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left Column (Images & Description) */}
          <div className="flex flex-col space-y-8 md:col-span-2">
            {/* Image Slider Component */}
            <section>
              <ProductImageGallery images={product?.image} />
            </section>

            {/* Description Component */}
            <section className="mt-4">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <div className="h-6 w-1.5 rounded-full bg-[#0A7C6E]"></div>
                Product Description
              </h2>
              {product?.description && product?.description !== "null" ? (
                <div className="whitespace-pre-wrap rounded-2xl border border-zinc-800 bg-[#18181b] p-6 leading-relaxed text-zinc-300">
                  {product?.description}
                </div>
              ) : (
                <p className="rounded-2xl border border-dashed border-zinc-800 bg-[#18181b] p-6 italic text-zinc-500">
                  No description provided by the seller.
                </p>
              )}
            </section>
          </div>

          {/* Right Column (Sidebar: Action & Seller Info) */}
          <div className="space-y-6">
            
            {/* Action Card: Purchase */}
            <div className="rounded-2xl border border-zinc-800 bg-[#18181b] p-6">
              <h3 className="mb-4 border-b border-zinc-800/60 pb-4 text-lg font-bold">
                Purchase Order
              </h3>
              
              {isAvailable ? (
                <Link href={`/products/${product?._id || id}/checkout`} className="block w-full">
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A7C6E] py-4 px-4 font-bold text-white shadow-[0_0_15px_rgba(10,124,110,0.3)] transition-all hover:bg-[#08685d] hover:shadow-[0_0_25px_rgba(10,124,110,0.5)]">
                    <FiShoppingCart size={20} />
                    Order Now
                  </button>
                </Link>
              ) : (
                <button 
                  disabled 
                  className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-zinc-800 py-4 px-4 font-bold text-zinc-500"
                >
                  <FiShoppingCart size={20} />
                  Out of Stock
                </button>
              )}
              
              <p className="mt-4 text-center text-xs text-zinc-500">
                Secure transaction via bKroy guarantees.
              </p>
            </div>

            {/* Seller Information Card */}
            <div className="rounded-2xl border border-zinc-800 bg-[#18181b] p-6">
              <h3 className="mb-6 border-b border-zinc-800/60 pb-4 text-lg font-bold">
                Seller Information
              </h3>

              <ul className="mb-8 space-y-4 text-sm text-zinc-300">
                <li className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A7C6E]/20 text-lg font-bold text-[#0A7C6E]">
                    {product?.sellerInfo?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-base font-medium text-white">
                      {product?.sellerInfo?.name}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1 text-xs text-green-400">
                      <FiCheckCircle size={12} /> Verified Member
                    </div>
                  </div>
                </li>
              </ul>

              {/* Contact Buttons - Demoted to secondary style to highlight Order button */}
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${product?.sellerInfo?.phone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-[#27272a] py-3.5 px-4 font-medium text-white transition-all hover:bg-[#3f3f46]"
                >
                  <FiPhone size={18} />
                  {product?.sellerInfo?.phone}
                </a>
                <a
                  href={`mailto:${product.sellerInfo?.email}?subject=Inquiry about ${product?.title} on bKroy`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-[#27272a] py-3.5 px-4 font-medium text-white transition-all hover:bg-[#3f3f46]"
                >
                  <FiMail size={18} />
                  Email Seller
                </a>
              </div>
            </div>

            {/* Status Card */}
            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#27272a]/30 p-4">
              <span className="text-sm text-zinc-400">Listing Status</span>
              <span
                className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${
                  isAvailable
                    ? "border-green-500/20 bg-green-500/10 text-green-400"
                    : "border-red-500/20 bg-red-500/10 text-red-400"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isAvailable ? "animate-pulse bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                {isAvailable ? "Available" : "Sold Out"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;