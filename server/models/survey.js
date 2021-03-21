let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    type: String,
    question: String,
    option1: String,
    option2: String,
    option3: String
}, {
    collection: "surveys"
});

module.exports = mongoose.model('survey', surveyModel);