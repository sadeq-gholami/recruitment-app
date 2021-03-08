"use strict";
const User = require('../model/User');
const bcrypt = require('bcrypt');
const ApplicationReady = require('../model/ApplicationReady');
const mongoose = require('mongoose');

/**
 * Handles database-integrations that are connected to user schema   
 */
class UserDAO {

  constructor() {
  }

  /**
   * Creates a new user and ready table, and saves it in database  
   * @param {all properties of a the user to be created} newUser 
   * @returns the saved user
   */
  async createUser(newUser) {
    await this.validation(newUser).catch(err =>{
      throw err;
    });
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    //start transaction
    const session = await mongoose.startSession();
    const user = await User.create({
      _id: newUser.id,
      firstname: newUser.firstname,
      surname: newUser.surname,
      ssn: newUser.ssn,
      email: newUser.email,
      password: hashedPassword,
      role: newUser.role,
      username: newUser.username
    });
    const userReady = await ApplicationReady.create({
      _id: new mongoose.Types.ObjectId(),
      personID: newUser.id,
      ready: false,
      date: null,
    });
    let savedUser;
    await session.withTransaction(async () => {
      savedUser = await user.save({ session });
      await userReady.save({ session });
    });
    session.endSession();
    return savedUser;
  }

  /**
   * Update the existing user with the new information 
   * @param {all parameters for user} user 
   * @returns the updated user
   */
  async updateUser(newUser) {
    await this.validation(newUser).catch(err =>{
      throw err;
    });
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const session = await mongoose.startSession();
    session.startTransaction();
    let update = await User.findOneAndUpdate({ _id: newUser.id }, {
      firstname: newUser.firstname,
      surname: newUser.surname,
      ssn: newUser.ssn,
      email: newUser.email,
      password: hashedPassword,
      username: newUser.username,
      role: newUser.role,
    }, { new: true, upsert: true }).session(session);
    await session.commitTransaction();
    session.endSession();
    return update;
  }

  /**
  * Update the existing user with the new information, find by email
  * @param {all parameters for user} user 
  * @returns the updated user
  */
  async updateUserByEmail(user) {
    await this.validation(user).catch(err =>{
      throw err;
    });
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const session = await mongoose.startSession();
    session.startTransaction();
    let update = await User.findOneAndUpdate({ email: user.email }, {
      firstname: user.firstname,
      surname: user.surname,
      ssn: user.ssn,
      email: user.email,
      password: hashedPassword,
      username: user.username,
      role: user.role,
    }, { new: true, upsert: true }).session(session);
    await session.commitTransaction();
    session.endSession();
    return update;
  }

  /**
   * Delete user by id
   * @param {Id for the user to be deleted} personID 
   * @returns the deleted user  
   */
  async deleteUser(personID) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const deletedUser = await User.findOneAndRemove({ _id: personID }).session(session);
    await session.commitTransaction();
    session.endSession();
    return deletedUser;
  }

  /**
   * Get user for log in and compare it against 
   * the given username and password 
   * @param {the given username} username 
   * @param {the given password} password 
   * @return the validated user if the validation pass, else returns null 
   */
  async login(username, password) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const user = await User.find({ username: username }).session(session);
    await session.commitTransaction();
    session.endSession();
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
   * @return a list with all applicants 
   */
  async getAllApplicants() {
    const session = await mongoose.startSession();
    session.startTransaction();
    const users = await User.find({ role: "applicant" }).session(session);
    await session.commitTransaction();
    session.endSession();
    if (users.length < 1) {
      throw { error: "Database error" };
    } else {
      return users;
    }
  }

  /**
   * Update ready status for user
   * @param {the id of the user to be updated} personID 
   * @return the updated ready table
   */
  async updateReady(personID) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const updatedReady = await ApplicationReady
      .findOneAndUpdate({ personID: personID }, { ready: true, date: Date.now() },
        { new: true, upsert: true }).session(session);
    await session.commitTransaction();
    session.endSession();
    return updatedReady;
  }

  /**
   * Get ready status for user
   * @param {The id of the user to have the ready table} personID 
   */
  async getReady(personID) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const appReady = await ApplicationReady.find({ personID: personID }).session(session);
    await session.commitTransaction();
    session.endSession();
    if (appReady.length < 1) {
      return null;
    } else
      return appReady[0];
  }

  /**
   * Get a user with specific username
   * @param { username for specific user } username 
   */
  async getUserByUsername(username) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const user = await User.find({ username: username }).session(session);
    await session.commitTransaction();
    session.endSession();
    if (user.length < 1) {
      return null;
    } else {
      return user[0];
    }
  }

  async validation(newUser) {
    const firstnameRegex = new RegExp("(?=.{1,})");
    const surnameRegex = new RegExp("(?=.{1,})");
    const emailRegex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    const ssnRegex = /^(\d{6}|\d{8})[-|(\s)]{0,1}\d{4}$/;
    const usernameRegex = new RegExp("(?=.{4,})");
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&*])");
    if (!firstnameRegex.test(newUser.firstname)) {
      throw { error: "invalid input firstname" }
    } else if (!passwordRegex.test(newUser.password)) {
      throw { error: "invalid input password" }
    } else if (!surnameRegex.test(newUser.surname)) {
      throw { error: "invalid input surname" }
    } else if (!emailRegex.test(newUser.email)) {
      throw { error: "invalid input email" }
    } else if (!ssnRegex.test(newUser.ssn)) {
      throw { error: "invalid input ssn" }
    } else if (!usernameRegex.test(newUser.username)) {
      throw { error: "invalid input username" }
    }
  }






  /**
   * Not used!!!!
   * Create ready table for user, ready signifies if the application is done or not
   * @param {The id of the user to have the ready table} personID 
   * @return the created ready table
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
}

module.exports = UserDAO;