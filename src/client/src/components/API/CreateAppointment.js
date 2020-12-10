// createAppointment: req.body.practitionerID, req.body.patientID, req.body.roomID, req.body.at, req.body.last_appointment
// /patient/appointment/create
// findRoom: req.body.diseaseID
// /patient/appointment/findRoom
// findLastAppointment: req.body.patientID
// /patient/appointment/last

import axios from 'axios';

export const createAppointment = async (appointment) => {
    let day = appointment.date.getDate();
    let month = appointment.date.getMonth();
    let year = appointment.date.getFullYear();
    let time = appointment.time;
    //Date.parse(`${year}-${month}-${day}T${time}:00.000+00:00`)
    console.log(day, month, year, time);
    let data = {
        diseaseID: appointment.diseaseID,
        practitionerID: appointment.practitionerID,
        patientID: appointment.diseaseID,
        at: new Date('05 October 2011 15:00 UTC'),
        roomID: null,
        last_appointment: 0,
    }
    let res;
    try {
        let room = await axios.post(`${process.env.REACT_APP_API_ADDR}/patient/appointments/findRoom`, data, { withCredentials: true });
        data.roomID = room.data[0].id;
        // let lastAppointment = await axios.post(`${process.env.REACT_APP_API_ADDR}/patient/appointment/last`, data, { withCredentials: true });
        console.log('data return', data);
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/patient/appointments/create`, data, { withCredentials: true });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}