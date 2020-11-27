import React from 'react';
import 'tachyons';
import {Link, Redirect} from 'react-router-dom';
import { auth , firestore} from '../../backend/server';
import './style.css'
//import {givVal} from '../../backend/index';
//const { spawn } = require('child_process')
class AttemptedTests extends React.Component {
 constructor(props) {
    super();
    this.state=
    {
      isStudent:false,
      email:"",
      attempted_tests:[],
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
  obj=obj.filter((x,i)=>
  {
    console.log(i,x.attempted_by)
    if(x.attempted_by.length)
        if(x.attempted_by.indexOf(this.state.email)!=-1)
          return true;
        return 0;
  })
  let res=[];
  for(let j=0;j<obj.length;j++)
  {
    let res2=[];
    for(let i=0;i<obj[j].shuff.length;i++)
    {
      let qid=obj[j].shuff[i].id;
      let id=this.state.email+qid;
      let snapShot2 =await firestore.collection('answer').doc(`${id}`);
        await snapShot2.get().then(function(doc) {
            if (doc.exists) {
                  res2.push(
                  {
                    question:obj[j].shuff[i].ques,
                    answer:doc.data().answer,
                    score:doc.data().score
                  }
                )
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
    res.push(
        {
          qas:res2,
          test_no:obj[j].id
        }
      )
  }

  this.setState({attempted_tests:res});
}
}
  render() {
    return (
      this.state.isStudent?
      <div>
      <legend className="f1 fw6 ph0 mh0 center ma3">Attempted Tests</legend>
      {
        this.state.attempted_tests.length?
          <div className="attempted">
          {
            this.state.attempted_tests.map((x,i)=>
            {

                return <div className='sub'>
                <h1>{x.test_no}</h1>
                <div className="evals">
                {
                  x.qas.map((y,j)=>
                  <div className='qa'>
                  <p><b>Question : </b>{y.question}</p>
                  <p><b>Answer : </b>{y.answer}</p>
                  {
                    y.score!=-1?
                      <p><b>Score : </b>{y.score}/10</p>:
                      <p>Not evaluated yet</p>
                  }
                  </div>
                  )
                }
                </div>
                </div>
            }
              )
          }
          </div>:<div class="loader">Loading...</div>
      }
      <Link to="/student"><input
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib ma2"
          type="submit"
          value="Back"
      /></Link>
      </div>
      :
      <div>
      <h1>Sign in as student required</h1>
      </div>
    );
  }
}

export default AttemptedTests
;