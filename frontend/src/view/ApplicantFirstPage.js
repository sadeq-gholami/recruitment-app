import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

class ApplicantFirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "LOADING",
            competence: {},
            _id: null,
            yearsOfExperience: null,
            name: null
        }
    }

    /*
    submitSignup = async e => {
      e.preventDefault();
      this.props.model.setSignup({
          firstname: this.state.firstname,
          surname: this.state.surname,
          email: this.state.email,
          ssn: this.state.ssn,
          username: this.state.username,
          password: this.state.password
      });
      await this.props.model.signup().then(result => {
          if(result.status == 200){
              window.location.replace('/applicantfirstpage');
          }   
      }).catch(err => {
          window.alert(err);
          console.log(err);
      });
  }
    
    */
    componentDidMount() {
        {
            this.props.model
                .getAllCompetences()
                .then(competence => {
                    console.log(competence);
                    this.setState({
                        status: "LOADED",
                        competence: competence
                    });
                })
                .catch(() => {
                    this.setState({
                        status: "ERROR"
                    });
                });
        }
    }

    submitCompetence = async e => {
        this.setState({ _id: e.target.value });
        let name;
        for (let index in this.state.competence.competences) {
            if (this.state.competence.competences[index]._id == e.target.value) {
                name = this.state.competence.competences[index].name;
            }
        }
        this.setState({ name: name });
    }

    submitYears = async e => {
        this.setState({ yearsOfExperience: e.target.value });
    }

    submitComp = async e => {
        e.preventDefault();
        console.log(this.state._id + "    " + this.state.yearsOfExperience);
        console.log(this.state);
        this.props.model.setCompetence({
            _id: this.state._id,
            yearsOfExperience: this.state.yearsOfExperience,
            name: this.state.name
        });
        this.props.model.getCompetence();
       // window.location.href = '/applicantfirstdisplay';

    }

    render() {
        let c = null;
        switch (this.state.status) {
            case "LOADING":
                c = "loading...";
                break;
            case "LOADED":
                c = this.state.competence.competences.map(comp => (
                    <option key={comp._id} value={comp._id}>{comp.name}</option>
                ));
                break;
            default:
                break;
        }

        return (
            <div className="applicantfirstpage-base">
                <div className="credtext">
                    <p>Please choose your expertise and years of experience</p>
                </div>
                <div className="inputfielddiv">
                    <div className="exdiv">
                        <p className="extext">Expertise</p>
                        <div className="inputdiv1">
                            <select onChange={this.submitCompetence} className="select1">
                                {c}
                            </select>
                            <span className="check1">&#10003;</span>
                        </div>
                    </div>
                    <div className="yearsdiv">
                        <p className="yearstext">Years of experience</p>
                        <div className="inputdiv2">
                            <select onChange={this.submitYears} className="select2">
                                <option value="0">0</option>
                                <option value="0.5">0.5</option>
                                <option value="1">1</option>
                                <option value="1.5">1.5</option>
                                <option value="2">2</option>
                                <option value="2.5">2.5</option>
                                <option value="3">3</option>
                                <option value="3.5">3.5</option>
                                <option value="4">4</option>
                                <option value="4.5">4.5</option>
                                <option value="5">5</option>
                                <option value="5+">5+</option>
                            </select>
                            <span className="check2">&#10003;</span>
                        </div>
                    </div>
                    
                    <div className="savebuttondiv">
                    <Link to="/applicantfirstdisplay">
                        <button className="savebutton" onClick={this.submitComp}>Save</button>
                        </Link>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default ApplicantFirstPage;