const router = require('express').Router();

 //import product list controller
const productsController = require('../controllers/productsController');

// Get route
router.get('/', productsController.getAllProducts);

router.get('/create', productsController.createProduct);

// Edit route
router.get('/edit/:id', productsController.editProduct )
router.patch('/edit', productsController.patchProduct)

// get single product
router.get('/:id', productsController.singleProduct);

// Delete route


//post route
router.post('/create', productsController.postCreate);


module.exports = router; 