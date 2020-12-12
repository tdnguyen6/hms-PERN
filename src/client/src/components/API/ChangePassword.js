// exports.changePassword = async function (req, res) {
//     try {
//         const updateStatement = `update accounts set password = '${do_hash(req.body.newPassword)}' where id = ${req.session.userID}`
//         await db.query(updateStatement)
//         return res.status(200).json({status: true})
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({status: false});
//     }
// }

// app.post("/user/changePassword", auth.changePassword);
