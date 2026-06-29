import { requireRole } from "@/lib/core/session";

export default async function RecruiterLayout({
  children,
}) {
  await requireRole("seller");
  return children;
}