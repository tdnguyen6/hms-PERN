import axios from 'axios';

export const numberOfAppointment = async () => {
    try {
        let res = await axios.post(`${process.env.REACT_APP_API_ADDR}/appointments/totalNumber`);
        return res.data[0].total;
    } catch (error) {
        console.log(error);
    }
}
