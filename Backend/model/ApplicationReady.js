const mongoose = require('mongoose');
const ready = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    personID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    ready: {type: Boolean, required: true},
    date: {type: Date, required: false}
});

module.exports= mongoose.model('ApplicationReady', ready);