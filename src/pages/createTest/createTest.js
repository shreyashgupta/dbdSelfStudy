import React from 'react';
import 'tachyons';
import './style.css'
import {Redirect } from 'react-router-dom';
import {Link,Router} from 'react-router-dom';
import { storage ,auth} from '../../backend/server';
import { firestore } from '../../backend/server';
class CreateTest extends React.Component{
  constructor() {
    super();
    this.state=
    {
      nques:0,
      isFaculty:false,
      ques:[],
      test_ques:0
    }
    let token=localStorage.getItem('token');
    if(token=="faculty")
    {
      this.state.isFaculty=true;
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
    f1 = async () => {
    const snapShot = await firestore.collection('questions').get();
    const docsArray = snapShot.docs;
    const docsArrayData = docsArray.map(doc => doc.data());
    return docsArrayData;
  }
  functionFirebase = async () => {
            const array = await this.f1();
            console.log(array);
            this.setState({nques:array.length});
            this.setState(Object.assign(this.state.ques,{ques:array}))
  }
  async componentWillMount() {
    if(this.state.isFaculty)
    {
    await this.functionFirebase();
  }
}
shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
  handleSubmit = async (event) => {

      let shuff=this.shuffle(this.state.ques).slice(0,this.state.test_ques);
      console.log(shuff);
      const { ques,test_ques,nques} = this.state;
      if(nques<test_ques)
        alert("Enter a value less than or equal number of available questions")
      else {
        const id=Math.floor((Math.random() * 1000) + 1)
          const userRef = firestore.doc(`test/`+id);
          //const snapShot = await firestore.collection('Users').get();
          
          const test = {shuff,id};

          try {
              await userRef.set(test);

          console.log(this.state);
              this.setState({
                ques:[],
                nques:0,
                test_ques:0
              })
              alert("Created Test");
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
            <div className>
            <h1>No. of Available Questions : {this.state.nques}</h1>
            <ul className='ct'>
                {
                this.state.ques.map((x,i)=>
                  <h3><li>{x.ques}</li></h3>
                  )
              }
            </ul>
                <article className="br3 ba b--black-10 mv4 tc w-50-m w-25-l mw6 shadow-5 center ">
                    <main className="pa4 black-80">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0">Create Test</legend>
                                <div className="mt3 center">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Enter Number of Questions</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white ma4"
                                        type="number"
                                        name="test_ques"
                                        id="name"
                                        onChange={this.handleChange}
                                    />
                                </div>
                            <div>
                                <input
                                    onClick={this.handleSubmit}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Create"
                                />
                            </div>
                            </fieldset>
                    </main>
                </article>
            </div>:<h1>You are not authorized to create question</h1>
    );
  }
}
export default CreateTest;