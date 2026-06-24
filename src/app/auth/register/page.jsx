import RegisterForm from "@/components/auth/RegisterForm";
import { Skeleton } from "@heroui/react";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative font-sans overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-[#5a45ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="dark relative w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-2xl z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">
            Create an account
          </h2>
          <p className="text-gray-400 text-sm">
            Join bKROY to turn your unused items into cash and find great deals
            on things you love.
          </p>
        </div>
        <Suspense
          fallback={
            <div className="skeleton--shimmer relative  max-w-md overflow-hidden rounded-xl">
              <Skeleton animationType="none" className="h-100 rounded-xl" />
            </div>
          }
        >
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
