import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../style/Recruiter.css";


class RecruiterFirstPage extends Component {
    constructor(props){
        super(props);
      }

  render() {
    return (
      <div className="Recruiterfirstpage-base">
            <div className = "credtext">
                <p>Welcome Recruiter!</p>
            </div>
            <div className="container">
                <div className="choices"></div>
                <select className="name">
                    <option value ="" hidden>name</option>
                </select>
                <select className="timePeriod">
                    <option value ="" hidden>time period</option>
                </select>
                <select className="competence">
                    <option value ="" hidden>competence</option>
                </select>
                <select className="date">
                <option value ="" hidden>date</option>
                </select>    
            </div>
            <br></br>
            <table className="information">
                    <tr>
                        <th>Name</th>
                        <th>Time period</th>
                        <th>Competence</th>
                        <th>Date of application</th>
                    </tr>
                    <tr>
                        <td>lol</td>
                        <td>lol</td>
                        <td>lol</td>
                        <td>lol</td>
                    </tr>
                </table>
            <button className="btn">View application</button>


          
      </div>
    );
  }
}

export default RecruiterFirstPage;