import React from 'react';
import 'tachyons';
import {Link, Redirect} from 'react-router-dom';

import { auth , firestore} from '../../backend/server';
//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class ViewSubmissions extends React.Component {
 constructor(props) {
    super();
    // this.handleSubmit=this.handleSubmit.bind(this);
    // this.handleChange=this.handleChange.bind(this);
    this.state=
    {
      isFaculty:false,
      email:"",
      submissions:[]
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
      alert("Logged out successfully");
      if(window.location.port){
          window.location.assign(`http://${window.location.hostname}:${window.location.port}/`);
      }
      else{
          window.location.assign(`http://${window.location.hostname}/`);
      }
  }
  // handleSubmit()
  // {
  //   console.log(this.state)
  // }
  // handleChange=(event)=>
  // {
  //   this.state.answers[event.target.name]=event.target.value;
  // }
  // takeTest=(event)=>
  // {
  //   localStorage.setItem('test_no',this.state.tests[event.target.name-1].id);
  // }
// async f1() {
//     let snapShot =await firestore.collection('questions').doc(43);
//       let obj;
//       await snapShot.get().then(function(doc) {
//           if (doc.exists) {
//                 obj=doc.data();
//           } else {
//               // doc.data() will be undefined in this case
//               console.log("No such document!");
//           }
//       }).catch(function(error) {
//           console.log("Error getting document:", error);
//       });
//       return obj;
// }
  f2 = async () => {
  const email=localStorage.getItem('email');
  let snapShot = await firestore.collection('answer').get();
  const docsArray = snapShot.docs;
  let arr = docsArray.map(doc =>doc.data());
  let arr2=[];
  for(let i=0;i<arr.length;i++)
  {
    let qid=arr[i].qid;
    let snapShot2 =await firestore.collection('questions').doc(`${qid}`);
      await snapShot2.get().then(function(doc) {
          if (doc.exists) {
            if(email==doc.data().created_by)
                arr2.push(
                {
                  test_no:arr[i].test_no,
                  answer:arr[i].answer,
                  model_answer:doc.data().model_ans,
                  question:doc.data().ques
                })
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
      //const ret=await this.f1(arr[i].qid);
      // console.log(ret);
  }
  return arr2;
  // arr=arr.filter((x,i)=>
  //   {
  //       return x.created_by==this.state.email;
  //   }
  // )
}

async componentWillMount() {
  if(this.state.isFaculty)
  {
  let  arr2=await this.f2();
  // arr2=arr2.filter((x,i)=>{
  //     return x.created_by===this.state.email;
  // } ) // this.setState({submissions:obj});
  this.setState({submissions:arr2});
  console.log(this.state);
}
}
  render() {
    return (
      this.state.isFaculty?
      <div>
      <h1>These are all ques attempted</h1>
          {
          this.state.submissions.map((x,i)=>
            <div>
            <h1>{x.test_no}</h1>
            <h2>{x.question}</h2>
            <h3>{x.model_answer}</h3>
            <h2>{x.answer}</h2>
            </div>
            )
        }
      </div>
      :
      <div>
      <h1>Sign in as faculty required</h1>
      </div>
    );
  }
}

export default ViewSubmissions;