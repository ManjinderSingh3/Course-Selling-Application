import { z } from "zod";

export const signupInput = z.object({
  username: z.string().email().min(10).max(20),
  password: z.string().min(8).max(20),
});

export const loginInput = z.object({
  username: z.string().email(),
  password: z.string().min(8).max(20),
});

export const createCourseInput = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  imageLink: z.string(),
  published: z.boolean().optional(),
});

// IMPORTANT !! --> Converting Zod object into a Type which can be used in Frontend. We will make this visible in Frontend. This concept is called ZOD Inference.
export type SignupParams = z.infer<typeof signupInput>;
export type LoginParams = z.infer<typeof loginInput>;
export type CreateCourseInputParams = z.infer<typeof createCourseInput>;
