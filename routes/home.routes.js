// import express and route
const router = require('express').Router();

//import controllers
const homeController = require('../controllers/homeController')

// calling all the contollers in the route
router.get('/', homeController.home);

router.get('/complaint', homeController.complaint);

router.get('/about', homeController.about)

router.post(
	"/complaint-res",
	homeController.postComplaint,
);












module.exports = router;