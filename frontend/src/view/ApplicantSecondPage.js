import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

/**
 * This class handles the Applicants
 * choice of time period and stores 
 * it in local storage
 */
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

  /**
   * Checks if local storage exists, if it
   * does - displays the content, else do nothing
   */
  componentDidMount() {
    if (localStorage.getItem("listSelectedTime") != null) {
      this.setState({ status: "ADDED" });
      this.setState({ listSelected: JSON.parse(localStorage.getItem("listSelectedTime")) });
    }
  }

  /**
  * Sets the start time and sets the state
  * @param { the event from onChange } e 
  */
  handleTimeStart = async e => {
    this.setState({ startTime: e.target.value });
  }

  /**
  * Sets the end time and sets the state
  * @param { the event from onChange } e 
  */
  handleTimeEnd = async e => {
    this.setState({ endTime: e.target.value });
  }

  /**
   * Sets the time period, sets and saves the state
   * @param { the event from onClick } e 
   */
  submitTime = async e => {
    this.props.model.setTimePeriod(this.state.listSelected);
    this.props.model.saveState();
  }

  /**
  * Adds the selected time period to an array 
  * and saves the array in local storage
  * Sets the state for status to update render
  * @param { the event from onClick } e 
  */
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

  /**
   * Renders the HTML code
   * Uses the data from the model and displays it
   */
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
                min="2021-01-01" max="2021-12-31" onChange={this.handleTimeStart}></input>
              <p>To date:</p>
              <input className="timeInput" type="date" name="trip-end" defaultValue="2021-01-01"
                min="2021-01-01" max="2021-12-31" onChange={this.handleTimeEnd}></input>
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