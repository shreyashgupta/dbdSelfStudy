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
      answers:[],
      email:"",
      time:0
    }
    let token=localStorage.getItem('token');
    let tn=localStorage.getItem('test_no');
    let email=localStorage.getItem('email');
    if(tn)
    {
      this.state.test_no=tn;
    }
    if(email)
    {
      this.state.email=email;
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
handleSubmit= async (event)=>
  {
    console.log(this.state);
    const qids=[];
    const test_no=this.state.test_no;
    for(let i=0;i<this.state.test.length;i++)
    {
      
        const qid=this.state.test[i].id;
        const answer=this.state.answers[i];
        const userRef = firestore.doc(`answer/`+this.state.email+qid);
        const ans={answer,qid,test_no};
        try {
          await userRef.set(ans);
          console.log("done",i);
      } catch (error) {
          console.log(error);
          alert(error.message);

      }
  }
      //const snapShot = await firestore.collection('Users').get();
    var attempted_by=[];
    await firestore.collection("test").doc(test_no)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          attempted_by=doc.attempted_by;
          attempted_by=doc.data().attempted_by;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
      console.log(attempted_by);
      attempted_by.push(this.state.email);
    await firestore.collection("test").doc(test_no).update({
    attempted_by:attempted_by
    });
    console.log("done");
        alert("Created Submission");
      if(window.location.port){
          window.location.assign(`http://${window.location.hostname}:${window.location.port}/student`);
      }
      else{
          window.location.assign(`http://${window.location.hostname}/`);
      }
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
componentDidMount()
{
  this.setState({time:this.state.time+1});
  console.log(this.state.time);
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