import axios from 'axios';

export const availableDateByPractitioner = async (id) => {
    console.log(id);
    let data = {
        practitionerID: 2
    }
    console.log(data);
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/appointment/getAvailableDate`, data);
        return res.data;
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
