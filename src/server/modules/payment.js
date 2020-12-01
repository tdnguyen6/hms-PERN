const db = require('../db');

exports.generateInvoice = async function(req, res) {
	try {
		let queryStatement = "select m.price from medicalservices m, diseases d where d.suggested_checkup = m.id and d.id = " + req.body.diseaseID
		const result = await db.query(queryStatement)
		res.status(200).json(result.rows)
	} catch (err) {
		console.log(err)
		res.status(500).json({status: false})
	}
}