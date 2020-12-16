const db = require('../db');

exports.createPatient = async function (req, res) {
    try {
        const insertStatement = `insert into patients (ssn, dob) values (${req.body.ssn}, '${req.body.dob}') returning id`
        const result = await db.query(insertStatement)
        res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({status: false})
    }
}

exports.getPatientByID = async function (req, res) {
    if (!Number.isInteger(req.body.patientID)) {
                    return res.status(400).json({status: false})
    }

    const queryStatement = `select p.id,
                                   a.name as name,
                                   a.avatar,
                                   a.email,
                                   a.phone,
                                   a.gender,
                                   p.ssn,
                                   to_char(p.dob, 'DD/MM/YYYY') as dob
                             from 	patients p,
                                   accounts a
                             where p.id = a.patient_id and
                                   a.active = true and
                                   p.id = $1`
    const arr = [req.body.patientID]
    try {
        const result = await db.query(queryStatement, arr)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.updatePatient = async function (req, res) {
    if (!Number.isInteger(req.body.ssn) &&
        !Number.isInteger(req.body.patientID) &&
        !Number.isInteger(req.body.accountID)) {
            return res.status(400).json({status: false})
        }


    const updateTransaction = `begin; 

                               UPDATE patients 
                               SET ssn = $1, 
                                   dob = $2 
                               WHERE id = $3; 
                               
                               UPDATE accounts 
                               SET name = $4, 
                                   phone = $5, 
                                   gender = $6 
                               where id = $7; 
                               
                               commit;`
    const arr = [req.body.ssn, req.body.dob, req.body.patientID, req.body.newName, req.body.phone, req.body.gender, req.body.accountID]

    try {
        await db.query(updateTransaction, arr)
        return res.status(200).json({status: true})
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.deletePatientAccount = async function (req, res) {
    if (!Number.isInteger(req.body.patientID)) {
        return res.status(400).json({status: false})
    }

    const deleteStatement = `UPDATE accounts
                             SET active = false
                             WHERE patient_id = $1`
    const arr = [req.body.patientID]
    try {
        await db.query(deleteStatement, arr)
        return res.status(200).json({status: true})
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

exports.listAllPatients = async function (req, res) {
    const queryStatement = `select p.id,
                                   a.name as name,
                                   a.avatar,
                                   a.email,
                                   a.phone,
                                   a.gender,
                                   p.ssn,
                                   to_char(p.dob, 'DD/MM/YYYY') as dob
                            from 		patients p,
                                   accounts a
                            where 	p.id = a.patient_id and
                                   a.active = true`
    try {
        const result = await db.query(queryStatement)
        return res.status(200).json(result.rows)
    } catch (err) {
        console.log(err)
        return res.status(500).json({status: false})
    }
}

