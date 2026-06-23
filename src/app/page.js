import HeroSection from "@/components/homepage/Banner";
import SuccessStories from "@/components/homepage/SuccessfulStrories";
import SustainabilityImpactSection from "@/components/homepage/Sustainability";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SuccessStories />
      <SustainabilityImpactSection />
    </div>
  );
}
