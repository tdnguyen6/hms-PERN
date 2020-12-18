const db = require('../db');

exports.listAllServices = async function (req, res) {
    const queryString =
        `SELECT ms.id,
                ms.name,
                ms.price,
                d.name as department
            FROM medicalservices ms
            JOIN departments d ON d.id = ms.department_id`;
    try {
        const result = await db.query(queryString)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json(null)
    }
}

exports.getGeneralCheckup = async (req, res) => {
    const queryString =
        `SELECT ms.id,
                ms.name,
                ms.price,
                d.name as department
            FROM medicalservices ms
            JOIN departments d ON d.id = ms.department_id
            WHERE ms.name LIKE 'general checkup'`;
    try {
        const result = await db.query(queryString)
        return res.status(200).json(result.rows[0])
    } catch (err) {
        console.log(err)
        return res.status(500).json(null)
    }
}