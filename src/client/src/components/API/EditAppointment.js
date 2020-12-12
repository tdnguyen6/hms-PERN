///admin/appointments/update
// at, appointmentID

import axios from 'axios';

export const editAppointment = async (id, date, time) => {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let timeArr = time.split(':');
    console.log(day, month, year, time);
    let data = {
        appointmentID: id,
        at: new Date(year, month, day, timeArr[0], timeArr[1]),
    }
    console.log(data);
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/appointments/update`, data, { withCredentials: true });
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}