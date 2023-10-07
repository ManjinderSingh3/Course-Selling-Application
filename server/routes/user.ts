import express from "express";
const router = express.Router();
import { Users, Courses } from "../db";
import jwt from "jsonwebtoken";
import { authenticateUserJWT, USER_JWT_SECRET } from "../middleware/auth";
import { signupInput, loginInput } from "../../common/src";

// 1. Signup
router.post("/signup", async (req, res) => {
  const parsedInput = signupInput.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(403).json({
      error: parsedInput.error,
    });
  }
  const user = await Users.findOne({ username: parsedInput.data.username });
  if (user) {
    res.status(403).json({ message: "User already exist" });
  } else {
    const newUser = new Users({
      username: parsedInput.data.username,
      password: parsedInput.data.password,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, USER_JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully !", token });
  }
});

// 2. Login
router.post("/login", async (req, res) => {
  const parsedInput = loginInput.safeParse(req.headers);
  if (!parsedInput.success) {
    return res.status(403).json({
      error: parsedInput.error,
    });
  }
  const user = await Users.findOne({
    username: parsedInput.data.username,
    password: parsedInput.data.password,
  });
  if (user) {
    const token = jwt.sign({ id: user._id }, USER_JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully !", token });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

// 3. Get all the published courses
router.get("/courses", authenticateUserJWT, async (req, res) => {
  const publishedCourses = await Courses.find({ published: true });
  res.json({ publishedCourses });
});

// 4. Purchase a course
router.post("/courses/:courseId", authenticateUserJWT, async (req, res) => {
  const course = await Courses.findById(req.params.courseId);
  const userId = req.headers["userId"];
  if (course) {
    const user = await Users.findOne({ _id: userId });
    if (user) {
      user.purchasedCourse.push(course.id);
      await user.save();
      res.json({ message: "Course purchased successfully !" });
    } else {
      res.status(403).json({ message: "User not found " });
    }
  } else {
    res.status(404).json({ message: "Course not found or published" });
  }
});

// 5. Get Purchased courses
router.get("/purchasedCourses", authenticateUserJWT, async (req, res) => {
  const userId = req.headers["userId"];
  const user = await Users.findOne({ _id: userId }).populate("purchasedCourse");
  if (user) {
    res.json({ purchasedCourse: user.purchasedCourse || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

export default router;
