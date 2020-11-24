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
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.state=
    {
      isStudentin:false,
      test_no:0,
      test:[],
      answers:[]
    }
    let token=localStorage.getItem('token');
    let tn=localStorage.getItem('test_no');
    if(tn)
    {
      this.state.test_no=tn;
    }
    if(token=="student")
      this.state.isStudent=true;

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
handleChange = (event) => {    
    let val=event.target.name;
    this.state.answers[val]=event.target.value;
}
handleSubmit=()=>
  {
    console.log(this.state);
    // const array=["this is answer 1", "this is answer 2"];
    //   let d={
    //   method:"POST",
    //   body: JSON.stringify(
    //     {
    //       res:array
    //     }),
    //   headers:{
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   }
    //       }
    //       fetch("http://127.0.0.1:5000/submit",d)
    //       .then(res=>res.json())
    //       .then(data=>{
    //         console.log(data)
    //         if(data.res==='success')
    //           {
    //            alert("YO DONE score is "+data.eval);
    //           }
    //           else
    //             alert("Something went wrong");
    //       });
  }
  async f1() {
    let snapShot;
    snapShot =await firestore.collection('test').doc(this.state.test_no);
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

async componentWillMount()
{ 

    if(this.state.isStudent)
    {
      const obj=await this.f1();
      this.setState({test:obj.shuff});
      console.log(this.state);
    }  
}
  render() {
    return (
      <div className='submission'>
      <legend className="f1 fw6 ph0 mh0 center ma2">Submission Page</legend>
      {
          this.state.test_no?
          <div className="taking_test">
          <legend className="f2 fw6 ph0 ma4 center ma2">Taking Test {this.state.test_no}</legend>
          {
            // console.log(this.state.tests[this.state.test-1].shuff)
              this.state.test.map((x,i)=>
              {
                  return <div>

                      <label className="db fw6 lh-copy f3 ma3">{x.ques}</label>              
                      <textarea
                      onChange={this.handleChange}
                      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-30"
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
          :<h1/>
        }
      </div>
    );
  }
}

export default SubmissionPage;