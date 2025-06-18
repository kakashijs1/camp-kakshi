import Image from "next/image";
import { LandmarkCardProps } from "@/utils/types";
import { categories } from "@/utils/categories";
import FavoriteToggleButton from "./FavoriteToggleButton";
import Link from "next/link";

const LandmarkCard = ({ landmark }: { landmark: LandmarkCardProps }) => {
  const { name, image, province, category, description, price, id } = landmark;
  const categoryObj = categories.find((c) => c.label === category);
  const CategoryIcon = categoryObj?.icon;

  return (
    <article className="group relative bg-white/80 dark:bg-gray-900/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-6 hover:-translate-y-2 hover:rotate-1">
      <Link href={`/landmark/${id}`}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-700 -z-10" />

        <div className="relative z-10 ">
          <div className="relative h-[280px] overflow-hidden rounded-2xl mb-6">
            <Image
              src={image}
              alt={name}
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out "
              fill
              quality={100}
            />

            {/* Dynamic overlay with animated gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            {/* Floating particles effect */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
            <div
              className="absolute top-8 right-8 w-1 h-1 bg-blue-400/60 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="space-y-4">
            {/* Title and rating with enhanced animation */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500 line-clamp-2 leading-tight">
                {name}
              </h3>
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-amber-200/50 dark:border-amber-700/50 shadow-sm group-hover:shadow-md transition-all duration-300">
                <span className="text-amber-500 text-sm animate-pulse">★</span>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                  4.5
                </span>
              </div>
            </div>

            {/* Province and description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                  {province}
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                {description.substring(0, 120)}...
              </p>
            </div>

            {/* Category and price with enhanced styling */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/50">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-violet-100 via-purple-100 to-fuchsia-100 dark:from-violet-900/30 dark:via-purple-900/30 dark:to-fuchsia-900/30 text-violet-700 dark:text-violet-300 rounded-full font-semibold border border-violet-200/50 dark:border-violet-700/50 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 group-hover:from-violet-200 group-hover:via-purple-200 group-hover:to-fuchsia-200 dark:group-hover:from-violet-800/50 dark:group-hover:via-purple-800/50 dark:group-hover:to-fuchsia-800/50">
                {CategoryIcon && (
                  <CategoryIcon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                )}
                {category}
              </span>

              <div className="relative">
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-gray-200 group-hover:from-emerald-500 group-hover:to-cyan-500 transition-all duration-300">
                  ${price}
                </span>
                {/* Price highlight effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-blue-400/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-purple-400/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </Link>
      {/* Favorite button with enhanced styling */}
      <div className="absolute top-6 right-6 z-20  ">
        <div className="  bg-amber-400 backdrop-blur-sm rounded-l-full  p-1 shadow-lg">
          <FavoriteToggleButton landmarkId={id} />
        </div>
      </div>
    </article>
  );
};

export default LandmarkCard;
