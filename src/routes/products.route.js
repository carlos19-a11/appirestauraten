const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const productsController = require('../controllers/products.controller');


router.route('/findProducts/:id').get(asyncHandler(productsController.findByProducts))
// router.route('/createproducts').post(  asyncHandler(productsController.createproducts))
router.route('/allProducts').get(asyncHandler(productsController.allProducts))
// router.route('/deleteproducts/:id').post(asyncHandler(productsController.deleteproducts))

router.route('/agregarCarrito').post(asyncHandler(productsController.addProductoShop))

module.exports = router;