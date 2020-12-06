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

exports.queryAllAppointments = async function(req, res) {
    let queryStatement = "select * from appointments"
    console.log(req.session)
    
    if (req.session.role === "patient") queryStatement += " where patient_id = " + req.session.userID
    else if (req.session.role === "practitioner") queryStatement += " where practitioner_id = " + req.session.userID
    
    console.log(queryStatement)
    
    try {
        let result = await db.query(queryStatement)
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({listAllAppointmentsSuccessfully: false})
    }
}

exports.findRoom = async function(req, res) {
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

exports.findLastAppointment = async function(req, res) {
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

exports.getAvailableHours = async function(req, res) {
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




