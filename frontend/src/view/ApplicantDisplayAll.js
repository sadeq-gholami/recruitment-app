import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

/**
 * This class displays the selected
 * competence and time period of the applicant
 * and gives the applicant the choice
 * to submit or cancel the application
 */
class ApplicantDisplayAll extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * Resets the saved competence and time period
     * from local storage
     * @param { the event from onClick } e 
     */
    resetChoices = async e => {
        this.props.model.resetState();
        localStorage.removeItem("listSelected");
        localStorage.removeItem("listSelectedTime");
    }

    /**
     * Saves selected data in database
     * @param { the event from onClick } e 
     */
    submitApp = async e => {
        this.props.model.submitApp();
    }

    /**
     * Renders the competence data
     */
    renderComp() {
        let competence = this.props.model.getCompetence();
        let key1 = 0;
        let c = competence.map(comp => (
            <div key={key1++} className="displayCompChoiceDiv">
                <p className="displayCompText">Expertise:</p>
                <div className="displayNameDiv">
                    <p className="compName">{comp.name}</p>
                </div>
                <p className="displayYearsText">Years of experience:</p>
                <div className="displayYearDiv">
                    <p className="compYear">{comp.yearsOfExperience}</p>
                </div>
            </div>
        ));
        return c;
    }

    /**
     * Renders the time period data
     */
    renderTime() {
        let time = this.props.model.getTimePeriod();
        let key2 = 0;
        let t = time.map(time => (
            <div key={key2++} className="displayTimeChoiceDiv">
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
        return t;
    }

    /**
    * Renders the HTML code
    * Uses the data from the model and displays it
    */
    render() {
        this.props.model.restoreState();
        let c = this.renderComp();
        let t = this.renderTime();

        return (
            <div className="applicantfirstdisplay-base">
                <div className="credtext">
                    <p>You have entered the following information:</p>
                </div>
                <div className="inputfielddiv">
                    <div className="displayAllComp">
                        <div className="displayCompDiv">
                            <div className="displayComp">
                                {c}
                            </div>
                        </div>
                    </div>
                    <div className="displayAllTime">
                        <div className="displayTimeDiv">
                            <div className="displayTime">
                                {t}
                            </div>
                        </div>
                    </div>
                    <div className="savebuttondiv">
                        <Link to="/applicantconfirm">
                            <button className="savebutton" onClick={this.submitApp}>Submit</button>
                        </Link>
                    </div>
                    <div className="savebuttondiv">
                        <Link to="/applicantfirstpage">
                            <button className="savebutton" onClick={this.resetChoices}>Cancel</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ApplicantDisplayAll;