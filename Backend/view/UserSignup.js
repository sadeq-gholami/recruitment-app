"use strict";
const RequestHandler = require('./RequestHandler');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
/**
 * Handles user signup. Can create a new user, update and delete it.
 * Inherits the requestHandler class
 */
class UserSignup extends RequestHandler {
    constructor() {
        super()
    }
    get path() {
        return '/signup';
    }
    /**
     * Polymorphic method that handles REST requests
     */
    async appHandler() {
        /**
         * Get controller
         */
        await this.getController().catch(err => { console.log(err) });

        /**
         * Create user with all necessary parameters as json object
         * Sends 200 when successful and returns user
         * On error send 500 and error as json object
         */
        this.router.post('/', async (req, res, next) => {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = {
                id: new mongoose.Types.ObjectId(),
                firstname: req.body.firstname,
                surname: req.body.surname,
                ssn: req.body.ssn,
                email: req.body.email,
                password: hashedPassword,
                role: "applicant",
                username: req.body.username
            }
            const createdUser = await this.controller.createUser(user).then(result => {
                return result;
            })
                .catch(err => {
                    res.status(500).json({ err: err });
                });
            await this.controller.createReadyTable(createdUser._id)
                .then(result => {
                    res.status(200).json({ createUser: createdUser })
                })
                .catch(err => {
                    res.status(500).json({ error: err });
                });
        })

        /**
         * Update one user with specified user id from url,
         * with all parameters as json object
         * Sends 200 when successful and returns user
         * On error send 500 and error as json object
         */
        this.router.put('/update_user/:userId', async (req, res, next) => {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = {
                id: req.params.userId,
                firstname: req.body.firstname,
                surname: req.body.surname,
                ssn: req.body.ssn,
                email: req.body.email,
                password: hashedPassword,
                username: req.body.username
            }
            await this.controller.updateUser(user)
                .then(result => {
                    res.status(200).json({ result: result });
                }).catch(err => {
                    res.status(500).json({ err: err });
                });
        });

        /**
         * Delete one user with specified user id from url,
         * Sends 200 when successful and returns user
         * On error send 500 and error as json object
         */
        this.router.delete('/delete_user/:userId', async (req, res, next) => {
            const id = req.params.userId;
            await this.controller.deleteUser(id)
                .then(result => {
                    res.status(200).json({ result: result });
                }).catch(err => {
                    res.status(500).json({ err: err });
                });
        });
    }
}

module.exports = UserSignup;