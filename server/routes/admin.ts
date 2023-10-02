import express from "express";
import { Admins, Courses } from "../db";
import { authenticateAdminJWT, ADMIN_JWT_SECRET } from "../middleware/auth";
import { z } from "zod";
import jwt from "jsonwebtoken";
const router = express.Router();
import { signupInput } from "@manjinder_dev/common";

interface Course {
  title: string;
  description: string;
  price: Number;
  imageLink: string;
  published: Boolean;
}

router.get("/me", authenticateAdminJWT, async (req, res) => {
  const userId = req.headers["userId"];
  const admin = await Admins.findOne({ _id: userId });
  if (!admin) {
    return res.status(403).json({ message: "Admin does not exist" });
  }
  res.json({
    username: admin.username, // This user is added to request in middleware
  });
});

/* 
Backend Input valdations for Signup route. It's a common module so it is placed under common folder
const signupInput = z.object({
  username: z.string().min(1).max(15).email(),
  password: z.string().min(6).max(20),
  
});
*/

// IMPORTANT !! ---- Converting Zod object into a Type which can be used in Frontend. We will make this visible in Frontend. This concept is called ZOD Inference.
//type SignupParam = z.infer<typeof signupInput>;

// 1- ADMIN Sign-up
router.post("/signup", async (req, res) => {
  const parsedInput = signupInput.safeParse(req.body);
  // If there is an error while parsing the body which user sent
  if (!parsedInput.success) {
    res.status(411).json({
      error: parsedInput.error,
    });
    return;
  }
  const username = parsedInput.data.username;
  const password = parsedInput.data.password;
  const admin = await Admins.findOne({ username });
  if (admin) {
    res.status(403).json({ message: " Admin already exist" });
  } else {
    const newAdmin = new Admins({ username, password });
    await newAdmin.save();
    const token = jwt.sign({ id: newAdmin._id }, ADMIN_JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created Successfully !!", token });
  }
});

//2- ADMIN Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admins.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ id: admin._id }, ADMIN_JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Loggen in successfully !!", token });
  } else {
    res.status(401).json({ message: "User authenitcation failed" });
  }
});

// 3- Get all the courses
router.get("/courses", authenticateAdminJWT, async (req, res) => {
  const courses = await Courses.find({}); // Empty object because we need all the courses.
  res.json({ courses });
});

// 4 - Create a course
router.post("/course", authenticateAdminJWT, async (req, res) => {
  const courseInputs: Course = req.body;
  const newCourse = new Courses({
    title: courseInputs.title,
    description: courseInputs.description,
    price: courseInputs.price,
    imageLink: courseInputs.imageLink,
    published: courseInputs.published,
  });
  //const newCourse = new Courses(req.body);
  await newCourse.save();
  res.json({
    message: "Course created successfully !!",
    courseId: newCourse.id,
  });
});

// 5- Get a particular course
router.get("/course/:courseId", authenticateAdminJWT, async (req, res) => {
  const course = await Courses.findById(req.params.courseId);
  if (course) {
    res.json({ message: "Course Found", course });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

// 6- Update a particular course
router.put("/course/:courseId", authenticateAdminJWT, async (req, res) => {
  const course = await Courses.findByIdAndUpdate(
    req.params.courseId,
    req.body,
    {
      new: true,
    }
  );
  if (course) {
    res.json({ message: "Course updated successfully !!", course });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

export default router;
