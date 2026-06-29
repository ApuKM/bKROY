// import { NextResponse } from "next/server";
// import { getUserSession } from "@/lib/core/session";
// import { serverFetch } from "@/lib/core/server";

// export async function GET(request) {
//   try {
//     const user = await getUserSession();

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { searchParams } = new URL(request.url);
//     const status = searchParams.get("status") || "";
//     const search = searchParams.get("search") || "";
//     const buyerId = searchParams.get("buyerId") || "";

//     // Forward the request to the Express backend
//     const queryString = new URLSearchParams({
//       userId: buyerId || user.id,
//       role: user.role,
//       status,
//       search,
//     }).toString();

//     const data = await serverFetch(`/api/transactions?${queryString}`);

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Failed to fetch transactions:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
