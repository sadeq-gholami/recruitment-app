const jwt = require('jsonwebtoken');

class Authorization{

    /**
     * Checks if a user is a recruiter
     * @param {the request object} req 
     * @param {the response object} res 
     * @param {the controller object} controller 
     * @returns true if the user is a recruiter otherwise returns false
     */
    static async isRecruiter(req, res, controller){
        const authenticationCookie = req.cookies.userAuth;
        if(!authenticationCookie){
            res.status(401).json({
                error: "missing authentication token"
            });
            return;
        }
        try {
            const userJWTPayload = jwt.verify(authenticationCookie, process.env.JWT_SECRET);
            const loggedInUser = await controller.getUserByUsername(userJWTPayload.username);
            if (loggedInUser === null || loggedInUser.role!=="recruiter") {
                res.clearCookie('userAuth');
                res.status(401).json({
                    error: "User is not recruiter"
                });
                return false;
            }
            req.user = loggedInUser;
            return true;
        }catch(err) {
            res.clearCookie('userAuth');
            res.status(401).json({
                error: "Invalid authentication token"
            });
            return false;
        }
    }
}

module.exports= Authorization;