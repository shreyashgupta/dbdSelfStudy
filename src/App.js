import './App.css';
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
// import Chat from './pages/chatbox/Chat';
import StudentLogin from './pages/studentLogin/studentLogin.js';
import FacultyLogin from './pages/facultyLogin/facultyLogin.js';
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
          <Route exact path='/studentLogin'>
            <StudentLogin />
          </Route>
          <Route exact path='/facultyLogin'>
            <FacultyLogin />
          </Route>

        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
