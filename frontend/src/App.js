import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
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
      <div className="App">
        <header className="App-header">
          <p>Hello world!</p>
          <Router>
            <Route exact path="/" component={Home} />
          </Router>
        </header>
      </div>
    );
  }
 
}

export default App;
