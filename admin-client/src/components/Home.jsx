import { Grid, Typography, Button } from '@mui/material';
import { isCustomComponentElement } from 'enzyme/build/Utils';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userEmailState } from '../store/selectors/userEmail';
import { userLoadingState } from '../store/selectors/userLoading';

function Home() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState); // Subscribing to Selector
  const userLoading = useRecoilValue(userLoadingState);
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 200 }}>
            <Typography variant={'h2'}>Learning Platform</Typography>
            <Typography variant={'h5'}>A place to learn and grow !!</Typography>
            {!userEmail && !userLoading && (
              <div style={{ display: 'flex', marginTop: 15 }}>
                <div style={{ marginRight: 15 }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate('/signup');
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
                    }}
                  >
                    SignIn
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <div style={{ marginTop: 100 }}>
            <img src={'/course.jpeg'} width={'100%'} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
