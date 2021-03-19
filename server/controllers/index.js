let Survey = require('../models/survey');

// render index(survey list) page
module.exports.displayHomePage = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if (err) { return console.error(err); }
        res.render('index', { title: 'Survey', surveyList: surveyList });
    });
};

// render agree/disagree page
module.exports.displayAgreeDisagreePage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.send(survey)
        }
    })
};

// render multiple choice page
module.exports.displayMultipleChoicePage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.send(survey);
        }
    })
};

// render text answer page
module.exports.displayTextAnswerPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.send(survey);
        }
    })
};