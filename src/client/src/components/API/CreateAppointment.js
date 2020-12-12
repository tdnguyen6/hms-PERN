import axios from 'axios';

export const createAppointment = async (appointment) => {
    let day = appointment.date.getDate();
    let month = appointment.date.getMonth();
    let year = appointment.date.getFullYear();
    let time = appointment.time.split(':');
    let data = {
        diseaseID: appointment.diseaseID,
        practitionerID: appointment.practitionerID,
        patientID: appointment.patientID,
        at: new Date(year, month, day, time[0], time[1]),
        roomID: null,
        last_appointment: null,
    };
    let res;
    try {
        let room = await axios.post(`${process.env.REACT_APP_API_ADDR}/patient/appointments/findRoom`, data, { withCredentials: true });
        data.roomID = room.data[0].id;
        // let lastAppointment = await axios.post(`${process.env.REACT_APP_API_ADDR}/patient/appointment/last`, data, { withCredentials: true });
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/patient/appointments/create`, data, { withCredentials: true });
    } catch (error) {
        console.log(error);
    }
}