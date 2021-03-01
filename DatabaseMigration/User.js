"use strict";
const mongoose = require('mongoose');
/**
 * Schema for user in database
 */
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    ssn: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    username: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', userSchema);