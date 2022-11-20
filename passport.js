const passport = require('passport');
const bcrypt = require('bcrypt');
const localStartegy = require('passport-local').Strategy;



function initialize(passport, getCustomerByEmail) {

    //authenticateCustomer
    async function authenticateCustomer(email, password, done) {

        const customer = getCustomerByEmail(email)  // I will create this function later
        if (customer == null) {
            return done(null, false, { message: 'No customer found wuth that email' });
        }
        try {

            if (await bcrypt.compare(password, customer.password)) {

                return done(null, customer);

            } else {

                return done(null, false, { message: 'password incorrect' });
            }

        } catch (err) {

            done(err);

        }


    }
    //localStartegy
    passport.use(new localStartegy({ usernameField: 'email' }), authenticateCustomer);

    //Serialization and deserialization

    passport.serializeUser((user, done) => { });
    passport.deserializeUser((id, done) => { });
}

module.exports = initialize;











module.exports = initialize;
