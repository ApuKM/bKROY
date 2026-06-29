import BuyerPaymentHistory from "../PaymentHistoryWrapper";
import { getPaymentsOfBuyer } from "@/lib/api/payments";

export const dynamic = "force-dynamic";

export default async function PaymentHistoryPage({ params }) {
  const { id } = await params;
  console.log(id)
  console.log("buyerId used for search:", id);
  let transactions = [];

  try {
    transactions = await getPaymentsOfBuyer(id);
    console.log(transactions)
  } catch (error) {
    console.error("Failed to load payment history:", error);
  }

  return <BuyerPaymentHistory transactions={transactions} />;
}
