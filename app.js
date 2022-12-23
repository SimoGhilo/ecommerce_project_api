const express = require('express');

/// Swagger imports
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUI = require('swagger-ui-express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('./passport');

initializePassport(passport);

const app = express();
const PORT = process.env.PORT || 5000;

/// Swagger section

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'project ecommerce API Documentation',
        version: '1.0.0',
        description: 'ecommerce RESTful API with Swagger',
    },
    host: 'localhost:5000',
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

const swaggerDocument = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, './swagger.yaml')), 'utf-8');


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

/// CHANGE ME IN CASE 
//app.set('view engine', 'html');

// new session

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,

    }
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

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(cookieParser('secret'))

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



// Redirect user to pages 

app.get('/', notAuthenticated, (req, res) => {
    res.render('./views/view/public/index' /* index.ejs, { customer_name: req.customer_name }*/);
});

app.get('/login', authenticator, (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, customer: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
    // res.render('login.ejs');
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
        console.log('hashed password in server', hashedPassword)

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
    let { customer_id, product_id, quantity, price } = req.body;

    console.log(product_id, customer_id, 'quantity', quantity, id, 'price', price)


    pool.query(`select * from cart where cart_id=${id}`, (err, result) => {
        if (err) throw err
        let cart = result.rows;
        console.log(cart)

        // if ther is a cart
        if (cart.length > 0) {

            pool.query(`insert into orders(customer_id,amount,order_status,cart_id,product_id) values(${customer_id},${price},'fulfilled',${id.toString()},${product_id})`, (err, result) => {
                if (err) throw err

                res.status(200).send(result.rows);

                // if cart is checked out

                if (result.rows) {
                    pool.query(`insert into order_details(product_id,quantity,cart_id) values(${product_id},${quantity},${id})`, (err, result) => {
                        if (err) throw err
                    });
                    pool.query(`delete from cart where cart_id=${id}`, (err, result) => {
                        if (err) throw err
                        // res.status(200).send(result.rows);
                    });
                }
            })
            // if cart not found
        } else {

            res.status(400).send('Cart not found')

        }



    })
});

// Login in login.js

app.post('/login', passport.authenticate('local', {

}), (req, res) => {
    // console.log(req.session);
    if (req.session.passport.user) {
        res.send({ loggedIn: true, customer: req.session.passport.user });
    } else {
        res.send({ loggedIn: false });
    }

    // console.log(req.session, 'testing session');
    // res.send({ message: 'Logged in successfully' });


});

// Maintain the session in App.js

///ERROR HERE
/*
app.get('/isLoggedIn', (req, res) => {

    if (req.session) {
        res.send({ loggedIn: true });
    } else {
        res.send({ loggedIn: false });
    }

});*/

app.get('/isLoggedIn', (req, res) => {

    if (req.session?.passport?.user) {

        res.send({ loggedIn: true, user: req.session.passport.user });

    } else {

        res.send({ loggedIn: false });

    }

});

// Logout

app.post('/logout', (req, res, next) => {

    req.logout();
    if (error) { return next(error); }
    res.redirect('/login')

});


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






/*

Path: is there a way to hide all the json information displayed only to a certain user ? 

Logout ejs page : #a ref does not log out the user. I believe authenticator function needs to be tweaked ?

*/
