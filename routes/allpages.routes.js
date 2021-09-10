// create router
const router = require('express').Router()
// import controller
const pageController = require('../controllers/userPageController');
// import ensureauthenticated to handle login
const enureAuthenticated = require('../config/auth');
const { ensureAuthenticated } = require('../config/auth');

// get routes
router.get('/dashboard', ensureAuthenticated,  pageController.getDashboard);



module.exports = router
