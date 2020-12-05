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

exports.findPractitionerByDisease = async function(req, res) {
	// check if req.body.diseaseID is a number
	if (!Number.isInteger(req.body.diseaseID)) {
		res.status(400).json({status: false})
		return
	}
	
	try {
		let queryStatement = "select distinct di.id, p.id, de.name speciality, a.name, a.gender from practitioners p, accounts a, departments de, medicalservices m, diseases di where di.suggested_checkup = m.id and m.department_id = de.id and de.id = p.specialty and a.practitioner_id = p.id and di.id = " + req.body.diseaseID
		console.log(queryStatement)
		const result = await db.query(queryStatement)
		res.status(200).json(result.rows)
	} catch (err) {
		console.log(err)
		res.status(500).json(null)
	}
}

