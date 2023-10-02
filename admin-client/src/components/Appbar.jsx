import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user.js';
import { userEmailState } from '../store/selectors/userEmail';
import { userLoadingState } from '../store/selectors/userLoading';

function Appbar() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState); // Setting up Atom
  const userEmail = useRecoilValue(userEmailState); // Subscribing to Selector
  const userLoading = useRecoilValue(userLoadingState); // Subscribing to Selector

  if (userLoading) {
    return <></>;
  }

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
        <div>
          <Button
            onClick={() => {
              navigate('/createcourse');
            }}
          >
            Add Course
          </Button>

          <Button
            style={{ marginRight: 10 }}
            onClick={() => {
              navigate('/courses');
            }}
          >
            Courses
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.setItem('token', null);
              setUser({
                isLoading: false,
                userEmail: null,
              });
              //window.location = '/';
            }}
          >
            Logout
          </Button>
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
          <div style={{ marginRight: 10, borderRadius: '20' }}>
            <Button
              onClick={() => {
                navigate('/signin');
              }}
              style={{ color: '#0d9488' }}
            >
              Signin
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                navigate('/signup'); // NAVIGATE hook helps to avoid re-rendering of entire app . If we use (window.location = "/signup) then entire app will re-render by hitting the backend again.
                // window.location = "/signup";
              }}
              style={{ borderRadius: 9999, backgroundColor: '#0d9488', fontSize: '.875rem' }}
            >
              Signup
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Appbar;
