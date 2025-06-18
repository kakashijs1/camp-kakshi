import { Tent } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link 
      href="/" 
      className="flex items-center justify-start gap-x-2 md:gap-x-4 transition-all hover:opacity-80"
    >
      <Tent 
        className="w-6 h-6 md:w-8 md:h-8 shadow-xl animate-pulse" 
        strokeWidth={2}
      />
      <h1 className="font-bold text-sm md:text-md lg:text-xl animate-pulse  ">
        K-Camp
      </h1>
    </Link>
  );
};

export default Logo;
