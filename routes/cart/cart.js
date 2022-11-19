const express = require('express');
const cartRouter = express.Router();
const controller = require('./controller');

// get all carts - Test
cartRouter.get('/',
    controller.getCarts)

/// create a cart
cartRouter.post('/', controller.createCart);

/// get a cart by id 
cartRouter.get('/:id', controller.getCartById);

// delete a cart by id
cartRouter.delete('/:id', controller.deleteCartById);

// update a  cart by id
cartRouter.put('/:id', controller.updateCartById);

module.exports = cartRouter;