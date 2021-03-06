import './App.css';
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
// import Chat from './pages/chatbox/Chat';
import StudentSignIn from './pages/studentSignIn/studentSignIn.js';
import FacultySignIn from './pages/facultySignIn/facultySignIn.js';
import AdminSignIn from './pages/adminSignIn/adminSignIn.js';
import Admin from './pages/admin/admin.js';
import FacultySignUp from './pages/facultySignUp/facultySignUp.js';
import StudentSignUp from './pages/studentSignUp/studentSignUp.js';
import SubmissionPage from './pages/submissionPage/submissionPage.js';
import ViewSubmissions from './pages/viewSubmissions/viewSubmissions.js';
import ViewTests from './pages/viewTests/viewTests.js';
import AttemptedTests from './pages/attemptedTests/attemptedTests.js';
import CreateQuestion from './pages/createQuestion/createQuestion.js';
import LandingPage from './pages/landingPage/landingPage.js';
import Faculty from './pages/faculty/faculty.js';
import Student from './pages/student/student.js';
import CreateTest from './pages/createTest/createTest.js';

// import Map from './components/Map.js';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="App">
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/studentSignIn'>
            <StudentSignIn />
          </Route>
          <Route exact path='/facultySignIn'>
            <FacultySignIn/>
          </Route>
          <Route exact path='/facultySignUp'>
            <FacultySignUp/>
          </Route>
          <Route exact path='/studentSignUp'>
            <StudentSignUp/>
          </Route>
          <Route exact path='/submissionPage'>
            <SubmissionPage/>
          </Route>
          <Route exact path='/createQuestion'>
            <CreateQuestion/>
          </Route>
          <Route exact path='/create'>
            <CreateQuestion/>
          </Route>
          <Route exact path='/viewSubmissions'>
            <ViewSubmissions/>
          </Route>
          <Route exact path='/viewTests'>
            <ViewTests/>
          </Route>
          <Route exact path='/faculty'>
            <Faculty/>
          </Route>
          <Route exact path='/student'>
            <Student/>
          </Route>
          <Route exact path='/createTest'>
            <CreateTest/>
          </Route>
          <Route exact path='/adminSignIn'>
            <AdminSignIn/>
          </Route>
          <Route exact path='/admin'>
            <Admin/>
          </Route>
          <Route exact path='/attemptedTests'>
            <AttemptedTests/>
          </Route>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
