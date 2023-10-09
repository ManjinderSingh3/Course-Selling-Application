import express from "express";
import { Admins, Courses } from "../db";
import { authenticateAdminJWT, ADMIN_JWT_SECRET } from "../middleware/auth";
import jwt from "jsonwebtoken";
const router = express.Router();
import { signupInput, loginInput, createCourseInput } from "../../common/src";
import { Request, Response } from "express";

router.get("/me", authenticateAdminJWT, async (req: Request, res: Response) => {
  const userId = req.headers["userId"];
  const admin = await Admins.findOne({ _id: userId });
  if (!admin) {
    return res.status(403).json({ message: "Admin does not exist" });
  }
  res.json({
    username: admin.username, // This user is added to request in middleware
  });
});

// 1- ADMIN Sign-up
router.post("/signup", async (req: Request, res: Response) => {
  const parsedInput = signupInput.safeParse(req.body);
  if (!parsedInput.success) {
    // If there is an error while parsing the body which user sent
    return res.status(411).json({
      error: parsedInput.error,
    });
  }
  const admin = await Admins.findOne({ username: parsedInput.data.username });
  if (admin) {
    res.status(403).json({ message: " Admin already exist" });
  } else {
    const newAdmin = new Admins({
      username: parsedInput.data.username,
      password: parsedInput.data.password,
    });
    await newAdmin.save();
    const token = jwt.sign({ id: newAdmin._id }, ADMIN_JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created Successfully !!", token });
  }
});

//2- ADMIN Login
router.post("/login", async (req: Request, res: Response) => {
  const parsedInput = loginInput.safeParse(req.headers);
  if (!parsedInput.success) {
    return res.status(403).json({
      error: parsedInput.error,
    });
  }
  const admin = await Admins.findOne({
    username: parsedInput.data.username,
    password: parsedInput.data.password,
  });
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
router.get(
  "/courses",
  authenticateAdminJWT,
  async (req: Request, res: Response) => {
    const courses = await Courses.find({}); // Empty object because we need all the courses.
    res.json({ courses });
  }
);

// 4 - Create a course
router.post(
  "/course",
  authenticateAdminJWT,
  async (req: Request, res: Response) => {
    const parsedInput = createCourseInput.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(403).json({
        error: parsedInput.error,
      });
    }
    const newCourse = new Courses(parsedInput.data);
    await newCourse.save();
    res.json({
      message: "Course created successfully !!",
      courseId: newCourse.id,
    });
  }
);

// 5- Get a particular course
router.get(
  "/course/:courseId",
  authenticateAdminJWT,
  async (req: Request, res: Response) => {
    const course = await Courses.findById(req.params.courseId);
    if (course) {
      res.json({ message: "Course Found", course });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  }
);

// 6- Update a particular course
router.put(
  "/course/:courseId",
  authenticateAdminJWT,
  async (req: Request, res: Response) => {
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
  }
);

export default router;
