

const express = require('express');
const customerRouter = express.Router();
const controller = require('../controller');



/*const customers = [
    {
        name: 'John',
        id: 1,
        age: 30
    },
    {
        name: 'Mark',
        id: 2,
        age: 10
    },
    {
        name: 'Andrew',
        id: 3,
        age: 60
    }
] */

// get all customers - Test
customerRouter.get('/',
    controller.getCustomers)

/// get a customer by id 
customerRouter.get('/:id', controller.getStudentById);

// update a  customer   / Not working properly
// look up the customer, if not found return 404, else update the customer and return the updated customer
/*customerRouter.put('/:id', (req, res) => {

    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) {
        res.status(404).res.send(`The customer with id ${req.params.id} was not found`);
    } else {

        customer.name = req.body.name;
        customer.age = req.body.age;
        res.send(customer);
    }

}) */

module.exports = customerRouter;