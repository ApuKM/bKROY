import { requireRole } from "@/lib/core/session";


export default async function AdminDashBoardLayout({ children }) {
  await requireRole("admin");
  return children;
}
