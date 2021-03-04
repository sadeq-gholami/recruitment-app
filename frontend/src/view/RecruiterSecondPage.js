import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../style/Recruiter.css";


class RecruiterSecondPage extends Component {
    constructor(props){
        super(props);
      }

  render() {
    return (
      <div className="RecruiterSecondpage-base">
            <div className = "credtext">
                <p>Overview application</p>
            </div>
            <div className="applicant">
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
                
            </div>
            <button className="btn">View application</button>


          
      </div>
    );
  }
}

export default RecruiterSecondPage;