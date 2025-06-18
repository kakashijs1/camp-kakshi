"use client";

import { categories } from "@/utils/categories";

import { motion } from "framer-motion";
import { useTransition, useState, useEffect } from "react"; // 👉 เพิ่ม useEffect
import { useRouter } from "next/navigation"; // 👉 เพิ่ม useRouter

const CategoriesList = ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const searchTerm = search ? `&search=${search}` : "";
  const [isPending, startTransition] = useTransition(); // 👉 ใช้ useTransition
  const [loadingCategory, setLoadingCategory] = useState<string | null>(null); // 👉 เก็บว่าตัวไหนกำลังโหลด
  const router = useRouter(); // 👉 ใช้ router สำหรับ navigation

  // 👉 Reset loading state เมื่อ transition เสร็จ
  useEffect(() => {
    if (!isPending && loadingCategory) {
      setLoadingCategory(null);
    }
  }, [isPending, loadingCategory]);

  // 👉 Handle click with transition
  const handleCategoryClick = (categoryLabel: string) => {
    setLoadingCategory(categoryLabel); // 👉 เซ็ตว่าตัวไหนกำลังโหลด
    startTransition(() => {
      router.push(`/?category=${categoryLabel}${searchTerm}`);
    });
  };

  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      {/* Categories grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4 py-6">
        {categories.map((item, index) => (
          <motion.article
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => handleCategoryClick(item.label)} // 👉 ใช้ onClick แทน Link
            className={`
                            group relative flex flex-col items-center justify-center
                            p-4 md:p-6 rounded-xl transition-all duration-300
                            bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm
                            border border-gray-200/50 dark:border-gray-700/50
                            shadow-sm hover:shadow-lg
                            hover:-translate-y-1 hover:scale-105
                            ${
                              category === item.label
                                ? "bg-blue-50/90 dark:bg-gray-900/30 border-blue-300/60 dark:border-blue-600/50 shadow-md"
                                : "hover:bg-gray-50/90 dark:hover:bg-gray-750/80"
                            }
                            ${
                              loadingCategory === item.label
                                ? "opacity-70 cursor-wait"
                                : "cursor-pointer"
                            } // 👉 เช็คแค่ตัวที่กำลังโหลด
                            min-h-[100px] select-none
                        `}
          >
            {/* Subtle glow effect for active state */}
            {category === item.label && (
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm -z-10" />
            )}

            {/* Loading spinner overlay */}
            {loadingCategory === item.label && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-800/50 rounded-xl z-10">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Icon */}
            <div
              className={`
                            flex items-center justify-center w-10 h-10 mb-3
                            text-2xl transition-all duration-300
                            ${
                              category === item.label
                                ? "text-blue-600 dark:text-blue-400 scale-110"
                                : "text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110"
                            }
                            ${
                              loadingCategory === item.label ? "opacity-50" : ""
                            }
                        `}
            >
              <item.icon />
            </div>

            {/* Label */}
            <p  className={` text-xs md:text-sm font-medium text-center leading-tight ${category === item.label
                                ? "text-blue-700 dark:text-blue-300 font-semibold"
                                : "text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"
                            } ${ loadingCategory === item.label ? "opacity-50" : "" }transition-colors duration-300 `} >
              {item.label}
            </p>

            {/* Active dot */}
            {category === item.label && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </motion.article>
        ))}
      </div>

      {/* Global loading indicator - แสดงแค่ตัวที่กดเท่านั้น */}
      {loadingCategory && (
        <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            กำลังโหลด {loadingCategory}...
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
