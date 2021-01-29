'use strict';
const UserDAO = require('../integration/UserDAO');

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
  }

//Instantiate new Controller object
  static async createController() {
    const contr = new Controller();
    return contr;
  }

  async createUser(user){
    return await this.userDAO.createUser(user)
      .catch(err=>{throw err});
  }

  async login(username, password){
    return await this.userDAO.login(username, password)
      .catch(err=>{throw err});
  }
}
module.exports = Controller;