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

  /**
   * Instantiates a new Controller object.
   *
   * @return {Controller} The newly created controller.
   */
  static async createController() {
    const contr = new Controller();
    return contr;
  }

  async createUser(user){
     await this.userDAO.createUser(user);
  }
}
module.exports = Controller;