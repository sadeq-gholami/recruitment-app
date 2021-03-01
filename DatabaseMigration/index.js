"use strict";
const { Client } = require('pg');
const User = require('./User');
const mongoose = require('mongoose');

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
        }).finally(() => {
            client.end();
        });
    
        let personAry = [];
    //map on rows
    await user.rows.map(async row => {
        let role;
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
            row.name = "no data";
        }
        if (row.surname == null) {
            row.surname = "no data";
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
            _id: new mongoose.Types.ObjectId(),
            firstname: row.name,
            surname: row.surname,
            ssn: row.ssn,
            email: row.email,
            password: row.password,
            role: role,
            username: row.username
        });
    })

    for(let user in personAry){
       let res = await createUser(personAry[user]);
       console.log(res);
    }
}

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