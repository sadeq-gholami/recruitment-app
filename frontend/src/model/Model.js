import ObservableModel from "./ObservableModel";

class Model extends ObservableModel {
    constructor() {
        super();
        this.user = {
            firstname: null,
            surname: null,
            email: null,
            ssn: null,
            username: null, //log in 
            password: null //log in
        }

        this.competence = {
            competenceArray: [],
        };

    }


    async signup() {
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
        }).then(response => {
            console.log("RESPONS " + response);
            return response;
        }).catch(error => {
            console.log("ERROR " + error);
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
        this.competence.competenceArray.push({
            _id: comp._id,
            yearsOfExperience: comp.yearsOfExperience,
            name: comp.name
        });
        localStorage.setItem("competence", JSON.stringify(this.competence.competenceArray));
    }

    getCompetence() {
        return localStorage.getItem("competence");
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

}

export default Model;