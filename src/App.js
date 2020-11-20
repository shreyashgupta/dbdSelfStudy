import './App.css';
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
// import Chat from './pages/chatbox/Chat';
import StudentSignIn from './pages/studentSignIn/studentSignIn.js';
import FacultySignIn from './pages/facultySignIn/facultySignIn.js';
import FacultySignUp from './pages/facultySignUp/facultySignUp.js';
import StudentSignUp from './pages/studentSignUp/studentSignUp.js';
import LandingPage from './pages/landingPage/landingPage.js';
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
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
