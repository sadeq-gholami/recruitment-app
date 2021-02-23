import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

class ApplicantFirstDisplay extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    resetLocalstorage(){
        //save state
        localStorage.removeItem("listSelected");
    }

    render() {
        this.props.model.restoreState();

        let competence = this.props.model.getCompetence();
        let key = 0;
        console.log(competence);
        let c = competence.map(comp => (
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
                            <button className="savebutton" onClick={this.resetLocalstorage}>Save & continue</button>
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