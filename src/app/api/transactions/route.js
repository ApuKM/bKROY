import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/core/session";
import clientPromise from "@/lib/db";

export async function GET(request) {
  try {
    const user = await getUserSession();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const role = user.role; // Assuming role is available in session
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const client = await clientPromise;
    const db = client.db("bkroy_db");

    let query = {};

    // Buyer sees only their own transactions
    if (role === "buyer" || role === "seller") {
       // Sellers might need to see transactions where they are sellerId, but for now we focus on buyer history
       query.buyerId = user.id;
    } else if (role !== "admin") {
       // For safety, if they are not admin/buyer/seller
       query.buyerId = user.id;
    }

    // Status filter (e.g., Pending, Paid, Failed)
    if (status && status !== "All") {
      query.paymentStatus = status;
    }

    // Search filter (e.g., by transaction ID)
    if (search) {
      query.transactionId = { $regex: search, $options: "i" };
    }

    const transactions = await db
      .collection("transactions")
      .find(query)
      .sort({ paymentDate: -1 })
      .toArray();

    // Calculate revenue for admins
    let totalRevenue = 0;
    if (role === "admin") {
      totalRevenue = transactions
        .filter((t) => t.paymentStatus === "Paid")
        .reduce((sum, t) => sum + (t.paymentAmount || 0), 0);
    }

    return NextResponse.json({
      transactions,
      totalRevenue,
    });
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
