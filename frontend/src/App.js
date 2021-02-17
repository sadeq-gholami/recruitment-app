import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./view/Home";
import './App.css';
import Signup from "./view/Signup";
import Login from "./view/Login";
import RecruiterThirdPage from "./view/RecruiterThirdPage";
import RecruiterFirstPage from "./view/RecruiterFirstPage";
import RecruiterSecondPage from "./view/RecruiterSecondPage";

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
            <Route exact path="/"  exact render={(props)=>{return <Home {...props}/>}}/>

            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route path="/applicantfirstpage" component={ApplicantFirstPage}/>
          </Router>

          
          <footer className = "footer">
            <p className = "contactfooter">Contact</p>
          </footer>
      </div>
      
    );
  }
 
}

export default App;
