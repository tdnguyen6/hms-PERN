const db = require('../db');

exports.queryAllMedicalServices = async (req, res) => {
    try {
        let result = await db.query("select * from medicalservices")
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json(null)
    }
}