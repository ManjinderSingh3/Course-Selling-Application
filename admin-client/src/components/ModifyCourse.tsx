import { TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Grid } from '@mui/material';
import axios from 'axios';

// Could have re-used instead of writing Show course and Create course component
import Course from './ListAllCourses';
import CreateCourse from './CreateCourse';

import { BASE_URL } from '../config';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { courseState } from '../store/atoms/course';
import { courseLoadingState, courseDetailsState, courseTitleState, coursePriceState, courseImageState } from '../store/selectors/course';
import { Loading } from './Loading';

function ModifyCourse() {
  let { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState); // Setting up Atom
  const courseLoading = useRecoilValue(courseLoadingState); // Subscribed to selector

  // const init = async () => {
  //   const response = await axios.get(`${BASE_URL}/admin/course/` + courseId, {
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: 'Bearer ' + localStorage.getItem('token'),
  //     },
  //   });
  //   console.log('-->', response);
  //   if (response.data.course) {
  //     setCourse({ isLoading: false, course: response.data.course });
  //   } else {
  //     setCourse({ isLoading: false, course: null });
  //   }
  // };
  useEffect(() => {
    //init();
    axios
      .get(`${BASE_URL}/admin/course/${courseId}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setCourse({ isLoading: false, course: response.data.course });
      })
      .catch((e) => {
        setCourse({ isLoading: false, course: null });
      });
  }, []);

  if (courseLoading) {
    return <Loading />;
  }

  return (
    <div>
      <GreyTop />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          {/* NOTE: We can also send setCourses as a prop to another component */}
          <UpdateCourse />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <ShowCourse />
        </Grid>
      </Grid>
    </div>
  );
}

function GreyTop() {
  const title = useRecoilValue(courseTitleState);
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

function ShowCourse() {
  const title = useRecoilValue(courseTitleState);
  const imageLink = useRecoilValue(courseImageState);
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
        <img src={imageLink} style={{ width: 400, maxHeight: 200 }}></img>
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h6">{title}</Typography>
          <Price />
        </div>
      </Card>
    </div>
  );
}

function Price() {
  const price = useRecoilValue(coursePriceState);
  return (
    <div>
      <Typography variant="subtitle2" style={{ color: 'gray' }}>
        Price
      </Typography>
      <Typography variant="subtitle1">{price}</Typography>
    </div>
  );
}

function UpdateCourse() {
  const [courseDetails, setCourse] = useRecoilState(courseState); // Subscribing to a complete Atom
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [price, setPrice] = useState(0);
  //const id: String = '';
  if (courseDetails.course) {
    setTitle(courseDetails.course.title);
    setDescription(courseDetails.course.description);
    setImageLink(courseDetails.course.imageLink);
    setPrice(courseDetails.course.price);
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: 400, padding: 20, borderRadius: 15, marginTop: 200 }}>
        <Typography variant="h4" style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          Update Course
        </Typography>
        <div>
          <TextField value={title} label="Title" variant="outlined" fullWidth={true} style={{ marginBottom: 20 }} onChange={(e) => setTitle(e.target.value)} />
          <TextField
            value={description}
            label="Description"
            variant="outlined"
            fullWidth={true}
            style={{ marginBottom: 20 }}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            value={imageLink}
            label="Image Link"
            variant="outlined"
            fullWidth={true}
            style={{ marginBottom: 20 }}
            onChange={(e) => setImageLink(e.target.value)}
          />
          <TextField value={price} label="Price" variant="outlined" fullWidth={true} onChange={(e) => setPrice(parseInt(e.target.value))} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <Button
            size="large"
            variant="contained"
            onClick={async () => {
              const response = await axios.put(
                `${BASE_URL}/admin/course/` + courseDetails.course?._id || ' ',
                {
                  title: title,
                  description: description,
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
              setCourse({ isLoading: false, course: response.data.course });
            }}
          >
            Update
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ModifyCourse;
