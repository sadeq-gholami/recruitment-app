import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./view/Home";
import './App.css';

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
          </Router>
      </div>
      
    );
     
  }
 
}

export default App;
