import React from 'react';
import 'tachyons';
import {Link, Redirect} from 'react-router-dom';
import { auth , firestore} from '../../backend/server';
//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class ViewTests extends React.Component {
 constructor(props) {
    super();
    this.takeTest=this.takeTest.bind(this);
    this.state=
    {
      isStudent:false,
      email:"",
      tests:[],
    }
    let token=localStorage.getItem('token');
    if(token=="student")
      this.state.isStudent=true;
    let email=localStorage.getItem('email');
    this.state.email=email;

    }
  handleSignOut = (event) => {
      auth.signOut();
      localStorage.removeItem('token');
      alert("Logged out successfully");
      if(window.location.port){
          window.location.assign(`http://${window.location.hostname}:${window.location.port}/`);
      }
      else{
          window.location.assign(`http://${window.location.hostname}/`);
      }
  }
  takeTest=(event)=>
  {
    localStorage.setItem('test_no',this.state.tests[event.target.name-1].id);
  }
    f1 = async () => {
    const snapShot = await firestore.collection('test').get();
    const docsArray = snapShot.docs;
    const docsArrayData = docsArray.map(doc => doc.data());
    return docsArrayData;
  }

async componentWillMount() {
  if(this.state.isStudent)
  {
  let obj = await this.f1();
  this.setState({tests:obj});
  console.log(obj);
  }
}
  render() {
    return (
      this.state.isStudent?
      <div>
      <h1>Available Tests</h1>
      {
        this.state.tests.length?
          <div>
          {
            this.state.tests.map((x,i)=>
            {
                if(x.attempted_by.indexOf(this.state.email)==-1)
                  return <Link to="/submissionPage"><input
                      onClick={this.takeTest}
                      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib ma2"
                      type="submit"
                      value={x.id}
                      name={i+1}
                  /></Link>
            }
              )
          }
          </div>:<h2>Loading</h2>
      }
      </div>
      :
      <div>
      <h1>Sign in as student required</h1>
      </div>
    );
  }
}

export default ViewTests
;