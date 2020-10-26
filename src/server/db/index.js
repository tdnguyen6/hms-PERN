
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const { Pool, Client } = require('pg')
const pool = new Pool({
	user: 'ckbdoamkelurck',
	host: 'ec2-54-157-4-216.compute-1.amazonaws.com',
	database: 'deqcemi6em18vn',
	password: 'ac1a5efd48319b30480b625170bb5ca5504e7e92cbd44b9429ac7df90fb0be7a',
	port: 5432,
	ssl: true
})

module.exports = {
	query: (text, params) => pool.query(text, params),
}