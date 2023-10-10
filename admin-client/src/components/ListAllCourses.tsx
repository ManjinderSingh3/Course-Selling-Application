import { Card, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config.js';
import { CreateCourseInputParams } from '../../../common/src/index.ts';

function ListAllCourses() {
  const [courses, setCourses] = useState([]);
  const init = async () => {
    const response = await axios.get(`${BASE_URL}/admin/courses`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    setCourses(response.data.courses);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {courses.map((course, index) => {
        return <Course key={index} course={course} />;
      })}
    </div>
  );
}

export function Course({ course }: { course: CreateCourseInputParams }) {
  const navigate = useNavigate();
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
        <Typography>
          <b>ID:</b> {course._id}
        </Typography>
        <Typography>
          <b>Title:</b> {course.title}
        </Typography>
        <Typography>
          <b>Description:</b> {course.description}
        </Typography>
        <Typography>
          <b>Price:</b> {course.price}
        </Typography>
        <Typography>
          <b>IsPublished:</b> {course.published ? 'True' : 'False'}
        </Typography>
        <div style={{ marginTop: 20 }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/course/' + course._id);
            }}
          >
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ListAllCourses;
