"use strict";
const RequestHandler = require('./RequestHandler');
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
         * Sends 401 if validation failed
         * Sends 200 with user object on success
         */
        this.router.post('/', async (req, res, next) => {
            const user = await this.controller.login(req.body.username, req.body.password).then(result => {
                return result;
            })
                .catch(err => {
                    res.status(401).json({ err: err });
                });
            if (user == null) {
                res.status(401).json({ error: 'Login failed' });
            } else {
                res.status(200).json({ user: user });
            }
        })
    }
}

module.exports = UserLogin;