
const { Pool } = require('pg');
const PORT = 5432;

const pool = new Pool({
    host: 'localhost',
    port: PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'ecommerce'
})





module.exports = pool;