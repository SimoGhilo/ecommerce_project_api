const pool = require('../../database');

const getOrders = async (req, res) => {
    try {
        await pool.query('select * from orders', (err, result) => {
            res.status(200).json(result.rows);
        });
    } catch (err) {
        console.log(err.message);
    }


}

const getOrderById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await pool.query(`select * from orders where id=${id.toString()}`, (err, result) => {
            res.status(200).json(result.rows)
        });
    } catch (err) {
        console.log(err.message);
    }



}

const createOrder = (req, res) => {
    const { id } = req.body
    const { customer_id } = req.body
    const { amount } = req.body
    const { order_status } = req.body
    try {
        pool.query(`insert into orders (id,customer_id,amount,order_status) values (${id},${customer_id},${amount},'${order_status}')`, (err, result) => {
            res.status(200).json(result.rows)
        });
    } catch (err) {
        console.log(err.message);
    }

};

module.exports = {
    getOrders, getOrderById, createOrder
}