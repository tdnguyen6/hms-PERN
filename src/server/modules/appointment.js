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
    const queryStatement = "select ap.id as appointment_id, ap.room_id, m.name as medical_service, ap.practitioner_id, a.name as practitioner_name, d.name as practitioner_specialty, a.avatar as practitioner_avatar, a.email as practitioner_email, a.phone as practitioner_phone, a.gender as practitioner_gender, to_char(ap.at, 'HH24:MI') as start, to_char(ap.at, 'DD/MM/YYYY') as date, ap.status, ap.log, ap.prescription, ap.next_appointment_period, (select m.name as next_appointment_service where ap.next_appointment_service = m.id), ap.last_appointment from appointments ap, rooms r, medicalservices m, practitioners p, accounts a, departments d where ap.room_id = r.id and r.medicalservice_id = m.id and m.department_id = d.id and ap.practitioner_id = p.id and p.id = a.practitioner_id and ap.patient_id = $1 order by status='done', at"
    const arr = [req.session.patientID]
    try {
        const result = await db.query(queryStatement, arr)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.practitionerAppointments = async function (req, res) {
    const queryStatement = "select ap.id as appointment_id, ap.practitioner_id, ap.room_id, m.name as medical_service, ap.patient_id, a.name as patient_name, a.avatar as patient_avatar, a.gender as patient_gender, a.email as patient_email, a.phone as patient_phone, p.ssn as patient_ssn, date_part('year', age(dob)) as patient_age, p.dob as patient_dob, to_char(ap.at, 'HH24:MI') as start, to_char(ap.at, 'DD/MM/YYYY') as date, ap.status, ap.log, ap.prescription, ap.next_appointment_period, (select m.name as next_appointment_service where ap.next_appointment_service = m.id), ap.last_appointment from appointments ap, rooms r, medicalservices m, patients p, accounts a where ap.room_id = r.id and r.medicalservice_id = m.id and ap.patient_id = p.id and p.id = a.patient_id and ap.practitioner_id = $1 order by status='done', at"
    const arr = [req.session.practitionerID]
    try {
        const result = await db.query(queryStatement, arr)
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

    const queryStatement = "select a.id from appointments a where a.patient_id = "
    const arr = [req.body.patientID]

    try {
        let result = await db.query(queryStatement, arr)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.getAvailableHours = async function (req, res) {
    if (!req.body.practitionerID || !req.body.day || !req.body.month || !req.body.year) {
        return res.status(400).json({status: false})
    }

    const query = `select at 
                        from appointments 
                        where practitioner_id = $1 
                            and date_part('day', at) = $2 
                            and date_part('month', at) = $3 
                            and date_part('year', at) = $4`;
    const queryArr = [req.body.practitionerID, req.body.day, req.body.month, req.body.year]

    try {
        const result = await db.query(query, queryArr)
        const arr = result.rows

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




