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

  async getCompetenceById(competenceID) {
    return await this.CompetenceDAO.getCompetenceById(competenceID)
    .catch((err) => {
      throw err;
    });
  }

  async getCompetenceProfile(personID) {
    return await this.CompetenceDAO.getCompetenceProfile(personID)
    .catch((err) => {
      throw err;
    });
  } 

  async postCompetenceProfile(compProf){
    return await this.ApplicationDAO.postCompetenceProfile(compProf)
    .catch(err=>{
      throw err;
    });
  }

  async postApplicationStatus(personID){
    return await this.ApplicationDAO.postApplicationStatus(personID)
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

  async getAvailability(personID){
    return await this.ApplicationDAO.getAvailability(personID)
    .catch(err=>{
      throw err;
    });
  }

  async getStatus(personID){
    return await this.ApplicationDAO.getStatus(personID)
    .catch(err=>{
      throw err;
    });
  }

  async updateStatus(personID, status){
    return await this.ApplicationDAO.updateStatus(personID, status)
    .catch(err=>{
      throw err;
    });
  }

 

  async updateReady(personID){
    return await this.userDAO.updateReady(personID)
    .catch(err=>{
      throw err;
    });
  }

  async createReadyTable(personID){
    return await this.userDAO.createReadyTable(personID)
    .catch(err=>{
      console.log(err);
      throw err;
    });
  }

  async getReady(personID){
    return await this.userDAO.getReady(personID)
    .catch(err=>{
      console.log(err);
      throw err;
    });
  }
}

module.exports = Controller;
