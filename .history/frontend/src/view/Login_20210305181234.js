import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Login.css";

/**
 * This class is not done yet
 */
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    handleUsername = e => {
        this.setState({ username: e.target.value });
    }

    handlePassword = e => {
        this.setState({ password: e.target.value });
    }

    submitLogin = async e => {
        e.preventDefault();
        await this.props.model.login(this.state.username, this.state.password).then(result => {
            if (result.responseStatus.status == 200) {
                this.props.model.saveState();
               // console.log(result);
                if (result.data.user.role === "recruiter") {
                    window.location.replace('/recruiterfirstpage');
                } else {
                    window.location.replace('/applicantfirstpage');
                }
            }
        }).catch(err => {
            if (err.status == 401) {
                window.alert("Sign up failed, username or password incorrect")
            }
            else {
                window.alert("Server error");
                console.log(err);
            }
        });
    }

    render() {
        return (
            <div className="login-base">
                <div className="credtext">
                    <p>Please enter your credentials</p>
                </div>
                <div className="inputfielddiv">
                    <div className="usernamediv">
                        <p className="usernametext">Username</p>
                        <div className="inputdiv1">
                            <input className="input1" onChange={this.handleUsername}></input>
                            <span className="check1">&#10003;</span>
                        </div>
                    </div>
                    <div className="passworddiv">
                        <p className="passwordtext">Password</p>
                        <div className="inputdiv2">
                            <input className="input2" type="password" onChange={this.handlePassword}></input >
                            <span className="check2">&#10003;</span>
                        </div>
                    </div>
                    <div className="loginbuttondiv">
                        <Link to="/applicantfirstpage">
                            <button className="loginbutton" onClick={this.submitLogin}>Login</button>
                        </Link>
                        <Link to="/">
                        <button className="confirmbutton">Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;