// exports.listAllDepartments = async function (req, res) {
//     try {
//         const queryStatement = 'select * from departments'
//         const result = await db.query(queryStatement)
//         return res.status(200).json(result.rows)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({status: false})
//     }
// }

import axios from 'axios';

export const allSpecialty = async () => {
    let res;

    try {
        // show loading
        res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/departments/all`, { withCredentials: true });
        console.log(res.data);
        return res.data;
    } catch (error) {
        if (error.response.status === 500) {
            return null;
        }
    }
}
