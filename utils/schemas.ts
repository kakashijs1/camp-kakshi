import { z, ZodSchema } from "zod";

// const profileSchema = z.string().min(2, { message: "อักขระต้องมากกว่า 2" });

export const profileSchema = z.object({
  firstName: z.string().min(5, { message: "ชื่อต้องมากกว่า 5" }),
  lastName: z.string().min(5, { message: "นามสกุลต้องมากกว่า 5" }),
  userName: z.string().min(5, { message: "ผู้ใช้ต้องมากกว่า 5" }),
});

const validateImage = () => {
  const maxFileSize = 2048 * 2048;
  return z.instanceof(File).refine((file) => {
    return file.size < maxFileSize;
  }, "File size must be less than 1MB");
};

export const imageSchema = z.object({
  image: validateImage(),
});

export const landmarkSchema = z.object({
  name: z
    .string()
    .min(2, { message: "ชื่อต้องมากกว่า 2 ตัว" })
    .max(40, { message: "ชื่อต้องน้อยกว่ากว่า 40 ตัว" }),
  category: z.string(),
  description: z
    .string()
    .min(2, { message: "รายละเอียดต้องมากกว่า 2 ตัว" })
    .max(400, { message: "รายละเอียดต้องน้อยกว่า 400 ตัว" }),
    price : z.coerce.number().int().min(0,{ message: 'ราคาต้องมากกว่า 0'}),
    province: z.string(),
    lat: z.coerce.number(),
    lng: z.coerce.number(),
});

export const validateWithZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    //code
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
};
