import React from 'react';
import 'tachyons';
import './style.css'
import {Redirect } from 'react-router-dom';
import {Link,Router} from 'react-router-dom';
import { storage ,auth} from '../../backend/server';
import { firestore } from '../../backend/server';
class CreateQuestion extends React.Component{
  constructor() {
    super();
    this.state=
    {

      ques:"",
      model_ans:"",
      isFaculty:false,
      name:"",
      data:{}
    }
    let token=localStorage.getItem('token');
    let email=localStorage.getItem('email');
    if(token=="faculty")
    {
      this.state.isFaculty=true;
      this.state.email=email;
    }

  }
handleChange = (event) => {    
    let val=event.target.name;
    this.setState({ [val]: event.target.value })
}
  componentDidMount() {
      this.unsubscribeFromAuth= auth.onAuthStateChanged(userAuth => {
          this.setState({ currentUser: userAuth });
      })
  }
  handleSubmit = async (event) => {

      console.log(this.state);
      const { ques,model_ans} = this.state;
      if(ques.length==0 || model_ans.length==0 )
          alert("details entered not valid")
      else {
          let id= Math.floor((Math.random() * 1000) + 1);
          const userRef = firestore.doc(`questions/`+ id);
          //const snapShot = await firestore.collection('Users').get();
          const created_by=this.state.email;
          const qa = {ques,model_ans,id,created_by};

          try {
              await userRef.set(qa);

          console.log(this.state);
              this.setState({
                model_ans:"",
                ques:""
              })
              alert("Created Question");
            if(window.location.port){
                window.location.assign(`http://${window.location.hostname}:${window.location.port}/faculty`);
            }
            else{
                window.location.assign(`http://${window.location.hostname}/`);
            }
          } catch (error) {
              console.log(error);
              alert(error.message);

          }
      }
  }
    render(){
		return(
      this.state.isFaculty?
            <div className="cq"><article className="br3 ba b--black-10 mv4 tc w-00 w-50-m w-25-l mw6 shadow-5 center main">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Create Question</legend>
                            <div className="mt3 center">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Enter Question</label>
                                <textarea
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="text"
                                    name="ques"
                                    id="name"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Enter Model Answer</label>
                                <textarea
                                    className=" pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="email"
                                    name="model_ans"
                                    id="email-address"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </fieldset>
                        <div >
                            <input
                                onClick={this.handleSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Create"
                            />
                        </div>
                    </div>
                </main>
            </article></div>:<h1>You are not authorized to create question</h1>
    );
  }
}
export default CreateQuestion;