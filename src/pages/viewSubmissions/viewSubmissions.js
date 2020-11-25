import React from 'react';
import 'tachyons';
import {Link, Redirect} from 'react-router-dom';

import { auth , firestore} from '../../backend/server';
//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class ViewSubmissions extends React.Component {
 constructor(props) {
    super();
    // this.takeTest=this.takeTest.bind(this);
    // this.handleSubmit=this.handleSubmit.bind(this);
    // this.handleChange=this.handleChange.bind(this);
    this.state=
    {
      isFaculty:false,
      email:"",
      submissions:[],
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
//     let snapShot;
//     snapShot =await firestore.collection('student').doc(this.state.email);
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
  const snapShot = await firestore.collection('asnwers').get();
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
      this.state.isStudent?
      <div>
      <h1>Welcome  {this.state.name}</h1>
      <h2>Available Tests</h2>
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
      <h1>Sign in as faculty required</h1>
      </div>
    );
  }
}

export default ViewSubmissions;