// exports.hasAnotherAppointment = async function (req, res) {
//     const query = `
//     select at
//     from appointments
//     where patient_id = req.session.patientID
//       and at = $1`
//
//     const queryArr = [req.body.at]
//
//     try {
//         const result = await db.query(query, queryArr)
//         let hasAppointment = (result.rows.length == 1)
//         return res.status(200).json({hasAnotherAppointment: hasAppointment})
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json(null)
//     }
// }
// app.post("/patient/appointments/hasAnotherAppointment", appointment.hasAnotherAppointment);

import axios from 'axios';

export const checkAppointmentExist = async (id, date, time) => {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let tmpTime = time.split(':');
    let data = {
        patientID: id,
        at: new Date(Date.UTC(year, month, day, tmpTime[0], tmpTime[1])),
    };
    console.log(data);
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/patient/appointments/hasAnotherAppointment`, data, { withCredentials: true });
        return res.data.hasAnotherAppointment;
    } catch (error) {
        console.log(error);
    }
}