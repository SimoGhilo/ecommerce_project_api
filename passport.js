const passport = require('passport');
const bcrypt = require('bcrypt');
const localStartegy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('./database');


function initialize(passport) {



    async function authenticateCustomer(email, customer_password, done) {
        //console.log(pool);
        pool.query(`select * from customers where email='${email}'`, (err, result) => {
            if (err) {
                throw err

            }

            // if there is a customer

            if (result.rows.length > 0) {

                const customer = result.rows[0];
                // console.log('password comparison', customer_password, customer.customer_password);
                bcrypt.compare(customer_password, customer.customer_password, (error, isMatch) => {

                    if (error) throw error

                    // console.log('In passport is Match:', isMatch)
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
        // console.log('serialzinging yser', customer_id);
        done(null, customer_id)
    });

    passport.deserializeUser((customer, done) => {
        console.log('deserializing yser', customer);
        let query = `select * from customers where customer_id=${customer.customer_id}`
        console.log(query);
        pool.query(query, (err, result) => {
            if (err) throw err
            return done(null, result.rows[0]);
        })
    })

    /* // Google strategy
 
     passport.use(new GoogleStrategy({
         clientID: "265635454782-9r4qdopabuef86nj5d7bnn2vnqr5u929.apps.googleusercontent.com",
         clientSecret: "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",
         callbackURL: "http://localhost:5000/google/callback"
     },   function(accessToken, refreshToken, profile, done) {
        // Will have to query the database // 
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }));  */

}

module.exports = initialize;