"use strict";
const Competence = require("../model/Competence");
const CompetenceProfile = require("../model/CompetenceProfile");
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
    const competences = await Competence.find({ _id: competenceID })
      .exec()
      .then((docs) => {
        return docs;
      })
      .catch((err) => {
        throw err;
      });

    return competences[0];
  }

  /**
   * Get competence profile of a specific user
   * @param {the id of the user} userId 
   * @return the competence profile of the specified user 
   */
  async getCompetenceProfile(userId) {
    const competenceProf = await CompetenceProfile.find({ personID: userId })
      .exec()
      .then((docs) => {
        return docs;
      })
      .catch((err) => {
        throw err;
      });
    if (competenceProf < 1) {
      return null;
    } else {
      return competenceProf;
    }
  }
}
module.exports = CompetenceDAO;
