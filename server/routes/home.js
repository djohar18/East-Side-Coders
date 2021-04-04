let express = require('express');
let router = express.Router();
let Survey = require('../models/survey');
let homeController = require('../controllers/home');
let { checkAuthentication } = require("../config/authentication");

// GET Route survey page
router.get('/', homeController.displayHomePage);

// GET Route answer page
router.get('/answer/:id', homeController.displayAnswerPage);

// process answer request
router.post('/answer/:id', homeController.processAnswerRequest);

// GET Route results page
router.get('/results/:id', homeController.displayResultsPage);

// Get route create page//
router.get('/create', checkAuthentication, homeController.displayCreatePage);

// process create request
router.post('/create', checkAuthentication, homeController.processCreateRequest)

// display edit page
router.get('/edit/:id', checkAuthentication, homeController.displayEditPage);

// process edit request
router.post('/edit/:id', checkAuthentication, homeController.processEditRequest)

//delete survey
router.get('/delete/:id', checkAuthentication, homeController.deleteSurvey);

module.exports = router;
