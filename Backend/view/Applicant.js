"use strict";
const RequestHandler = require('./RequestHandler');
/**
 * Handles applicant, gets and updates information about an applicant
 * Inherits the requestHandler class
 */
class Applicant extends RequestHandler {
    constructor() {
        super()
    }
    get path() {
        return '/applicant';
    }
    /**
    * Polymorphic method that handles REST requests
    */
    async appHandler() {
        /**
         * Get controller
         */
        await this.getController().catch(err => { console.log(err) });

        /**
         * Get all competences in database
         * Sends 200 when successful and returns competences
         * On error send 500 and error as json object
         */
        this.router.get('/competence', async (req, res, next) => {
            const competences = await this.controller.getCompetence().then(result => {
                return result;
            })
                .catch(err => {
                    res.status(500).json({ err: err });
                });
            res.status(200).json({ competences: competences });
        });

        /**
         * Add competence to competence for specific userID
         * Adds specific competence with years of experience to competence profile
         * Sends 200 when successful and returns competence profile
         * On error send 500 and error as json object
         */
        this.router.post('/competence_profile/:userId', async (req, res, next) => {
            const userId = req.params.userId;
            const compProfile = {
                personID: userId,
                competenceID: req.body.competenceID,
                yearsOfExperience: req.body.yearsOfExperience
            };
            await this.controller.postCompetenceProfile(compProfile).then(result => {
                res.status(200).json({ result: result })
            }).catch(err => {
                res.status(500).json({ err: err });
            });
        });

        /**
         * Add application status for specific userID
         * Status can be unhandled, accepted or rejected
         * Sends 200 when successful and returns status
         * On error send 500 and error as json object
         */
        this.router.post('/application_status/:userId', async (req, res, next) => {
            const userId = req.params.userId;
            await this.controller.postApplicationStatus(userId).then(result => {
                res.status(200).json({ result: result })
            }).catch(err => {
                res.status(500).json({ err: err });
            });
        });

        /**
         * Add availability for specific user. Availability is a time period.
         * Sends 200 when successful and returns availability
         * On error send 500 and error as json object
         */
        this.router.post('/availability/:userId', async (req, res, next) => {
            const userId = req.params.userId;
            const availability = {
                personId: userId,
                fromDate: new Date(req.body.fromDate),
                toDate: new Date(req.body.toDate)
            };
            await this.controller.postAvailability(availability).then(result => {
                res.status(200).json({ result: result })
            }).catch(err => {
                res.status(500).json({ err: err });
            });
        });

        /**
         * Update ready status of a users application, 
         * status is false when application is unfinished, it is true when application is done
         * Sends 200 when successful and returns ready status
         * On error send 500 and error as json object
         */
        this.router.put('/update_ready/:userId', async (req, res, next) => {
            await this.controller.updateReady(req.params.userId).then(result => {
                res.status(200).json({ result: result });
            }).catch(err => {
                res.status(500).json({ err: err });
            });
        });
    }
}

module.exports = Applicant;