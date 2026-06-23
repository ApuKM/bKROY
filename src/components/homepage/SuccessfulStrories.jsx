
import StoryCard from "./StoryCard";

const stories = [
  {
    id: 1,
    type: "Seller",
    name: "Rakib Hasan",
    location: "Dhaka",
    avatar: "https://i.pravatar.cc/150?img=11",
    title: "Sold my gaming PC in just 2 days",
    description:
      "I listed my custom gaming setup and received multiple offers within hours. The whole process was smooth and secure.",
    rating: 5,
    transaction: "Gaming PC • ৳65,000",
  },
  {
    id: 2,
    type: "Buyer",
    name: "Nusrat Jahan",
    location: "Chattogram",
    avatar: "https://i.pravatar.cc/150?img=32",
    title: "Found my dream iPhone",
    description:
      "I saved almost 30% compared to buying new. The seller was verified and the device was exactly as described.",
    rating: 5,
    transaction: "iPhone 15 Pro",
  },
  {
    id: 3,
    type: "Seller",
    name: "Tanvir Ahmed",
    location: "Sylhet",
    avatar: "https://i.pravatar.cc/150?img=15",
    title: "Furniture sold faster than expected",
    description:
      "After relocating, I needed to sell furniture quickly. Within a week everything was sold through Bkroy.",
    rating: 5,
    transaction: "Home Furniture Set",
  },
  {
    id: 4,
    type: "Buyer",
    name: "Mim Akter",
    location: "Rajshahi",
    avatar: "https://i.pravatar.cc/150?img=45",
    title: "Bought a bike with confidence",
    description:
      "The seller provided all documents and details. The platform made communication very easy.",
    rating: 5,
    transaction: "Yamaha R15",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0A7C6E]/20 bg-[#0A7C6E]/10 px-4 py-2 text-sm text-[#0A7C6E]">
            Success Stories
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
            Trusted by Buyers &
            Sellers Across Bangladesh
          </h2>

          <p className="mt-5 text-gray-400">
            Thousands of successful transactions happen every month on Bkroy.
            Here are some stories from our community.
          </p>
        </div>

        {/* Stories */}

        <StoryCard stories={stories}/>
      </div>
    </section>
  );
}
