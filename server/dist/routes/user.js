"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
router.post("/users/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.Users.findOne({ username });
    if (user) {
        res.status(403).json({ message: "User already exist" });
    }
    else {
        const newUser = new db_1.Users({ username, password });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, auth_1.USER_JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ message: "User created successfully !", token });
    }
}));
router.post("/users/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.headers;
    const user = yield db_1.Users.findOne({ username, password });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, auth_1.USER_JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ message: "Logged in successfully !", token });
    }
    else {
        res.status(401).json({ message: "Authentication failed" });
    }
}));
// Get all the published courses
router.get("/users/courses", auth_1.authenticateUserJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const publishedCourses = yield db_1.Courses.find({ published: true });
    res.json({ publishedCourses });
}));
// Purchase course
router.post("/users/courses/:courseId", auth_1.authenticateUserJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Courses.findById(req.params.courseId);
    const userId = req.headers["userId"];
    if (course) {
        const user = yield db_1.Users.findOne({ _id: userId });
        if (user) {
            user.purchasedCourse.push(course);
            yield user.save();
            res.json({ message: "Course purchased successfully !" });
        }
        else {
            res.status(403).json({ message: "User not found " });
        }
    }
    else {
        res.status(404).json({ message: "Course not found or published" });
    }
}));
// Get Purchased courses
router.get("/users/purchasedCourses", auth_1.authenticateUserJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const user = yield db_1.Users.findOne({ _id: userId }).populate("purchasedCourse");
    if (user) {
        res.json({ purchasedCourse: user.purchasedCourse || [] });
    }
    else {
        res.status(403).json({ message: "User not found" });
    }
}));
exports.default = router;
