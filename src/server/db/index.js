
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const { Pool, Client } = require('pg')
const pool = new Pool({
	user: 'xlsdzjfqchkfwl',
	host: 'ec2-34-202-88-122.compute-1.amazonaws.com',
	database: 'd3bk8eqdhtlqr4',
	password: '5cfc3aba9bb6887f7e5bfd167aec789549507b081dae7220295a8737fa6ae8e8',
	port: 5432,
	ssl: true
})

module.exports = {
	query: (text, params) => pool.query(text, params),
}