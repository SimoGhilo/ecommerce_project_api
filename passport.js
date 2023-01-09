const passport = require('passport');
const bcrypt = require('bcrypt');
const localStartegy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
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

    // Google plus token strategy

    /*  passport.use('googleToken', new GooglePlusTokenStrategy({
          clientID: "265635454782-8tkv7on6vmqrvotjndr1h5qjcl374ir4.apps.googleusercontent.com",
          clientSecret: "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",
          callbackURL: "http://localhost:5000/google/callback"
      }, async (accessToken, refreshToken, profile, done) => {
          // Will have to query the database // 
          customer_email = profile.emails[0].value;
          console.log(accessToken)
          pool.query(`select * from customers where email='${customer_email}'`, (err, result) => {
  
              if (err) { throw err }
  
              // If the customer is in the database
              if (result.rows.length > 0) {
  
                  const customer = result.rows[0];
                  return done(null, customer, accessToken)
              }
              // If the customer is not in the database
              else {
  
                  return done(null, false);
              }
          });
  
  
      })); */

    // Google Oauth strategy

    /*  passport.use(new GoogleStrategy({
          clientID: "261273528668-u49b84sr0r8qjerk414jpk1u0odsveoh.apps.googleusercontent.com",
          clientSecret: "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",
          callbackURL: "http://localhost:5000/auth/google/callback",
          passReqToCallback: true
      }, (request, accessToken, refreshToken, profile, done) => {
          let customer_email = profile.emails[0].value;
          console.log(customer_email);
          pool.query(`select * from customers where email='${customer_email}'`, (err, result) => {
  
              if (err) { throw err }
  
              // If the customer is in the database
              if (result.rows.length > 0) {
  
                  const customer = result.rows[0];
                  return done(null, customer)
              }
              // If the customer is not in the database
              else {
                  const email = profile.emails[0].value;
                  console.log(profile.name)
                  const customer_name = (profile.name.givenName) ? profile.name.givenName : '';
                  const address = '';
                  const customer_password = '';
                  /// Fix the entries in the database and set credentials for fetch request in cart
                  let query = `insert into customers (customer_name,address,email,customer_password)  values ('${customer_name}','${address}','${email}','${customer_password}')`;
                  // console.log(query);
                  pool.query(query, (err, result) => {
                      if (err) {
                          return done(null, false);
                      } else {
                          console.log('In passport, printing the result of the query', result);
                          const customer = result.rows[0];
                          console.log(customer);
                          return done(null, customer)
                      }
  
                  });
  
              }
          });
          //  return done(null, profile)
      })) */

    passport.use(new GoogleStrategy({
        clientID: "261273528668-u49b84sr0r8qjerk414jpk1u0odsveoh.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:5000/auth/google/callback",
        passReqToCallback: true
    }, async (request, accessToken, refreshToken, profile, done) => {
        try {
            const customerEmail = profile.emails[0].value;
            const result = await pool.query(`SELECT * FROM customers WHERE email=$1`, [customerEmail]);

            if (result.rows.length > 0) {
                const customer = result.rows[0];
                return done(null, customer);
            } else {
                const email = profile.emails[0].value;
                const customerName = (profile.name.givenName) ? profile.name.givenName : 'customer_name';
                const address = 'aaaaaaaaaaaaa';
                const customerPassword = 'bbbbbbbbbbbbbbbbbbbb';

                const query = `INSERT INTO customers (customer_name, address, email, customer_password) VALUES ('${customerName}', '${address}', '${email}', '${customerPassword}')`;
                const values = [customerName, address, email, customerPassword];
                console.log('Query here', query);
                const insertResult = await pool.query(query);
                console.log('Look at me', email, customerName, address, customerPassword);
                const customer = insertResult.rows[0];
                console.log('customer inserted', customer)
                return done(null, customer);
            }
        } catch (error) {
            console.error("errpr", error);
            return done(error);
        }
    }));


}

module.exports = initialize;