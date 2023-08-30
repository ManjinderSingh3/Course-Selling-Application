import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Appbar() {
  const navigate = useNavigate();
  let [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/admin/me', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setUserEmail(response.data.username);
      });
    // fetch("http://localhost:3000/admin/me", {
    //   method: "GET",
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //   },
    // }).then((response) => {
    //   response.json().then((data) => {
    //     if (data.username) {
    //       setUserEmail(data.username);
    //     }
    //   });
    // });
  }, []); // 2nd parameter is empty dependency arrya which means whatever is written inside useEffect will be called only once.
  console.log('Email: ', userEmail);

  if (userEmail) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 5,
        }}
      >
        <div>
          <Typography variant="h5"> CourseHub</Typography>
        </div>
        <div style={{ display: 'flex' }}>
          <div>{userEmail}</div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                localStorage.setItem('token', null);
                window.location = '/';
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 5,
        }}
      >
        <div>
          <Typography variant="h5"> CourseHub</Typography>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 10 }}>
            <Button
              variant="contained"
              onClick={() => {
                navigate('/signup'); // NAVIGATE hook helps to avoid re-rendering of entire app . If we use line #73 approch then entire app will re-render by hitting the backend again.
                // window.location = "/signup";
              }}
            >
              Signup
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                navigate('/signin');
                //window.location = "/signin";
              }}
            >
              Signin
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Appbar;
