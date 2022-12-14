const pool = require('../../database');

const getCustomers = async (req, res) => {
    try {
        await pool.query('select * from customers', (err, result) => {
            res.status(200).json(result.rows);
        });
    } catch (err) {
        console.log(err.message);
    }


}

const createCustomer = (req, res) => {

    const { customer_name } = req.body
    const { address } = req.body
    const { email } = req.body
    const { customer_password } = req.body

    try {
        let query = `insert into customers (customer_name,address,email,customer_password)  values ('${customer_name}','${address}','${email}','${customer_password}')`;
        //  console.log('Look at the query', query);
        pool.query(query, (err, result) => {
            if (err) {
                console.error(err.message);
                res.status(500).send(err.message);
            } else {
                res.status(200).json(result.rows)
            }

        });
    } catch (err) {
        console.log(err.message);
    }

};

const getCustomerById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await pool.query(`select * from customers where customer_id=${id.toString()}`, (err, result) => {
            res.status(200).json(result.rows)
        });
    } catch (err) {
        console.log(err.message);
    }



}

//// Difference between async and normal function?

const deleteCustomerById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(`select * from customers where customer_id=${id.toString()}`, (err, result) => {
        const notFound = !result.rows.length;
        if (notFound) {
            res.send('Customer does not exist in the database');
        }

        pool.query(`delete from customers where customer_id=${id.toString()}`, (err, result) => {
            if (err) throw err;
            res.status(200).send('customer removed successfully');
        });
    })
}

const updateCustomerById = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const { address } = req.body;
    const { email } = req.body;
    const { password } = req.body;

    pool.query(`select * from customers where customer_id=${id.toString()}`, (err, result) => {
        const notFound = !result.rows.length;
        if (notFound) {
            res.send('Customer does not exist in the database');
        }


        const updateQueryString = `update customers set customer_name='${name}', address='${address}',email='${email}',customer_password='${password}' where id='${id}';`;
        console.log(updateQueryString);
        pool.query(updateQueryString,
            (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                res.status(200).send('customer updated successfully');
            });
    })
}


module.exports = {
    getCustomers, getCustomerById, deleteCustomerById, updateCustomerById, createCustomer
}