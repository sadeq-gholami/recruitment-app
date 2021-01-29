const express = require('express');

const Controller = require('../controller/Controller');

class RequestHandler{
    constructor(){
        this.router = express.Router();
    }


    static get URL_PREFIX() {
        return 'http://';
      }

    async getController(){
        this.controller = await Controller.createController().catch(err=>{console.log(err)});
    }

}
module.exports= RequestHandler;