// req.body.patientID

// app.post("/admin/patients/account/delete", admin.deletePatientAccount);
// app.post("/admin/patients/delete", admin.deletePatient);

import axios from 'axios';

export const deletePatient = async (id) => {
    let data = {
        patientID: id
    }
    console.log(data);

    try {
        let res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/patients/account/delete`, data, { withCredentials: true });
        console.log(res.data);
        let res2 = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/patients/delete`, data, { withCredentials: true });
        console.log(res2.data);
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}
