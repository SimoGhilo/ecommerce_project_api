

const express = require('express');
const customerRouter = express.Router();
const controller = require('./controller');

// get all customers - Test
customerRouter.get('/',
    controller.getCustomers)

// create a new customer
customerRouter.post('/', controller.createCustomer);

/// get a customer by id 
customerRouter.get('/:id', controller.getCustomerById);

// delete a customer by id
customerRouter.delete('/:id', controller.deleteCustomerById);

// update a  customer by id
customerRouter.put('/:id', controller.updateCustomerById);


module.exports = customerRouter;