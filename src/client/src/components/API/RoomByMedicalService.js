import axios from 'axios';

export const roomByMedicalService = async (id) => {
    let data = {
        serviceID: id,
    };
    try {
        let res = await axios.post(`${process.env.REACT_APP_API_ADDR}/patient/appointments/findRoom`, data, { withCredentials: true });
        return res.data[0].id;
    } catch (error) {
        console.log(error);
    }
}