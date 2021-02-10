"use strict";
const RequestHandler = require("./RequestHandler");
/**
 * Get list of all applicant and change status for specified applicant
 * Inherits the requestHandler class
 */
class Recruiter extends RequestHandler {
  constructor() {
    super();
  }
  get path() {
    return "/recruiter";
  }

  /**
   * Polymorphic method that handles REST requests
   */
  async appHandler() {

    /**
    * Get controller
    */
    await this.getController().catch((err) => {
      console.log(err);
    });

    /**
     * Get all applicants with all information:
     * user, availability, competence profile, status and ready
     * Sends 500 on error
     * Sends 200 on success with json object of all information
     */
    this.router.get("/get_applicants", async (req, res, next) => {
      var fullApplication = [];
      var fullCompetenceProfile = [];
      const allApplicants = await this.getAllApplicants(req, res);

      for (const user of allApplicants) {
        const avail = await this.getAllAvailability(user._id, res);
        await this.getAllCompetenceProfiles(user._id, res, fullCompetenceProfile);
        const status = await this.getAllStatus(user._id, res);
        const ready = await this.getAllReady(user._id, res);

        //push all information to array
        fullApplication.push({
          userId: user._id,
          firstname: user.firstname,
          surname: user.surname,
          ssn: user.ssn,
          email: user.email,
          username: user.username,
          availability: {
            fromDate: avail.fromDate,
            toDate: avail.toDate,
          },
          competence: fullCompetenceProfile,
          status: status.status,
          ready: ready.date
        });
        fullCompetenceProfile = [];

      };
      res.status(200).json({ result: fullApplication });
    });

    /**
     * Update status of application
     * Status can be: unhandled, accepted or rejected
     * Sends 500 on error
     * Sends 200 on success with json object
     */
    this.router.put('/update_status/:userId', async (req, res, next) => {
      await this.controller.updateStatus(req.params.userId, req.body.status).then(result => {
        res.status(200).json({ result: result });
      }).catch(err => {
        res.status(500).json({ err: err });
      });
    });
  }

  /**
   * Get all applicants
   * @param {used to send response} res
   * @return all users
   */
  async getAllApplicants(res) {
    const results = await this.controller
      .getAllApplicants()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
    return results;
  }

  /**
   * Get availability per user
   * @param {id for specific user} userID 
   * @param {used to send response} res 
   * @return availability for specific user
   */
  async getAllAvailability(userID, res) {
    var avail = await this.controller
      .getAvailability(userID).then(result => {
        return result;
      }).catch((err) => {
        res.status(500).json({ error: err });
      });
    if (avail == null) {
      avail = {
        fromDate: null,
        toDate: null,
      };
    }
    return avail;
  }

  /**
   * Get competence profile for specific user
   * @param {id for specific user} userID 
   * @param {used to send response} res 
   * @param {array to store all competence profile} fullCompetenceProfile 
   */
  async getAllCompetenceProfiles(userID, res, fullCompetenceProfile) {
    var comp = await this.controller
      .getCompetenceProfile(userID).then(result => {
        return result;
      }).catch((err) => {
        res.status(500).json({ error: err });
      });
    if (comp == null) {
      comp = {
        competenceID: null,
        yearsOfExperience: null,
        _id: null,
        personID: null,
      };
      fullCompetenceProfile.push({
        name: null,
        yearsOfExperience: null
      });
    } else {
      for (const competence of comp) {
        await this.controller.getCompetenceById(competence.competenceID).then(allApplicants => {
          fullCompetenceProfile.push({
            name: allApplicants.name,
            yearsOfExperience: competence.yearsOfExperience
          });
        }).catch((err) => {
          res.status(500).json({ error: err });
        });
      }
    }
  }

  /**
   * Get status of current application for specific user
   * @param {id for specific user} userID 
   * @param {used to send response} res
   * @return status for current user
   */
  async getAllStatus(userID, res) {
    //get status of all applications
    var status = await this.controller
      .getStatus(userID).then(result => {
        return result;
      }).catch((err) => {
        res.status(500).json({ error: err });
      });
    if (status == null) {
      status = {
        status: null
      };
    }
    return status;
  }

  /**
   * Get ready status of current application
   * @param {id for specific user} userID  
   * @param {used to send response} res 
   */
  async getAllReady(userID, res) {
    var ready = await this.controller.getReady(userID).then(result => {
      return result;
    }).catch(err => {
      res.status(500).json({ error: err })
    });
    if (ready == null) {
      ready = { date: null };
    }
    return ready;
  }
}

module.exports = Recruiter;
