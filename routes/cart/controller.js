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
    const { cart_id } = req.body
    const { product_id } = req.body
    const { quantity } = req.body
    const { customer_id } = req.body  /// Error here


    //console.log(quantity, 'quantity');
    //console.log(cart_id, customer_id, 'cart_id', 'customer_id')
    // console.log(product_id, 'product_id')
    try {
        pool.query(`insert into cart (cart_id,product_id,quantity,customer_id) values (${cart_id},${product_id},${quantity},${customer_id})`, (err, result) => {
            res.status(200).json(result.rows)
        });
    } catch (err) {
        console.log(err.message);
    }

};



const deleteCartById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(`select * from cart where cart_id=${id.toString()}`, (err, result) => {
        const notFound = !result.rows.length;
        if (notFound) {
            console.log("Hello")
            res.send({ message: 'Cart not found' });
        }

        pool.query(`delete from cart where cart_id=${id.toString()}`, (err, result) => {
            if (err) throw err;
            console.log("Hello 2")
            res.status(200).send(result);
        });
    })
}

const updateCartById = (req, res) => {
    const id = parseInt(req.params.id);
    const { product_id } = req.body;
    const { quantity } = req.body;

    pool.query(`select * from cart where cart_id=${id.toString()}`, (err, result) => {
        const notFound = !result.rows.length;
        // if (notFound) {
        //     // res.send('cart does not exist in the database');
        // }
        const updateQueryString = `update cart set product_id='${product_id}', quantity='${quantity}' where cart_id='${id}';`;
        pool.query(updateQueryString,
            (err, result) => {

                if (err) {
                    console.log(err);
                    throw err;
                }
                console.log(result);
                res.status(200).send({ message: 'cart updated successfully' });
            });



    })

}


module.exports = {
    getCarts, getCartById, deleteCartById, updateCartById, createCart
}