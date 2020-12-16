import axios from 'axios';

export const checkPhoneExist = async (phone) => {
    let data = {
        phone: phone
    };
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/checkPhoneExist`, data);
        return res.data.phoneExist;
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
