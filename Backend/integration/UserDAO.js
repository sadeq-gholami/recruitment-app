const User = require('../model/User');
const bcrypt = require('bcrypt');
const ApplicationReady = require('../model/ApplicationReady');

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

  async createReadyTable(personID){
    console.log("PERSONID " + personID);
    const userReady = new ApplicationReady({
      _id: new mongoose.Types.ObjectId(),
      personID: personID,
      ready: false,
      date: null,
    });
    const ready = await userReady.save()
      .then(result => {
        return result;
      })
      .catch(err => {
        throw err;
      });
    return ready;
  }

  async updateReady(personID) {
    const updatedReady = await ApplicationReady
    .findOneAndUpdate({ personID: personID }, {ready: true, date: Date.now()}, {new: true, upsert: true})
    .then(res => {
      return res;
    }).catch(err => {
      throw err;
    });
    return updatedReady;
  }
}
module.exports = UserDAO;