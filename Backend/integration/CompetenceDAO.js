"use strict";
const Competence = require("../model/Competence");
const CompetenceProfile = require("../model/CompetenceProfile");
const mongoose = require("mongoose");
/**
 * Handles database-integrations that are connected to competence schema    
 */
class CompetenceDAO {
  constructor() { }

  /**
   * Get all competences
   * @return a list that contains all the available competences
   */
  async getCompetence() {
    const competences = await Competence.find()
      .exec()
      .then((docs) => {
        return docs;
      })
      .catch((err) => {
        throw err;
      });

    return competences;
  }

  /**
   * Get competence by id
   * @param {the id of the competence} competenceID 
   * @return the specified competence
   */
  async getCompetenceById(competenceID) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const competences = await Competence
    .find({ _id: competenceID }).session(session);
    await session.commitTransaction();
    session.endSession();

    return competences[0];
  }

  /**
   * Get competence profile of a specific user
   * @param {the id of the user} userId 
   * @return the competence profile of the specified user 
   */
  async getCompetenceProfile(userId) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const competenceProf = await CompetenceProfile
    .find({ personID: userId }).session(session);
    await session.commitTransaction();
    session.endSession();
    
    if (competenceProf < 1) {
      return null;
    } else {
      return competenceProf;
    }
  }
}
module.exports = CompetenceDAO;
