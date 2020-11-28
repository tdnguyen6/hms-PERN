const db = require('../db');

exports.queryAllSymptoms = async function(req, res) {
	try {
		let result = await db.query("select * from symptoms")
		res.status(200).json(result.rows)
	} catch (err) {
		console.log(err)
		res.status(500).json({listAllSymptomsSuccessfully: false})
	}
} 
