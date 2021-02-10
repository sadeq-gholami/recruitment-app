"use strict";
const CompetenceProfile = require("../model/CompetenceProfile");
const Availability = require("../model/Availability");
const mongoose = require("mongoose");
const ApplicationStatus = require("../model/ApplicationStatus");
/**
 *  Handles database-integrations that are connected to the full application
 */
class ApplicationDAO {
  constructor() { }

  /**
   * create a new competence profile for the referenced user
   * @param {all the parameters for the competence profile} compProf 
   * @return the saved competence profile
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
   * create availability for the referenced user
   * @param {all the parameters for availability schema} avail 
   *  @return the created availability object
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
   * Create application status for the referenced user 
   * it is Unhandled by default and can be updated by recruiter 
   * @param {the id of the user} personID 
   * @return created application status
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
   * Update status of the specified user
   * @param {the id of the user} personID 
   * @param {the new status} status 
   * @return updated application status schema 
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
   * get application status of the specified user
   * @param {the id of the user} userId 
   * @return the application status schema
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
   * get availability for the specified user 
   * @param {the id of the user} userId 
   * @return the availability schema
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
