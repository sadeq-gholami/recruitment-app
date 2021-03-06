"use strict";
const CompetenceProfile = require("../model/CompetenceProfile");
const Availability = require("../model/Availability");
const mongoose = require("mongoose");
const ApplicationStatus = require("../model/ApplicationStatus");
const ApplicationReady = require('../model/ApplicationReady');

/**
 *  Handles database-integrations that are connected to the full application
 */
class ApplicationDAO {
  constructor() { }

  /**
  * Submit whole application adding:
  * Competence to competence profile
  * Time period to availability
  * Update ready status with new status and date
  * Add new application status
  * @param {the application to submit} application
  * @return the created application object
  */
   async submitApplication(application) {
    const session = await mongoose.startSession();
    //comp profile
    const competence_profile = await Promise.all(application.competence.map(async compProf => {
      return await CompetenceProfile.create({
        _id: new mongoose.Types.ObjectId(),
        personID: application._id,
        competenceID: compProf._id,
        yearsOfExperience: compProf.yearsOfExperience,
      });
    }));
    console.log("returned comp profile");
    console.log(competence_profile);

    //time period
    const availability = await Promise.all(application.timePeriod.map(async avail => {
      return await Availability.create({
        _id: new mongoose.Types.ObjectId(),
        personID: application._id,
        fromDate: avail.startTime,
        toDate: avail.endTime,
      });
    }));

    //add application status
    const appStatus = await ApplicationStatus.create({
      _id: new mongoose.Types.ObjectId(),
      personID: application._id,
      status: "Unhandled"
    });

    let savedComp;
    let savedAvailability;
    let savedStatus;
    let savedReady;
    await session.withTransaction(async () => {
      savedComp = await Promise.all(competence_profile.map(comp => {
        return comp.save({ session });
      }));
      savedAvailability = await Promise.all(availability.map(avail => {
        return avail.save({ session });
      }));
      savedStatus = await appStatus.save({ session });
      savedReady = await ApplicationReady.findOneAndUpdate({ personID: application._id }, { ready: true, date: Date.now() },
        { new: true, upsert: true }).session(session);
    });
    session.endSession();
    return {
      competence: savedComp,
      availability: savedAvailability,
      status: savedStatus,
      ready: savedReady
    };
  }
  
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
