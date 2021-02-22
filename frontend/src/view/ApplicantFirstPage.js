import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";

class ApplicantFirstPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "LOADING",
            compentence: {},
            yearsOfExperience: null,
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
                        compentence: competence
                    });
                })
                .catch(() => {
                    this.setState({
                        status: "ERROR"
                    });
                });
        }
        console.log("HEJSAN");
        console.log(this.state.compentence);
    }


    render() {

        let competences = null;
        switch (this.state.status) {
            case "LOADING":
                competences = "loading...";
            case "LOADED":
                console.log(this.state.compentence);
                console.log("COMP");
                
                for(let name in this.state.compentence.competences){
                    console.log(name);
                    console.log(this.state.compentence.compentences.find());
                    console.log(`${name}: ${this.state.compentence.compentences[name]}`);
                }

                /*competences = this.state.compentence.map(comp => {
                    console.log("HEJ");
                })
                console.log(competences);*/
                
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
                            <select className="select1">
                                
                            </select>
                            <span className="check1">&#10003;</span>
                        </div>
                    </div>
                    <div className="yearsdiv">
                        <p className="yearstext">Years of experience</p>
                        <div className="inputdiv2">
                            <select className="select2">
                                <option></option>
                                <option>0</option>
                                <option>0.5</option>
                                <option>1</option>
                                <option>1.5</option>
                                <option>2</option>
                                <option>2.5</option>
                                <option>3</option>
                                <option>3.5</option>
                                <option>4</option>
                                <option>4.5</option>
                                <option>5</option>
                                <option>5.5</option>
                            </select>
                            <span className="check2">&#10003;</span>
                        </div>
                    </div>
                    <div className="savebuttondiv">
                        <Link to="/applicantfirstdisplay">
                            <button className="savebutton">Save</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ApplicantFirstPage;