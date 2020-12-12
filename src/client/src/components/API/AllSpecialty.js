import axios from 'axios';

export const allSpecialty = async () => {
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/departments/all`, { withCredentials: true });
        console.log(res.data);
        return res.data;
    } catch (error) {
        if (error.response.status === 500) {
            return null;
        }
    }
}
