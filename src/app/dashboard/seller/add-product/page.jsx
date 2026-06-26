import { FiShoppingBag } from "react-icons/fi";
import AddProductForm from "./AddProductForm";
import { getUserSession } from "@/lib/core/session";

const PostJobPage = async () => {
  const user = await getUserSession();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 p-6 md:p-12 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">Add New Product</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Fill out the details below to list a new product for sale.
          </p>
        </div>

        {/* Seller Info Banner */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl mb-8 p-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-zinc-800/50 rounded-lg">
              <FiShoppingBag className="text-zinc-300 text-lg" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                Listing as <span className="font-bold"> Store Name</span>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                  <span>Active Seller</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <AddProductForm user={user}/>
      </div>
    </div>
  );
};

export default PostJobPage;
