import axios from 'axios';

export const numberOfAppointmentIn30Days = async () => {
    try {
        let res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/appointments/recent`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
