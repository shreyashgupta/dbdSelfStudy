import React from 'react';
import 'tachyons';

import {Redirect } from 'react-router-dom';
import {Link,Router} from 'react-router-dom';
import { storage ,auth} from '../../backend/server';
import { firestore } from '../../backend/server';
import './style.css'

class StudentSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            phNo:'',
            isLoggedIn:false,
            passwordc:''
        }
        const token=localStorage.getItem('token');
        if(token==null)
        {
          this.state.isLoggedIn=false;
        }
        else
          this.state.isLoggedIn=true;
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
    handleChange = (event) => {
        let val=event.target.name;
        this.setState({ [val]: event.target.value })
    }
  unsubscribeFromAuth=null;

  componentDidMount() {
      this.unsubscribeFromAuth= auth.onAuthStateChanged(userAuth => {
          this.setState({ currentUser: userAuth });
      })
  }
    handleSubmit = async (event) => {
        console.log(this.state);
        const { email,password,name,passwordc,phNo} = this.state;
        if(email.length==0 || password.length==0 || passwordc.length==0 || phNo.length!=10)
            alert("details entered not valid")
        else if(password!=passwordc)
            alert("passwords do not match");
        else {
            const userRef = firestore.doc(`student/${email}`);
            //const snapShot = await firestore.collection('Users').get();
            
            const registeredUser = {email,password,name,phNo};

            try {
                await userRef.set(registeredUser);
                await auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log(errorMessage);
                  // ...
                });
            alert("signUp success");
            console.log(this.state);
                this.setState({
                email: '',
                password: '',
                name: '',
                phNo:''
                })
              if(window.location.port){
                  window.location.assign(`http://${window.location.hostname}:${window.location.port}/`);
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

    render() {
        return (
            this.state.isLoggedIn==false?
            <div className="cover"><article className="br3 ba b--black-10 mv4 tc w-00 w-50-m w-25-l mw6 shadow-5 center main">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Student SignUp</legend>
                            <div className="mt3 center">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="email"
                                    name="email"
                                    id="email-address"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="phoneNo">Phone-number</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="text"
                                    name="phNo"
                                    id="phoneNo"
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Confirm Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white "
                                    type="password"
                                    name="passwordc"
                                    id="password"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </fieldset>
                        <div >
                            <input
                                onClick={this.handleSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article></div>:
                  <div>
                    <input
                    onClick={this.handleSignOut}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="signOut"
                    />
                    </div>
        );
    }
}

export default StudentSignUp;