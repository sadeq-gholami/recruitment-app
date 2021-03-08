"use strict";
const RequestHandler = require('./RequestHandler');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
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
        this.router.post('/', [
            check('firstname', 'first name should be string, minimum 1 and max 20 characters')
                .isString()
                .notEmpty()
                .isLength({ min: 1, max: 20 })
                .stripLow(true)
                .escape(),
            check('surname', 'surname should be string, minimum 1 and max 20 characters')
                .isString()
                .notEmpty()
                .isLength({ min: 1, max: 20 })
                .stripLow(true)
                .escape(),
            check('ssn', 'social security number should be number min 10 max 10')
                .isNumeric()
                .notEmpty()
                .isLength({ min: 10, max: 10 })
                .stripLow(true)
                .escape(),
            check('email', 'email should include something@domain.com and min 5 max 20')
                .isEmail()
                .notEmpty()
                .isLength({ min: 5, max: 20 })
                .stripLow(true)
                .escape(),
            check('password', 'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long')
                .isStrongPassword()
                .notEmpty()
                .isLength({ min: 10, max: 10 })
                .stripLow(true)
                .escape(),
            check('username', 'user name should be string, minimum 5 and max 20 characters')
                .isString()
                .notEmpty()
                .isLength({ min: 5, max: 20 })
                .stripLow(true)
                .escape(),
        ], async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ error: errors.array() })
                return;
            }
            const user = {
                id: new mongoose.Types.ObjectId(),
                firstname: req.body.firstname,
                surname: req.body.surname,
                ssn: req.body.ssn,
                email: req.body.email,
                password: req.body.password,
                role: "applicant",
                username: req.body.username
            }
            await this.controller.createUser(user)
                .then(result => {
                    res.status(200).json({ result: result })
                })
                .catch(err => {
                    console.log(err);
                    if (err._message === "User validation failed") {
                        res.status(401).json({ err: err });
                    } else if (err.name === "MongoError") {
                        res.status(401).json({ err: err });
                    } else {
                        res.status(500).json({ err: err });
                    }
                });
        })

        /**
         * Update one user with specified user id from url,
         * with all parameters as json object
         * Sends 200 when successful and returns user
         * On error send 500 and error as json object
         */
        this.router.put('/update_user/:userId', [
            check('firstname', 'first name should be string, minimum 1 and max 20 characters')
                .isString()
                .notEmpty()
                .isLength({ min: 1, max: 20 })
                .stripLow(true)
                .escape(),
            check('surname', 'surname should be string, minimum 1 and max 20 characters')
                .isString()
                .notEmpty()
                .isLength({ min: 1, max: 20 })
                .stripLow(true)
                .escape(),
            check('ssn', 'social security number should be number min 10 max 10')
                .isNumeric()
                .notEmpty()
                .isLength({ min: 10, max: 10 })
                .stripLow(true)
                .escape(),
            check('email', 'email should include something@domain.com and min 5 max 20')
                .isEmail()
                .notEmpty()
                .isLength({ min: 5, max: 20 })
                .stripLow(true)
                .escape(),
            check('password', 'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long')
                .isStrongPassword()
                .notEmpty()
                .isLength({ min: 10, max: 10 })
                .stripLow(true)
                .escape(),
            check('username', 'user name should be string, minimum 5 and max 20 characters')
                .isString()
                .notEmpty()
                .isLength({ min: 5, max: 20 })
                .stripLow(true)
                .escape(),
        ], async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ error: errors.array() })
                return;
            }
            const user = {
                id: req.params.userId,
                firstname: req.body.firstname,
                surname: req.body.surname,
                ssn: req.body.ssn,
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                role: req.body.role,
            }
            await this.controller.updateUser(user)
                .then(result => {
                    res.status(200).json({ result: result });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json({ err: err });
                });
        });

        /**
         * Update one user with specified user email from url,
         * with all parameters as json object
         * Sends 200 when successful and returns user
         * On error send 500 and error as json object
         */
        this.router.put('/update_userByEmail/:userEmail', [
            check('firstname', 'first name should be string, minimum 1 and max 20 characters')
                .isString()
                .notEmpty()
                .isLength({ min: 1, max: 20 })
                .stripLow(true)
                .escape(),
            check('surname', 'surname should be string, minimum 1 and max 20 characters')
                .isString()
                .notEmpty()
                .isLength({ min: 1, max: 20 })
                .stripLow(true)
                .escape(),
            check('ssn', 'social security number should be number min 10 max 10')
                .isNumeric()
                .notEmpty()
                .isLength({ min: 10, max: 10 })
                .stripLow(true)
                .escape(),
            check('email', 'email should include something@domain.com and min 5 max 20')
                .isEmail()
                .notEmpty()
                .isLength({ min: 5, max: 20 })
                .stripLow(true)
                .escape(),
            check('password', 'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long')
                .isStrongPassword()
                .notEmpty()
                .isLength({ min: 10, max: 10 })
                .stripLow(true)
                .escape(),
            check('username', 'user name should be string, minimum 5 and max 20 characters')
                .isString()
                .notEmpty()
                .isLength({ min: 5, max: 20 })
                .stripLow(true)
                .escape(),
        ], async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ error: errors.array() })
                return;
            }
            const user = {
                firstname: req.body.firstname,
                surname: req.body.surname,
                ssn: req.body.ssn,
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
                role: "applicant",
            }
            await this.controller.updateUserByEmail(user)
                .then(result => {
                    res.status(200).json({ result: result });
                }).catch(err => {
                    console.log(err);
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