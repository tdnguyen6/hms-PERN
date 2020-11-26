const db = require('../db');

exports.listPatients = async function(req, res) {
	// comment this out in production
//	if (res.session.position !== 'Admin') res.status(401).json({listPatientsSuccessfully: false})
	try {
		let result = await db.query("select * from patients")
		res.status(200).json(result.rows)
	} catch (err) {
		console.log(err)
		res.status(500).json({listPatientsSuccessfully: false})
	}
}

exports.listPractitioners = async function(req, res) {
	try {
		let result = await db.query("select * from practitioners")
		res.status(200).json(result.rows)
	} catch (err) {
		console.log(err)
		res.status(500).json({listPatientsSuccessfully: false})
	}
}

