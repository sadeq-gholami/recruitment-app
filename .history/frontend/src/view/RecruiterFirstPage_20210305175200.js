import React, { Component } from "react";
import "../style/Recruiter.css";


class RecruiterFirstPage extends Component {
    constructor(props){
        super(props);
        this.state={
            status: "LOADING",
        }
        
      }
        /**
     * On start up it gets all the
     * information about the applicants from the database,
     * sets state for status
     */
    componentDidMount() {
        this.props.model.addObserver(this);
        this.props.model
            .getAllApplicants()
            .then(applicants => {
                this.setState({
                    status: "LOADED",
                    applicants: applicants.result
                    
                    
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR"
                });
            });
    }
     /**
     * Renders the HTML code
     * Uses the data from the model and displays it
     */
  render() {
      let applicantList =null;
      let competenceList =null;
      let comp = null;
      let applicantsList = null;
      switch (this.state.status){
          case "LOADING":
              applicantList = "LOADING";
              break;
          case "LOADED":
              applicantList= this.state.applicants.map(comp => (
                <option key={comp.userId}>{comp.username}</option>
              )); 
               comp =this.state.applicants.map(comp => {
                competenceList = comp.competence.map((cmp) =>( <option key={cmp._id} value={cmp._id}>{cmp.name}</option>))
                })
                applicantsList = this.state.applicants.map(list => (
                    <tr >
                    <td >{list.firstname}</td>
                    <td >{list.surname}</td>
                    <td >{list.ready}</td>
                    </tr>
                ));
           break;
           default:
           applicantList = <b>Failed to load data, please try again</b>;
           break;
      }
    return (
      <div className="Recruiterfirstpage-base">
            <div className = "credtext">
                <p>Welcome Recruiter!</p>
            </div>
            <div className="container">
                <select className="name" >
                    <option value ="" hidden>name</option>
                    {applicantList}
                </select>
                <div className="timediv">
                    <label className="timeDiv"> <p><strong>time period</strong></p>
                        <input className="timeInput" type="date" name="trip-start" defaultValue="time period"
                        min="2021-01-01" max="2021-12-31"></input>
                        <input className="timeInput" type="date" name="trip-end" defaultValue="time period"
                        min="2021-01-01" max="2021-12-31"></input>
                    </label>
                </div>
                <select className="competence">
                    <option value ="" hidden>competence</option>
                    {competenceList}
                </select>
                <select className="date">
                <option value ="" hidden>date</option>
                </select> 
                <div className ="saveParameters">
                    <button className="Btn"> save</button>
                </div>   
            </div>
            <br></br>
            <table className="information">
            <tbody><tr><th>Firstname</th><th>Surname</th><th>Date</th></tr>{applicantsList}</tbody>
                </table>
            <button className="btn">View application</button>      
      </div>
    );
  }
}

export default RecruiterFirstPage;