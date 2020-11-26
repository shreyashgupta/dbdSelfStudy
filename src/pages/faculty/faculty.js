import React from 'react';
import 'tachyons';
import {Link} from 'react-router-dom';

import { auth , firestore} from '../../backend/server';
import './style.css'

//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class Faculty extends React.Component {
 constructor(props) {
    super();
    this.state=
    {
      isFaculty:false,
      email:""
    }
    let token=localStorage.getItem('token');
    if(token=="faculty")
      this.state.isFaculty=true;
    let email=localStorage.getItem('email');
    this.state.email=email;

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
async f1() {
    let snapShot;
    snapShot =await firestore.collection('faculty').doc(this.state.email);
      let obj;
      await snapShot.get().then(function(doc) {
          if (doc.exists) {
                obj=doc.data();
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      return obj;
}

async componentWillMount() {
  if(this.state.isFaculty)
  {
  const obj = await this.f1();
  this.setState({data:obj});
  console.log(this.state.data);
  this.setState({name:obj.name});
}
}
  render() {
    return (
      this.state.isFaculty?
      <div className='fac'>
      <h1>Welcome  {this.state.name}</h1>
        <div className='btns'>
        <Link to="/createQuestion">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib x"
              type="submit"
              value="Create Question"
            />
        </Link>
        <Link to="/createTest">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib x"
              type="submit"
              value="Create Test"
            />
        </Link>
        <Link to="/viewSubmissions">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib x"
              type="submit"
              value="View Submissions"
            />
        </Link>
        <div>
            <input
              onClick={this.handleSignOut}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib x"
              type="submit"
              value="Logout"
            />
        </div>
        </div>
      </div>:
      <div>
      <h1>Sign in as faculty required</h1>
      </div>
    );
  }
}

export default Faculty;