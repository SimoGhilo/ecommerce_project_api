const pool = require('../../database');

const getProducts = async (req, res) => {
    try {
        await pool.query('select * from products', (err, result) => {
            res.status(200).json(result.rows);
        });
    } catch (err) {
        console.log(err.message);
    }


}

const getProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await pool.query(`select * from products where id=${id.toString()}`, (err, result) => {
            res.status(200).json(result.rows)
        });
    } catch (err) {
        console.log(err.message);
    }



}



module.exports = {
    getProducts, getProductById
}