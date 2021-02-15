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
          <Router>
            <Route exact path="/"  exact render={(props)=>{
              
                return <Home {...props}/>
               }}/>
          </Router>
    );
  }
 
}

export default App;
