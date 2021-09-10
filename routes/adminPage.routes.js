// import router
const router = require('express').Router();
const adminAuth = require('../controllers/adminAuth')
// const {roles} = require('../controllers/adminAuth')
const {ensureAuthenticated} = require('../config/adAuth')


//get route
router.get('/login', adminAuth.getAdminLogin)

router.get('/adminDashboard', ensureAuthenticated, /*roles('admin'),*/ adminAuth.getAdminDashboard)

router.get('/logout', adminAuth.adminlogout)


//post route
router.post('/login', /*roles('admin'),*/ adminAuth.postAdminLogin)



module.exports = router;