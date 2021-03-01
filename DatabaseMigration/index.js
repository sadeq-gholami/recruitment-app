"use strict";
const { Client } = require('pg');
const User = require('./User');
const Availability = require('./Availability');
const Competence = require('./Competence');
const CompetenceProfile = require('./CompetenceProfile');
const mongoose = require('mongoose');
let userId = [];
let compId = [];

async function main() {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'root',
        port: 5432,
    });
    client.connect();

    await mongoose.set('useFindAndModify', false);
    await mongoose.connect("add string from .env", { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => console.log("connected")).catch(err => (console.log(err)));
    addUser(client);
    addAvailability(client);
    addCompetence(client);
    addCompetenceProfile(client);
}

/**
 * Add all old user into the new database
 */
async function addUser(client) {
    //query
    let user = await client.query('SELECT * FROM person;')
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err);
        })

    let personAry = [];
    //map on rows
    await user.rows.map(async row => {
        let role;
        let _id = new mongoose.Types.ObjectId();

        userId.push({
            old: row.person_id,
            new: _id
        });

        if (row.role_id === "1") {
            role = "recruiter";
        } else {
            role = "applicant";
        }
        if (row.username == null && row.password == null && row.email != null) {
            let username = generateRandomString();
            let password = generateRandomString();
            sendEmail(row.email, { username: username, password: password });
            row.username = username;
            row.password = password;
        }
        if (row.username == null) {
            row.username = generateRandomString();
            if (row.email != null) {
                sendEmail(row.email, { username: row.username });
            }
        }
        if (row.password == null) {
            row.password = generateRandomString();
            if (row.email != null) {
                sendEmail(row.email, { password: row.password });
            }
        }
        if (row.name == null) {
            row.name = "no data for username: " + row.username;
        }
        if (row.surname == null) {
            row.surname = "no data for username: " + row.username;
        }
        if (row.ssn == null) {
            row.ssn = "no data for username: " + row.username;
        }
        if (row.email == null) {
            row.email = "no data for username: " + row.username;
        }
        if (row.role_id == null) {
            role = "applicant";
        }
        personAry.push({
            _id: _id,
            firstname: row.name,
            surname: row.surname,
            ssn: row.ssn,
            email: row.email,
            password: row.password,
            role: role,
            username: row.username
        });
    })

    for (let user in personAry) {
        let res = await createUser(personAry[user]);
        console.log(res);
    }
}

/**
 * Add all old availability into the new database
 */
async function addAvailability(client) {
    //query
    let avail = await client.query('SELECT * FROM availability;')
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err);
        });

    let availAry = [];
    let _id;
    //map on rows
    await avail.rows.map(async row => {
        userId.map(user => {
            if (user.old == row.person_id) {
                _id = user.new;
            }
        });

        availAry.push({
            _id: new mongoose.Types.ObjectId(),
            personID: _id,
            fromDate: row.from_date,
            toDate: row.to_date
        });
    })

    for (let avail in availAry) {
        let res = await createAvail(availAry[avail]);
        console.log(res);
    }
}

/**
 * Add all old competence into the new database
 */
async function addCompetence(client) {
    //query
    let comp = await client.query('SELECT * FROM competence;')
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err);
        });
    let compAry = [];
    //map on rows
    await comp.rows.map(async row => {
        let _id = new mongoose.Types.ObjectId();
        compId.push({
            old: row.competence_id,
            new: _id
        });

        compAry.push({
            _id: _id,
            name: row.name
        });
    })

    for (let comp in compAry) {
        let res = await createComp(compAry[comp]);
        console.log(res);
    }
}

/**
 * Add all old competence profile into the new database
 */
async function addCompetenceProfile(client) {
    //query
    let comp = await client.query('SELECT * FROM competence_profile;')
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err);
        });

    let compAry = [];
    let _id;
    let _compId;
    //map on rows
    await comp.rows.map(async row => {
        userId.map(user => {
            if (user.old == row.person_id) {
                _id = user.new;
            }
        });
        compId.map(comp => {
            if (comp.old == row.competence_id) {
                _compId = comp.new;
            }
        });

        compAry.push({
            _id: new mongoose.Types.ObjectId(),
            personID: _id,
            competenceID: _compId,
            yearsOfExperience: row.years_of_experience,
        });
    })

    for (let comp in compAry) {
        let res = await createCompProfile(compAry[comp]);
        console.log(res);
    }
}

/**
 * Create new user in new database
 * @param { object to add in database} newUser 
 */
async function createUser(newUser) {
    const user = new User({
        _id: newUser._id,
        firstname: newUser.firstname,
        surname: newUser.surname,
        ssn: newUser.ssn,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
        username: newUser.username
    });

    const savedUser = await user.save()
        .then(result => {
            return result;
        })
        .catch(err => {
            throw err;
        });
    return savedUser;
}

/**
 * Create new availability in new database
 * @param { object to add in database} newAvail 
 */
async function createAvail(newAvail) {
    const avail = new Availability({
        _id: newAvail._id,
        personID: newAvail.personID,
        fromDate: newAvail.fromDate,
        toDate: newAvail.toDate
    });

    const savedAvail = await avail.save()
        .then(result => {
            return result;
        })
        .catch(err => {
            throw err;
        });
    return savedAvail;
}

/**
 * Create new competence in new database
 * @param { object to add in database} newComp 
 */
async function createComp(newComp) {
    const comp = new Competence({
        _id: newComp._id,
        name: newComp.name
    });

    const savedComp = await comp.save()
        .then(result => {
            return result;
        })
        .catch(err => {
            throw err;
        });
    return savedComp;
}

/**
 * Create new competence profile in new database
 * @param { object to add in database} newComp 
 */
async function createCompProfile(newComp) {
    const comp = new CompetenceProfile({
        _id: newComp._id,
        competenceID: newComp.competenceID,
        personID: newComp.personID,
        yearsOfExperience: newComp.yearsOfExperience
    });

    const savedComp = await comp.save()
        .then(result => {
            return result;
        })
        .catch(err => {
            throw err;
        });
    return savedComp;
}

/**
 * Create a random string that consists of lowercase, uppercase letters and numbers
 * It is six characters long
 */
function generateRandomString() {
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randString = '';
    var len = string.length;
    for (let i = 0; i < 6; i++) {
        randString += string[Math.floor(Math.random() * len)];
    }
    return randString;
}

/**
 * Placeholder for sending email to user
 * @param { the email address to send to} email 
 * @param { the data to include in the email} data 
 */
function sendEmail(email, data) {
    console.log("send email to: " + email + " with data: ");
    console.log(data);
    //send email to user with data
}


main()
    .then(() => {
        console.log('Done');
    })
    .catch(err => {
        console.error("Database replication errored out.");
        console.error(err);
    });