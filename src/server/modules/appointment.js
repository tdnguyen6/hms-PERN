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

exports.getAvailableTimeSlot = async function(req, res) {
    let query = "select at from appointments where practitioner_id = " + req.body.practitionerID
    console.log(query)
    
    try {
        const result = await db.query(query)
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
        
        res.status(200).json({availableTime: availableTimeSlots})
    } catch (err) {
        console.log(err)
        res.status(500).json(null)
    }
}

exports.getAvailableDate = async function(req, res) {
    let queryStatement = `select date_part('day', at) as day from appointments where practitioner_id = $1 and at < now()` 
    console.log(queryStatement)
    
    try {
        const result = await db.query(queryStatement, [req.body.practitionerID])
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json(null)
    }
}


