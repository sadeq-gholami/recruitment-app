import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

class ApplicantConfirm extends Component {
    constructor(props) {
        super(props);
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
            <div className="applicantconfirm-base">
                <div className="credtext">
                    <p>Thank you for your interest! Your application has been successfully submitted!</p>
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
                </div>
                <div className="handletext">
                    <p>We will reach out to you when your application has been handled.</p>
                </div>
            </div>
        );
    }
}

export default ApplicantConfirm;