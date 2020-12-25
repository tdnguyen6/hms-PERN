import axios from 'axios';

export const editAppointment = async (id, date, time) => {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let timeArr = time.split(':');
    let data = {
        appointmentID: id,
        at: new Date(Date.UTC(year, month, day, timeArr[0], timeArr[1])),
    }
    try {
        await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/appointments/update`, data, { withCredentials: true });
    } catch (error) {
        console.log(error);
    }
}