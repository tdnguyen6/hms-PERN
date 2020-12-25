import axios from 'axios';

export const createAppointment = async (appointment) => {
    let day = appointment.date.getDate();
    let month = appointment.date.getMonth();
    let year = appointment.date.getFullYear();
    let time = appointment.time.split(':');
    let data = {
        serviceID: appointment.medicalServiceID,
        practitionerID: appointment.practitionerID,
        patientID: appointment.patientID,
        at: new Date(Date.UTC(year, month, day, time[0], time[1])),
        roomID: null,
        last_appointment: null,
    };
    try {
        let room = await axios.post(`${process.env.REACT_APP_API_ADDR}/patient/appointments/findRoom`, data, { withCredentials: true });
        data.roomID = room.data[0].id;
        await axios.post(`${process.env.REACT_APP_API_ADDR}/patient/appointments/create`, data, { withCredentials: true });
    } catch (error) {
        console.log(error);
    }
}