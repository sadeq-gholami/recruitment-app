"use strict";
const mongoose = require('mongoose');
/**
 * Schema for Application status
 */
const status = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    personID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    status: {type: String, required: true}
});

module.exports= mongoose.model('ApplicationStatus', status);