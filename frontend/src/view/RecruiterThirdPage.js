import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../style/Recruiter.css";


class RecruiterThirdPage extends Component {
    constructor(props){
        super(props);
      }

  render() {
    return (
      <div className="Recruiterfirstpage-base">
            <div className = "credtext">
                <p>Full application and status</p>
            </div>
            <div className="application">
               <div className="applicationBox"></div>  
            </div>
            <br></br>
            <div className="container">
            <select className="status">
                <option value ="" hidden>Change status</option>
                <option value ="unhandled" >Unhandled</option>
                <option value ="accepted" >Accepted</option>
                <option value ="rejected" >Rejected</option>
            </select>
            <div className="currentStatus">
                    Status: Accepted/Rejected/unhandled
            </div>
            </div>
            <button className="btn">Save</button>


          
      </div>
    );
  }
}

export default RecruiterThirdPage;