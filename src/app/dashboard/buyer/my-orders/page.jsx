import { getOrdersOfBuyer } from "@/lib/api/orders";
import OrderListClient from "./OrderList";
import { getUserSession } from "@/lib/core/session";
import { getProductById } from "@/lib/api/products";

export default async function BuyerOrdersPage() {
  const user = await getUserSession();
  const orders = await getOrdersOfBuyer(user?.id);

const ordersWithProducts = await Promise.all(
  orders.map(async (order) => {
    const product = await getProductById(order.productId);
    // console.log(product)

    return {
      ...order,
      product,
    };
  })
);

  return (
    <div className="mx-auto max-w-5xl py-8">
      <h1 className="mb-6 text-2xl font-bold text-white px-6">My Orders</h1>
      <OrderListClient initialOrders={ordersWithProducts} />
    </div>
  );
}
