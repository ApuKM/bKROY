import { Button } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-4xl text-gray-800">Page not found</p>

      <Link href="/">
        <Button variant="outline" className={"bg-[#0A7C6E] mt-6 text-white"}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
}