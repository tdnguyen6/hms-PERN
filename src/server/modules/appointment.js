const db = require('../db');

exports.createAppointment = async function (req, res) {
    try {
        const appointmentCreateQuery = 'INSERT INTO appointments (practitioner_id, patient_id, room_id, at, last_appointment) VALUES($1,$2,$3,$4,$5) returning *'
        const appointmentCreateResult = await db.query(appointmentCreateQuery, [req.body.practitionerID, req.body.patientID, req.body.roomID, req.body.at, req.body.last_appointment])

        const id = appointmentCreateResult.rows[0].id
        return res.status(200).json({appointmentID: id})
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.patientAppointments = async function (req, res) {
    console.log('check patient appointment', req.session.patientID);
    const queryStatement = "select t1.appointment_id, t1.room_id, t1.medical_service, t1.start, t1.date, t1.status, t1.practitioner_id, t1.practitioner_name, t1.avatar as practitioner_avatar, t1.gender as practitioner_gender, t1.email as practitioner_email, t1.phone as practitioner_phone, t1.specialty as practitioner_specialty, t2.patient_id, t2.patient_name as patient_name, t2.avatar as patient_avatar, t2.gender as patient_gender, t2.email as patient_email, t2.phone as patient_phone, t2.ssn as patient_ssn, t2.date_of_birth as patient_date_of_birth from ( select ap.id as appointment_id, to_char(ap.at,'HH24:MM') as start, to_char(ap.at,'DD/MM/YYYY') as date, ap.status as status, ac.practitioner_id, ac.name as practitioner_name, ac.avatar, ac.gender, ac.email, ac.phone, d.name as specialty, r.id as room_id, m.name as medical_service from appointments ap, practitioners p, accounts ac, departments d, rooms r, medicalservices m where ap.practitioner_id = p.id and p.id = ac.practitioner_id and d.id = p.specialty and ap.room_id = r.id and r.medicalservice_id = m.id ) as t1 inner join ( select ap.id as appointment_id, ac.patient_id, ac.name as patient_name, ac.avatar, ac.gender, ac.email, ac.phone, p.ssn, p.dob as date_of_birth from appointments ap, patients p, accounts ac where ap.patient_id = p.id and p.id = ac.patient_id ) as t2 on t1.appointment_id = t2.appointment_id"

    // const queryStatement = "select ap.id, ap.room_id, m.name as medical_services, a.name as practitioner_name, to_char(ap.at, 'HH24:MM') as start, to_char(ap.at, 'DD/MM/YYYY') as date, ap.status, ap.log, ap.prescription, ap.next_appointment_period, (select m1.name as next_appointment_service from medicalservices m1, appointments a1 where a1.next_appointment_service = m1.id), ap.last_appointment from appointments ap, rooms r, medicalservices m, practitioners p, accounts a where ap.room_id = r.id and r.medicalservice_id = m.id and ap.practitioner_id = p.id and p.id = a.practitioner_id and ap.patient_id = " + req.session.patientID
    try {
        const result = await db.query(queryStatement)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.practitionerAppointments = async function (req, res) {
    const queryStatement = "select ap.id, ap.room_id, m.name as medical_services, a.name as patient_name , date_part('year',age(dob)) as age, to_char(ap.at, 'HH24:MM') as start, to_char(ap.at, 'DD/MM/YYYY') as date, ap.status, ap.log, ap.prescription, ap.next_appointment_period, (select m1.name as next_appointment_service from medicalservices m1, appointments a1 where a1.next_appointment_service = m1.id), ap.last_appointment from appointments ap, rooms r, medicalservices m, patients p, accounts a where ap.room_id = r.id and r.medicalservice_id = m.id and ap.patient_id = p.id and p.id = a.patient_id and ap.practitioner_id =" + req.session.practitionerID
    try {
        const result = await db.query(queryStatement)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.findRoom = async function (req, res) {
    // check if req.body.diseaseID is a number
    if (!Number.isInteger(req.body.diseaseID)) {
        return res.status(400).json({status: false})
    }

    let queryStatement
    if (req.body.diseaseID === 0) queryStatement = "select r.id from rooms r, medicalservices m where r.medicalservice_id = m.id and m.id = 13"

    else queryStatement = "select r.id from rooms r, diseases d, medicalservices m where d.suggested_checkup = m.id and r.medicalservice_id = m.id and d.id = " + req.body.diseaseID

    try {
        let result = await db.query(queryStatement)
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({status: false})
    }
}

exports.findLastAppointment = async function (req, res) {
    // check if req.body.patientID is a number
    if (!Number.isInteger(req.body.patientID)) {
        return res.status(400).json({status: false})
    }

    const queryStatement = "select a.id from appointments a where a.patient_id = " + req.body.patientID

    try {
        let result = await db.query(queryStatement)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.getAvailableHours = async function (req, res) {
    if (!req.body.practitionerID || !req.body.day || !req.body.month) {
        return res.status(400).json({status: false})
    }

    let query = `select at from appointments where practitioner_id = ${req.body.practitionerID} and date_part('day', at) = ${req.body.day} and date_part('month', at) = ${req.body.month}`
    console.log(query)

    try {
        const result = await db.query(query)
        const arr = result.rows

        console.log(arr)

        let unAvailableTimeSlots = []
        arr.forEach(timeSlot => {
            unAvailableTimeSlots.push(timeSlot.at.getUTCHours())
        })
        console.log(unAvailableTimeSlots)

        let availableTimeSlots = []
        // initialize available time slots from 0 -> 23
        for (let i = 9; i <= 17; i++) availableTimeSlots.push(i)

        availableTimeSlots = availableTimeSlots.filter(timeSlot => !unAvailableTimeSlots.includes(timeSlot))

        return res.status(200).json({availableTime: availableTimeSlots})
    } catch (err) {
        console.log(err)
        return res.status(500).json(null)
    }
}

exports.updateAppointment = async function (req, res) {
    if (!Number.isInteger(req.body.appointmentID)) {
        return res.status(400).json({status: false})
    }

    try {
        const appointmentUpdateQuery = 'update appointments set at = $1 where id = $2'
        const arr = [req.body.at, req.body.appointmentID]

        await db.query(appointmentUpdateQuery, arr)

        return res.status(200).json({status: true})
    } catch (err) {
        console.log(err) 
        return res.status(500).json({status: false})
    }
}

exports.updateAppointmentPractitioner = async function (req, res) {
    if (!Number.isInteger(req.body.appointmentID)) {
        return res.status(400).json({status: false})
    }

    try {
        const appointmentUpdateQuery = 'update appointments set log = $1, prescription = $2, next_appointment_period = $3, next_appointment_service = $4 where id = $5'
        const arr = [req.body.log, req.body.prescription, req.body.nextAppointmentPeriod, req.body.nextAppointmentService, req.body.appointmentID]

        await db.query(appointmentUpdateQuery, arr)

        return res.status(200).json({status: true})
    } catch (err) {
        console.log(err) 
        return res.status(500).json({status: false})
    }
}




