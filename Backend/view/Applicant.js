
const RequestHandler = require('./RequestHandler');
class Applicant extends RequestHandler {
    constructor() {
        super()
    }
    get path() {
        return '/applicant';
    }
    async appHandler() {

        await this.getController().catch(err => { console.log(err) });
        this.router.get('/competence', async (req, res, next) => {
            const competences = await this.controller.getCompetence().then(result => {
                return result;
            })
            .catch(err => {
                res.status(400).json({ err: err });
            });
            res.status(200).json({competences:competences});
        });

        this.router.post('/competence_profile/:userId', async (req,res,next) => {
            const userId = req.params.userId;
            const compProfile= {
                personID: userId,
                competenceID: req.body.competenceID,
                yearsOfExperience:req.body.yearsOfExperience
            };
            await this.controller.postCompetenceProfile(compProfile).then(result=>{
                res.status(200).json({result: result})
            }).catch(err=>{
                res.status(500).json({err:err});
            });
        });

        this.router.post('/application_status/:userId', async (req,res,next) => {
            const userId = req.params.userId;
            await this.controller.postApplicationStatus(userId).then(result=>{
                res.status(200).json({result: result})
            }).catch(err=>{
                res.status(500).json({err:err});
            });
        });

        this.router.post('/availability/:userId', async (req,res,next) => {
            const userId = req.params.userId;
            const availibilty= {
                personId: userId,
                fromDate: new Date(req.body.fromDate),
                toDate:new Date(req.body.toDate)
            };
            await this.controller.postAvailability(availibilty).then(result=>{
                res.status(200).json({result: result})
            }).catch(err=>{
                res.status(500).json({err:err});
            });
        });

    }
}

module.exports = Applicant;