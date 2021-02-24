import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

//let addedTime = null;

class ApplicantSecondPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "NULL",
      startTime: "2021-01-01",
      endTime: "2021-01-01",
      listSelected: []
    }
  }

  componentDidMount() {
    if (localStorage.getItem("listSelectedTime") != null) {
      this.setState({ status: "ADDED" });
      this.setState({ listSelected: JSON.parse(localStorage.getItem("listSelectedTime")) });
    }
  }

  submitTimeStart = async e => {
    this.setState({ startTime: e.target.value });
  }

  submitTimeEnd = async e => {
    this.setState({ endTime: e.target.value });
  }

  addTimePeriod = async e => {
    this.state.listSelected.push({
      startTime: this.state.startTime,
      endTime: this.state.endTime,
    });

    localStorage.setItem("listSelectedTime", JSON.stringify(this.state.listSelected));

    this.setState({
      status: "ADDED"
    });

  }

  submitTime = async e => {
    this.props.model.setTimePeriod(this.state.listSelected);
    this.props.model.saveState();
  }

  render() {
    let addedTime = null;

    switch (this.state.status) {
      case "ADDED":
        let key = 0;
        addedTime = this.state.listSelected.map(selected => (
          <div key={key++} className="addedTimeDiv">
            <div className="startTimeDiv">
              <p key={key++}> From: {selected.startTime}</p>
            </div>
            <div className="endTimeDiv">
              <p key={key++}> To: {selected.endTime}</p>
            </div>
          </div>
        ));
        break;
      default:
        break;
    }

    return (
      <div className="applicantsecondpage-base">
        <div className="credtext">
          <p>Please choose the period you are available for work</p>
        </div>
        <div className="inputfielddiv">
          <div className="timediv">
            <div className="timeDiv">
              <p>From date:</p>
              <input className="timeInput" type="date" name="trip-start" defaultValue="2021-01-01"
                min="2021-01-01" max="2021-12-31" onChange={this.submitTimeStart}></input>
              <p>To date:</p>
              <input className="timeInput" type="date" name="trip-end" defaultValue="2021-01-01"
                min="2021-01-01" max="2021-12-31" onChange={this.submitTimeEnd}></input>

              <span className="check1">&#10003;</span>
            </div>
          </div>
          <div className="selectedTime">
            Selected time periods: {addedTime}
          </div>
          <div className="savebuttondiv">
            <button className="savebutton" onClick={this.addTimePeriod}>Add time period</button>
            <div className="savebuttondiv">
              <Link to="/applicantseconddisplay">
                <button className="savebutton" onClick={this.submitTime}>Save</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicantSecondPage;