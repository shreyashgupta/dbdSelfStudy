import React from 'react';
import 'tachyons';
import { auth , firestore} from '../../backend/server';
class StudentSignIn extends React.Component {
 constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            currentUser: {},
            history: props.history,
            loggedIn:false,
        }
        const token=localStorage.getItem('token');
        if(token==null)
        {
          this.state.loggedIn=false;
        }
        else
          this.state.loggedIn=true;
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

  //   f1 = async () => {
  //   const snapShot = await firestore.collection('employers').get();
  //   const docsArray = snapShot.docs;
  //   const docsArrayData = docsArray.map(doc => doc.data());
  //   return docsArrayData;
  // }
  // functionFirebase = async () => {
  //           const array = await this.f1();
  //           //console.log(array)
  //           for(let i=0;i<array.length;i++)
  //               if(array[i].email===this.state.email)
  //                   //console.log(array[i].email,this.state.email)
  //                this.setState({currentUser: array[i]})
  //           //console.log(this.state.currentUser)
  //           localStorage.setItem("name",this.state.currentUser.name)
  //           localStorage.setItem("email",this.state.currentUser.email)
  //           localStorage.setItem("phNo",this.state.currentUser.phNo)
  // }
  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitSignIn = async(event) => {
      event.preventDefault();

      const { email, password } = this.state;
      console.log(this.state)
      try {
          await auth.signInWithEmailAndPassword(email, password);
          // for(let i=0;i<1000;i++)
          //   for(let j=0;j>5;j++);
          // console.log(this.state.users);
          //alert(`Logged in as Employer successfully`);
          localStorage.setItem('token',"student");
          localStorage.setItem('email',email);
          alert("SignedIn as student");
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
  unsubscribeFromAuth=null;

  componentDidMount() {
      this.unsubscribeFromAuth= auth.onAuthStateChanged(userAuth => {
          this.setState({ currentUser: userAuth });
      })
  }

  componentWillUnmount(){
      this.unsubscribeFromAuth();
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      this.state.loggedIn==false?
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Student Login</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 x"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 x"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="mv3">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib x"
                type="submit"
                value="Sign in"
              />
            </div>
          </div>
        </main>
      </article>:
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

export default StudentSignIn;