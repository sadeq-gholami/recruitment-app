/**
 * This class handles all the logic and
 * the backend integration
 */
class Model {
    constructor() {
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
     * Saves the current state in local storage
     */
    saveState() {
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("competence", JSON.stringify(this.competence));
        localStorage.setItem("timePeriod", JSON.stringify(this.timePeriod));
    }

    /**
     * Restores the current state from local storage
     */
    restoreState() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.competence = JSON.parse(localStorage.getItem("competence"));
        this.timePeriod = JSON.parse(localStorage.getItem("timePeriod"));
    }

    /**
     * Reset the current state from local storage
     */
    resetState() {
        localStorage.removeItem("competence");
        localStorage.removeItem("timePeriod");
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
        return fetch("https://recruitment-app-api.herokuapp.com/signup", {
            method: 'POST',
            credentials: 'include',
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
                console.log(data);
                if (responseStatus.status == 200) {
                    this.user._id = data.result._id;
                    return responseStatus;
                }
                else {
                    throw {responseStatus,data};
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
        return fetch("https://recruitment-app-api.herokuapp.com/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                password: pass
            })
        }).then(response => {
            responseStatus = response;
            return response.json();
        }).then(data => {
            if (responseStatus.status == 200) {
                this.user._id = data.user._id;
                return { responseStatus, data };
            } else {
                throw responseStatus;
            }
        }).catch(error => {
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
        return fetch("https://recruitment-app-api.herokuapp.com/applicant/competence", {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status == 401) {
                throw response;
            }
            if (response.status == 500) {
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
        return fetch("https://recruitment-app-api.herokuapp.com/recruiter/get_applicants", {
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
     * Adds the whole application to the database. Adds:
     * Competence to competence profile
     * Time period to availability
     * Update ready status
     * Add application status
     */
    submitApp() {
        return fetch("https://recruitment-app-api.herokuapp.com/applicant/submit_application", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: this.user._id,
                competence: this.competence,
                timePeriod: this.timePeriod,
            })
        }).then(response => {
            return response;
        }).catch(error => {
            throw error
        })
    }

    /**
     * Update user for the specific email
     * user to the backend 
     * Used with database migration
     */
    async updateUserByEmail() {
        let email = this.user.email.replace("@", "_");
        email = email.replaceAll(".", "_");
        console.log(email);
        return fetch("https://recruitment-app-api.herokuapp.com/signup/update_userByEmail/" + this.user.email, {
            method: 'PUT',
            credentials: 'include',
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
        }).then(response => {
            return response;
        }).catch(error => {
            throw error
        })
    }





    /**
     * Not used
     * Adds the competence profile for the specific 
     * user to the backend
     * @param { the competence object } comp 
     */
    async submitCompetenceProfile(comp) {
        return fetch("https://recruitment-app-api.herokuapp.com/applicant/competence_profile/" + this.user._id, {
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
     * Not used
     * Adds availability for the specific 
     * user to the backend 
     * @param { the time period object } time 
     */
    async submitTimePeriod(time) {
        return fetch("https://recruitment-app-api.herokuapp.com/applicant/availability/" + this.user._id, {
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
     * Not used
     * Update ready status for the specific 
     * user to the backend 
     */
    async updateReady() {
        return fetch("https://recruitment-app-api.herokuapp.com/applicant/update_ready/" + this.user._id, {
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
     * Not used
     * Add application status for the specific 
     * user to the backend 
     */
    async addApplicationStatus() {
        return fetch("https://recruitment-app-api.herokuapp.com/applicant/application_status/" + this.user._id, {
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

    /**
     * Not done, remove?
     */
    async postCompetence() {
        return fetch("https://recruitment-app-api.herokuapp.com/", {
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