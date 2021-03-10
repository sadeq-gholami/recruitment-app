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
    await mongoose.connect("mongodb+srv://IV1201:IV1201@cluster0.ctnb8.mongodb.net/Cluster0?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => console.log("connected")).catch(err => (console.log(err)));
    let users = await addUser(client);
    let avails = await addAvailability(client);
    let competences = await addCompetence(client);
    let compProfiles = await addCompetenceProfile(client);
    let result = await addToDatabase(users, avails, competences, compProfiles);
    console.log(result);
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

    //map on rows
    return await Promise.all(user.rows.map(async row => {
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
        if (row.email != null) {
            if (row.username == null || row.password == null || row.name == null || row.surname == null
                || row.ssn) {
                sendEmail(row.email, _id);
            }
        }
        if (row.username == null) {
            row.username = generateRandomString();
        } if (row.password == null) {
            row.password = generateRandomString();
        } if (row.name == null) {
            row.name = "no data for username: " + row.username;
        } if (row.surname == null) {
            row.surname = "no data for username: " + row.username;
        } if (row.ssn == null) {
            row.ssn = "no data for username: " + row.username;
        } if (row.email == null) {
            row.email = "no data for username: " + row.username;
        } if (row.role_id == null) {
            role = "applicant";
        }
        return await User.create({
            _id: _id,
            firstname: row.name,
            surname: row.surname,
            ssn: row.ssn,
            email: row.email,
            password: row.password,
            role: role,
            username: row.username
        });
    }));
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
    let _id;
    //map on rows
    return await Promise.all(avail.rows.map(async row => {
        userId.map(user => {
            if (user.old == row.person_id) {
                _id = user.new;
            }
        });
        return await Availability.create({
            _id: new mongoose.Types.ObjectId(),
            personID: _id,
            fromDate: row.from_date,
            toDate: row.to_date
        });
    }));
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
    //map on rows
    return await Promise.all(comp.rows.map(async row => {
        let _id = new mongoose.Types.ObjectId();
        compId.push({
            old: row.competence_id,
            new: _id
        });
        return await Competence.create({
            _id: _id,
            name: row.name
        });
    }))
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
    let _id;
    let _compId;
    //map on rows
    return await Promise.all(comp.rows.map(async row => {
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
        return await CompetenceProfile.create({
            _id: new mongoose.Types.ObjectId(),
            personID: _id,
            competenceID: _compId,
            yearsOfExperience: row.years_of_experience,
        });
    }))
}


/**
 * Add all objects to the database
 * @param {the user object to add to the database} users 
 * @param {the availability object to add to the database} avails 
 * @param {the competence object to add to the database} competences 
 * @param {the competence profile object to add to the database} compProfiles 
 * @returns a list of everything added in the database
 */
async function addToDatabase(users, avails, competences, compProfiles) {
    const session = await mongoose.startSession();
    let savedUser;
    let savedAvailability;
    let savedComp;
    let savedCompProf;
    await session.withTransaction(async () => {
        savedUser = await Promise.all(users.map(user => {
            return user.save({ session });
        }));
        savedAvailability = await Promise.all(avails.map(avail => {
            return avail.save({ session });
        }));
        savedComp = await Promise.all(competences.map(comp => {
            return comp.save({ session });
        }));
        savedCompProf = await Promise.all(compProfiles.map(compProf => {
            return compProf.save({ session });
        }));
    });
    session.endSession();
    return {
        user: savedUser,
        availability: savedAvailability,
        competence: savedComp,
        competenceProfile: savedCompProf,
    };
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
function sendEmail(email, _id) {
    console.log("send email to: " + email + " message: Missing user data go to link" +
        " https://localhost/updateUser/ and input email");
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






/**
 * Not used
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
 * Not used
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
 * Not used
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
 * Not used
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
