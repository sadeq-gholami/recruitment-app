"use strict";
const UserDAO = require("../integration/UserDAO");
const CompetenceDAO = require("../integration/CompetenceDAO");
const ApplicationDAO = require('../integration/ApplicationDAO');
/**
 * The controller class handles all the method calls 
 * from view to model and integration layer   
 */
class Controller {
  
  constructor() {
    this.userDAO = new UserDAO();
    this.CompetenceDAO = new CompetenceDAO();
    this.ApplicationDAO = new ApplicationDAO();
  }

  /**
   * initiate the controller
   * @return this controller
   */
  static async createController() {
    const contr = new Controller();
    return contr;
  }

  /**
   * Create user in the database via integration layer
   * @param {all parameters for user} user 
   * @return the created user or error message
   */
  async createUser(user) {
    return await this.userDAO.createUser(user).catch((err) => {
      throw err;
    });
  }

  /**
   * Update user with the given parameters
   * @param {all parameters for user} user
   * @return the updated user or error message
   */
  async updateUser(user) {
    return await this.userDAO.updateUser(user).catch((err) => {
      throw err;
    });
  }

   /**
   * Delete the specific user
   * @param {the id of the specified user} personID 
   * @return the deleted user or error message
   */
  async deleteUser(personID) {
    return await this.userDAO.deleteUser(personID).catch((err) => {
      throw err;
    });
  }

  /**
   * validate the user 
   * @param {the given username} username 
   * @param {the given password} password 
   * @return user object if validated user object, null or error message
   */
  async login(username, password) {
    return await this.userDAO.login(username, password).catch((err) => {
      throw err;
    });
  }
  /**
   * get a list of all competences 
   * @return a list of all competences or error message
   */
  async getCompetence() {
    return await this.CompetenceDAO.getCompetence()
      .catch((err) => {
        throw err;
      });
  }

  /**
   * get the competence with the specified ID
   * @param {the ID of the specified competence} competenceID 
   * @return the specified competence object or error message
   */
  async getCompetenceById(competenceID) {
    return await this.CompetenceDAO.getCompetenceById(competenceID)
      .catch((err) => {
        throw err;
      });
  }

  /**
   * get the competence profile of the user with the specified ID
   * @param {the specified user's ID} personID 
   * @return the competence profile object or error message
   */
  async getCompetenceProfile(personID) {
    return await this.CompetenceDAO.getCompetenceProfile(personID)
      .catch((err) => {
        throw err;
      });
  }

  /**
   * create a new competence profile schema
   * @param {all the parameters of competence profile} compProf 
   * @return the created competence profile object or error message
   */
  async postCompetenceProfile(compProf) {
    return await this.ApplicationDAO.postCompetenceProfile(compProf)
      .catch(err => {
        throw err;
      });
  }

  /**
   * create table for the application status
   * @param {the specified user's ID} personID 
   * @return the created applications status object or error message
   */
  async postApplicationStatus(personID) {
    return await this.ApplicationDAO.postApplicationStatus(personID)
      .catch(err => {
        throw err;
      });
  }

  /**
   * create availability table 
   * @param {all the parameters required for the availability} avail 
   * @return the created availability object or error message
   */
  async postAvailability(avail) {
    return await this.ApplicationDAO.postAvailability(avail)
      .catch(err => {
        throw err;
      });
  }

  /**
   * get all applicants
   * @return a list of all applicants or error message
   */
  async getAllApplicants() {
    return await this.userDAO.getAllApplicants()
      .catch(err => {
        throw err;
      });
  }

  /**
   * get the availability of the specified user
   * @param {the specified user's ID} personID 
   */
  async getAvailability(personID) {
    return await this.ApplicationDAO.getAvailability(personID)
      .catch(err => {
        throw err;
      });
  }

  /**
   * 
   * @param {the specified user's ID} personID 
   * @return the availability object or error message
   */
  async getStatus(personID) {
    return await this.ApplicationDAO.getStatus(personID)
      .catch(err => {
        throw err;
      });
  }

  /**
   * update the application status of the specified user
   * @param {the specified user's ID} personID 
   * @param {the new status} status 
   * @return the updated application status object or error message
   */
  async updateStatus(personID, status) {
    return await this.ApplicationDAO.updateStatus(personID, status)
      .catch(err => {
        throw err;
      });
  }

  /**
   * update the ready status of the specified applicant 
   * @param {the specified user's ID} personID 
   * @return the updated status object or error message
   */
  async updateReady(personID) {
    return await this.userDAO.updateReady(personID)
      .catch(err => {
        throw err;
      });
  }

  /**
   * create a new ready table for the specified user 
   * @param {the specified user's ID} personID 
   * @return the created application ready object or error message
   */
  async createReadyTable(personID) {
    return await this.userDAO.createReadyTable(personID)
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  /**
   * get the application ready table for the specified user
   * @param {the specified user's ID} personID 
   *  @return the created application ready object or error message
   */
  async getReady(personID) {
    return await this.userDAO.getReady(personID)
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}

module.exports = Controller;
