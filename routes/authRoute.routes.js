// create router
const router =
	require("express").Router();
// import authcontroller
const authController = require("../controllers/authController");
//=============================login Route===============================
//get route
router.get(
	"/login",
	authController.getlogin
);

//post route
router.post(
	"/login",
	authController.postlogin
);

module.exports = router;

//==========================signup route============================
//get routes
router.get('/signup', authController.getSignup);

//post routes
router.post('/signup', authController.postSignup);

//==============================Log out route ===========================
//get router
router.get(
	"/logout",
	authController.logout
);
