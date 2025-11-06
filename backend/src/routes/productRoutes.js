// Product routes

const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.get('/products', getAllProducts);
router.get('/products/featured', getFeaturedProducts);
router.get('/products/:id', getProductById);
router.get('/products/slug/:slug', getProductBySlug);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;

