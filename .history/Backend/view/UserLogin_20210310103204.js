"use strict";
const RequestHandler = require('./RequestHandler');
const Authentication = require('./authentication/Authentication');
const {check, validationResult} = require('express-validator');

/**
 * Handles user login. User sends username and password 
 * and it is checked against the database
 * Inherits the requestHandler class
 */
class UserLogin extends RequestHandler {
    constructor() {
        super()
    }
    get path() {
        return '/login';
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
         * Post request to validate user. Send in username and password 
         * and it is checked against the database
         * Sends 500 if connection to database failed
         * Sends 401 if validation failed
         * Sends 200 with user object on success
         */
        this.router.post('/', [
            check('password', 'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long')
                .notEmpty()
                .isLength({min:10,max:10})
                .stripLow(true)
                .escape(),
            check('username', 'user name should be string, minimum 5 and max 20 characters')
                .isString()
                .notEmpty()
                .isLength({min:5,max:20})
                .stripLow(true)
                .escape(),    
        ], async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({error:errors.array()})
                return;
              }
            const user = await this.controller.login(req.body.username, req.body.password).then(result => {
                return result;
            }).catch(err => {
                res.status(500).json({ err: err });
            });
            if (user === null) {
                res.status(401).json({ error: 'Login failed' });
            } else {
                Authentication.setAuthCookie(user, res);
                res.status(200).json({ user: user });
            }
        })
    }
}

module.exports = UserLogin;