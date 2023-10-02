import mongoose from "mongoose";

// Step -1 ( Create Schema's)
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
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
export const Users = mongoose.model("Users", userSchema);
export const Admins = mongoose.model("Admins", adminSchema);
export const Courses = mongoose.model("Courses", courseSchema);

// export default {
//   Users,
//   Admins,
//   Courses,
// };

//module.exports = { Users, Admins, Courses };
