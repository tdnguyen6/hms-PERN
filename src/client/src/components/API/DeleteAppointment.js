import axios from 'axios';

export const deleteAppointment = async (id) => {
    let data = {
        appointmentID: id
    };

    try {
        let res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/appointments/delete`, data, { withCredentials: true });
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
