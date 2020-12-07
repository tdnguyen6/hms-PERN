const db = require('../db');

exports.createPatient = async function (req, res) {
	try {
		const insertStatement = `insert into patients (ssn, dob) values (${req.body.ssn}, '${req.body.dob}') returning id`
		const result = await db.query(insertStatement)
		res.status(200).json(result.rows)
	} catch (err) {
		console.log(err)
		res.status(500).json({status: false})
	}
}