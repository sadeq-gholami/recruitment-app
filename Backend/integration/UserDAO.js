const User = require('../model/User');
class UserDAO{

    constructor() {
    }

    async createUser(newUser){
        const user = new User({
            _id: newUser.id,
            firstname: newUser.firstname,
            surname: newUser.surname,
            ssn: newUser.ssn,
            email: newUser.email,
            password: newUser.password,
            role:newUser.role,
            username: newUser.username 
        });
        const savedUser = await user.save()
        .then(result => {
          return result;
        })
        .catch(err => {
          console.log(err);
        });
    }
}
module.exports= UserDAO;