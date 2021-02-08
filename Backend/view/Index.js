'use strict';
const UserSignup = require('./UserSignup');
const UserLogin = require('./UserLogin');
const Applicant = require('./Applicant');
const Recruiter = require('./Recruiter');

/**
 * Handles all requests handler loaders
 */
class RequestHandlerLoader {
  constructor() {
    this.requestHandlersList = [];
  }

  /**
   * Add request handler to list
   * @param {request handler to be added to list} requestHandler 
   */
  addRequestHandler(requestHandler) {
    this.requestHandlersList.push(requestHandler);
  }

  /**
   * Loads all request handlers and calls all polymorphic methods,
   * set path and router for application
   * @param {application from express()} application 
   */
  loadRequestHandlers(application) {
    this.requestHandlersList.forEach((requestHandler) => {
      requestHandler.appHandler();
      application.use(requestHandler.path, requestHandler.router);
    });
  }
}

/**
 * Initiate the request handler loader class and load all request handlers
 */
const loader = new RequestHandlerLoader();
loader.addRequestHandler(new UserSignup());
loader.addRequestHandler(new UserLogin());
loader.addRequestHandler(new Applicant());
loader.addRequestHandler(new Recruiter());
module.exports = loader;