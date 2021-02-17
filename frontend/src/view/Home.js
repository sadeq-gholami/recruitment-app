import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../style/Home.css";

class Home extends Component {
    constructor(props){
        super(props);
      }

  render() {
    return (
      <div className="welcome">
          <div className = "welcomediv">
            <p className = "welcometext">Welcome to the Tivoli recruitment app</p>
          </div>
          <div className = "signuplogin-div">
              <button className = "signup">Sign up</button>
              <button className = "login">Log in</button>
          </div>
      </div>
    );
  }
}

export default Home;