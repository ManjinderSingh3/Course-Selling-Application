import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminRouter from "./routes/admin";
import userRouter from "./routes/user";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

mongoose.connect(
  "mongodb+srv://manjinder:Ms2021-2022@coursesellingapp.xy8jux9.mongodb.net/",
  { dbName: "CourseSelling" }
);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
