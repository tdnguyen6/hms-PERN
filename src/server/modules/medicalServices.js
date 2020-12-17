const db = require('../db');

exports.listAllServices = async function (req, res) {
    const queryString = `SELECT * FROM medicalservices`
    try {
        const result = await db.query(queryString)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json(null)
    }
}