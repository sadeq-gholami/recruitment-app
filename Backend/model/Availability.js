"use strict";
const mongoose = require('mongoose');
/**
 * Schema for availability  for database 
 */
const availability = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    personID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    fromDate: {type: Date, required:true},
    toDate: {type: Date, required:true}
});

module.exports= mongoose.model('Availability', availability);
