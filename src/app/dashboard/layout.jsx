import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="lg:grid grid-cols-12 gap-6 min-h-screen max-w-7xl sm:px-4 lg:px-6 py-16 bg-black text-white">
      <aside className="col-span-2 h-full sticky top-0 ">
        <Sidebar />
      </aside>

      <main className="col-span-10 h-full">{children}</main>
    </div>
  );
}
