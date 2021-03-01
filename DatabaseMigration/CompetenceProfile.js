"use strict";
const mongoose = require('mongoose');
/**
 * Schema for competence profile
 */
const competenceProfile = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    personID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    competenceID: { type: mongoose.Schema.Types.ObjectId, ref: 'Competence', required: true },
    yearsOfExperience: { type: Number, required: true }
});

module.exports = mongoose.model('CompetenceProfile', competenceProfile);

