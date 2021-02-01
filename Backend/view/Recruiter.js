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
     await results.forEach(async (user) => {
        await this.controller
          .getAvailability(user._id)
          .then((availability) => {
            if (availability == null) {
              availability = {
                fromDate: null,
                toDate: null,
              };
            }
            fullApplication.push({
              userId: user._id,
              firstname: user.firstname,
              surname: user.surname,
              ssn: user.ssn,
              email: user.email,
              username: user.username,
              availability: {
                fromDate: availability.fromDate,
                toDate: availability.toDate,
              },
            });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
         
      });
      res.status(200).json({ result: fullApplication });
    }).then(res=>{
        
    });
  }
}

module.exports = Recruiter;
