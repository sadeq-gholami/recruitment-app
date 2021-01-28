const mongoose = require('mongoose');
const availability = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    personID: { type: Schema.Types.ObjectId, ref: 'User', required:true},
    fromDate: {type: Date, required:true},
    toDate: {type: Date, required:true}
});

module.exports= mongoose.model('Availability', availability);
