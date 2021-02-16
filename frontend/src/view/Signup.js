import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../style/Signup.css";

class Signup extends Component {
    constructor(props){
        super(props);
      }

  render() {
    return (
      <div className="signup-base">
          <div className = "credtext">
                <p>Please enter your credentials</p>
            </div>
          <div className="inputfielddiv">
            <div className = "firstnamediv">
                <p className = "firstnametext">Firstname</p>
                <div className = "inputdiv1">
                    <input className = "input1"></input>
                    <span className = "check1">&#10003;</span>
                </div>
            </div>
            <div className = "surnamediv">
                <p className = "surnametext">Surname</p>
                <div className = "inputdiv2">
                    <input className = "input2"></input >
                    <span className = "check2">&#10003;</span>
                </div>
            </div>
            <div className = "emaildiv">
                <p className = "emailtext">Email</p>
                <div className = "inputdiv3">
                    <input className = "input3"></input>
                    <span className = "check3">&#10003;</span>
                </div>
            </div>
            <div className = "dotdiv">
                <p className = "dottext">Date of birth (YYMMDD-XXXX)</p>
                <div className = "inputdiv4">
                    <input className = "input4"></input>
                    <span className = "check4">&#10003;</span>
                </div>
            </div>
            <div className = "usernamediv">
                <p className = "usernametext">Username</p>
                <div className = "inputdiv5">
                    <input className = "input5"></input>
                    <span className = "check5">&#10003;</span>
                </div>
            </div>
            <div className = "passworddiv">
                <p className = "passwordtext">Password</p>
                <div className = "inputdiv6">
                    <input className = "input6"></input>
                    <span className = "check6">&#10003;</span>
                </div>
            </div>
          </div>
          <div className = "confirmbuttondiv">
                <button className = "confirmbutton">Confirm and save</button>
            </div>
      </div>
    );
  }
}

export default Signup;