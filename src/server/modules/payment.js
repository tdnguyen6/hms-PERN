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

exports.makePayment = async function(req, res) {
	if (!Number.isInteger(req.body.appointmentID)) {
		return res.status(400).json({status: false})
	}
	
	try {
		const queryStatement = "insert into payment(type, method, appointment_id) values ($1,$2,$3) returning *" 
		const result = await db.query(queryStatement, [req.body.type, req.body.method, req.body.appointmentID])
		res.status(200).json(result.rows)
	} catch (err) {
		console.log(err)
		res.status(500).json({status: false})
	}
}
