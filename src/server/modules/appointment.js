const db = require('../db');

exports.createAppointment = async function (req, res) {
    try {
        let result = await db.query(`INSERT INTO appointments (practitioner_id, patient_id, room_id, at, status, log, prescription, next_appointment_period, next_appointment_service, last_appointment) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [req.body.practitioner_id, req.body.patient_id, req.body.room_id, req.body.at, req.body.status, req.body.log, req.body.prescription, req.body.next_appointment_period, req.body.next_appointment_service, req.body.last_appointment])
        res.status(200).json({createAppointmentSuccessful: true})
    } catch (err) {
        console.log(err)
        res.status(500).json({createAppointmentSuccessful: false})
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

exports.getUnavailableTimeSlot = async function(req, res) {
    let query = "select at from appointments where practitioner_id = " + req.body.practitionerID
    console.log(query)
    
    try {
        const result = await db.query(query)
        const arr = result.rows
        let unavailableTimeSlots = []
        
        arr.forEach(unavailableTimeSlot => {
            unavailableTimeSlots.push(unavailableTimeSlot.at.getUTCHours())
        })
        
        res.status(200).json({unavailableTime: unavailableTimeSlots})
    } catch (err) {
        console.log(err)
        res.status(500).json({status: false})
    }
}

exports.getUnavailableTimeSlot2 = async function(req, res) {
    let query = "select name from diseases"
    console.log(query)
    
    try {
        const result = await db.query(query)
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({status: false})
    }        
}


