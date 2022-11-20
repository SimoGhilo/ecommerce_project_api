const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;
const { initialize } = require('./passport');


// passport
/* initialize(passport, email); /// To be changed later
app.use(passport.initialize());
app.use(passport.session());
*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// new session

/*app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
*/

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
app.use('/orders', orderRouter);

// Order details routes ? constraints ? for Harry


// Redirect user to pages 

app.get('/', (req, res) => {
    res.render('index.ejs', { customer_name: 'Simone' });
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

// register and login a customer

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        /// How to connect this logic with the create customer function in customer/controller ? harry
    } catch {

    }

    req.body.name = customer_name;
});

app.post('/login', (req, res) => {

});



app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running and App is listening on port" + PORT)
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
});

module.exports = app;

