const express = require('express');

const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('./passport');

initializePassport(passport);

const app = express();
const PORT = process.env.PORT || 3000;


// new session

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// initialize passport

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// cors middleware
const cors = require('cors');
app.use(cors());

// Routes
const customerRouter = require('./routes/customer/customer');
app.use('/customers', customerRouter)

const productRouter = require('./routes/product/product');
app.use('/products', productRouter)

const cartRouter = require('./routes/cart/cart');
app.use('/carts', cartRouter);

const orderRouter = require('./routes/order/order');
const pool = require('./database');
app.use('/orders', orderRouter);

// Order details routes ? constraints ? for Harry


// Redirect user to pages 

app.get('/', notAuthenticated, (req, res) => {
    res.render('index.ejs', { customer_name: req.customer_name });
});

app.get('/login', authenticator, (req, res) => {
    res.render('login.ejs');
});

app.get('/register', authenticator, (req, res) => {
    res.render('register.ejs');
});

/// checkout
app.get('/carts/:id/checkout', (req, res) => {
    res.render('checkout.ejs');
})


// register and login a customer

app.post('/register', async (req, res) => {

    let { customer_name, email, address, password } = req.body;



    let errors = [];

    if (!customer_name || !email || !password) {

        errors.push({ message: 'Please enter all required fields' })
    }

    if (password.length < 6) {

        errors.push({ message: 'Password should be at least 6 characters' })
    }

    if (errors.length > 0) {

        res.render('register.ejs', { errors })

    } else {

        const hashedPassword = await bcrypt.hash(password, 10);

        pool.query(`select * from customers where email='${email}'`, (err, result) => {
            if (err) throw err
            console.log(result.rows)

            if (result.rows.length > 0) {
                errors.push({ message: "email already in use" })
                res.render('register.ejs', { errors })

            } else {
                pool.query(`insert into customers (customer_name,address,email,customer_password) 
                values ('${customer_name}','${address}','${email}','${hashedPassword}')`, (err, result) => {
                    if (err) throw err
                    console.log(result.rows)
                    res.redirect('/login');
                });
            }
        });

    }

});

// Handling checkout 

app.post('/carts/:id/checkout', (req, res) => {

    let { id } = req.params;
    let { customer_id, product_id, quantity } = req.body;
    let amount;

    if (product_id === 1) {
        amount = 26 * quantity;
    }

    if (product_id === 2) {
        amount = 10 * quantity;
    }

    if (product_id === 3) {
        amount = 77 * quantity;
    }


    // console.log(product_id, quantity);

    pool.query(`select * from cart where cart_id=${id.toString()}`, (err, result) => {
        if (err) throw err
        let cart = result.rows;
        console.log(cart)

        // if ther is a cart
        if (cart.length > 0) {

            pool.query(`insert into orders(customer_id,amount,order_status,cart_id,product_id) values('${customer_id}','${amount}','fulfilled','${id.toString()}','${product_id}')`, (err, result) => {
                if (err) throw err

                res.status(200).send(result.rows);

                // if cart is checked out

                if (result.rows) {
                    pool.query(`delete from cart where cart_id=${id.toString()}`, (err, result) => {
                        if (err) throw err
                        res.status(200).send(result.rows);
                    });
                }
            })
            // if cart not found
        } else {

            res.status(400).send('Cart not found')

        }



    })
});


app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}));


/// Making sure that user is authenticated, if so, redirect to dashboard otherwise redirect to login

function authenticator(req, res, next) {

    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

function notAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}






app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running and App is listening on port" + PORT)
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
});

module.exports = app;

