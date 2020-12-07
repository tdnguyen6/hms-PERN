import axios from 'axios';

export const availableTimeByPractitioner = async (id, date) => {
    let data = {
        practitionerID: id,
        day: date.getDate(),
        month: date.getMonth() + 1
    }
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/appointment/getAvailableTime`, data);
        const time = res.data.availableTime.map(time => `${time}:00`);
        return time;
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
