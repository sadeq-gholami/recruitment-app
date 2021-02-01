"use strict";
const UserDAO = require("../integration/UserDAO");
const CompetenceDAO = require("../integration/CompetenceDAO");
const ApplicationDAO = require('../integration/ApplicationDAO');
/**
 * The application's controller. No other class shall call the model or
 * integration layer.
 */
class Controller {
  /**
   * Creates a new instance.
   */
  constructor() {
    this.userDAO = new UserDAO();
    this.CompetenceDAO= new CompetenceDAO();
    this.ApplicationDAO = new ApplicationDAO();
  }

  //Instantiate new Controller object
  static async createController() {
    const contr = new Controller();
    return contr;
  }

  async createUser(user) {
    return await this.userDAO.createUser(user).catch((err) => {
      throw err;
    });
  }

  async login(username, password) {
    return await this.userDAO.login(username, password).catch((err) => {
      throw err;
    });
  }

  async getCompetence() {
    return await this.CompetenceDAO.getCompetence()
    .catch((err) => {
      throw err;
    });
  }
  async postProfile(comProf){
    return await this.ApplicationDAO.postProfile(comProf)
    .catch(err=>{
      throw err;
    });
  }

  async postAvailability(avail){
    return await this.ApplicationDAO.postAvailability(avail)
    .catch(err=>{
      throw err;
    });
  }

  async getAllApplicants(){
    return await this.userDAO.getAllApplicants()
    .catch(err => {
      throw err;
    });
  }

  async getAvailability(userID){
    return await this.ApplicationDAO.getAvailability(userID)
    .catch(err=>{
      throw err;
    });
  }
}
module.exports = Controller;
