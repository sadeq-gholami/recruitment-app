const Competence = require("../model/Competence");
const CompetenceProfile = require("../model/CompetenceProfile");

class CompetenceDAO {
  constructor() {}

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

  async getCompetenceById(competenceID) {
    const competences = await Competence.find({_id:competenceID})
      .exec()
      .then((docs) => {
        return docs;
      })
      .catch((err) => {
        throw err;
      });

      return competences[0];
  }

  async getCompetenceProfile(userId) {
    const competenceProf = await CompetenceProfile.find({personID:userId})
      .exec()
      .then((docs) => {
        return docs;
      })
      .catch((err) => {
        throw err;
      });
      if(competenceProf < 1){
        return null;
      }else{
        return competenceProf;
      }
  }
}
module.exports = CompetenceDAO;
