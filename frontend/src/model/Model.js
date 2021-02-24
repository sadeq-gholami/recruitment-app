import ObservableModel from "./ObservableModel";

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

    saveState() {
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("competence", JSON.stringify(this.competence));
        localStorage.setItem("timePeriod", JSON.stringify(this.timePeriod));
    }

    restoreState() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.competence = JSON.parse(localStorage.getItem("competence"));
        this.timePeriod = JSON.parse(localStorage.getItem("timePeriod"));
    }

    resetState() {
        localStorage.removeItem("competence");
        localStorage.removeItem("timePeriod");
        this.setCompetence({ competence: {} });
        this.setTimePeriod({ timePeriod: {} });
    }

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

    setSignup(user) {
        this.user.firstname = user.firstname;
        this.user.surname = user.surname;
        this.user.email = user.email;
        this.user.ssn = user.ssn;
        this.user.username = user.username;
        this.user.password = user.password;
    }

    getSignup() {
        return this.user;
    }

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

    setCompetence(comp) {
        this.competence = comp;
    }

    getCompetence() {
        return this.competence;
    }

    getAllCompetences() {
        return fetch("http://localhost:5000/applicant/competence", {
            method: 'GET',
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

    notifyObserversModel() {
        this.notifyObservers();
    }

    setTimePeriod(time) {
        this.timePeriod = time;
    }

    getTimePeriod() {
        return this.timePeriod;
    }


    submitApp() {
        this.competence.map(comp => {
            this.submitCompetenceProfile(comp);
        })


    }

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
}

export default Model;