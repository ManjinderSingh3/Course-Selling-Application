import { z } from "zod";

export const signupInput = z.object({
  username: z.string().email().min(10).max(20),
  password: z.string().min(8).max(20),
});

export const loginInput = z.object({
  username: z.string().email(),
  password: z.string().min(8).max(20),
});

// IMPORTANT !! --> Converting Zod object into a Type which can be used in Frontend. We will make this visible in Frontend. This concept is called ZOD Inference.
export type SignupParams = z.infer<typeof signupInput>;
export type LoginParams = z.infer<typeof loginInput>;
