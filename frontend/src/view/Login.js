import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "", //log in 
            password: "", //log in
        }
    }

    handleUsername = e => {
        this.setState({ username: e.target.value });
    }

    handlePassword = e => {
        this.setState({ password: e.target.value });
    }

    submitLogin = async e =>{
        e.preventDefault();      
        await this.props.model.login(this.state.username, this.state.password).then(result =>{
            console.log(result)
        }).catch(err =>{
            console.log(err)
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
                            <input className="input1"></input>
                            <span className="check1">&#10003;</span>
                        </div>
                    </div>
                    <div className="passworddiv">
                        <p className="passwordtext">Password</p>
                        <div className="inputdiv2">
                            <input className="input2"></input >
                            <span className="check2">&#10003;</span>
                        </div>
                    </div>
                    <div className="loginbuttondiv">
                        <Link to = "/applicantfirstpage">
                            <button className="loginbutton">Login</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;