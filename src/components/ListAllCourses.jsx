import { Card, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListAllCourses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/admin/courses', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setCourses(response.data.courses);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {courses.map((course, index) => {
        return <Course key={index} course={course} />;
      })}
    </div>
  );
}

export function Course({ course }) {
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