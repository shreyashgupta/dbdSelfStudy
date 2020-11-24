import React from 'react';
import 'tachyons';
import {Link} from 'react-router-dom';

import { auth , firestore} from '../../backend/server';
import './style.css'

//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class Student extends React.Component {
 constructor(props) {
    super();
    this.takeTest=this.takeTest.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.state=
    {
      isStudent:false,
      email:"",
      tests:[],
      takeTest:false,
      test:0,
      answers:[],
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
  handleSubmit()
  {
    console.log(this.state)
  }
  handleChange=(event)=>
  {
    this.state.answers[event.target.name]=event.target.value;
  }
  takeTest=(event)=>
  {
    this.setState({takeTest:true});
    this.setState({test:event.target.name})
  }
async f1() {
    let snapShot;
    snapShot =await firestore.collection('student').doc(this.state.email);
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
  f2 = async () => {
  const snapShot = await firestore.collection('test').get();
  const docsArray = snapShot.docs;
  const docsArrayData = docsArray.map(doc => doc.data());
  return docsArrayData;
}

async componentWillMount() {
  if(this.state.isStudent)
  {
  let obj = await this.f1();
  this.setState({data:obj});
  console.log(this.state.data);
  this.setState({name:obj.name});
  obj=await this.f2();
  this.setState({tests:obj});
  console.log(this.state);
}
}
  render() {
    return (
      this.state.isStudent?this.state.takeTest==false?
      <div className='fac'>
      <h1>Welcome  {this.state.name}</h1>
      <h2>Available Tests</h2>
      {
        this.state.tests.length?
          <div>
          {
            this.state.tests.map((x,i)=>
              <input
                  onClick={this.takeTest}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="submit"
                  value={i+1}
                  name={i+1}
              />
              )
          }
          </div>:<h2>Loading</h2>
      }
      </div>:
      <div className="taking_test">
      <h1>Take Test {this.state.test}</h1>
      {
        // console.log(this.state.tests[this.state.test-1].shuff)
          this.state.tests[this.state.test-1].shuff.map((x,i)=>
          {
              return <div>

                  <label className="db fw6 lh-copy f3 ma3">{x.ques}</label>              
                  <textarea
                  onChange={this.handleChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-40"
                  type="text"
                  name={i}
                  id="ans"
              />
              </div>
          }
          )
      }
      <div >
          <input
              onClick={this.handleSubmit}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib ma3"
              type="submit"
              value="Submit"
          />
      </div>
      </div>
      :
      <div>
      <h1>Sign in as faculty required</h1>
      </div>
    );
  }
}

export default Student;