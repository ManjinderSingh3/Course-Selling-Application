"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Courses = exports.Admins = exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Step -1 ( Create Schema's)
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    purchasedCourse: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Courses" }],
});
const adminSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
});
const courseSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
});
// Step -2 (Create Model/collections)
exports.Users = mongoose_1.default.model("Users", userSchema);
exports.Admins = mongoose_1.default.model("Admins", adminSchema);
exports.Courses = mongoose_1.default.model("Courses", courseSchema);
// export default {
//   Users,
//   Admins,
//   Courses,
// };
//module.exports = { Users, Admins, Courses };
