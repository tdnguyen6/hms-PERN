// exports.deletePractitioner = async function (req, res) {
//     if (!Number.isInteger(req.body.id)) {
//         return res.status(400).json({status: false})
//     }
//
//     const queryStatement = 'delete from practitioners where id = ' + req.body.id
//     try {
//         let result = await db.query(queryStatement)
//         return res.status(200).json(result.rows)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({status: false})
//     }
// }

import axios from 'axios';
import {withWidth} from "@material-ui/core";

export const deletePractitioner = async (id) => {
    let data = {
        id: id
    }
    console.log(data);

    try {
        // show loading
        let res = await axios.post(`${process.env.REACT_APP_API_ADDR}/admin/practitioners/delete`, data);
        console.log(res.data);
    } catch (error) {
        if (error.response.status === 500) return null;
    }
}

//