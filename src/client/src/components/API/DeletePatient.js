import axios from 'axios';

export const deletePatient = async (id) => {
    let data = {
        patientID: id
    };
    try {
        await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/patients/account/delete`, data, { withCredentials: true });
        await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/patients/delete`, data, { withCredentials: true });
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
