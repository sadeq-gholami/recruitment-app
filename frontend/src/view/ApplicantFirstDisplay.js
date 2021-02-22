import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

class ApplicantFirstDisplay extends Component {
    constructor(props){
        super(props);
      }

componentDidMount(){
    
}

  render() {
    let competence1 = this.props.model.getCompetence();
    let competence2 = JSON.parse(competence1)
    let key = 0;
    let c = competence2.map(comp =>(
        <div key={key++}>
            <p>{comp.name}</p>
            <p>{comp.yearsOfExperience}</p>
        </div>
    ));
      
    return (
      <div className="applicantfirstdisplay-base">
            <div className = "credtext">
                <p>You have entered the following information:</p>
            </div>
          <div className="inputfielddiv">
            <div className = "exdiv">
                <p className = "extext">Expertise</p>
                <div className = "inputdiv1">
                <div className = "exchoice">
                        {c}
                    </div>
                    <span className = "check1">&#10003;</span>
                </div>
            </div>
            <div className = "yearsdiv">
                <p className = "yearstext">Years of experience</p>
                <div className = "inputdiv2">
                    <div className = "yearschoice">
                        <p className = "years">years</p>
                    </div>
                    <span className = "check2">&#10003;</span>
                </div>
            </div>
            <div className = "savebuttondiv">
                <Link to = "/applicantsecondpage">
                    <button className = "savebutton">Save & continue</button>
                </Link>
            </div>
            <div className = "savebuttondiv">
                <Link to = "/applicantfirstpage">
                    <button className = "savebutton">Go back & edit</button>
                </Link>
            </div>
        </div>
      </div>
    );
  }
}

export default ApplicantFirstDisplay;