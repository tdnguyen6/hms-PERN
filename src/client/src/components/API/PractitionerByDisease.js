import axios from 'axios';

export const practitionerByDisease = async (id) => {
    let data = {
        diseaseID: id
    }

    let res;
    try {
        res = await axios.post('http://localhost:3001/practitioner/findByDisease', data);
        return res.data;
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
