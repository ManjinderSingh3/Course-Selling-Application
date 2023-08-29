const mongoose = require('mongoose');

// Step -1 ( Create Schema's)
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses' }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// Step -2 (Create Model/collections)
const Users = mongoose.model('Users', userSchema);
const Admins = mongoose.model('Admins', adminSchema);
const Courses = mongoose.model('Courses', courseSchema);

module.exports = { Users, Admins, Courses };
