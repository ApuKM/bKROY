import Image from "next/image";
import { FiSearch, FiMapPin, FiStar } from "react-icons/fi";
import Statistics from "@/components/homepage/Statistics";
import { BsBoxSeam, BsPeople } from "react-icons/bs";
import { Button } from "@heroui/react";

export default function HeroSection() {
  const stats = [
    {
      id: 1,
      icon: <BsBoxSeam className="text-gray-400 text-lg" />,
      value: "120K+",
      label: "Active Listings",
    },
    {
      id: 2,
      icon: <BsPeople className="text-gray-400 text-lg" />,
      value: "85K+",
      label: "Verified Sellers",
    },
    {
      id: 3,
      icon: <FiMapPin className="text-gray-400 text-lg" />,
      value: "64",
      label: "Districts Covered",
    },
    {
      id: 4,
      icon: <FiStar className="text-gray-400 text-lg" />,
      value: "98%",
      label: "Successful Trades",
    },
  ];

  const trendingTags = [
    "iPhone",
    "Motorcycles",
    "Laptops",
    "Furniture",
    "Gaming PCs",
    "Apartments",
  ];

  return (
    <section className="relative min-h-screen  bg-black text-white overflow-hidden flex flex-col items-center pt-16  px-4 font-sans">
      {/* --- Top Text Content --- */}
      <div className="flex flex-col items-center z-10 w-full max-w-4xl text-center">
        {/* Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-linear-to-r from-transparent to-gray-500 rounded-full"></div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111] border border-white/10 text-xs font-semibold tracking-wider text-gray-300">
            <span>💼</span> 🏷️ 10,000+ NEW LISTINGS THIS WEEK
          </div>
          <div className="h-px w-8 bg-linear-to-l from-transparent to-gray-500 rounded-full"></div>
        </div>

        {/* Headings */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="text-[#0A7C6E]">Buy & Sell</span> Used Items With Ease
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed mb-10">
          Discover great deals on electronics, vehicles, furniture, fashion, and
          more. Connect with local buyers and sellers across Bangladesh through
          a trusted marketplace.
        </p>

        <form className="w-full max-w-3xl flex flex-col sm:flex-row items-center bg-[#0a0a0a] border border-white/10 rounded-2xl sm:rounded-full p-2 shadow-2xl mb-6">
          {/* ১. Search Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:py-2 w-full">
            <FiSearch className="text-gray-400 text-xl shrink-0" />
            <input
              type="text"
              placeholder="Search products, brands, or categories"
              className="w-full bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-500"
            />
          </div>

          <div className="w-full h-px sm:w-px sm:h-8 bg-white/10 my-1 sm:my-0"></div>

          {/* ৩. Location Input */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:py-2 w-full">
            <FiMapPin className="text-gray-400 text-xl shrink-0" />
            <input
              type="text"
              placeholder="City, Area, or Nearby Location"
              className="w-full bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-500"
            />
          </div>

          {/* ৪. Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#0A7C6E] hover:bg-[#08685d] transition-colors p-3 sm:px-5 rounded-xl sm:rounded-full flex items-center justify-center mt-3 sm:mt-0 gap-2 cursor-pointer"
          >
            <FiSearch className="text-white text-lg shrink-0" />
            <span className="text-white font-medium sm:hidden">Search</span>
          </button>
        </form>

        {/* Trending Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="text-gray-400">Trending Searches</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 rounded-full bg-[#111] hover:bg-[#222] border border-white/5 text-gray-300 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* --- Globe & Stats Section --- */}
      <div className="relative w-full max-w-6xl mt-10 flex flex-col items-center">
        {/* Overlaid Globe Text */}
        <div className="absolute top-16 z-20 text-center w-full px-4">
          <h2 className="text-2xl md:text-3xl font-medium text-gray-300">
            Assisting over{" "}
            <span className="font-semibold text-white">15,000</span> job seekers{" "}
            <br />
            find their dream positions.
          </h2>
          <div className="flex justify-center items-center flex-wrap gap-4 mt-8">
            <Button className="bg-[#0A7C6E] hover:bg-[#08685d] text-white">
              Start Selling
            </Button>

            <Button
              variant="outline"
              className="border-white/20 text-[#0A7C6E] hover:text-black"
            >
              Browse Listings
            </Button>
          </div>
        </div>

        <div className="relative w-full aspect-2/1 max-w-4xl opacity-80 pointer-events-none">
          <Image
            src="/banner/banner.jpg"
            alt="cycle banner"
            fill
            className="object-cover object-center mask-image-b"
            priority
          />
          {/* Optional: Radial gradient fallback behind the image to simulate glow */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />
        </div>

        {/* Stats Cards */}
        <Statistics stats={stats} />
      </div>
    </section>
  );
}
