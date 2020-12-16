const db = require('../db');
const {do_hash} = require('./helper');

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
																																			p.specialty = d.id`
    try {
        const result = await db.query(queryStatement)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

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
    const createStatement = 'insert into accounts(email, password, phone, name, practitioner_id, gender) values ($1,$2,$3,$4,$5,$6)'
    const arr = [req.body.email, do_hash(req.body.password), req.body.phone, req.body.name, req.body.id, req.body.gender]
    try {
        const result = await db.query(createStatement, arr)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
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
        await db.query(updateTransaction)
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

// exports.deletePractitioner = async function (req, res) {
//     if (!Number.isInteger(req.body.practitionerID)) {
//         return res.status(400).json({status: false})
//     }

//     const statement = `update accounts
//                        set active = false
//                        where practitioner_id = $1` 

//     const arr = [req.body.practitionerID]
//     try {
//         await db.query(statement, arr) 
//         return res.status(200).json({status: true})
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({status: false})
//     }
// }

exports.deletePatientAccount = async function (req, res) {
    if (!Number.isInteger(req.body.patientID)) {
        return res.status(400).json({status: false})
    }
    
				const deleteStatement = `UPDATE accounts
                                            SET active = false 
                                            WHERE patient_id = $1`
				const arr = [req.body.patientID]
    try {
        await db.query(deleteStatement, arr)
        return res.status(200).json({status: true})
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

// exports.deletePatient = async function (req, res) {
//     if (!Number.isInteger(req.body.patientID)) {
//         return res.status(400).json({status: false})
//     }
    
// 				const deleteStatement = `delete from patients 
// 																													where id = $1`
// 				const arr = [req.body.patientID]
//     try {
//         await db.query(deleteStatement, arr)
//         return res.status(200).json({status: true})
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({status: false})
//     }
// }

exports.listAllPatients = async function (req, res) {
				const queryStatement = `select p.id, 
                                            a.name as name, 
                                            a.avatar, 
                                            a.email, 
                                            a.phone, 
                                            a.gender, 
                                            p.ssn, 
                                            to_char(p.dob, 'DD/MM/YYYY') as dob 
                                        from patients p, 
                                             accounts a 
                                        where p.id = a.patient_id`
    try {
        const result = await db.query(queryStatement)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.getPatientByID = async function (req, res) {
    if (!Number.isInteger(req.body.patientID)) {
        return res.status(400).json({status: false})
    }
    
				const queryStatement = `select p.id, 
                                            a.name as name, 
                                            a.avatar, 
                                            a.email, 
                                            a.phone, 
                                            a.gender, 
                                            p.ssn, 
                                            to_char(p.dob, 'DD/MM/YYYY') as dob 
                                        from patients p, 
                                            accounts a 
                                        where p.id = a.patient_id and 
                                            p.id = $1`
				const arr = [req.body.patientID]
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
    const queryStatement = 'select p.id, a.name as name, a.avatar, a.email, a.phone, a.gender, d.name as specialty from practitioners p, accounts a, departments d where a.practitioner_id = p.id and p.specialty = d.id and p.id = ' + req.body.practitionerID
    try {
        const result = await db.query(queryStatement)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.listAllAppointments = async function (req, res) {
				const queryStatement = `select t1.appointment_id, 
																																			t1.room_id, 
																																			t1.medical_service, 
																																			t1.start, 
																																			t1.date, 
																																			t1.status, 
																																			t1.practitioner_id, 
																																			t1.practitioner_name, 
																																			t1.avatar as practitioner_avatar, 
																																			t1.gender as practitioner_gender, 
																																			t1.email as practitioner_email, 
																																			t1.phone as practitioner_phone, 
																																			t1.specialty as practitioner_specialty, 
																																			t2.patient_id, 
																																			t2.patient_name as patient_name, 
																																			t2.avatar as patient_avatar, 
																																			t2.gender as patient_gender, 
																																			t2.email as patient_email, 
																																			t2.phone as patient_phone, 
																																			t2.ssn as patient_ssn, 
																																			t2.date_of_birth as patient_dob 
				from (select ap.id as appointment_id, 
																	to_char(ap.at, 'HH24:MI') as start, 
																	to_char(ap.at, 'DD/MM/YYYY') as date, 
																	ap.status as status, 
																	ac.practitioner_id, 
																	ac.name as practitioner_name, 
																	ac.avatar, 
																	ac.gender, 
																	ac.email, 
																	ac.phone, 
																	d.name as specialty, 
																	r.id as room_id, 
																	m.name as medical_service 
											from 	appointments ap, 
																	practitioners p, 
																	accounts ac, 
																	departments d, 
																	rooms r, 
																	medicalservices m 
											where ap.practitioner_id = p.id and 
																	p.id = ac.practitioner_id and 
																	d.id = p.specialty and 
																	ap.room_id = r.id and 
																	r.medicalservice_id = m.id 
												order by status = 'done', at) as t1 
					inner join 
									(select ap.id as appointment_id, 
																	ac.patient_id, 
																	ac.name as patient_name, 
																	ac.avatar, 
																	ac.gender, 
																	ac.email, 
																	ac.phone, 
																	p.ssn, 
																	p.dob as date_of_birth 
										from 		appointments ap, 
																	patients p, 
																	accounts ac 
										where 	ap.patient_id = p.id and 
																	p.id = ac.patient_id 
										order by status='done', at) as t2 
					on t1.appointment_id = t2.appointment_id`

//	if (req.session.role !== "admin") {
//		res.status(400).json({status: false})
//	}	

    try {
        const result = await db.query(queryStatement)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.listAllDepartments = async function (req, res) {
    try {
        const queryStatement = 'select * from departments'
        const result = await db.query(queryStatement)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.deleteAppointment = async function (req, res) {
    if (!Number.isInteger(req.body.appointmentID)) {
        return res.status(400).json({status: false})
    }
    
    try {
								const deleteStatement = `DELETE from appointments 
																																	WHERE id = $1`
        const arr = [req.body.appointmentID]
        const result = await db.query(deleteStatement, arr)
        return res.status(200).json({status: true})
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}




