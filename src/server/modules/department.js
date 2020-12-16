const db = require('../db');

exports.listAllDepartments = async function (req, res) {
    try {
        const queryStatement = 'select * from departments'
        const result = await db.query(queryStatement)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}