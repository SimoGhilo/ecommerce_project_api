const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const { initialize } = require('./passport');

const initializePassport = (passport, email) => {

}

app.use(express.json());

// Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// cors middleware
const cors = require('cors');
app.use(cors());

//const apiRouter = require('./routes/api');
//app.use('/api', apiRouter)

const customerRouter = require('./routes/customer');
app.use('/customers', customerRouter)


app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running and App is listening on port" + PORT)
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
});

module.exports = app;

