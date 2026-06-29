"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown, Button, Label, Separator, Avatar } from "@heroui/react";
import { Home, Package, Layers, LayoutDashboard } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";

export default function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const dashboardHref =
  user?.role === "buyer"
    ? "/dashboard/buyer"
    : user?.role === "seller"
    ? "/dashboard/seller"
    : user?.role === "admin"
    ? "/dashboard/admin"
    : ""; 

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Package },
    { name: "Categories", href: "/categories", icon: Layers },
    { name: "Dashboard", href: dashboardHref, icon: Label},
  ];

  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f0f10] text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* লোগো */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A7C6E] text-xl font-bold">
            B
          </div>
          <div>
            <h2 className="text-lg font-bold leading-none">bKROY</h2>
            <p className="text-xs text-gray-400">Solutions</p>
          </div>
        </Link>

        {/* নেভিগেশন লিংকসমূহ */}
        <nav className="hidden lg:flex items-center text-sm text gap-8">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 transition ${
                  pathname === item.href
                    ? "text-[#0A7C6E]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* ডানদিকের অ্যাকশন ও ড্রপডাউন */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <Spinner color="current" className="justify-end" />
          ) : user ? (
            <p className="text-xs font-bold text-[#0A7C6E]">
              Hello, {user?.name?.toUpperCase()?.split(" ")[0]}
            </p>
          ) : (
            <Link href="/auth/login">
              <Button size="sm" className="bg-[#0A7C6E] rounded-xl">
                Login
              </Button>
            </Link>
          )}

          <div className="h-6 w-px bg-white/10" />

          {user && (
            <Dropdown>
              <Dropdown.Trigger className="flex items-center gap-3 outline-none cursor-pointer bg-transparent border-none">
                <Avatar>
                  <Avatar.Image alt="John Doe" src={user?.image} />
                  <Avatar.Fallback>JD</Avatar.Fallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">
                    {user?.name?.toUpperCase()?.split(" ")[0]}
                  </p>
                  <p className="text-xs text-green-400">Active</p>
                </div>
              </Dropdown.Trigger>

              {/* পপওভার কন্টেইনার (ব্ল্যাকিশ থিম) */}
              <Dropdown.Popover className="bg-neutral-950 border border-white/10 rounded-xl p-1.5 text-white shadow-xl">
                <Dropdown.Menu className="outline-none min-w-[220px] flex flex-col gap-1">
                  {/* হোভার করলে ব্যাকগ্রাউন্ড গ্রে এবং টেক্সট ১০০% পিওর হোয়াইট হবে */}
                  <Dropdown.Item
                    className="flex items-center px-3 py-2 rounded-lg text-white-300 cursor-pointer transition-all outline-none hover:bg-neutral-800 hover:text-white "
                    onPress={() => router.push("/profile")}
                  >
                    Profile
                  </Dropdown.Item>

                  <Dropdown.Item
                    className="flex items-center px-3 py-2 rounded-lg text-gray-300 cursor-pointer transition-all outline-none hover:bg-neutral-800 hover:text-white data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white"
                    onPress={() => router.push("/settings")}
                  >
                    Settings
                  </Dropdown.Item>

                  <Dropdown.Item
                    className="flex items-center px-3 py-2 rounded-lg text-gray-300 cursor-pointer transition-all outline-none hover:bg-neutral-800 hover:text-white data-[hover=true]:bg-neutral-800 data-[hover=true]:text-white"
                    onPress={() => router.push(dashboardHref)}
                  >
                    Dashboard
                  </Dropdown.Item>

                  {/* সেপারেটর লাইন */}
                  <Separator className="bg-white/10 my-1 h-px w-full" />

                  <Dropdown.Item
                    className="flex items-center px-3 py-2 rounded-lg text-danger cursor-pointer transition-all outline-none hover:bg-danger/20 data-[hover=true]:bg-danger/20"
                    onPress={handleLogOut}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>
      </div>
    </header>
  );
}
