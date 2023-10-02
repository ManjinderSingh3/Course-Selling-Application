import { Button, TextField, Typography, Card } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

function CreateCourse() {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [imageLink, setImage] = useState('');
  const [price, setPrice] = useState();
  return (
    <div>
      <div
        style={{
          paddingTop: 120,
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5"> Create course</Typography>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card variant="oulined" style={{ width: 400, padding: 20 }}>
          <TextField label="Title" variant="outlined" fullWidth={true} onChange={(e) => setCourseTitle(e.target.value)}></TextField>
          <br /> <br />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setCourseDescription(e.target.value);
            }}
          ></TextField>
          <br /> <br />
          <TextField
            label="Image Link"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          ></TextField>
          <br /> <br />
          <TextField label="Price" variant="outlined" fullWidth={true} onChange={(e) => setPrice(e.target.value)}></TextField>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <Button
              size="large"
              variant="contained"
              onClick={async () => {
                await axios.post(
                  `${BASE_URL}/admin/course`,
                  {
                    title: courseTitle,
                    description: courseDescription,
                    imageLink: imageLink,
                    price: price,
                  },
                  {
                    headers: {
                      'Content-type': 'application/json',
                      Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                  }
                );
                alert('Course added successfully !!');
              }}
            >
              Create Course
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default CreateCourse;
