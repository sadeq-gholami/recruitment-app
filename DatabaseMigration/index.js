"use strict";
const { Client } = require('pg');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

async function main() {
    let personAry = [];

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'root',
        port: 5432,
    });

    client.connect();

    let user = await client.query('SELECT * FROM person;')
        .then(res => {
            return res;
        })
        .catch(err => {
            console.error(err);
        }).finally(() => {
            client.end();
        });

    user.rows.map(async row => {
        let role;
        if (row.role_id === "1") {
            role = "recruiter";
        } else {
            role = "applicant";
        }
        if(row.name == null) {
            row.name = "no data";
        }
        if(row.surname == null) {
            row.surname = "no data";
        }
        if(row.ssn == null) {
            row.ssn = "no data";
        }
        if(row.email == null) {
            row.email = "no data";
        }
        if(row.role_id == null) {
            role = "applicant";
        }
        if(row.username == null && row.password == null && row.email != null){
            let username = generateRandomString();
            let password = generateRandomString();
            sendEmail(row.email, {username: username, password: password});
            row.username = username;
            row.password = password;
        }
        if(row.username == null) {
            row.username = generateRandomString();
            if(row.email != null) {
                sendEmail(row.email, {username: row.username});
            }
        }
        if(row.password == null){
            row.password = generateRandomString();
            if(row.email != null) {
                sendEmail(row.email, {password: row.password});
            }
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
        console.log(personAry);
    })
}



/**
 * Create a random string that consists of lowercase, uppercase letters and numbers
 * It is six characters long
 */
function generateRandomString() { 
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    let randString = ''; 
    var len = string.length; 
    for (let i = 0; i < 6; i++ ) { 
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