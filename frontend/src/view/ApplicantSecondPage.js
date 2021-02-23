import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

class ApplicantSecondPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="applicantsecondpage-base">
        <div className="credtext">
          <p>Please choose the period you are availble for work</p>
        </div>
        <div className="inputfielddiv">
          <div className="timediv">
            <p className="timetext">Time period</p>
            <div className="inputdiv1">
              <input className="input1" type="date" id="start" name="trip-start" value="2018-07-22" min="2021-01-01" max="2021-12-31"></input>
                <span className="check1">&#10003;</span>
                </div>
            </div>
            <div className="savebuttondiv">
              <Link to="/applicantseconddisplay">
                <button className="savebutton">Save</button>
              </Link>
            </div>
          </div>
        </div>
    );
  }
}

export default ApplicantSecondPage;