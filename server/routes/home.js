let express = require('express');
let router = express.Router();
let Survey = require('../models/survey');
let homeController = require('../controllers/home');

// GET Route survey page
router.get('/', homeController.displayHomePage);

// GET Route answer page
router.get('/answer/:id', homeController.displayAnswerPage);

// process answer request
router.post('/answer/:id', homeController.processAnswerRequest);

// GET Route results page
router.get('/results/:id', homeController.displayResultsPage);

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
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

/*Adding Login page  */
router.get("/login", homeController.displayLoginPage);

/*Post for login page  */
router.post("/login", homeController.processLoginPage);

/* Get Login page*/
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

/*Adding Register page  */
router.get("/register", homeController.displayRegisterPage);

/*Post for register page  */
router.post("/register", homeController.processRegisterPage);

/*To perform logout*/

router.get("/logout", homeController.performLogout);

module.exports = router;


module.exports = router;
