const db = require('../db');
const {do_hash} = require('./helper');

exports.createPractitioner = async function (req, res) {
	if (!Number.isInteger(req.body.specialtyID)) {
					return res.status(400).json({status: false})
	}
	const insertStatement = 'insert into practitioners (specialty) values $1 returning id'
	const arr = [req.body.specialtyID]
	try {
					const result = await db.query(insertStatement, arr)
					return res.status(200).json(result.rows)
	} catch (err) {
					console.log(err)
					return res.status(500).json({status: false})
	}
}

exports.createPractitionerAccount = async function (req, res) {
	const createStatement = `insert into accounts(email, password, phone, name, practitioner_id, gender) values ($1,$2,$3,$4,$5,$6)`
	const arr = [req.body.email, do_hash(req.body.password), req.body.phone, req.body.name, req.body.id, req.body.gender]
	try {
					const result = await db.query(createStatement, arr)
					return res.status(200).json(result.rows)
	} catch (err) {
					console.log(err)
					return res.status(500).json({status: false})
	}
}

exports.listAllPractitioners = async function (req, res) {
	const queryStatement = `select p.id, 
																																a.name as name, 
																																a.avatar, 
																																a.email, 
																																a.phone, 
																																a.gender, 
																																d.name as specialty 
																									from 		practitioners p, 
																																accounts a, 
																																departments d 
																									where 	a.practitioner_id = p.id and 
																																p.specialty = d.id and 
																																a.active = true`
	try {
					const result = await db.query(queryStatement)
					return res.status(200).json(result.rows)
	} catch (err) {
					console.log(err)
					return res.status(500).json({status: false})
	}
}

exports.getPractitionerByID = async function (req, res) {
	if (!Number.isInteger(req.body.practitionerID)) {
					return res.status(400).json({status: false})
	}
	const queryStatement = `select p.id, 
																																a.name as name, 
																																a.avatar, 
																																a.email, 
																																a.phone, 
																																a.gender, 
																																d.name as specialty 
																									from 		practitioners p, 
																																accounts a, 
																																departments d 
																									where 	a.practitioner_id = p.id and 
																																p.specialty = d.id and 
																																a.active = true and
																																p.id = $1`
	const arr = [req.body.practitionerID]
	try {
					const result = await db.query(queryStatement, arr)
					return res.status(200).json(result.rows)
	} catch (err) {
					console.log(err)
					return res.status(500).json({status: false})
	}
}

exports.findPractitionerByDisease = async function (req, res) {
	// check if req.body.diseaseID is a number
	if (!Number.isInteger(req.body.diseaseID)) return res.status(400).json({status: false})
	
	try {
					let queryStatement
					if (req.body.diseaseID === 0) {
									queryStatement = `select distinct 
																																		di.id, 
																																		p.id, 
																																		de.name speciality, 
																																		a.name, 
																																		a.gender 
																																		from practitioners p, 
																																		accounts a, 
																																		departments de, 
																																		medicalservices m, 
																																		diseases di 
                            where di.suggested_checkup = m.id and 
                                  m.department_id = de.id and 
                                  de.id = p.specialty and 
                                  a.practitioner_id = p.id and
                                  a.active = true and  
                                  m.name = 'general checkup'`
					} else {
         queryStatement = `select distinct 
                                  di.id, 
                                  p.id, 
                                  de.name speciality, 
                                  a.name, 
                                  a.gender 
                           from practitioners p, 
                                accounts a, 
                                departments de, 
                                medicalservices m, 
                                diseases di 
                           where di.suggested_checkup = m.id and 
                                 m.department_id = de.id and 
                                 de.id = p.specialty and 
                                 a.practitioner_id = p.id and
                                 a.active = true and  
                                 di.id = ` + req.body.diseaseID
					}

					// console.log(queryStatement)
					const result = await db.query(queryStatement)
					res.status(200).json(result.rows)
	} catch (err) {
					console.log(err)
					res.status(500).json(null)
	}
}

exports.updatePractitioner = async function (req, res) {
	if (!Number.isInteger(req.body.newSpecialty) && 
					!Number.isInteger(req.body.practitionerID) && 
					!Number.isInteger(req.body.accountID)) {
					return res.status(400).json({status: false})
	}
	

	const updateTransaction = `begin; 
																												
																												UPDATE practitioners 
																												SET specialty = $1, 
																																join_date = $2 
																												WHERE id = $3; 
																												
																												UPDATE accounts 
																												SET name = $4, 
																																phone = $5, 
																																gender = $6 
																												WHERE id = $7; 

																												commit;`
	
	const arr = [req.body.newSpecialty, req.body.joinDate, req.body.practitionerID, req.body.newName, req.body.phone, req.body.gender, req.body.accountID]
	try {
					await db.query(updateTransaction, arr)
					return res.status(200).json({status: true})
	} catch (err) {
					console.log(err)
					return res.status(500).json({status: false})
	}
}

exports.deletePractitionerAccount = async function (req, res) {
	if (!Number.isInteger(req.body.practitionerID)) {
					return res.status(400).json({status: false})
	}
	
	const deleteStatement = `UPDATE accounts
																										SET active = false 
																										WHERE practitioner_id = $1` 
	const arr = [req.body.practitionerID]
	try {
					await db.query(deleteStatement, arr)
					return res.status(200).json({status: true})
	} catch (err) {
					console.log(err)
					return res.status(500).json({status: false})
	}
}



