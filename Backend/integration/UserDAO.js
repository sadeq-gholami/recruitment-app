const User = require('../model/User');
const bcrypt = require('bcrypt');

class UserDAO {

  constructor() {
  }

  async createUser(newUser) {
    const user = new User({
      _id: newUser.id,
      firstname: newUser.firstname,
      surname: newUser.surname,
      ssn: newUser.ssn,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      username: newUser.username
    });
    const savedUser = await user.save()
      .then(result => {
        return result;

      })
      .catch(err => {
        throw err;

      });
    return user;
  }

  //Get user for log in
  async login(username, password) {
    const user = await User.find({ username: username })
      .select('_id firstname surname ssn email role username password')
      .exec()
      .then(docs => {
        console.log(docs[0])
        return docs;
      });
      if(user.length < 1){
        return null;
      }
      try{
        if (await bcrypt.compare(password, user[0].password)){
          return user[0];
        }else{
          return null;
        }
      }catch(err){
        throw err;
      }
  }

  async getAllApplicants(){
    const users = User.find({role:"applicant"})
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
    return users;
  }
}
module.exports = UserDAO;