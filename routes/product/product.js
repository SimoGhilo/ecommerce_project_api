const express = require('express');
const productRouter = express.Router();
const controller = require('./controller');

// get all products - Test
productRouter.get('/',
    controller.getProducts)

/// get a product by id 
productRouter.get('/:id', controller.getProductById);


module.exports = productRouter;