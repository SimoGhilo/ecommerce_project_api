const pool = require('./database');

const getCustomers = (req, res) => {
    pool.query('select * from customers', (err, result) => {
        if (err) throw err;
        res.status(200).json(result.rows);
    });

}

const getCustomerById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(`select * from customers where id=${id.toString()}`, (err, result) => {
        if (err) throw err;
        res.status(200).json(result.rows);
    })
}


const deleteCustomerById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(`select * from customers where id=${id.toString()}`, (err, result) => {
        const notFound = !result.rows.length;
        if (notFound) {
            res.send('Customer does not exist in the database');
        }

        pool.query(`delete from customers where id=${id.toString()}`, (err, result) => {
            if (err) throw err;
            res.status(200).send('Student removed successfully');
        });
    })
}

const updateCustomerById = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const { address } = req.body;
    const { email } = req.body;

    pool.query(`select * from customers where id=${id.toString()}`, (err, result) => {
        const notFound = !result.rows.length;
        if (notFound) {
            res.send('Customer does not exist in the database');
        }



        pool.query(`update customers set name=${name}, address=${address},email=${email} where id=${id}}`,
            (err, result) => {
                if (err) throw err;
                res.status(200).send('Student updated successfully');
            });
    })
}


module.exports = {
    getCustomers, getCustomerById, deleteCustomerById, updateCustomerById
}