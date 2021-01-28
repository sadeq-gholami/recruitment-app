const mongoose = require('mongoose');
const competenceProfile = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    personID: { type: Schema.Types.ObjectId, ref: 'User', required:true},
    competenceID: {type: Schema.Types.ObjectId, ref: 'Competence', required:true},
    yearsOfExperience: {type: Double, required:true}
});

module.exports= mongoose.model('CompetenceProfile', competenceProfile);

