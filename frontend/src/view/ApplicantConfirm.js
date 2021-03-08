import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

/**
 * This class displays the selected
 * competence and time period of the Applicant
 */
class ApplicantConfirm extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.model.resetState();
    }

    /**
     * Renders the competence data
     */
    renderComp() {
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

    /**
     * Renders the time period data
     */
    renderTime() {
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

    /**
    * Renders the HTML code
    * Uses the data from the model and displays it
    */
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
                </div>
                <div className="handletext">
                    <p>We will reach out to you when your application has been handled.</p>
                </div>
            </div>
        );
    }
}

export default ApplicantConfirm;