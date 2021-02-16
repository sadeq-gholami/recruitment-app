import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../style/Login.css";

class Login extends Component {
    constructor(props){
        super(props);
      }

  render() {
    return (
      <div className="login-base">
            <div className = "credtext">
                <p>Please enter your credentials</p>
            </div>
          <div className="inputfielddiv">
            <div className = "usernamediv">
                <p className = "usernametext">Username</p>
                <div className = "inputdiv1">
                    <input className = "input1"></input>
                    <span className = "check1">&#10003;</span>
                </div>
            </div>
            <div className = "passworddiv">
                <p className = "passwordtext">Password</p>
                <div className = "inputdiv2">
                    <input className = "input2"></input >
                    <span className = "check2">&#10003;</span>
                </div>
            </div>
            <div className = "loginbuttondiv">
                <button className = "loginbutton">Login</button>
            </div>
        </div>
      </div>
    );
  }
}

export default Login;