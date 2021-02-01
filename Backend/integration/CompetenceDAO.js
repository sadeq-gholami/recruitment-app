const Competence = require("../model/Competence");

class CompetenceDAO {
  constructor() {}

  async getCompetence() {
    const competences = await Competence.find()
      .exec()
      .then((docs) => {
        console.log(docs);
        return docs;
      })
      .catch((err) => {
        throw err;
      });

      return competences;
  }
}
module.exports = CompetenceDAO;
