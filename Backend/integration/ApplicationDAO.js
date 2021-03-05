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
    const session = await mongoose.startSession();
    const competence_profile = await CompetenceProfile.create({
      _id: new mongoose.Types.ObjectId(),
      personID: compProf.personID,
      competenceID: compProf.competenceID,
      yearsOfExperience: compProf.yearsOfExperience,
    });
    let savedComp;
    await session.withTransaction(async () => {
      savedComp = await competence_profile.save({ session });
    });
    session.endSession();
    return savedComp;
  }

  /**
   * create availability for the referenced user
   * @param {all the parameters for availability schema} avail 
   *  @return the created availability object
   */
  async postAvailability(avail) {
    const session = await mongoose.startSession();
    const availability = await Availability.create({
      _id: new mongoose.Types.ObjectId(),
      personID: avail.personId,
      fromDate: avail.fromDate,
      toDate: avail.toDate,
    });
    let savedAvailability;
    await session.withTransaction(async () => {
      savedAvailability = await availability.save({ session });
    });
    session.endSession();
    return savedAvailability;
  }

  /**
   * Create application status for the referenced user 
   * it is Unhandled by default and can be updated by recruiter 
   * @param {the id of the user} personID 
   * @return created application status
   */
  async postApplicationStatus(personID) {
    const session = await mongoose.startSession();
    const appStatus = await ApplicationStatus.create({
      _id: new mongoose.Types.ObjectId(),
      personID: personID,
      status: "Unhandled"
    });
    let savedAppStatus;
    await session.withTransaction(async () => {
      savedAppStatus = await appStatus.save({ session });
    });
    session.endSession();
    return savedAppStatus;
  }

  /**
   * Update status of the specified user
   * @param {the id of the user} personID 
   * @param {the new status} status 
   * @return updated application status schema 
   */
  async updateStatus(personID, status) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const updatedStatus = await ApplicationStatus
      .findOneAndUpdate(
        { personID: personID },
        { status: status },
        { new: true, upsert: true }).session(session);
    await session.commitTransaction();
    session.endSession();
    return updatedStatus;
  }

  /**
   * get application status of the specified user
   * @param {the id of the user} userId 
   * @return the application status schema
   */
  async getStatus(userId) {
    const session = await mongoose.startSession();
    session.startTransaction();
    const currentStatus = await ApplicationStatus.
    find({ personID: userId }).session(session);
    await session.commitTransaction();
    session.endSession();
    
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
    const session = await mongoose.startSession();
    session.startTransaction();
    const avail = await Availability
    .find({ personID: userId }).session(session);
    await session.commitTransaction();
    session.endSession();

    if (avail.length < 1) {
      return null;
    } else {
      return avail;
    }
  }
}
module.exports = ApplicationDAO;
