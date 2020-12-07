import axios from 'axios';

export const roomByDisease = async (diseaseID) => {
    let data = {
        diseaseID: diseaseID
    }
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/disease/findRoom`, data);
        return res.data;
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}