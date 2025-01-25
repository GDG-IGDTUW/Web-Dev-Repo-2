const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const ProductController =  require("../controllers/productController");

router.post('/add-product', authMiddleware, ProductController.addProduct);
router.get('/get-all-products', ProductController.getAllProducts);
router.get('/get-single-product/:id', ProductController.getSingleProduct);

router.get('/filter', ProductController.filterProducts);

module.exports = router;