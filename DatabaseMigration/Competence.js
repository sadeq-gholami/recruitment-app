"use strict";
const mongoose = require('mongoose');
/**
 * Schema for competence 
 */
const competence = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required:true},
});

module.exports= mongoose.model('Competence', competence);

