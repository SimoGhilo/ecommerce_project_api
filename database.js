const { Pool } = require('pg');
const PORT = 3000;

const pool = new Pool({
    host: 'localhost',
    port: PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'ecommerce'
})





module.exports = pool;