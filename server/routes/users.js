var express = require('express');
var router = express.Router();
let usersController = require('../controllers/users');
let { checkAuthentication } = require("../config/authentication");

/* GET users listing. */
router.get('/login', usersController.displayLoginPage);

router.post('/login', usersController.processLoginPage);

router.get('/register', usersController.displayRegisterPage);

router.post('/register', usersController.processRegisterPage);

router.get('/logout', usersController.performLogout);

module.exports = router;
