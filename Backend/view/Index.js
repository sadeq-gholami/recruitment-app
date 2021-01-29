'use strict';

const UserSignup = require('./UserSignup');
const UserLogin = require('./UserLogin');


/**
 * Contains all request handlers.
 */
class RequestHandlerLoader {
  /**
   * Creates a new instance.
   */
  constructor() {
    this.reqHandlers = [];
  }

  /**
   * Adds a new request handler.
   *
   * @param {RequestHandler} reqHandler The request handler that will be added.
   */
  addRequestHandler(reqHandler) {
    this.reqHandlers.push(reqHandler);
  }

 

  /**
   * Makes all request handlers available in the specified express
   * Application object.
   *
   * @param {Application} app The express application hosting the
   *                          request handlers.
   */
  loadHandlers(app) {
    this.reqHandlers.forEach((reqHandler) => {
      reqHandler.appHandler();
      app.use(reqHandler.path, reqHandler.router);
    });
  }

  

}

const loader = new RequestHandlerLoader();
loader.addRequestHandler(new UserSignup());
loader.addRequestHandler(new UserLogin());

module.exports = loader;