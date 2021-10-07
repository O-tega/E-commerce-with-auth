const router = require('express').Router();

const { restrictRolesTo } = require('../controllers/authController');
 //import product list controller
const productsController = require('../controllers/productsController');
const { isAuthenticated, isAdmin } = require('../config/auth');
const { roles } = require('../controllers/adminAuth')

// Get route
router.get('/', productsController.getAllProducts);

// get single product
router.get('/:id', productsController.singleProduct);


router.use(restrictRolesTo('admin'))
router.get('/create', productsController.createProduct);

// Edit route
router.get('/edit/:id', productsController.editProduct )
router.patch('/edit', productsController.patchProduct)


// Delete route


//post route
router.post('/create', productsController.postCreate);


module.exports = router; 