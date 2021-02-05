const RequestHandler = require('./RequestHandler');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
class UserSignup extends RequestHandler {
    constructor() {
        super()
    }
    get path() {
        return '/signup';
    }
    async appHandler() {
        /**
         * Get controller
         */
        await this.getController().catch(err => { console.log(err) });

        /**
         * Create user
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
                    res.status(400).json({ err: err });
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
         * Update user
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
         * Delete user
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