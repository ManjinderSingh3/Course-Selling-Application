import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar.jsx';
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';
import CreateCourse from './components/CreateCourse.jsx';
import ListAllCourses from './components/ListAllCourses.jsx';
import UpdateCourse from './components/UpdateCourse.jsx';
import ModifyCourse from './components/ModifyCourse.jsx';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#eeeeee' }}>
      <RecoilRoot>
        <Router>
          <Appbar></Appbar>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/createcourse" element={<CreateCourse />} />
            <Route path="/courses" element={<ListAllCourses />} />
            <Route path="/course/:courseId" element={<UpdateCourse />} />
            {/* <Route path="/courses/:courseId" element={<ModifyCourse />} /> */}
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
