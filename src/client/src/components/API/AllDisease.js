import axios from 'axios';

export const allDisease = async () => {
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/disease/all`);
        return res.data;
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
