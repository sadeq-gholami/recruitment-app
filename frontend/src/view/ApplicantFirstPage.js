import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Applicant.css";
let c = null;
let addedComp = null;

class ApplicantFirstPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: "LOADING",
            competence: {},
            _id: null,
            yearsOfExperience: 0,
            name: null,
            listSelected: []
        }
    }

    componentDidMount() {
        localStorage.clear();
        this.props.model.addObserver(this);
        this.props.model
            .getAllCompetences()
            .then(competence => {
                if (localStorage.getItem("listSelected") != null) {
                    this.setState({ status: "ADDED" });
                    this.setState({ listSelected: JSON.parse(localStorage.getItem("listSelected")) });
                }
                console.log(competence);
                this.setState({
                    status: "LOADED",
                    competence: competence,
                    name: competence.competences[0].name,
                    _id: competence.competences[0]._id
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR"
                });
            });
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
        this.props.model.setCompetence(this.state.listSelected);
        this.props.model.saveState();
        window.location.href = '/applicantfirstdisplay';
    }

    addComp = async e => {
        e.preventDefault();
        console.log("ADD ");
        this.state.listSelected.push({
            _id: this.state._id,
            name: this.state.name,
            yearsOfExperience: this.state.yearsOfExperience,
        });

        localStorage.setItem("listSelected", JSON.stringify(this.state.listSelected));

        await this.setState({
            status: "ADDED"
        });
    }

    update() {
    }

    render() {
        this.props.model.restoreState();

        console.log("RENDER ");

        switch (this.state.status) {
            case "LOADING":
                c = "loading...";
                break;
            case "LOADED":
                c = this.state.competence.competences.map(comp => (
                    <option key={comp._id} value={comp._id}>{comp.name}</option>
                ));
                break;
            case "ADDED":
                let key = 0;
                console.log("CASE ");
                addedComp = this.state.listSelected.map(selected => (
                    <div key={key++}>
                        <div key={key++} className="addedCompDiv">
                            <div key={key++}>
                                <p key={key++} className="addedText">Expertise:</p>
                                <p key={key++} className="addedText">{selected.name}</p>
                            </div>
                            <div key={key++}>
                                <p key={key++} className="addedText">Years of experience: </p>
                                <p key={key++} className="addedText">{selected.yearsOfExperience} years</p>
                            </div>
                        </div>
                    </div>

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
                <div className="contentDiv">
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
                    <div className="selected">
                    Selected expertise and years: {addedComp}
                    </div>
                    <div className="savebuttondiv">
                        <button className="savebutton" onClick={this.addComp}>Add expertise</button>
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