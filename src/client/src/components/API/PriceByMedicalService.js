// exports.generateInvoice = async function (req, res) {
//     try {
//         const queryStatement = `select m.price
//                               from medicalservices m,
//                                    diseases d
//                               where d.suggested_checkup = m.id and
//                                     d.id = $1`
//         const arr = [req.body.diseaseID]
//         const result = await db.query(queryStatement, arr)
//         res.status(200).json(result.rows)
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({status: false})
//     }
// }
// /payment/invoice

import axios from 'axios';

export const priceByMedicalService = async (id) => {
    let data = {
        serviceID: id,
    };
    try {
        let res = await axios.post(`${process.env.REACT_APP_API_ADDR}/payment/invoice`, data, { withCredentials: true });
        return res.data[0].price;
    } catch (error) {
        console.log(error);
    }
}