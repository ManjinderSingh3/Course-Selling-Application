import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Card, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <div
        style={{
          paddingTop: 130,
          marginBottom: 20,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5">Welcome to Coursehub! Sign up below</Typography>
      </div>

      {/* flexbox styling only works for one level child. It does not work for grand child. Example - Card is child of div in line 20 whereas, TextField and Button are grand child. So, to align button in center separate flexbox is required */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card variant={'outlined'} style={{ width: 400, padding: 20 }}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth={true}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              size="large"
              variant="contained"
              onClick={async () => {
                const response = await axios.post('http://localhost:3000/admin/signup', {
                  username: user,
                  password: password,
                });
                localStorage.setItem('token', response.data.token);
                window.location = '/';
              }}
            >
              Sign Up
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
