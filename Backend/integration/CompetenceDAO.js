const Competence = require("../model/Competence");
const CompetenceProfile = require("../model/CompetenceProfile");

class CompetenceDAO {
  constructor() { }

  /**
   * Get all competences
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
   * @param {} competenceID 
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
   * Get competence profile
   * @param {*} userId 
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
