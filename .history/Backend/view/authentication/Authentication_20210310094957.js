'use strict'
const jwt = require('jsonwebtoken');

class Authentication{

    /**
     * Check if a user has a cookie, and is thus logged in
     * @param {the request object} req 
     * @param {the response object} res 
     * @param {the controller object} controller 
     * @returns returns true if user is logged in otherwise false
     */
    static async isLoggedIn(req, res, controller){
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
            if (loggedInUser === null) {
                res.clearCookie('userAuth');
                res.status(401).json({
                    error: "Invalid authentication token"
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

    /**
     * Gives a user a cookie
     * @param {the user object} user 
     * @param {the response object} res 
     */
    static setAuthCookie(user, res) {
        const notAccessibleFromJs = {httpOnly: true};
        const isSessionCookie = {expires: 0};
    
        const jwtToken = jwt.sign(
            {id: user._id, username: user.username},
            process.env.JWT_SECRET,
            {
              expiresIn: '30 minutes',
            }
        );
    
        const cookieOptions = {
            // sameSite: 'None', 
            // secure: true,
          ...notAccessibleFromJs,
          ...isSessionCookie,
        };
        res.cookie('userAuth', jwtToken, cookieOptions);
      }
}
module.exports= Authentication;