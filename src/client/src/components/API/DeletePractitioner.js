// practitionerID

// /admin/practitioners/account/delete
// /admin/practitioners/delete

import axios from 'axios';

export const deletePractitioner = async (id) => {
    let data = {
        practitionerID: id
    }
    console.log(data);

    try {
        let res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/practitioners/account/delete`, data, { withCredentials: true });
        console.log(res.data);
        let res2 = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/practitioners/delete`, data, { withCredentials: true });
        console.log(res2.data);
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}

//