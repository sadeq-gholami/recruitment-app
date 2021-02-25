import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Signup.css";

/**
 * This class is not done yet
 */
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {

            firstname: "",
            surname: "",
            email: "",
            ssn: "",
            username: "", //log in 
            password: "", //log in

        }

    }

    handleFirstname = e => {
        this.setState({ firstname: e.target.value });
    }

    handleSurname = e => {
        this.setState({ surname: e.target.value });
    }

    handleEmail = e => {
        this.setState({ email: e.target.value });
    }

    handleSsn = e => {
        this.setState({ ssn: e.target.value });
    }
    handleUsername = e => {
        this.setState({ username: e.target.value });
    }

    handlePassword = e => {
        this.setState({ password: e.target.value });
    }

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
            //allt gick ok
            console.log(result);
            /*if(result.status == 200){
                this.props.model.saveState();
                //window.location.replace('/applicantfirstpage');
            }   */
        }).catch(err => {
            //error från sever
            window.alert(err);
            console.log(err);
        });
    }

    render() {
        return (
            <div className="signup-base">
                <div className="credtext">
                    <p>Please enter your credentials</p>
                </div>
                <div className="inputfielddiv">
                    <div className="firstnamediv">
                        <p className="firstnametext">Firstname</p>
                        <div className="inputdiv1">
                            <input className="input1" onChange={this.handleFirstname}></input>
                            <span className="check1">&#10003;</span>
                        </div>
                    </div>
                    <div className="surnamediv">
                        <p className="surnametext">Surname</p>
                        <div className="inputdiv2">
                            <input className="input2" onChange={this.handleSurname}></input >
                            <span className="check2">&#10003;</span>
                        </div>
                    </div>
                    <div className="emaildiv">
                        <p className="emailtext">Email</p>
                        <div className="inputdiv3">
                            <input className="input3" type="email" onChange={this.handleEmail}></input>
                            <span className="check3">&#10003;</span>
                        </div>
                    </div>
                    <div className="dotdiv">
                        <p className="dottext">Date of birth (YYMMDD-XXXX)</p>
                        <div className="inputdiv4">
                            <input className="input4" onChange={this.handleSsn}></input>
                            <span className="check4">&#10003;</span>
                        </div>
                    </div>
                    <div className="usernamediv">
                        <p className="usernametext">Username</p>
                        <div className="inputdiv5">
                            <input className="input5" onChange={this.handleUsername}></input>
                            <span className="check5">&#10003;</span>
                        </div>
                    </div>
                    <div className="passworddiv">
                        <p className="passwordtext">Password</p>
                        <div className="inputdiv6">
                            <input className="input6" type="password" onChange={this.handlePassword}></input>
                            <span className="check6">&#10003;</span>
                        </div>
                    </div>
                </div>
                <div className="confirmbuttondiv">
                    <button className="confirmbutton" onClick={this.submitSignup}>Confirm and save</button>
                </div>
                <div className="confirmbuttondiv">
                   
                        <button className="confirmbutton">Back</button>
                    
                </div>
            </div>
        );
    }
}

export default Signup;