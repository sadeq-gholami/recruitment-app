const User = require('../model/User');
const bcrypt = require('bcrypt');
const ApplicationReady = require('../model/ApplicationReady');
const mongoose = require('mongoose');
const UserSignup = require('../view/UserSignup');

class UserDAO {

  constructor() {
  }

  /**
   *Create user
   * @param {*} newUser 
   */
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
    return savedUser;
  }

  /**
   * Update user
   * @param {all parameters for user} user 
   */
  async updateUser(user) {
    console.log(user);
    console.log(user.id);
    const updatedUser = await User
      .findOneAndUpdate({ _id: user.id },
        {
          firstname: user.firstname,
          surname: user.surname,
          ssn: user.ssn,
          email: user.email,
          password: user.hashedPassword,
          username: user.username
        }, { new: true, upsert: true })
      .then(res => {
        return res;
      }).catch(err => {
        throw err;
      });
    return updatedUser;
  }

  /**
   * Delete user by id
   * @param {} personID 
   */
  async deleteUser(personID) {
    console.log(personID);
    const deletedUser = await User.findOneAndRemove({ _id: personID })
      .exec()
      .then(res => {
        return res;
      }).catch(err => {
        console.log("error " + err);
        throw err;
      });
    return deletedUser;
  }

  /**
   * Get user for log in
   * @param {*} username 
   * @param {*} password 
   */
  async login(username, password) {
    const user = await User.find({ username: username })
      .select('_id firstname surname ssn email role username password')
      .exec()
      .then(docs => {
        console.log(docs[0])
        return docs;
      });
    if (user.length < 1) {
      return null;
    }
    try {
      if (await bcrypt.compare(password, user[0].password)) {
        return user[0];
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get all applicants
   */
  async getAllApplicants() {
    const users = User.find({ role: "applicant" })
      .then(res => {
        return res;
      })
      .catch(err => {
        throw err;
      });
    return users;
  }

  /**
   * Create ready table for user
   * @param {} personID 
   */
  async createReadyTable(personID) {
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

  /**
   * Update ready status for user
   * @param {} personID 
   */
  async updateReady(personID) {
    const updatedReady = await ApplicationReady
      .findOneAndUpdate({ personID: personID }, { ready: true, date: Date.now() }, { new: true, upsert: true })
      .then(res => {
        return res;
      }).catch(err => {
        throw err;
      });
    return updatedReady;
  }

  /**
   * Get ready status for user
   * @param {*} personID 
   */
  async getReady(personID) {
    const appReady = await ApplicationReady.find({ personID: personID })
      .exec()
      .then((docs) => {
        return docs;
      })
      .catch((err) => {
        throw err;
      });
    if (appReady.length < 1) {
      return null;
    } else
      return appReady[0];
  }
}
module.exports = UserDAO;