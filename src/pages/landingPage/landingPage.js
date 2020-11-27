import React from 'react';
import 'tachyons';
import {Link} from 'react-router-dom';

import { auth , firestore} from '../../backend/server';
import './style.css'

//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class LandingPage extends React.Component {
 constructor(props) {
    super();
    this.state=
    {
      isLoggedin:false,
    }
    let token=localStorage.getItem('token');
    if(token==null)
      this.state.isLoggedin=false;
    else
      this.state.isLoggedin=true;

    }
  handleSignOut = (event) => {
      auth.signOut();
      localStorage.removeItem('token');
      // localStorage.removeItem('name');
      // localStorage.removeItem('phNo');
      // localStorage.removeItem('email');
      alert("Logged out successfully");
      if(window.location.port){
          window.location.assign(`http://${window.location.hostname}:${window.location.port}/`);
      }
      else{
          window.location.assign(`http://${window.location.hostname}/`);
      }
  }
componentDidMount()
{

}
  render() {
    return (
      <div className='lp'>
      {this.state.isLoggedin==false?
      <div className='pbtns '>
      <div className="heading">
          <legend className="f1 fw6 mh0 mv4 head pa3">R-VISION</legend>
      </div>

      <div className='btns '>
      <Link to="/studentSignIn">
          <input
            className="b ph3 pv2 input-reset hover-bg-black ba b--black bg-transparent grow pointer f6 dib y  br3"
            type="submit"
            value="SignIn as Student"
          />
      </Link>
      <Link to="/facultySignIn">
          <input
            className="b ph3 pv2 input-reset hover-bg-black ba b--black bg-transparent grow pointer f6 dib y br3"
            type="submit"
            value="SignIn as Faculty"
          />
        </Link>
        <Link to="/adminSignIn">
          <input
            className="b ph3 pv2 input-reset hover-bg-black ba b--black bg-transparent grow pointer f6 dib y br3"
            type="submit"
            value="SignIn as Admin"
          />
      </Link>
      </div></div>:
      <div>
      <h1>Already Logged in</h1>
      <div>
          <input
            onClick={this.handleSignOut}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br3"
            type="submit"
            value="Logout"
          />
      </div>
      </div>
    }
<script src="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></script>
    </div>
    );
  }
}

export default LandingPage;