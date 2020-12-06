process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const {Pool, Client} = require('pg')
const pool = new Pool({
    user: 'msrhhqaebvayjp',
    host: 'ec2-3-231-48-230.compute-1.amazonaws.com',
    database: 'd296kmn5021kbs',
    password: 'b54c70e9241962c0ce351862426105261b96d1b20d737cb98e79e53174395f04',
    port: 5432,
    ssl: true
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}