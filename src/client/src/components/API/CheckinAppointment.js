import axios from 'axios';
// [req.body.log, req.body.prescription, req.body.nextAppointmentPeriod, req.body.nextAppointmentService, req.body.appointmentID]
export const checkinAppointment = async (appointment) => {
    let data = {
        appointmentID: appointment.id,
        log: appointment.log,
        prescription: appointment.prescription,
        nextAppointmentPeriod: appointment.nextAppointmentPeriod,
        nextAppointmentService: appointment.nextAppointmentServiceID
    }
    console.log('checkin appointment', data);
    try {
        await axios.post(`${process.env.REACT_APP_API_ADDR}/practitioner/appointments/update`, data, { withCredentials: true });
    } catch (error) {
        console.log(error);
    }
}