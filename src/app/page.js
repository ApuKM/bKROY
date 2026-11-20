// app/page.js
import { Suspense } from "react";
import HeroSection from "@/components/homepage/Banner";
import FeaturedPage from "@/components/homepage/FeaturedProducts";
import SuccessStories from "@/components/homepage/SuccessfulStrories";
import SustainabilityImpactSection from "@/components/homepage/Sustainability";
import TrustedSellers from "@/components/homepage/TrustateSellers";

function FeaturedSkeleton() {
  return (
    <div className="border-y border-zinc-800 bg-linear-to-b from-black to-zinc-950 py-16">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="h-10 w-72 mx-auto mb-8 rounded-lg bg-zinc-800 animate-pulse" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-zinc-900 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* Static sections render immediately with zero wait */}
      <HeroSection />

      {/* Only this section streams dynamically while showing a local skeleton */}
      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedPage />
      </Suspense>

      <SuccessStories />
      <SustainabilityImpactSection />
      <TrustedSellers />
    </div>
  );
}