'use strict'
const jwt = require('jsonwebtoken');

class Authentication{


    static async isLoggedIn(req, res, controller){
        const authenticationCookie = req.cookies.userAuth;
        if(!authenticationCookie){
            res.status(401).json({
                error: "missing authentication token"
            });
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
          ...notAccessibleFromJs,
          ...isSessionCookie,
        };
        res.cookie('userAuth', jwtToken, cookieOptions);
      }
}
module.exports= Authentication;