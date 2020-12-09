import axios from 'axios';

export const allPatient = async () => {
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/patients/all`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
