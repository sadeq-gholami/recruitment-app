const RequestHandler = require("./RequestHandler");
class Recruiter extends RequestHandler {
  constructor() {
    super();
  }
  get path() {
    return "/recruiter";
  }
  /**
   * Get controller
   */
  async appHandler() {
    await this.getController().catch((err) => {
      console.log(err);
    });

    /**
     * Get all applicants
     */
    this.router.get("/get_applicants", async (req, res, next) => {
      var fullApplication = [];
      var fullCompetenceProfile = [];
      const results = await this.controller
        .getAllApplicants()
        .then((result) => {
          return result;
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
      for (const user of results) {
        var avail = await this.controller
          .getAvailability(user._id).then(results => {
            return results;
          }).catch((err) => {
            res.status(500).json({ error: err });
          });
        if (avail == null) {
          avail = {
            fromDate: null,
            toDate: null,
          };
        }
        var comp = await this.controller
          .getCompetenceProfile(user._id).then(results => {
            return results;
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
            await this.controller.getCompetenceById(competence.competenceID).then(results => {
              fullCompetenceProfile.push({
                name: results.name,
                yearsOfExperience: competence.yearsOfExperience
              });
            }).catch((err) => {
              res.status(500).json({ error: err });
            });
          }
        }
        var status = await this.controller
          .getStatus(user._id).then(results => {
            return results;
          }).catch((err) => {
            res.status(500).json({ error: err });
          });
        if (status == null) {
          status = {
            status: null
          };
        }

        var ready = await this.controller.getReady(user._id).then(result => {
          return result;
        }).catch(err => {
          res.status(500).json({ error: err })
        });
        if (ready == null) {
          ready = { date: null };
        }

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
     */
    this.router.put('/update_status/:userId', async (req, res, next) => {
      await this.controller.updateStatus(req.params.userId, req.body.status).then(result => {
        res.status(200).json({ result: result });
      }).catch(err => {
        res.status(500).json({ err: err });
      });
    });
  }
}

module.exports = Recruiter;
