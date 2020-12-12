import axios from 'axios';

export const deletePractitioner = async (id) => {
    let data = {
        practitionerID: id
    };

    try {
        await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/practitioners/account/delete`, data, { withCredentials: true });
        await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/practitioners/delete`, data, { withCredentials: true });
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}

//