const express = require('express');
const router = express.Router();
const { Admins, Courses } = require('../db');
const { authenticateAdminJWT, ADMIN_JWT_SECRET } = require('../middleware/auth');
const jwt = require('jsonwebtoken');

router.get('/me', authenticateAdminJWT, async (req, res) => {
  const admin = await Admins.findOne({ username: req.user.username });
  console.log(admin);
  if (!admin) {
    return res.status(403).json({ message: 'Admin does not exist' });
  }
  res.json({
    username: admin.username, // This user is added to request in middleware
  });
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admins.findOne({ username });
  if (admin) {
    res.status(403).json({ message: ' Admin already exist' });
  } else {
    const newAdmin = new Admins({ username, password });
    await newAdmin.save();
    const token = jwt.sign({ username, role: 'Admin' }, ADMIN_JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ message: 'Admin created Successfully !!', token });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admins.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username }, ADMIN_JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Loggen in successfully !!', token });
  } else {
    res.status(401).json({ message: 'User authenitcation failed' });
  }
});

router.post('/courses', authenticateAdminJWT, async (req, res) => {
  const course = new Courses(req.body);
  await course.save();
  res.json({ message: 'Course created successfully !!', courseId: course.id });
});

router.get('/courses/:courseId', authenticateAdminJWT, async (req, res) => {
  const course = await Courses.findById(req.params.courseId);
  if (course) {
    res.json({ message: 'Course Found', course });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

router.put('/courses/:courseId', authenticateAdminJWT, async (req, res) => {
  const course = await Courses.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: 'Course updated successfully !!', course });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

router.get('/courses', authenticateAdminJWT, async (req, res) => {
  const courses = await Courses.find({}); // Empty object because we need all the courses.
  res.json({ courses });
});

module.exports = router;
