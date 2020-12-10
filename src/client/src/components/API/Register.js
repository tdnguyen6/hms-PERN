import axios from 'axios';

export const register = async (name, email, password, phone, sex, dob, ssn) => {
    let data = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        gender: sex,
        dob: dob,
        ssn: ssn,
        patientID: ''
    }

    let res;
    try {
        let id = await axios.post(`${process.env.REACT_APP_API_ADDR}/patient/create`, data);
        data.patientID = id.data[0].id;
        console.log(data.patientID);
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/register`, data);
        console.log(res);
        return res.data.registerStatus;
    } catch (error) {
        console.log(error);
    }
}
// /patient/create
// exports.createPatient = async function (req, res) {
//     try {
//         const insertStatement = `insert into patients (ssn, dob) values (${req.body.ssn}, '${req.body.dob}') returning id`
//         const result = await db.query(insertStatement)
//         res.status(200).json(result.rows)
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({status: false})
//     }
// }

// export const createPractitioner = async (practitioner) => {
//     let data = {
//         name: practitioner.name,
//         email: practitioner.email,
//         phone: practitioner.phone,
//         gender: practitioner.gender,
//         password: practitioner.email,
//         id: '',
//         specialtyID: practitioner.specialty,
//     }
//     console.log(data);
//
//     try {
//         // show loading
//         let id = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/practitioners/create`, data, { withCredentials: true });
//         data.id = id.data[0].id;
//         console.log(data.id);
//         let res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/practitioners/account/create`, data, { withCredentials: true });
//         console.log(res);
//     } catch (error) {
//         if (error.response.status === 500) return null;
//     }
// }
