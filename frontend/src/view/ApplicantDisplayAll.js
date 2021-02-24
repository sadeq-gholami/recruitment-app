import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

class ApplicantDisplayAll extends Component {
    constructor(props) {
        super(props);
    }

    resetChoices = async e => {
        this.props.model.resetState();
    }

    submitApp = async e => {
        this.props.model.submitApp();
    }

    renderComp() {
        //Comp
        let competence = this.props.model.getCompetence();
        let key1 = 0;
        let c = competence.map(comp => (
            <div key={key1++} className="competencechoice">
                <p className="extext">Expertise:</p>
                <div className="compNamediv">
                    <p className="compName">{comp.name}</p>
                </div>
                <p className="yearstext">Years of experience:</p>
                <div className="compYeardiv">
                    <p className="compYear">{comp.yearsOfExperience}</p>
                </div>
            </div>
        ));
        return c;
    }

    renderTime() {
        //Time
        let time = this.props.model.getTimePeriod();
        let key2 = 0;
        let t = time.map(time => (
            <div key={key2++} className="timechoice">
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
                    <div className="exdiv">
                        <p className="extext">Expertise</p>
                        <div className="inputdiv1">
                            <div className="exchoice">
                                <p className="expertise">expertise</p>
                                {c}
                            </div>
                            <span className="check1">&#10003;</span>
                        </div>
                    </div>
                    <div className="timediv">
                        <p className="timetext">Time period</p>
                        <div className="inputdiv1">
                            <div className="timechoice">
                                <p className="time">time</p>
                                {t}
                            </div>
                            <span className="check1">&#10003;</span>
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