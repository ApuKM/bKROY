// middleware.ts or proxy.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  let session = null;
  console.log("first, proxu runs")

  try {
    // Authenticate the user securely at the edge using incoming headers
    session = await auth.api.getSession({
      headers: request.headers,
    });
  } catch {
    session = null;
  }

  // If the user isn't logged in, block them and save their requested page
  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout",
    "/dashboard/buyer/:path*",
    "/dashboard/seller/:path*",
    "/dashboard/admin/:path*",
  ],
};
