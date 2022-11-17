const pool = require('./database');

const getCustomers = (req, res) => {
    pool.query('select * from customers', (err, result) => {
        if (err) throw err;
        res.status(200).json(result.rows);
    });

}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(`select * from students where id=${(id).toString()}`, (err, result) => {
        if (err) throw err;
        res.status(200).json(result.rows);
    })
}



module.exports = {
    getCustomers, getStudentById
}