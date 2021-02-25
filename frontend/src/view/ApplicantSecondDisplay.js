import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

/**
 * This class displays the selected
 * time period of the Applicant
 */
class ApplicantSecondDisplay extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Renders the HTML code
   * Uses the data from the model and displays it
   */
  render() {
    this.props.model.restoreState();

    let time = this.props.model.getTimePeriod();
    let key = 0;
    let t = time.map(time => (
      <div key={key++} className="toFromDiv">
        <p className="startTimeText">Start time:</p>
        <div className="timeNamediv">
          <p className="timeName">{time.startTime}</p>
        </div>
        <p className="endTimeText">End time:</p>
        <div className="endTimediv">
          <p className="endTime">{time.endTime}</p>
        </div>
      </div>
    ));

    return (
      <div className="applicantseconddisplay-base">
        <div className="credtext">
          <p>You have entered the following information:</p>
        </div>
        <div className="inputfielddiv">
          <div className="timediv">
            <p className="timetext">Selected time periods: </p>
            <div className="timeChoiceDiv">
              <div className="timechoice">
                {t}
              </div>
              <span className="check1">&#10003;</span>
            </div>
          </div>
          <div className="savebuttondiv">
            <Link to="/applicantdisplayall">
              <button className="savebutton">Save & continue</button>
            </Link>
          </div>
          <div className="savebuttondiv">
            <Link to="/applicantsecondpage">
              <button className="savebutton">Go back & edit</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicantSecondDisplay;