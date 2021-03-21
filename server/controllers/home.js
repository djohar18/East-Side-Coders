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

// display create page
module.exports.displayCreatePage = (req, res, next) => {
    res.render('create', { title: "Create Survey" });
}

// process create request
module.exports.processCreateRequest = (req, res, next) => {
    let newSurvey = Survey({
        "type": req.body.type,
        "question": req.body.question,
        "option1": req.body.option1,
        "option2": req.body.option2,
        "option3": req.body.option3
    });

    if(req.body.active)
    {
        newSurvey["active"] = true;
    }
    else
    {{
        newSurvey["active"] = false;
    }}

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

    if(req.body.active)
    {
        editSurvey["active"] = true;
    }
    else
    {
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
