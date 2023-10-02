import { z } from "zod";

export const signupInput = z.object({
  username: z.string().email().min(10).max(20),
  password: z.string().min(8).max(20),
});

export type signupParams = z.infer<typeof signupInput>;
