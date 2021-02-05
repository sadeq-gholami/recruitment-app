const RequestHandler = require('./RequestHandler');
class UserLogin extends RequestHandler {
    constructor() {
        super()
    }
    get path() {
        return '/login';
    }
    async appHandler() {
        /**
         * Get controller
         */
        await this.getController().catch(err => { console.log(err) });

        /**
         * Login
         */
        this.router.post('/', async (req, res, next) => {
            const user = await this.controller.login(req.body.username, req.body.password).then(result => {
                return result;
            })
                .catch(err => {
                    res.status(400).json({ err: err });
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