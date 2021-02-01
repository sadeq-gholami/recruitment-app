const RequestHandler = require("./RequestHandler");
class Recruiter extends RequestHandler {
  constructor() {
    super();
  }
  get path() {
    return "/recruiter";
  }
  async appHandler() {
    await this.getController().catch((err) => {
      console.log(err);
    });
    this.router.get("/get_applicants", async (req, res, next) => {
      var fullApplication = [];
      const results = await this.controller
        .getAllApplicants()
        .then((result) => {
          return result;
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
        for(const user of results) {
        var avail = await this.controller
          .getAvailability(user._id).then(results=> {
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
          //console.log(avail);
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
          });
      };
      res.status(200).json({ result: fullApplication });
    });
  }
}

module.exports = Recruiter;
