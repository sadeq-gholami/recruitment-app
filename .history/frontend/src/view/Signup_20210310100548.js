import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "../style/Signup.css";

/**
 * This class handles applicant signup
 */
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: null,
            firstname: null,
            surname: null,
            email: null,
            ssn: null,
            username: null,
            password: null,
        }
    }

    /**
     * Sets the state of firstname
     * @param { the event from onChange } e 
     */
    handleFirstname = e => {
        this.setState({ firstname: e.target.value });
    }

    /**
     * Sets the state of surname
     * @param { the event from onChange } e 
     */
    handleSurname = e => {
        this.setState({ surname: e.target.value });
    }

    /**
     * Sets the state of email 
     * @param { the event from onChange } e 
     */
    handleEmail = e => {
        this.setState({ email: e.target.value });
    }

    /**
     * Sets the state of social security number 
     * @param { the event from onChange } e 
     */
    handleSsn = e => {
        this.setState({ ssn: e.target.value });
    }

    /**
     * Sets the state of username
     * @param { the event from onChange } e 
     */
    handleUsername = e => {
        this.setState({ username: e.target.value });
    }

    /**
     * Sets the state of password
     * @param { the event from onChange } e 
     */
    handlePassword = e => {
        this.setState({ password: e.target.value });
    }

    /**
    * Checks all values inputted by the user and is validated
    * If everything is correct, set values for user in model
    * then call backend to save user
    * @param { the event from onChange } e 
    */
    submitSignup = async e => {
        const firstnameRegex = new RegExp("(?=.{1,})");
        const surnameRegex = new RegExp("(?=.{1,})");
        const emailRegex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        const ssnRegex = /^(\d{6}|\d{8})[-|(\s)]{0,1}\d{4}$/;
        const usernameRegex = new RegExp("(?=.{4,})");
        const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&*])");

        if (!firstnameRegex.test(this.state.firstname)) {
            window.alert("First name must be at least one character");
        } else if (!surnameRegex.test(this.state.surname)) {
            window.alert("Surname must be at least one character");
        } else if (!emailRegex.test(this.state.email)) {
            window.alert("Email must be in the format: characters@characters.domain");
        } else if (!ssnRegex.test(this.state.ssn)) {
            window.alert("SSN must be format YYMMDD-XXXX");
        } else if (!usernameRegex.test(this.state.username)) {
            window.alert("Username must be at least 4 characters");
        } else if (!passwordRegex.test(this.state.password)) {
            window.alert("Password must be at least 8 characters, one lowercase letter, one uppercase letter, one symbol and contain at least one number");
        } else {
            this.props.model.setSignup({
                firstname: this.state.firstname,
                surname: this.state.surname,
                email: this.state.email,
                ssn: this.state.ssn,
                username: this.state.username,
                password: this.state.password
            });
            await this.props.model.signup().then(result => {
                if (result.status == 200) {
                    this.props.model.saveState();
                    window.location.replace('/applicantfirstpage');
                }
            }).catch(err => {
                console.log(err);
                if (err.responseStatus.status == 401) {
                    const error = Object.keys(err.data.err.keyValue)[0];
                    window.alert("Sign up failed, " + error + " already taken.")
                }else if (err.responseStatus.status == 400) {
                    const error = err.data.error[0].msg;
                    window.alert("Sign up failed, " + error)
                }
                else {
                    window.alert("Server error");
                    console.log(err);
                }
            });
        }
    }

    /**
     * Renders the HTML code
     */
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
                        <p className="dottext">Social Security Number (YYMMDD-XXXX)</p>
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
                        <Link to="/">
                        <button className="confirmbutton">Back</button>
                        </Link>
                </div>
            </div>
        );
    }
}

export default Signup;