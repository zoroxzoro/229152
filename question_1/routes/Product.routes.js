const express = require('express');
const { getProducts, getProductById } = require('../controller/Products.controller');

const router = express.Router();

router.get('/categories/:categoryname/products', getProducts);
router.get('/categories/:categoryname/products/:productid', getProductById);

module.exports = router;
