import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';
import CreateCourse from './components/CreateCourse.jsx';
import ListAllCourses from './components/ListAllCourses.jsx';
import ModifyCourse from './components/ModifyCourse.jsx';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './config.js';
import { userState } from './store/atoms/user.js';

function App() {
  return (
    <RecoilRoot>
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#eeeeee' }}>
        <div style={{ marginLeft: 60, marginRight: 60 }}>
          <Router>
            <Appbar />
            <InitUser />
            <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/signup'} element={<Signup />} />
              <Route path={'/signin'} element={<Signin />} />
              <Route path={'/courses'} element={<ListAllCourses />} />
              <Route path={'/createcourse'} element={<CreateCourse />} />
              <Route path={'/course/:courseId'} element={<ModifyCourse />} />
              {/* <Route path="/course/:courseId" element={<UpdateCourse />} /> */}
            </Routes>
          </Router>
        </div>
      </div>
    </RecoilRoot>
  );
}

function InitUser() {
  // Setting up an ATOM defined in store->atoms->user.js
  // Important NOTE : We are just setting up an atom here. We are not useing/subscribed to atom. SO Recoil will not re-render this component upon any change.
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);
  return <></>;
}

export default App;
