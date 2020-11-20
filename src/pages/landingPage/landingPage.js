import React from 'react';
import 'tachyons';
import {Link} from 'react-router-dom';
import { auth , firestore} from '../../backend/server';
import './style.css'
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

  render() {
    return (
      this.state.isLoggedin==false?
      <div>
      <h1>This is Landing Page</h1>
      <div className='btns'>
      <Link to="/studentLogin"><div>
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Login as Student"
          />
      </div>
      </Link>
      <Link to="/facultyLogin">
      <div>
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Login as Faculty"
          />
      </div>
      </Link>
      </div></div>:
      <div>
      <h1>Already Logged in</h1>
      <div>
          <input
            onClick={this.handleSignOut}
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Logout"
          />
      </div>
      </div>
    );
  }
}

export default LandingPage;