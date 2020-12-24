const db = require('../db');

exports.generateInvoice = async function (req, res) {
    if (!Number.isInteger(req.body.serviceID)) {
        return res.status(400).json({status: false})
    }
    
    try {
        const queryStatement = `
        select m.price 
        from medicalservices m 
        where m.id = $1`

        const arr = [req.body.serviceID]
        const result = await db.query(queryStatement, arr)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.makePayment = async function (req, res) {
    try {
        const insertStatement = "insert into payment(type, method) values ($1,$2) returning id"
        const result = await db.query(insertStatement, [req.body.type, req.body.method])

        const id = result.rows[0].id
        res.status(200).json({paymentID: id})
    } catch (err) {
        console.log(err)
        res.status(500).json({status: false})
    }
}

exports.updatePayment = async function (req, res) {
    try {
        const updateStatement = `UPDATE payment 
                                 SET appointment_id = $1 
                                 WHERE id = $2 
                                 RETURNING *`
        const arr = [req.body.appointmentID, req.body.paymentID]
        const result = await db.query(updateStatement, arr)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}
