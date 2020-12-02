import axios from 'axios';

export const allDisease = async () => {
    let res;
    try {
        res = await axios.post('http://localhost:3001/disease/all');
        return res.data;
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
