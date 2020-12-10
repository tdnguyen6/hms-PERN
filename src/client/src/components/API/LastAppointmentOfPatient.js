import axios from 'axios';

export const lastAppointmentOfPatient = async (patientID) => {
    let data = {
        patientID: patientID
    }
    let res;
    try {
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/patient/appointments/last`, data, { withCredentials: true });
        return res.data;
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
