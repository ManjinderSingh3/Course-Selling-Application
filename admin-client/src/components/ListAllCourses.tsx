import { Card, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config.js';
import { Course } from '../interfaces/types';
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
      {courses.map((course) => {
        return <Course course={course} />;
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
        <b>ID: </b> {course._id} <br />
        <b>Title: </b> {course.title} <br />
        <b>Description: </b> {course.description} <br />
        <b>Price: </b> {course.price} <br />
        <b>IsPublished: </b> {course.published ? 'true' : 'false'}
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
