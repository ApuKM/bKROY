
import ProductImageGallery from "@/components/products/ProductImageGallery";
import { getProductById } from "@/lib/api/products";
import {
  FiTag,
  FiTool,
  FiBox,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiPhone,
  FiMail,
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
//   console.log(product)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#09090b]">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* --- 1. Header Section --- */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0A7C6E] opacity-5 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
            {/* Title & Badges */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3 leading-tight capitalize">
                {product?.title}
              </h1>
              <div className="flex items-center flex-wrap gap-2 text-zinc-400">
                <span className="font-medium text-zinc-300">
                  Sold by {product?.sellerInfo?.name}
                </span>
                <span>•</span>
                <span className="text-[#0A7C6E] bg-[#0A7C6E]/10 px-3 py-1 rounded-md text-sm font-medium capitalize">
                  {product?.category}
                </span>
              </div>
            </div>

            {/* Price Display */}
            <div className="w-full md:w-auto flex flex-col md:items-end">
              <div className="text-3xl font-bold text-[#0A7C6E] bg-[#0A7C6E]/10 px-6 py-3 rounded-xl border border-[#0A7C6E]/20">
                ৳ {product?.price?.toLocaleString()}
              </div>
              <p className="mt-3 text-xs text-zinc-500 flex items-center justify-center md:justify-end gap-1">
                <FiClock /> Posted{" "}
                {formatDate(product?.createdAt.$date || product?.createdAt)}
              </p>
            </div>
          </div>

          {/* --- 2. Quick Info Badges --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 pt-8 border-t border-zinc-800/80">
            <div className="bg-[#27272a]/50 rounded-xl p-4 flex flex-col gap-1 border border-zinc-800/50">
              <div className="text-zinc-400 flex items-center gap-2 text-sm">
                <FiTag className="text-[#0A7C6E]" /> Category
              </div>
              <div className="font-medium capitalize">{product?.category}</div>
            </div>

            <div className="bg-[#27272a]/50 rounded-xl p-4 flex flex-col gap-1 border border-zinc-800/50">
              <div className="text-zinc-400 flex items-center gap-2 text-sm">
                <FiTool className="text-[#0A7C6E]" /> Condition
              </div>
              <div className="font-medium capitalize">{product?.condition}</div>
            </div>

            <div className="bg-[#27272a]/50 rounded-xl p-4 flex flex-col gap-1 border border-zinc-800/50">
              <div className="text-zinc-400 flex items-center gap-2 text-sm">
                <FiBox className="text-[#0A7C6E]" /> Stock
              </div>
              <div className="font-medium">{product?.stockQuantity} Unit(s)</div>
            </div>

            <div className="bg-[#27272a]/50 rounded-xl p-4 flex flex-col gap-1 border border-zinc-800/50">
              <div className="text-zinc-400 flex items-center gap-2 text-sm">
                <FiCalendar className="text-[#0A7C6E]" /> Listed On
              </div>
              <div className="font-medium">
                {formatDate(product?.createdAt?.$date || product?.createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* --- 3. Main Content Area --- */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column (Images & Description) */}
          <div className="md:col-span-2 space-y-8 flex flex-col">
            
            {/* Image Slider Component */}
            <section>
              <ProductImageGallery images={product?.image} />
            </section>

            {/* Description Component */}
            <section className="mt-4">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#0A7C6E] rounded-full"></div>
                Product Description
              </h2>
              {product?.description && product?.description !== "null" ? (
                <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap bg-[#18181b] p-6 rounded-2xl border border-zinc-800">
                  {product?.description}
                </div>
              ) : (
                <p className="text-zinc-500 italic bg-[#18181b] p-6 rounded-2xl border border-zinc-800 border-dashed">
                  No description provided by the seller.
                </p>
              )}
            </section>
          </div>

          {/* Right Column (Sidebar: Seller Info & Actions) */}
          <div className="space-y-6">
            
            {/* Action / Seller Card */}
            <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-6 border-b border-zinc-800/60 pb-4">
                Seller Information
              </h3>
              
              <ul className="space-y-4 text-sm text-zinc-300 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0A7C6E]/20 flex items-center justify-center text-[#0A7C6E] font-bold text-lg">
                    {product?.sellerInfo?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-white text-base">
                      {product?.sellerInfo?.name}
                    </div>
                    <div className="text-xs text-green-400 flex items-center gap-1 mt-0.5">
                      <FiCheckCircle size={12} /> Verified Member
                    </div>
                  </div>
                </li>
              </ul>

              {/* Contact Buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${product?.sellerInfo?.phone}`}
                  className="w-full flex justify-center items-center gap-2 bg-[#0A7C6E] hover:bg-[#0bb09d] text-zinc-950 font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(244,114,182,0.3)] hover:shadow-[0_0_25px_rgba(244,114,182,0.5)]"
                >
                  <FiPhone size={18} />
                  {product?.sellerInfo?.phone}
                </a>
                <a
                  href={`mailto:${product.sellerInfo?.email}?subject=Inquiry about ${product?.title} on bKroy`}
                  className="w-full flex justify-center items-center gap-2 bg-[#27272a] hover:bg-[#3f3f46] text-white font-medium py-3.5 px-4 rounded-xl transition-all border border-zinc-700"
                >
                  <FiMail size={18} />
                  Email Seller
                </a>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-[#27272a]/30 border border-[#f472b6]/20 rounded-2xl p-4 flex items-center justify-between">
              <span className="text-sm text-zinc-400">Listing Status</span>
              <span 
                className={`flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full border ${
                  product?.status === "available" 
                    ? "bg-green-500/10 text-green-400 border-green-500/20" 
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${product?.status === "available" ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
                {product?.status === "available" ? "Available" : "Sold Out"}
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;