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
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.get("/me", auth_1.authenticateAdminJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["userId"];
    const admin = yield db_1.Admins.findOne({ _id: userId });
    if (!admin) {
        return res.status(403).json({ message: "Admin does not exist" });
    }
    res.json({
        username: admin.username, // This user is added to request in middleware
    });
}));
// 1- ADMIN Sign-up
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const admin = yield db_1.Admins.findOne({ username });
    if (admin) {
        res.status(403).json({ message: " Admin already exist" });
    }
    else {
        const newAdmin = new db_1.Admins({ username, password });
        yield newAdmin.save();
        const token = jsonwebtoken_1.default.sign({ id: newAdmin._id }, auth_1.ADMIN_JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ message: "Admin created Successfully !!", token });
    }
}));
//2- ADMIN Login
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const admin = yield db_1.Admins.findOne({ username, password });
    if (admin) {
        const token = jsonwebtoken_1.default.sign({ id: admin._id }, auth_1.ADMIN_JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ message: "Loggen in successfully !!", token });
    }
    else {
        res.status(401).json({ message: "User authenitcation failed" });
    }
}));
// 3- Get all the courses
router.get("/courses", auth_1.authenticateAdminJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield db_1.Courses.find({}); // Empty object because we need all the courses.
    res.json({ courses });
}));
// 4 - Create a course
router.post("/course", auth_1.authenticateAdminJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = new db_1.Courses(req.body);
    yield course.save();
    res.json({ message: "Course created successfully !!", courseId: course.id });
}));
// 5- Get a particular course
router.get("/course/:courseId", auth_1.authenticateAdminJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Courses.findById(req.params.courseId);
    if (course) {
        res.json({ message: "Course Found", course });
    }
    else {
        res.status(404).json({ message: "Course not found" });
    }
}));
// 6- Update a particular course
router.put("/course/:courseId", auth_1.authenticateAdminJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield db_1.Courses.findByIdAndUpdate(req.params.courseId, req.body, {
        new: true,
    });
    if (course) {
        res.json({ message: "Course updated successfully !!", course });
    }
    else {
        res.status(404).json({ message: "Course not found" });
    }
}));
exports.default = router;
