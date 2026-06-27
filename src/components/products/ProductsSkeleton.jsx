import { Skeleton } from "@heroui/react";

export default function ProductsSkeleton() {

  const skeletonCards = Array.from({ length: 12 });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {skeletonCards.map((_, index) => (
        <div 
          key={index} 
          className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
        >
          {/* প্রোডাক্ট ইমেজ এর জন্য স্কেলিটন */}
          <Skeleton 
            animationType="shimmer" 
            className="aspect-square w-full rounded-lg bg-zinc-800" 
          />
          
          <div className="space-y-2">
            {/* প্রোডাক্ট টাইটেল এর জন্য স্কেলিটন */}
            <Skeleton 
              animationType="shimmer" 
              className="h-4 w-11/12 rounded-lg bg-zinc-800" 
            />
            
            {/* প্রোডাক্ট প্রাইস বা শর্ট ডেসক্রিপশন এর জন্য স্কেলিটন */}
            <Skeleton 
              animationType="shimmer" 
              className="h-3 w-2/3 rounded-lg bg-zinc-800" 
            />
          </div>

          {/* প্রোডাক্ট বাটন বা নিচের অতিরিক্ত ফিচারের জন্য স্কেলিটন */}
          <div className="pt-2">
            <Skeleton 
              animationType="shimmer" 
              className="h-9 w-full rounded-lg bg-zinc-800" 
            />
          </div>
        </div>
      ))}
    </div>
  );
}