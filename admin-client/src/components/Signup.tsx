import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Card, Typography } from '@mui/material';
import { useState } from 'react';
import { BASE_URL } from '../config.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user.js';

function Signup() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [username, setUsername] = useState('');
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
            label="Username"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth={true}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{ marginBottom: 10 }}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={async () => {
                const response = await axios.post(
                  `${BASE_URL}/admin/signup`,
                  {
                    username: username,
                    password: password,
                  },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
                );
                localStorage.setItem('token', response.data.token);
                setUser({ isLoading: false, userEmail: username }); // re-rendering
                navigate('/');
                //window.location = '/';  It's a hard reload
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
