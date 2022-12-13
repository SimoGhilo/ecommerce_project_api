const pool = require('../../database');

const getCarts = async (req, res) => {
    try {
        await pool.query('SELECT * FROM cart INNER JOIN products ON cart.product_id = products.id; ', (err, result) => {
            res.status(200).json(result.rows);
        });
    } catch (err) {
        console.log(err.message);
    }


}

const getCartById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await pool.query(`select * from cart where cart_id=${id.toString()}`, (err, result) => {
            res.status(200).json(result.rows)
        });
    } catch (err) {
        console.log(err.message);
    }



}

const createCart = (req, res) => {
    const { id } = req.body
    const { product_id } = req.body
    const { quantity } = req.body
    const { customer_id } = req.body
    try {
        pool.query(`insert into cart (cart_id,product_id,quantity,customer_id) values (${id},${product_id},${quantity},${customer_id})`, (err, result) => {
            res.status(200).json(result.rows)
        });
    } catch (err) {
        console.log(err.message);
    }

};

//// Difference between async and normal function?

const deleteCartById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(`select * from cart where cart_id=${id.toString()}`, (err, result) => {
        const notFound = !result.rows.length;
        if (notFound) {
            res.send('cart does not exist in the database');
        }

        pool.query(`delete from cart where cart_id=${id.toString()}`, (err, result) => {
            if (err) throw err;
            res.status(200).send('cart removed successfully');
        });
    })
}

const updateCartById = (req, res) => {
    const id = parseInt(req.params.id);
    const { product_id } = req.body;
    const { quantity } = req.body;

    pool.query(`select * from cart where cart_id=${id.toString()}`, (err, result) => {
        const notFound = !result.rows.length;
        if (notFound) {
            res.send('cart does not exist in the database');
        }


        const updateQueryString = `update cart set product_id='${product_id}', quantity='${quantity}' where cart_id='${id}';`;
        pool.query(updateQueryString,
            (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                res.status(200).send('cart updated successfully');
            });
    })
}


module.exports = {
    getCarts, getCartById, deleteCartById, updateCartById, createCart
}