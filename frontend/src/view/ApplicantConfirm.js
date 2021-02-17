import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

class ApplicantDisplayAll extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                            </div>
                            <span className="check1">&#10003;</span>
                        </div>
                    </div>
                    <div className="yearsdiv">
                        <p className="yearstext">Years of experience</p>
                        <div className="inputdiv2">
                            <div className="yearschoice">
                                <p className="years">years</p>
                            </div>
                            <span className="check2">&#10003;</span>
                        </div>
                    </div>
                    <div className="timediv">
                        <p className="timetext">Time period</p>
                        <div className="inputdiv1">
                            <div className="timechoice">
                                <p className="time">time</p>
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

export default ApplicantDisplayAll;