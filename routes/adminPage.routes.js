// import router
const router = require('express').Router();
const adminAuth = require('../controllers/adminAuth')
// const {roles} = require('../controllers/adminAuth')
const {ensureAuthenticated} = require('../config/adAuth')


//get route
router.get('/login', adminAuth.getAdminLogin)

router.get('/adminDashboard', ensureAuthenticated, adminAuth.getAdminDashboard)

router.get('/logout', adminAuth.adminlogout)


//post route
router.post('/login', adminAuth.postAdminLogin)



module.exports = router;