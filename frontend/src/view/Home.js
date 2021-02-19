import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Home.css";
import Signup from "./Signup";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="welcome">
                <div className="welcomediv">
                    <p className="welcometext">Welcome to the Tivoli recruitment app</p>
                </div>
                <div className="signuplogin-div">
                    <Link to = "/signup">
                        <button className="signup" >Sign up</button>
                    </Link>
                    <Link to = "/login">
                        <button className="login" >Log in</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;