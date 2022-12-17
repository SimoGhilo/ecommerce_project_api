const passport = require('passport');
const bcrypt = require('bcrypt');
const localStartegy = require('passport-local').Strategy;
const pool = require('./database');


function initialize(passport) {

    const authenticateCustomer = (email, customer_password, done) => {
        //console.log(pool);
        pool.query(`select * from customers where email='${email}'`, (err, result) => {
            if (err) {
                throw err

            }

            // if there is a customer

            if (result.rows.length > 0) {
                const customer = result.rows[0];
                console.log(customer_password, customer.customer_password);
                bcrypt.compare(customer_password, customer.customer_password, (error, isMatch) => {

                    if (error) throw error
                    console.log(isMatch)
                    if (isMatch) {

                        return done(null, customer)

                    } else {

                        return done(null, false, { message: 'incorrect password' })

                    }
                });

                //if there are no customers   *******

            } else {

                return done(null, false, { message: 'email not registered' });

            }
        })
    };

    passport.use(new localStartegy({
        usernameField: "email",
        passwordField: "customer_password", /// changed from "password"
    }, authenticateCustomer));

    passport.serializeUser((customer_id, done) => {
        done(null, customer_id)
    });

    passport.deserializeUser((customer, done) => {
        let query = `select * from customers where customer_id=${customer.customer_id}`
        console.log(query);
        pool.query(query, (err, result) => {
            if (err) throw err
            return done(null, result.rows[0]);
        })
    })

}

module.exports = initialize;