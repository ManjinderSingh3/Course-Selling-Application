import { Button, TextField, Typography, Card } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

function CreateCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImage] = useState('');
  const [price, setPrice] = useState(0);
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
        <Card variant={'outlined'} style={{ width: 400, padding: 20 }}>
          <TextField label="Title" variant="outlined" fullWidth={true} onChange={(e) => setTitle(e.target.value)} style={{ marginBottom: 15 }} />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            style={{ marginBottom: 15 }}
          />
          <TextField
            label="Image Link"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            style={{ marginBottom: 15 }}
          />
          <TextField label="Price" variant="outlined" fullWidth={true} onChange={(e) => setPrice(parseInt(e.target.value))} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
            <Button
              variant="contained"
              onClick={async () => {
                await axios.post(
                  `${BASE_URL}/admin/course`,
                  {
                    title: title,
                    description: description,
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
