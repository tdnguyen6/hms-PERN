import axios from 'axios';

export const allSymptom = async () => {
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/symptom/all`);
        return res.data;
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
