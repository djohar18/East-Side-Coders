let express = require('express');
let router = express.Router();
let Survey = require('../models/survey');
let indexController = require('../controllers/index');

// GET Route survey page
router.get('/', indexController.displayHomePage);

// GET Route agree disagree page
router.get('/AgreeDisagree/:id', indexController.displayAgreeDisagreePage);

// GET Route multiple choice page
router.get('/MultipleChoice/:id', indexController.displayMultipleChoicePage);

// GET Route text answer page
router.get('/TextAnswer/:id', indexController.displayTextAnswerPage);

// Get route edit page//
router.get('/create', function(req, res, net){
    res.render('create', {title: 'Create'})
})
//edit page
router.get('/edit', function(req, res, net){
    res.render('edit', {title: 'Edit'})
})

module.exports = router;
