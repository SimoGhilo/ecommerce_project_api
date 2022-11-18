/*const passport = require('passport');
const bcrypt = require('bcrypt');
const localStartegy = require('passport-local').Strategy;

function initialize(passport, getCustomerByEmail) {

    /// Log in customer
    async function authenticateCustomer(email, password, done) {
        const customer = getCustomerByEmail(email)
        if (customer == null) {
            return done(null, false, { messagge: 'No customer found with email ' + email })
        }
        try {
            if (await bcrypt.compare(password, customer.password)) {
                return done(null, customer);
            } else {
                return done(null, false, { messagge: 'password does not match' });
            }
        } catch (e) {
            return done(e, false, { messagge: 'error occurred while verifying' });
        }

    }
}


passport.use(new localStartegy({ usernameField: 'customer' }), authenticateCustomer);
passport.serializeUser((user, done) => { });
passport.deserializeUser((id, done) => { })

module.exports = initialize;*/
