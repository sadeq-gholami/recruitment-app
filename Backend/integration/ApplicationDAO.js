const CompetenceProfile = require("../model/CompetenceProfile");
const Availability = require("../model/Availability");
const mongoose = require("mongoose");
class ApplicationDAO {
  constructor() {}

  async postProfile(compProf) {
    const competence_profile = new CompetenceProfile({
      _id: new mongoose.Types.ObjectId(),
      personID: compProf.personId,
      competenceID: compProf.competenceId,
      yearsOfExperience: compProf.yearsOfExperience,
    });
    const savedcomProf = await competence_profile
      .save()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
    return savedcomProf;
  }

  async postAvailability(avail) {
    const availability = new Availability({
      _id: new mongoose.Types.ObjectId(),
      personID: avail.personId,
      fromDate: avail.fromDate,
      toDate: avail.toDate,
    });
    const savedAvailability = availability
      .save()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
      return savedAvailability;
  }

  async getAvailability(userId){
      const avail= await Availability.find({personID: userId})
      .then(res=>{
          return res;
      }).catch(err=>{
          throw err;
      });

      if(avail.length <1){
          return null;
      }else{
          return avail[0];
      }
  }
}
module.exports = ApplicationDAO;
