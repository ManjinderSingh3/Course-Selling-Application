import express from "express";
const router = express.Router();
import { Users, Admins, Courses } from "../db";
import jwt from "jsonwebtoken";
import { authenticateUserJWT, USER_JWT_SECRET } from "../middleware/auth";

router.post("/users/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exist" });
  } else {
    const newUser = new Users({ username, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, USER_JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully !", token });
  }
});

router.post("/users/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await Users.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, USER_JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully !", token });
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
});

// Get all the published courses
router.get("/users/courses", authenticateUserJWT, async (req, res) => {
  const publishedCourses = await Courses.find({ published: true });
  res.json({ publishedCourses });
});

// Purchase course
router.post(
  "/users/courses/:courseId",
  authenticateUserJWT,
  async (req, res) => {
    const course = await Courses.findById(req.params.courseId);
    const userId = req.headers["userId"];
    if (course) {
      const user = await Users.findOne({ _id: userId });
      if (user) {
        user.purchasedCourse.push(course);
        await user.save();
        res.json({ message: "Course purchased successfully !" });
      } else {
        res.status(403).json({ message: "User not found " });
      }
    } else {
      res.status(404).json({ message: "Course not found or published" });
    }
  }
);

// Get Purchased courses
router.get("/users/purchasedCourses", authenticateUserJWT, async (req, res) => {
  const userId = req.headers["userId"];
  const user = await Users.findOne({ _id: userId }).populate("purchasedCourse");
  if (user) {
    res.json({ purchasedCourse: user.purchasedCourse || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

export default router;
