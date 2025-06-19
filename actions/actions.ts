"use server";

import {
  imageSchema,
  landmarkSchema,
  profileSchema,
  validateWithZod,
} from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { redis } from "@/lib/redis";

const getAuthUser = async () => {
  //code body
  const user = await currentUser();
  if (!user) {
    throw new Error("You must logged!!!");
  }

  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

const renderError = (error: unknown): { message: string } => {
  //codeBody
  return {
    message: error instanceof Error ? error.message : "An Error!!",
  };
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("please Login!!");

    const rawData = Object.fromEntries(formData);
    const validateField = validateWithZod(profileSchema, rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validateField,
      },
    });

    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));
    // return { message: "create Profile Success!" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/");
};

export const createLandmarkAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    //step 1 ValidateData
    const validateFile = validateWithZod(imageSchema, { image: file });
    const validateField = validateWithZod(landmarkSchema, rawData);

    //step 2 Upload Image to Supabase
    const fullPath = await uploadFile(validateFile.image);

    //step 3 Insert to DB

    await db.landmark.create({
      data: {
        ...validateField,
        image: fullPath,
        profileId: user.id,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));
    // return { message: "Create Landmark  Success!" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/");
};

export const fetchLandmarks = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  // ปรับปรุง cache key ให้ดีขึ้น
  const normalizedSearch = search?.toLowerCase().trim() || "";
  const normalizedCategory = category || "all";
  const cacheKey = `landmarks:${normalizedSearch}:${normalizedCategory}`;
  
  try {
    const cached = await redis.get(cacheKey);
    if (typeof cached === 'string') {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error("Redis cache error:", error);
    // ถ้า Redis error ให้ทำงานต่อแบบไม่มี cache
  }

  // ปรับปรุง database query
  const whereClause: any = {};
  
  // ถ้ามี category filter
  if (category && category !== "all") {
    whereClause.category = category;
  }
  
  // ถ้ามี search term
  if (normalizedSearch) {
    whereClause.OR = [
      { name: { contains: normalizedSearch, mode: "insensitive" } },
      { description: { contains: normalizedSearch, mode: "insensitive" } },
      { province: { contains: normalizedSearch, mode: "insensitive" } },
      { category: { contains: normalizedSearch, mode: "insensitive" } },
    ];
  }

  const landmarks = await db.landmark.findMany({
    select: {
      id: true,
      name: true,
      province: true,
      image: true,
      description: true,
      price: true,
      category: true,
    },
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    orderBy: { createdAt: "desc" },
    take: 50, // จำกัดจำนวนผลลัพธ์
  });

  // เก็บ cache โดยไม่ block การทำงาน
  redis.set(cacheKey, JSON.stringify(landmarks), { ex: 3600 }).catch(err => {
    console.error("Failed to set cache:", err);
  });

  return landmarks;
};

// เพิ่ม function สำหรับ prefetch popular data
export const prefetchPopularLandmarks = async () => {
  const popularQueries = [
    { search: "", category: undefined }, // ข้อมูลทั้งหมด
    { search: "", category: "temple" },
    { search: "", category: "museum" },
    { search: "", category: "park" },
  ];

  // Prefetch ข้อมูลยอดนิยมโดยไม่ต้องรอ
  popularQueries.forEach(query => {
    fetchLandmarks(query).catch(err => {
      console.error("Prefetch error:", err);
    });
  });
};

export const fetchLandmarksHero = async () => {
  const cacheKey = "landmarks:hero";
  
  try {
    const cached = await redis.get(cacheKey);
    if (typeof cached === 'string') {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error("Redis cache error:", error);
  }

  const landmarks = await db.landmark.findMany({
    select: {
      id: true,
      name: true,
      province: true,
      image: true,
      description: true,
      price: true,
      category: true,
    },
    orderBy: { createdAt: "desc" },
    take: 6, // จำกัดสำหรับ hero section
  });

  redis.set(cacheKey, JSON.stringify(landmarks), { ex: 1800 }).catch(err => {
    console.error("Failed to set hero cache:", err);
  });

  return landmarks;
};

export const fetchFavoriteId = async ({
  landmarkId,
}: {
  landmarkId: string;
}) => {
  const user = await getAuthUser();

  const cacheKey = `favorite:${user.id}:${landmarkId}`;
  const cached = await redis.get(cacheKey);

  // ✅ Return ทันทีหากได้ string (UUID) หรือ "null"
  if (typeof cached === "string") {
    return cached === "null" ? null : cached;
  }

  const favorite = await db.favorite.findFirst({
    where: {
      landmarkId: landmarkId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });

  const favoriteId = favorite?.id ?? null;

  await redis.set(cacheKey, favoriteId ?? "null", { ex: 3600 }); // ❗️เก็บเป็น string เสมอ
  return favoriteId;
};


export const toggleFavoriteAction = async (prevState: {
  favoriteId: string | null;
  landmarkId: string;
  pathname: string;
}) => {
  const { favoriteId, landmarkId, pathname } = prevState;
  const user = await getAuthUser();
  try {
    //Delete
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      //Create
      await db.favorite.create({
        data: {
          landmarkId: landmarkId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId
        ? "Removed Favorite Success!!"
        : "Add Favorite Success!!",
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorits = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      landmark: {
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          province: true,
          lat: true,
          lng: true,
          category: true,
        },
      },
    },
  });
  //
  return favorites.map((favorite) => favorite.landmark);
};

export const fetchLandmarkDetail = async ({ id }: { id: string }) => {
  "use cache";
  cacheLife("hours");
  return db.landmark.findFirst({
    where: {
      id: id,
    },
    include: {
      profile: true,
    },
  });
};
