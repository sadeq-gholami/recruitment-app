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
                    console.log(data.createUser._id);
                    this.user._id = data.createUser._id;
                    return responseStatus;
                }
                else {
                    throw { responseStatus, data };
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
        console.log(name + "   " + pass);
        return fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                password: pass
            })
        }).then(response => {
            return response;
        }).catch(error => {
            console.log('error');
            throw error
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
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
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
        })
    }

    /**
     * Adds the competence profile for the specific 
     * user to the backend
     * Not done yet
     * @param { the competence object } comp 
     */
    async submitCompetenceProfile(comp) {
        return fetch("http://localhost:5000/applicant/competence_profile/" + "601402bc1af31539e8052bfc", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                competenceID: comp._id,
                yearsOfExperience: comp.yearsOfExperience
            })
        }).then(response => {
            console.log(response);
            return response;
        }).catch(error => {
            console.log('error');
            throw error
        })
    }





    /**
     * Not done, remove?
     */
    async postCompetence() {
        return fetch("http://localhost:5000/", {
            method: 'POST',
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