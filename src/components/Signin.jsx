import { Button, Card, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          paddingTop: 120,
          marginBottom: 10,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography> Welcome back. Please Sign In</Typography>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></TextField>
          <br />
          <br />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></TextField>
          <br />
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              size="large"
              variant="contained"
              // onClick={async () => {
              //   const response = await axios.post('http://localhost:3000/admin/login', {
              //     headers: {
              //       'Content-type': 'application/json',
              //       username: username,
              //       password: password,
              //     },
              //   });
              //   //localStorage.setItem('token', response);
              //   navigate('/courses');
              //   //window.location = "/";
              // }}
              onClick={async () => {
                await axios
                  .post(
                    'http://localhost:3000/admin/login',
                    {
                      username: username,
                      password: password,
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    }
                  )
                  .then((response) => {
                    localStorage.setItem('token', response.data.token);
                    navigate('/courses');
                  });
              }}
            >
              Sign In
            </Button>
            {/* <Button
              size="large"
              variant="contained"
              onClick={() => {
                fetch('http://localhost:3000/admin/login', {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json',
                    username: username,
                    password: password,
                  },
                }).then((response) => {
                  response.json().then((data) => {
                    localStorage.setItem('token', data.token);
                    navigate('/courses');
                    //window.location = "/";
                  });
                });
              }}
            >
              Sign In
            </Button> */}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
