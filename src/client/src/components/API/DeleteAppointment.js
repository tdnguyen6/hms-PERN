// req.body.appointmentID
// /admin/appointments/delete


import axios from 'axios';

export const deleteAppointment = async (id) => {
    let data = {
        appointmentID: id
    }
    console.log(data);

    try {
        let res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/appointments/delete`, data, { withCredentials: true });
        console.log(res.data);
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
