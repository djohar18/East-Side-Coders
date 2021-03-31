let Survey = require('../models/survey');

// render home(survey list) page
module.exports.displayHomePage = (req, res, next) => {
    Survey.find({ active: true }, (err, surveyList) => {
        if (err) {
            return console.error(err);
        }

        res.render('home', { title: 'Survey', surveyList: surveyList });
    });
};

// render answer page
module.exports.displayAnswerPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('answer', {
                title: 'Answer Survey',
                survey: survey
            });
        }
    })
};

// process answer request
module.exports.processAnswerRequest = (req, res, next) => {
    let id = req.params.id;

    if (req.body.answer) {
        let option = req.body.answer;
        Survey.updateOne(
            { _id: id, 'options.option': option },
            { $inc: { 'options.$.voted': 1 } },
            (err) => {
                if (err) {
                    console.log(err);
                    res.end(err);
                }
                else {
                    res.redirect('/results/' + id);
                }
            });
    } else if (req.body.text) {
        let option = req.body.text;
        Survey.updateOne(
            { _id: id },
            { $push: { options: option } },
            (err) => {
                if (err) {
                    console.log(err);
                    res.end(err);
                }
                else {
                    res.redirect('/results/' + id);
                }
            });
    }
}

// display create page
module.exports.displayCreatePage = (req, res, next) => {
    res.render('create', { title: "Create Survey" });
}

// process create request
module.exports.processCreateRequest = (req, res, next) => {
    let options = [];

    if (req.body.type == "Multiple Choice") {
        let option1 = {
            option: req.body.option1,
            voted: 0
        }
        options.push(option1);

        let option2 = {
            option: req.body.option2,
            voted: 0
        }
        options.push(option2);

        let option3 = {
            option: req.body.option3,
            voted: 0
        }
        options.push(option3);

    } else if (req.body.type == "Agree or Disagree") {
        let agreeOption = {
            option: "Agree",
            voted: 0
        }
        let disagreeOption = {
            option: "Disagree",
            voted: 0
        }
        options.push(agreeOption);
        options.push(disagreeOption);
    }

    let newSurvey = Survey({
        "type": req.body.type,
        "question": req.body.question,
        "options": options
    });

    if (req.body.active) {
        newSurvey["active"] = true;
    }
    else {
        {
            newSurvey["active"] = false;
        }
    }

    Survey.create(newSurvey, (err, Survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/');
        }
    });
}

// process delete request
module.exports.deleteSurvey = (req, res, next) => {
    let id = req.params.id;
    Survey.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/');
        }
    });
}

// display edit page
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('edit', { title: 'Edit', Survey: surveyToEdit });
        }
    });
}

// process edit request
module.exports.processEditRequest = (req, res, next) => {
    let id = req.params.id;

    let editSurvey = Survey({
        "_id": id,
        "type": req.body.type,
        "question": req.body.question,
        "option1": req.body.option1,
        "option2": req.body.option2,
        "option3": req.body.option3
    });

    if (req.body.active) {
        editSurvey["active"] = true;
    }
    else {
        editSurvey["active"] = false;
    }

    Survey.updateOne({ _id: id }, editSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/');
        }
    });
}

// render results page
module.exports.displayResultsPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('results', {
                title: 'Results',
                survey: survey
            });
        }
    })
};