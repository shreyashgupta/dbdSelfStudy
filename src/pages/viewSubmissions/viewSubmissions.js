import React from 'react';
import 'tachyons';
import {Link, Redirect} from 'react-router-dom';
import './style.css';
import { auth , firestore} from '../../backend/server';
//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class ViewSubmissions extends React.Component {
 constructor(props) {
    super();
    this.handleSubmit=this.handleSubmit.bind(this);
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
  async handleSubmit(event)
  {
    const id=event.target.name;
    console.log(id);
    const aid=this.state.submissions[id].aid;
    const answer=this.state.submissions[id].answer;
    const model_answer=this.state.submissions[id].model_answer;

    var washingtonRef = firestore.collection("answer").doc(aid);

    // Set the "capital" field of the city 'DC'
    await washingtonRef.update({
    score:4
    })
    .then(function() {
    console.log("Document successfully updated!");
    })
    .catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
    });

  }
async f1() {
    let snapShot =await firestore.collection('questions').doc(43);
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
                  aid:arr[i].aid,
                  model_answer:doc.data().model_ans,
                  question:doc.data().ques,
                  evaluated:false
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
      <div className='vs'>
      <h1>These are all ques attempted</h1>
      <div className='cardlist'>
          {
          this.state.submissions.map((x,i)=>
            <article className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4 card">
              <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">{x.question}</h1>
              <div className="pa3 bt b--black-10">
                <p className="f6 f5-ns lh-copy measure x ">
                  <b>Students Answer: </b>{x.answer}
                </p>
                <p className="f6 f5-ns lh-copy measure x">
                  <b>Model Answer: </b>{x.model_answer}
                </p>
                <input
                    onClick={this.handleSubmit}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Evaluate"
                    name={i}
                />
              </div>
            </article>
            )
        }
      </div>
      </div>
      :
      <div>
      <h1>Sign in as faculty required</h1>
      </div>
    );
  }
}

export default ViewSubmissions;