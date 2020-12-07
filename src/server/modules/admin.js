const db = require('../db');

exports.listPractitioners = async function (req, res) {
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

exports.addPractitioner = async function (req, res) {
    const createAccount = 'insert into accounts(email, password, phone, name, created_on, practitioner_id, gender) values ($1,$2,$3,$4,$5,$5,$6,$7)'
    try {
        let result = await db.query(queryStatement, [req.body.email, req.body.password, req.body.phone, req.body.name, new Date(), req.body.id, req.body.gender])
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({status: false})
    }
}

exports.deletePractitioner = async function (req, res) {
    if (!Number.isInteger(req.body.id)) {
        res.status(400).json({status: false})
        return
    }

    const queryStatement = 'delete from practitioners where id = ' + req.body.id
    try {
        let result = await db.query(queryStatement)
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({status: false})
    }
}


exports.listPatients = async function (req, res) {
    const queryStatement = 'select p.id, a.name as name, a.avatar, a.email, a.phone, a.gender, p.ssn, p.dob from patients p, accounts a where p.id = a.patient_id'
    try {
        let result = await db.query(queryStatement)
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({status: false})
    }
}

exports.listAllAppointments = async function (req, res) {
    const queryStatement = "select t1.appointment_id, t1.room_id, t1.medical_service, t1.start, t1.date, t1.status, t1.practitioner_id, t1.practitioner_name, t1.avatar as practitioner_avatar, t1.gender as practitioner_gender, t1.email as practitioner_email, t1.phone as practitioner_phone, t1.specialty as practitioner_specialty, t2.patient_id, t2.patient_name as patient_name, t2.avatar as patient_avatar, t2.gender as patient_gender, t2.email as patient_email, t2.phone as patient_phone, t2.ssn as patient_ssn, t2.date_of_birth as patient_date_of_birth from ( select ap.id as appointment_id, to_char(ap.at,'HH24:MM') as start, to_char(ap.at,'DD/MM/YYYY') as date, ap.status as status, ac.practitioner_id, ac.name as practitioner_name, ac.avatar, ac.gender, ac.email, ac.phone, d.name as specialty, r.id as room_id, m.name as medical_service from appointments ap, practitioners p, accounts ac, departments d, rooms r, medicalservices m where ap.practitioner_id = p.id and p.id = ac.practitioner_id and d.id = p.specialty and ap.room_id = r.id and r.medicalservice_id = m.id ) as t1 inner join ( select ap.id as appointment_id, ac.patient_id, ac.name as patient_name, ac.avatar, ac.gender, ac.email, ac.phone, p.ssn, p.dob as date_of_birth from appointments ap, patients p, accounts ac where ap.patient_id = p.id and p.id = ac.patient_id ) as t2 on t1.appointment_id = t2.appointment_id"

//	if (req.session.role !== "admin") {
//		res.status(400).json({status: false})
//	}	

    try {
        const result = await db.query(queryStatement)
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({status: false})
    }
}

exports.createPractitioner = async function (req, res) {
    if (!Number.isInteger(req.body.specialtyID)) {
        return res.status(400).json({status: false})
    }

    try {
        const insertStatement = `insert into practitioners (specialty) values (${req.body.specialtyID}) returning id`
        const result = await db.query(insertStatement)
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({status: false})
    }
}

exports.listAllDepartments = async function (req, res) {
    try {
        const queryStatement = 'select * from departments'
        const result = await db.query(queryStatement)
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({status: false})
    }
}


