import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

class ApplicantSecondDisplay extends Component {
    constructor(props){
        super(props);
      }

  render() {
    return (
      <div className="applicantseconddisplay-base">
            <div className = "credtext">
                <p>You have entered the following information:</p>
            </div>
          <div className="inputfielddiv">
            <div className = "timediv">
                <p className = "timetext">Time period</p>
                <div className = "inputdiv1">
                <div className = "timechoice">
                        <p className = "expertise">time</p>
                    </div>
                    <span className = "check1">&#10003;</span>
                </div>
            </div>
            <div className = "savebuttondiv">
                <Link to = "/applicantdisplayall">
                    <button className = "savebutton">Save & continue</button>
                </Link>
            </div>
            <div className = "savebuttondiv">
                <Link to = "/applicantsecondpage">
                    <button className = "savebutton">Go back & edit</button>
                </Link>
            </div>
        </div>
      </div>
    );
  }
}

export default ApplicantSecondDisplay;