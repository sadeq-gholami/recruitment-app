const CompetenceProfile = require("../model/CompetenceProfile");
const Availability = require("../model/Availability");
const mongoose = require("mongoose");
const ApplicationStatus = require("../model/ApplicationStatus");
class ApplicationDAO {
  constructor() { }

  /**
   * Post competence profile
   * @param {*} compProf 
   */
  async postCompetenceProfile(compProf) {
    const competence_profile = new CompetenceProfile({
      _id: new mongoose.Types.ObjectId(),
      personID: compProf.personID,
      competenceID: compProf.competenceID,
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

  /**
   * Post avaiability
   * @param {*} avail 
   */
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

  /**
   * Post application status
   * @param {*} personID 
   */
  async postApplicationStatus(personID) {
    const appStatus = new ApplicationStatus({
      _id: new mongoose.Types.ObjectId(),
      personID: personID,
      status: "Unhandled"
    });
    const savedAppStatus = appStatus
      .save()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
    return savedAppStatus;
  }

  /**
   * Update status
   * @param {*} personID 
   * @param {*} status 
   */
  async updateStatus(personID, status) {
    const updatedStatus = await ApplicationStatus.findOneAndUpdate({ personID: personID }, { status: status }, { new: true, upsert: true })
      .then(res => {
        return res;
      }).catch(err => {
        throw err;
      });
    return updatedStatus;
  }

  /**
   * get status
   * @param {*} userId 
   */
  async getStatus(userId) {
    const currentStatus = await ApplicationStatus.find({ personID: userId })
      .then(res => {
        return res;
      }).catch(err => {
        throw err;
      });

    if (currentStatus.length < 1) {
      return null;
    } else {
      return currentStatus[0];
    }
  }

  /**
   * get availabilty
   * @param {*} userId 
   */
  async getAvailability(userId) {
    const avail = await Availability.find({ personID: userId })
      .then(res => {
        return res;
      }).catch(err => {
        throw err;
      });

    if (avail.length < 1) {
      return null;
    } else {
      return avail[0];
    }
  }
}
module.exports = ApplicationDAO;
