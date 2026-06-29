import HeroSection from "@/components/homepage/Banner";
import FeaturedPage from "@/components/homepage/FeaturedProducts";
import SuccessStories from "@/components/homepage/SuccessfulStrories";
import SustainabilityImpactSection from "@/components/homepage/Sustainability";
import TrustedSellers from "@/components/homepage/TrustateSellers";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedPage />
      <SuccessStories />
      <SustainabilityImpactSection />
      <TrustedSellers />
    </div>
  );
}
