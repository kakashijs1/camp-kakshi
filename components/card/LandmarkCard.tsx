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
    <article className="group relative bg-gray-100/20 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/30 rounded-2xl shadow-lg hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-300 p-5 hover:-translate-y-1">
      <Link href={`/landmark/${id}`}>
        {/* Subtle background gradient for dark mode only */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Subtle glow for dark mode only */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />

        <div className="relative z-10">
          <div className="relative h-[240px] overflow-hidden rounded-xl mb-4">
            {image ? (
              <Image
                src={image}
                alt={name}
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                fill
                quality={100}
              />
            ) : (
              <div className="bg-gray-100 dark:bg-gray-800 w-full h-full flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                ไม่มีรูปภาพ
              </div>
            )}

            {/* Simple overlay for dark mode */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent dark:from-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </div>

          <div className="space-y-3">
            {/* Title and rating */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 leading-tight">
                {name}
              </h3>
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-700/50 shrink-0">
                <span className="text-amber-500 text-sm">★</span>
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                  4.5
                </span>
              </div>
            </div>

            {/* Province */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {province}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {(description ?? "").substring(0, 120)}...
            </p>

            {/* Category and price */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/50">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-lg font-medium border border-violet-200 dark:border-violet-700/50">
                {CategoryIcon && <CategoryIcon className="w-3.5 h-3.5" />}
                {category}
              </span>

              {/* Simplified price display */}
              <div className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <span className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  ${price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Simplified favorite button */}
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm border border-gray-200 dark:border-gray-700">
          <FavoriteToggleButton landmarkId={id} />
        </div>
      </div>
    </article>
  );
};

export default LandmarkCard;
