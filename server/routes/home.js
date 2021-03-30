let express = require('express');
let router = express.Router();
let Survey = require('../models/survey');
let homeController = require('../controllers/home');

// GET Route survey page
router.get('/', homeController.displayHomePage);

// // GET Route agree disagree page
// router.get('/AgreeDisagree/:id', homeController.displayAgreeDisagreePage);

// // GET Route multiple choice page
// router.get('/MultipleChoice/:id', homeController.displayMultipleChoicePage);

// // GET Route text answer page
// router.get('/TextAnswer/:id', homeController.displayTextAnswerPage);

// Get route create page//
router.get('/create', homeController.displayCreatePage);

// process create request
router.post('/create', homeController.processCreateRequest)

// display edit page
router.get('/edit/:id', homeController.displayEditPage);

// process edit request
router.post('/edit/:id', homeController.processEditRequest)

//delete survey
router.get('/delete/:id', homeController.deleteSurvey);

/* Get Login page*/
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
  });


module.exports = router;
