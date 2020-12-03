import axios from 'axios';

export const allSymptom = async () => {
    let res;
    try {
        res = await axios.post('http://localhost:3001/symptom/all');
        return res.data;
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
