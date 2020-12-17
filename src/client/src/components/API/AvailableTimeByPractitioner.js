import axios from 'axios';

export const availableTimeByPractitioner = async (id, date) => {
    let data = {
        practitionerID: id,
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    };
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/patient/appointments/getAvailableTime`, data, { withCredentials: true });
        const time = res.data.availableTime.map(time => `${time}:00`.padStart(5, '0'));
        return time;
    } catch (error) {
        console.log(error);
        if (error.response.status === 500) return null;
    }
}
