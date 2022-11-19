const express = require('express');
const orderRouter = express.Router();
const controller = require('./controller');

// get all orders - Test
orderRouter.get('/',
    controller.getOrders)

/// create an order
orderRouter.post('/', controller.createOrder);

/// get an order by id 
orderRouter.get('/:id', controller.getOrderById);


module.exports = orderRouter;