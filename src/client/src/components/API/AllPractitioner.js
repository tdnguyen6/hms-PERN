import axios from 'axios';

export const allPractitioner = async () => {
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/practitioners/all`, { withCredentials: true });
        return res.data;
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
