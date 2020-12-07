import axios from 'axios';
import {withWidth} from "@material-ui/core";

export const createPractitioner = async (practitioner) => {
    let data = {
        name: practitioner.name,
        email: practitioner.email,
        phone: practitioner.phone,
        gender: practitioner.gender,
        password: practitioner.email,
        id: '',
        specialtyID: practitioner.specialty,
    }
    console.log(data);

    try {
        // show loading
        let id = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/practitioners/create`, data);
        data.id = id.data[0].id;
        console.log(data.id);
        let res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/practitioners/account/create`, data);
        console.log(res);
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}

//
// app.post("/admin/practitioners/add", admin.addPractitioner);
// exports.addPractitioner = async function (req, res) {
//     const createAccount = 'insert into accounts(email, password, phone, name, created_on, practitioner_id, gender) values ($1,$2,$3,$4,$5,$5,$6,$7)'
//     try {
//         let result = await db.query(queryStatement, [req.body.email, req.body.password, req.body.phone, req.body.name, new Date(), req.body.id, req.body.gender])
//         return res.status(200).json(result.rows)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({status: false})
//     }
// }
