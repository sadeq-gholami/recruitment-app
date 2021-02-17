import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

class ApplicantDisplayAll extends Component {
    constructor(props){
        super(props);
      }

  render() {
    return (
      <div className="applicantfirstdisplay-base">
            <div className = "credtext">
                <p>You have entered the following information:</p>
            </div>
          <div className="inputfielddiv">
            <div className = "exdiv">
                <p className = "extext">Expertise</p>
                <div className = "inputdiv1">
                <div className = "exchoice">
                        <p className = "expertise">expertise</p>
                    </div>
                    <span className = "check1">&#10003;</span>
                </div>
            </div>
            <div className = "yearsdiv">
                <p className = "yearstext">Years of experience</p>
                <div className = "inputdiv2">
                    <div className = "yearschoice">
                        <p className = "years">years</p>
                    </div>
                    <span className = "check2">&#10003;</span>
                </div>
            </div>
            <div className = "timediv">
                <p className = "timetext">Time period</p>
                <div className = "inputdiv1">
                <div className = "timechoice">
                        <p className = "time">time</p>
                    </div>
                    <span className = "check1">&#10003;</span>
                </div>
            </div>
            <div className = "savebuttondiv">
                <Link to = "/applicantconfirm">
                    <button className = "savebutton">Submit</button>
                </Link>
            </div>
            <div className = "savebuttondiv">
                <Link to = "/applicantfirstpage">
                    <button className = "savebutton">Cancel</button>
                </Link>
            </div>
        </div>
      </div>
    );
  }
}

export default ApplicantDisplayAll;