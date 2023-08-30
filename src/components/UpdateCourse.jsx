// NOTE : This component is similar to ModifyCourse component. It has implementation of State management library RECOIL on top of that
import { TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from '@mui/material';
import { atom, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';

function UpdateCourse() {
  let { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState);
  // console.log('Update Course component re-rendered');
  useEffect(() => {
    axios
      .get('http://localhost:3000/admin/course/' + courseId, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setCourse(response.data.course);
      });
  }, []);

  return (
    <div>
      <ShowCourse />
      <ModifyCourse courseId={courseId} />
    </div>
  );
}

function ShowCourse() {
  const course = useRecoilValue(courseState);
  console.log('Show Course component re-rendered');
  if (!course) {
    return (
      <div>
        <div>course.length</div>
        <Typography variant="h1" style={{ justifyContent: 'center' }}>
          Course does not exist
        </Typography>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        style={{
          width: 500,
          padding: 10,
          minHeight: 100,
          maxWidth: 400,
          textAlign: 'center',
          margin: 10,
        }}
      >
        <img src={course.imageLink} style={{ maxWidth: 400, maxHeight: 200 }}></img> <br /> <br />
        <b>ID: </b> {course._id} <br />
        <b>Title: </b> {course.title} <br />
        <b>Description: </b> {course.description} <br />
        <b>Price: </b> {course.price} <br />
        <b>IsPublished: </b> {course.published ? 'true' : 'false'}
      </Card>
    </div>
  );
}

function ModifyCourse({ courseId }) {
  const setCourse = useSetRecoilState(courseState);
  console.log('Child-2 component re-rendered');
  const [title, setTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [price, setPrice] = useState();
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ width: 400, padding: 20 }}>
          <Typography variant="h4" style={{ display: 'flex', justifyContent: 'center' }}>
            Update Course
          </Typography>
          <div>
            <TextField label="Title" variant="outlined" fullWidth={true} onChange={(e) => setTitle(e.target.value)} />
            <br /> <br />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              onChange={(e) => setCourseDescription(e.target.value)}
            />
            <br /> <br />
            <TextField label="Image Link" variant="outlined" fullWidth onChange={(e) => setImageLink(e.target.value)} />
            <br /> <br />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth={true}
              onChange={(e) => setPrice(e.target.value)}
            ></TextField>
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
                      'Content-Type': 'application/json',
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
      </div>
    </div>
  );
}

export default UpdateCourse;

// In above example all 3 components have subscribed to different
const courseState = atom({
  key: 'courseState',
  default: '',
});
