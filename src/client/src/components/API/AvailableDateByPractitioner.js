import axios from 'axios';

export const availableDateByPractitioner = async (id) => {
    console.log(id);
    let data = {
        practitionerID: 2
    }
    console.log(data);
    let res;
    try {
        res = await axios.post('http://localhost:3001/appointment/getAvailableDate', data);
        return res.data;
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
