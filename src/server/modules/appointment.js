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
    try {
        let result = await db.query("select * from appointments")
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({listAllAppointmentsSuccessfully: false})
    }
} 

/* return array of object of symptoms 
for example
[
    {
        "id": 1,
        "name": "abdominal pain"
    },
    {
        "id": 2,
        "name": "chest pain"
    }
]
*/
exports.listDiseases = async function(req, res) {
    
    
    
    let diseases = await db.query('SELECT * FROM diseases')
    res.status(200).json(diseases.rows)
}



