// exports.updatePractitioner = async function (req, res) {
//     if (!Number.isInteger(req.body.newSpecialty) &&
//         !Number.isInteger(req.body.practitionerID) &&
//         !Number.isInteger(req.body.accountID)) {
//         return res.status(400).json({status: false})
//     }
//
//
//     const updateTransaction = `begin; UPDATE practitioners SET specialty = ${req.body.newSpecialty},
//     join_date = '${req.body.joinDate}' WHERE id = ${req.body.practitionerID};
//     UPDATE accounts SET name = '${req.body.newName}',
//     phone = ${req.body.phone},
//     gender = '${req.body.gender}' where id = ${req.body.accountID}; commit;`
//
//     try {
//         await db.query(updateTransaction)
//         return res.status(200).json({status: true})
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({status: false})
//     }
// }

// /admin/practitioners/update