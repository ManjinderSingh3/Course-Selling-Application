import { z } from "zod";
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const loginInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const createCourseInput: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    imageLink: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    price: number;
    imageLink: string;
    _id?: string | undefined;
    published?: boolean | undefined;
}, {
    title: string;
    description: string;
    price: number;
    imageLink: string;
    _id?: string | undefined;
    published?: boolean | undefined;
}>;
export declare type SignupParams = z.infer<typeof signupInput>;
export declare type LoginParams = z.infer<typeof loginInput>;
export declare type CreateCourseInputParams = z.infer<typeof createCourseInput>;
