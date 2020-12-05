const db = require('../db');

exports.listPractitioners = async function(req, res) {
	// comment this out in production
//	if (res.session.position !== 'Admin') res.status(401).json({listPatientsSuccessfully: false})
	const queryStatement = 'select p.id, a.name as name, a.avatar, a.email, a.phone, a.gender, d.name as specialty from practitioners p, accounts a, departments d where a.practitioner_id = p.id and p.specialty = d.id'
	try {
		let result = await db.query(queryStatement)
		res.status(200).json(result.rows)
	} catch (err) {
		console.log(err)
		res.status(500).json({status: false})
	}
}

exports.listPatients = async function(req, res) {
	try {
		let result = await db.query("select * from practitioners")
		res.status(200).json(result.rows)
	} catch (err) {
		console.log(err)
		res.status(500).json({listPatientsSuccessfully: false})
	}
}

exports.listAllAppointments = async function(req, res) {
	const queryStatement = "select t1.appointment_id, t1.practitioner_id, t1.practioner_name, t1.avatar as practitioner_avatar, t1.gender as practitioner_gender, t1.email as practitioner_email, t1.phone as practitioner_phone, t1.specialty as practitioner_specialty, t2.patient_id, t2.patient_name as patient_name, t2.avatar as patient_avatar, t2.gender as patient_gender, t2.email as patient_email, t2.phone as patient_phone, t2.ssn as patient_ssn, t2.date_of_birth as patient_date_of_birth from ( select ap.id as appointment_id, ac.practitioner_id, ac.name as practioner_name, ac.avatar, ac.gender, ac.email, ac.phone, d.name as specialty from appointments ap, practitioners p, accounts ac, departments d where ap.practitioner_id = p.id and p.id = ac.practitioner_id and d.id = p.specialty) as t1 inner join ( select ap.id as appointment_id, ac.patient_id, ac.name as patient_name, ac.avatar, ac.gender, ac.email, ac.phone, p.ssn, p.dob as date_of_birth from appointments ap, patients p, accounts ac where ap.patient_id = p.id and p.id = ac.patient_id) as t2 on t1.appointment_id = t2.appointment_id"
	
//	if (req.session.role !== "admin") {
//		res.status(400).json({status: false})
//	}	
	console.log(queryStatement)
	
	try {
		const result = await db.query(queryStatement)
		res.status(200).json(result.rows)
	} catch (err) {
		console.log(err)
		res.status(500).json({status: false})
	}
} 

exports.createPatient = async function(req, res) {
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


