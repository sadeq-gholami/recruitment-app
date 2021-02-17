import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../style/Applicant.css";

class ApplicantFirstPage extends Component {
    constructor(props){
        super(props);
      }

  render() {
    return (
      <div className="applicantfirstpage-base">
            <div className = "credtext">
                <p>Please choose your expertise and years of experience</p>
            </div>
          <div className="inputfielddiv">
            <div className = "exdiv">
                <p className = "extext">Expertise</p>
                <div className = "inputdiv1">
                    <select className = "select1">
                        <option></option>
                        <option>Korvgrillning</option>
                        <option>Diskning</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                    </select>
                    <span className = "check1">&#10003;</span>
                </div>
            </div>
            <div className = "yearsdiv">
                <p className = "yearstext">Years of experience</p>
                <div className = "inputdiv2">
                    <select className = "select2">
                        <option></option>
                        <option>0</option>
                        <option>0.5</option>
                        <option>1</option>
                        <option>1.5</option>
                        <option>2</option>
                        <option>2.5</option>
                        <option>3</option>
                        <option>3.5</option>
                        <option>4</option>
                        <option>4.5</option>
                        <option>5</option>
                        <option>5.5</option>
                    </select>
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

export default ApplicantFirstPage;