import { TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Grid } from '@mui/material';
import axios from 'axios';

// Could have re-used instead of writing Show course and Create course component
import Course from './ListAllCourses';
import CreateCourse from './CreateCourse';

function ModifyCourse() {
  let { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/admin/course/' + courseId, {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setCourse(response.data.course);
      });
  }, []);

  // The id of course passed in url does not exist
  if (!course) {
    return (
      <div>
        <Typography variant="h1" style={{ justifyContent: 'center' }}>
          Course does not exist
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <GreyTop title={course.title} />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          {/* NOTE: We can also send setCourses as a prop to another component */}
          <UpdateCourse course={course} setCourse={setCourse} />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <ShowCourse course={course} />
        </Grid>
      </Grid>
    </div>
  );
}

function GreyTop({ title }) {
  return (
    <div style={{ height: 250, background: '#212121', top: 0, width: '100vw', zIndex: 0, marginBottom: -250 }}>
      <div style={{ height: 250, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <div>
          <Typography style={{ color: 'white', fontWeight: 600 }} variant="h3" textAlign={'center'}>
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function ShowCourse({ course }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        style={{
          margin: 60,
          width: 400,
          minHeight: 200,
          //padding: 10,
          maxWidth: 400,
          marginRight: 50,
          paddingBottom: 15,
          borderRadius: 30,
          zIndex: 2,
        }}
      >
        <img src={course.imageLink} style={{ width: 400, maxHeight: 200 }}></img>
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h6">{course.title}</Typography>
          <Typography variant="subtitle2" style={{ color: 'gray' }}>
            Price
          </Typography>
          <Typography variant="subtitle1">{course.price}</Typography>
        </div>
        {/* <b>ID: </b> {course._id} <br />
        <b>Title: </b> {course.title} <br />
        <b>Description: </b> {course.description} <br />
        <b>Price: </b> {course.price} <br />
        <b>IsPublished: </b> {course.published ? 'true' : 'false'} */}
      </Card>
    </div>
  );
}

function UpdateCourse({ course, setCourse }) {
  let courseId = course._id;
  const [title, setTitle] = useState(course.title);
  const [courseDescription, setCourseDescription] = useState(course.description);
  const [imageLink, setImageLink] = useState(course.imageLink);
  const [price, setPrice] = useState(course.price);
  return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ width: 400, padding: 20, borderRadius: 15, marginTop:200 }}>
          <Typography variant="h4" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            Update Course
          </Typography>
          <div>
            <TextField
              value={title}
              label="Title"
              variant="outlined"
              fullWidth={true}
              style={{ marginBottom: 20 }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              value={courseDescription}
              label="Description"
              variant="outlined"
              fullWidth={true}
              style={{ marginBottom: 20 }}
              onChange={(e) => setCourseDescription(e.target.value)}
            />
            <TextField
              value={imageLink}
              label="Image Link"
              variant="outlined"
              fullWidth={true}
              style={{ marginBottom: 20 }}
              onChange={(e) => setImageLink(e.target.value)}
            />
            <TextField
              value={price}
              label="Price"
              variant="outlined"
              fullWidth={true}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <Button
              size="large"
              variant="contained"
              onClick={async () => {
                const response = await axios.put(
                  'http://localhost:3000/admin/course/' + courseId,
                  {
                    title: title,
                    description: courseDescription,
                    price: price,
                    imageLink: imageLink,
                    published: true,
                  },
                  {
                    headers: {
                      'Content-type': 'application/json',
                      Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                  }
                );
                setCourse(response.data.course);
              }}
            >
              Update
            </Button>
          </div>
        </Card>
      </div>);
}

export default ModifyCourse;
