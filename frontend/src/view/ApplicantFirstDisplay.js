import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

class ApplicantFirstDisplay extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        console.log(localStorage.getItem("competence"));
        let competence1 = this.props.model.getCompetence();
        let competence2 = JSON.parse(competence1)
        let key = 0;
        let c = competence2.map(comp => (
            <div key={key++} className="competencechoice">
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

        return (
            <div className="applicantfirstdisplay-base">
                <div className="credtext">
                    <p>You have entered the following information:</p>
                </div>
                <div className="inputfielddiv">
                    <div className="exdiv">
                        <div className="competencediv">
                            {c}
                        </div>
                    </div>
                    <div className="savebuttondiv">
                        <Link to="/applicantsecondpage">
                            <button className="savebutton">Save & continue</button>
                        </Link>
                    </div>
                    <div className="savebuttondiv">
                        <Link to="/applicantfirstpage">
                            <button className="savebutton">Go back & edit</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ApplicantFirstDisplay;