const express = require('express');
const cartRouter = express.Router();
const controller = require('./controller');

// get all carts
/**
 * @swagger
 * /carts:
 *   get:
 *     tags:
 *       - Carts
 *     description: Returns all carts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of cart objects
 *         schema:
 *           $ref: '#/carts/'
 */

// WHERE SHALL I PUT THE COMMENTS ABOVE FOR SWAGGER ?
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