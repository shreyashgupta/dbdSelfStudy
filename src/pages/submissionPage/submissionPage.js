import React from 'react';
import 'tachyons';
import {Link} from 'react-router-dom';

import { auth , firestore} from '../../backend/server';
import './style.css'

//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class SubmissionPage extends React.Component {
 constructor(props) {
    super();
    this.state=
    {
      isLoggedin:false,
      nq:2,
      q1:'What is Encapsulation in java',
      a1:'',
      q2:'Explain applications of linked list',
      a1:'',
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
handleChange = (event) => {    let val=event.target.name;
    this.setState({ [val]: event.target.value })
}
handleSubmit=()=>
  {
    console.log(this.state);
      let d={
      method:"POST",
      body: JSON.stringify(
        {
          nq:2,
          q1:this.state.q1,
          a1:this.state.a1,
          q2:this.state.q2,
          a2:this.state.a2,
        }),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
          }
          fetch("http://127.0.0.1:5000/submit",d)
          .then(res=>res.json())
          .then(data=>{
            console.log(data)
            if(data.res==='success')
              {
               alert("YO DONE score is "+data.eval);
              }
              else
                alert("Something went wrong");
          });
  }
componentDidMount()
{ 
    
}
  render() {
    return (
      <div className='submission'>
      <h1>Submission Page</h1>
      <div className='qas'>
          <div className="qa">
              <div className='ques'>
                  <h3>{this.state.q1}</h3>
              </div>
              <div className='ans'>
                  <textarea
                      type="text"
                      name="a1"
                      id="a1"
                      onChange={this.handleChange}
                  />
              </div>
          </div>
          <div className="qa">
              <div className='ques'>
                  <h3>{this.state.q2}</h3>
              </div>
              <div className='ans'>
                  <textarea
                      type="text"
                      name="a2"
                      id="a2"
                      onChange={this.handleChange}
                  />
              </div>
          </div>
      </div>
      <div >
          <input
              onClick={this.handleSubmit}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer "
              type="submit"
              value="Submit Test"
          />
      </div>
      </div>
    );
  }
}

export default SubmissionPage;