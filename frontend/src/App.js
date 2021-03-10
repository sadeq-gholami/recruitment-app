import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./view/Home";
import './App.css';
import Signup from "./view/Signup";
import Login from "./view/Login";
import RecruiterFirstPage from "./view/RecruiterFirstPage";
import ApplicantFirstPage from "./view/ApplicantFirstPage";
import ApplicantFirstDisplay from "./view/ApplicantFirstDisplay";
import ApplicantSecondPage from "./view/ApplicantSecondPage";
import ApplicantSecondDisplay from "./view/ApplicantSecondDisplay";
import ApplicantDisplayAll from "./view/ApplicantDisplayAll";
import ApplicantConfirm from "./view/ApplicantConfirm";
import Model from "./model/Model";
import UpdateUser from "./view/UpdateUser";

/**
 * This class handles the routing between 
 * views, footer and header
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: new Model(),
      title: "Recruitment App"
    };
  }

  /**
   * Renders the HTML code
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="header">
            <p className="jobs">Jobs</p>
            <p className="aboutus">About us</p>
            <p className="contact">Contact</p>
          </div>
        </header>

        <Router>
          <Route exact path="/" exact render={(props) => { return <Home {...props} model={this.state.model} /> }} />
          <Route path="/signup" render={(props) => { return <Signup {...props} model={this.state.model} /> }} />
          <Route path="/login" render={(props) => { return <Login {...props} model={this.state.model} /> }} />
          <Route path="/applicantfirstpage" render={(props) => { return <ApplicantFirstPage {...props} model={this.state.model} /> }} />
          <Route path="/applicantfirstdisplay" render={(props) => { return <ApplicantFirstDisplay {...props} model={this.state.model} /> }} />
          <Route path="/applicantsecondpage" render={(props) => { return <ApplicantSecondPage {...props} model={this.state.model} /> }} />
          <Route path="/applicantseconddisplay" render={(props) => { return <ApplicantSecondDisplay {...props} model={this.state.model} /> }} />
          <Route path="/applicantdisplayall" render={(props) => { return <ApplicantDisplayAll {...props} model={this.state.model} /> }} />
          <Route path="/applicantconfirm" render={(props) => { return <ApplicantConfirm {...props} model={this.state.model} /> }} />
          <Route path="/recruiterfirstpage" render={(props) => { return <RecruiterFirstPage {...props} model={this.state.model} /> }} />
          <Route path="/updateUser" render={(props) => { return <UpdateUser {...props} model={this.state.model} /> }} />

        </Router>

        <footer className="footer">
          <p className="contactfooter">Contact</p>
        </footer>
      </div>
    );
  }
}

export default App;
