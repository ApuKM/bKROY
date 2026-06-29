import { getOrdersOfBuyer } from "@/lib/api/orders";
import OrderListClient from "./OrderList";
import { getUserSession } from "@/lib/core/session";
import { getProductById } from "@/lib/api/products";

export default async function BuyerOrdersPage() {
  const user = await getUserSession();
  
  let orders = [];

  // 1. Only fetch if we actually have a logged-in user
  if (user?.id) {
    try {
      const response = await getOrdersOfBuyer(user.id);
      
      // 2. CRITICAL: Safely verify that the response is actually an array
      orders = Array.isArray(response) ? response : [];
    } catch (error) {
      console.error("Failed to fetch buyer orders:", error);
      orders = []; // Fallback to empty array on network failure
    }
  }

  // 3. Since orders is guaranteed to be an array now, .map() will never crash
  const ordersWithProducts = await Promise.all(
    orders.map(async (order) => {
      try {
        const product = await getProductById(order.productId);
        return {
          ...order,
          product,
        };
      } catch {
        return {
          ...order,
          product: null, // Don't let one broken product crash the whole page
        };
      }
    })
  );

  return (
    <div className="mx-auto max-w-5xl py-8">
      <h1 className="mb-6 text-2xl font-bold text-white px-6">My Orders</h1>

      {ordersWithProducts && ordersWithProducts.length > 0 ? (
        <OrderListClient initialOrders={ordersWithProducts} />
      ) : (
        <div className="px-6 py-12 text-center text-gray-400">
          <p className="text-lg">You dont have any orders yet.</p>
        </div>
      )}
    </div>
  );
}