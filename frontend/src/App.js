import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./view/Home";
import './App.css';
import Signup from "./view/Signup";
import Login from "./view/Login";
import RecruiterThirdPage from "./view/RecruiterThirdPage";
import RecruiterFirstPage from "./view/RecruiterFirstPage";
import RecruiterSecondPage from "./view/RecruiterSecondPage";
import ApplicantFirstPage from "./view/ApplicantFirstPage";
import ApplicantFirstDisplay from "./view/ApplicantFirstDisplay";
import ApplicantSecondPage from "./view/ApplicantSecondPage";
import ApplicantSecondDisplay from "./view/ApplicantSecondDisplay";
import ApplicantDisplayAll from "./view/ApplicantDisplayAll";
import ApplicantConfirm from "./view/ApplicantConfirm";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "Recruitment App"
    };
  }

  render(){
    return (   
      <div className = "App">
        <header className = "App-header">
          <div className = "header">
            <p className = "jobs">Jobs</p>
            <p className = "aboutus">About us</p>
            <p className = "contact">Contact</p>
            
          </div>
        </header>
        
          <Router>
            <Route exact path="/"  exact render={(props)=>{return <ApplicantConfirm {...props}/>}}/>
            
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route path="/applicantfirstpage" component={ApplicantFirstPage}/>
            <Route path="/applicantfirstdisplay" component={ApplicantFirstDisplay}/>
            <Route path="/applicantsecondpage" component={ApplicantSecondPage}/>
            <Route path="/applicantseconddisplay" component={ApplicantSecondDisplay}/>
            <Route path="/applicantdisplayall" component={ApplicantDisplayAll}/>
            <Route path="/applicantdisplayall" component={ApplicantConfirm}/>
            
          </Router>

          
          <footer className = "footer">
            <p className = "contactfooter">Contact</p>
          </footer>
      </div>
      
    );
  }
 
}

export default App;
