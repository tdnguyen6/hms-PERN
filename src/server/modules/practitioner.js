const db = require('../db');

exports.queryAllPractitioners = async function(req, res) {
	try {
		let result = await db.query("select * from practitioners")
		res.status(200).json(result.rows)
	} catch (err) {
		console.log(err)
		res.status(500).json({status: false})
	}
}

