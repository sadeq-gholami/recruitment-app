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

    const query = `
    SELECT *
	FROM person;
    `;
    console.log(query);

    let user = await client.query(query)
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
        console.log(row.role_id);
        if (row.role_id === "2") {
            role = "applicant";
        } else {
            role = "recruiter";
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

main()
    .then(() => {
        console.log('Done');
    })
    .catch(err => {
        console.error("Database replication errored out.");
        console.error(err);
    });