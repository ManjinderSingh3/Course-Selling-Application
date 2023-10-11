"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseInput = exports.loginInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string().email().min(10).max(20),
    password: zod_1.z.string().min(8).max(20),
});
exports.loginInput = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(20),
});
exports.createCourseInput = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    imageLink: zod_1.z.string(),
    published: zod_1.z.boolean().optional(),
});
