// app.post("/admin/appointments/byHour", appointment.nAppointmentsByHour);
// exports.nAppointmentsByHour = async function (req, res) {
//     const queryStatement = `
//     select date_part('hour', at) as time,
//            count(id) as number
//     from appointments
//     group by time
//     order by time
//     `
//
//     try {
//         const result = await db.query(queryStatement)
//         return res.status(200).json(result.rows)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({status: false})
//     }
// }

import axios from 'axios';

export const numberOfAppointmentByHour = async () => {
    try {
        let res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/appointments/byHour`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
