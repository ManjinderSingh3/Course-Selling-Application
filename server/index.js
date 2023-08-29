const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/admin', adminRouter);
app.use('/user', userRouter);

mongoose.connect(
  'mongodb+srv://manjinder:Ms2021-2022@coursesellingapp.xy8jux9.mongodb.net/',
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'CourseSelling' }
);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
