import ObservableModel from "./ObservableModel";

/**
 * This class handles all the logic and
 * the backend integration
 */
class Model extends ObservableModel {
    constructor() {
        super();
        this.user = {
            _id: null,
            firstname: null,
            surname: null,
            email: null,
            ssn: null,
            username: null, //log in 
            password: null //log in
        }
        this.competence = {};
        this.timePeriod = {};
    }

    /**
     * Notify all observers
     */
    notifyObserversModel() {
        this.notifyObservers();
    }

    /**
     * Saves the current state in local storage
     */
    saveState() {
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("competence", JSON.stringify(this.competence));
        localStorage.setItem("timePeriod", JSON.stringify(this.timePeriod));
        //localStorage.setItem("recruiterParameters", JSON.stringify(this.recruiterParameters));
    }

    /**
     * Restores the current state from local storage
     */
    restoreState() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.competence = JSON.parse(localStorage.getItem("competence"));
        this.timePeriod = JSON.parse(localStorage.getItem("timePeriod"));
        //this.recruiterParameters = JSON.parse(localStorage.getItem("recruiterParameters"));
    }

    /**
     * Reset the current state from local storage
     */
    resetState() {
        localStorage.removeItem("competence");
        localStorage.removeItem("timePeriod");
        //localStorage.removeItem("recruiterParameters");
        //this.setRecruiterParameters({ recruiterParameters : {}});
        this.setCompetence({ competence: {} });
        this.setTimePeriod({ timePeriod: {} });
        localStorage.removeItem("listSelected");
        localStorage.removeItem("listSelectedTime");
    }

    /**
     * Handles the sign up request to the backend
     * @return json object from backend
     */
    async signup() {
        let responseStatus;
        return fetch("http://localhost:5000/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: this.user.firstname,
                surname: this.user.surname,
                email: this.user.email,
                ssn: this.user.ssn,
                username: this.user.username,
                password: this.user.password
            })
        })
            .then(response => {
                responseStatus = response;
                return response.json();
            }).then(data => {
                if (responseStatus.status == 200) {
                    this.user._id = data.createUser._id;
                    return responseStatus;
                }
            })
            .catch(error => {
                throw error;
            })
    }

    /**
     * Set user state with all parameters
     * @param { all user parameters } user 
     */
    setSignup(user) {
        this.user.firstname = user.firstname;
        this.user.surname = user.surname;
        this.user.email = user.email;
        this.user.ssn = user.ssn;
        this.user.username = user.username;
        this.user.password = user.password;
    }

    /**
     * @return the user state
     */
    getSignup() {
        return this.user;
    }

    /**
     * Handles the log in requests to the backend
     * @param { the username } name 
     * @param { the password } pass 
     * @return the json object from the backend
     */
    async login(name, pass) {
        let responseStatus;
        return fetch("http://localhost:5000/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                password: pass
            })
        }) .then(response => {
            responseStatus = response;
            return response.json();
        }).then(data => {
            if (responseStatus.status == 200) {
                this.user._id = data.user._id;
                return {responseStatus, data};
            }
        }).catch(error => {
            console.log("error from model" + error);
            throw error;
        })
    }

    /**
     * Set competence state
     * @param { the competence object } comp 
     */
    setCompetence(comp) {
        this.competence = comp;
    }

    /**
     * @return the competence state
     */
    getCompetence() {
        return this.competence;
    }

    /**
     * Gets all competences from the backend
     * @return the json object from the backend
     */
    getAllCompetences() {
        return fetch("http://localhost:5000/applicant/competence", {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status == 401){
                throw response;
            }
            if(response.status == 500){
                throw response;
            }
            return response.json();
        }).catch(error => {
            throw error;
        })
    }
    /**
     * Gets all information about the applicants from the backend
     * @return the json object from the backend
     */
   getAllApplicants() {
         return fetch("http://localhost:5000/recruiter/get_applicants", {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("RESPONSE " + response);
            return response.json();
            
        }).catch(error => {
            console.log("ERROR " + error);
            throw error;
        })
    }

    /**
     * Sets the selected time period state
     * @param { the time period object } time 
     */
    setTimePeriod(time) {
        this.timePeriod = time;
    }

    /**
     * @return the time period object
     */
    getTimePeriod() {
        return this.timePeriod;
    }

    /**
     * Adds the whole application to the database
     * Not done yet
     */
    submitApp() {
        this.competence.map(comp => {
            this.submitCompetenceProfile(comp);
        });
        this.timePeriod.map(time => {
            this.submitTimePeriod(time);
        });
        this.updateReady();
        this.addApplicationStatus();
    }

    /**
     * Adds the competence profile for the specific 
     * user to the backend
     * @param { the competence object } comp 
     */
    async submitCompetenceProfile(comp) {
        return fetch("http://localhost:5000/applicant/competence_profile/" + this.user._id, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                competenceID: comp._id,
                yearsOfExperience: comp.yearsOfExperience
            })
        }).then(response => {
            return response;
        }).catch(error => {
            throw error
        })
    }

    /**
     * Adds availability for the specific 
     * user to the backend 
     * @param { the time period object } time 
     */
    async submitTimePeriod(time) {
        return fetch("http://localhost:5000/applicant/availability/" + this.user._id, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fromDate: time.startTime,
                toDate: time.endTime
            })
        }).then(response => {
            return response;
        }).catch(error => {
            throw error
        })
    }

    /**
     * Update ready status for the specific 
     * user to the backend 
     */
    async updateReady() {
        return fetch("http://localhost:5000/applicant/update_ready/" + this.user._id, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response;
        }).catch(error => {
            throw error
        })
    }

    /**
     * Add application status for the specific 
     * user to the backend 
     */
    async addApplicationStatus() {
        return fetch("http://localhost:5000/applicant/application_status/" + this.user._id, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response;
        }).catch(error => {
            throw error
        })
    }
    // setRecruiterParameters(param) {
    //     this.recruiterParameters = param;
    // }

    // getRecruiterParameters() {
    //     return this.recruiterParameters;
    // }




    /**
     * Not done, remove?
     */
    async postCompetence() {
        return fetch("http://localhost:5000/", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.competence.name
            })
        }).then(response => {
            console.log("RESPONS " + response);
            return response;
        }).catch(error => {
            console.log("ERROR " + error);
            throw error;
        })
    }
}

export default Model;