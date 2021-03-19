let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    type: String,
    activated: Boolean,
    question: String,
    options: [mongoose.Schema.Types.Mixed],
}, {
    collection: "surveys"
});

module.exports = mongoose.model('survey', surveyModel);