const db = require('../db');
const jwt = require('jsonwebtoken');
const {do_hash} = require('./helper');
const Mailer = require('./mailer')

exports.checkEmailExist = async function (req, res) {
    const qRes = await db.query(
        `SELECT 1 
         FROM accounts
         WHERE email = $1`,
        [req.body.email]);
    return res.status(200).json({emailExist: !!qRes.rows.length});
}

exports.checkPhoneExist = async function (req, res) {
    const qRes = await db.query(
        `SELECT 1 
         FROM accounts
         WHERE phone = $1`,
        [req.body.phone]);
    return res.status(200).json({phoneExist: !!qRes.rows.length});
}

exports.registerAccount = async function (req, res) {
    try {
        await db.query(`INSERT INTO accounts (name, email, password, phone, gender, patient_id) VALUES($1,$2,$3,$4,$5,$6)`, [req.body.name, req.body.email, do_hash(req.body.password), req.body.phone, req.body.gender, req.body.patientID]);
        return res.status(200).json({registerStatus: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({registerStatus: false});
    }
}

exports.loginAccount = async function (req, res) {
    /* this will return json object with format
    {
        loginStatus: true | false
        role: Appointment | Practitioner | Admin
    }
    */
    try {
        const statement = `select * from accounts
                           where email = $1 and
                                 password = $2 and
                                 active = true`
        const arr = [req.body.email, do_hash(req.body.password)]
        const result = await db.query(statement, arr)
        if (result.rows.length == 1) {
            // identify users role
            let isPatient = Number.isInteger(result.rows[0].patient_id)
            let isPractitioner = Number.isInteger(result.rows[0].practitioner_id)
            let position
            if (isPatient) position = "patient"
            else if (isPractitioner) position = "practitioner"
            else position = "admin"
            // console.log(position)

            // assign session to user
            req.session.userID = result.rows[0].id
            req.session.role = position
            if (position === 'patient') req.session.patientID = result.rows[0].patient_id
            else if (position === 'practitioner') req.session.practitionerID = result.rows[0].practitioner_id

            // update user last_login
            // if system fail to update user last_login, server will response error in the server
            await db.query(`UPDATE accounts SET last_login = $1 WHERE id = $2`, [(new Date()), result.rows[0].id]);

            res.status(200).json({
                loginStatus: true,
                role: position,
                userID: result.rows[0].id
            });
        } else return res.status(401).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json(null);
    }

}

exports.isLogin = function (req, res) {
    if (!req.session.userID && !req.session.role) {
        // req.session.destroy(err => console.log(err));
        return res.status(401).json();
    }
    return res.status(200).json({
        loginStatus: true,
        role: req.session.role,
        userID: req.session.userID,
        patientID: req.session.patientID,
        practitionerID: req.session.practitionerID
    });
}

exports.logout = function (req, res, next) {
    req.session.destroy(err => {
        console.log(err);
    })
    res.status(200).json({logOutStatus: true})
}
exports.forgetPassword = async function (req, res) {
    let user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
    if (user.rows.length === 1) {
        const token = jwt.sign(
            {
                data: {
                    email: req.body.email
                }
            },
            "Yua Mikami",
            {
                expiresIn: 600,
                issuer: 'hms',
                audience: 'hms-user'
            }
        );

        let email = {
            body: {
                name: user.rows[0].name,
                intro: 'You received this email because you forgot your account password',
                action: {
                    instructions: 'To reset password please click the link below within 10 minutes',
                    button: {
                        color: '#FFA111',
                        text: 'Click to reset password',
                        link: `${req.headers.origin}/resetPassword?token=${token}`
                    }
                },
                outro: 'If you did not make this request, simply ignore this email.'
            }
        };

        let mail = Mailer.mailGenerator.generate(email);

        let message = {
            from: Mailer.transporter.options.auth.user,
            to: req.body.email,
            subject: "Hospital Management System: Recover password",
            html: mail,
        };

        await Mailer.transporter
            .sendMail(message, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
    }
    return res.status(200).json();
}
exports.resetPassword = async function (req, res) {
    try {
        const statement = `UPDATE accounts 
                            SET password = $1 
                            WHERE email = $2`
        const arr = [do_hash(req.body.password), req.body.email]
        await db.query(statement, arr)

        const user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
        if (user.rows.length < 1) return res.status(500).json({"error": "Unspecified Server Error"});
        const token = jwt.sign(
            {
                data: {
                    email: req.body.email
                }
            },
            "Yua Mikami",
            {
                expiresIn: 600,
                issuer: 'hms',
                audience: 'hms-user'
            }
        );
        let email = {
            body: {
                name: user.rows[0].name,
                intro: 'You received this email because you password has just changed',
                action: {
                    instructions: 'If you did not change your password, click on the link below to reset it within 10 minutes',
                    button: {
                        color: '#FFA111',
                        text: 'Click to reset password',
                        link: `${req.headers.origin}/resetPassword?token=${token}`
                    }
                },
                outro: 'If you did change your password, simply ignore this email.'
            }
        };

        let mail = Mailer.mailGenerator.generate(email);

        let message = {
            from: Mailer.transporter.options.auth.user,
            to: req.body.email,
            subject: "Hospital Management System: Recent password change",
            html: mail,
        };

        await Mailer.transporter
            .sendMail(message, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).json({mailSent: false})
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json({mailSent: true})
                }
            });
        return res.status(200).json({resetPasswordSuccessful: true})
    } catch (err) {
        return res.status(500).json({resetPasswordSuccessful: false})
    }
}

exports.changePassword = async function (req, res) {
    try {
        const updateStatement = `update accounts 
                                set password = $1 
                                where id = $2`
        const arr = [do_hash(req.body.newPassword), req.session.userID]
        await db.query(updateStatement, arr)
        return res.status(200).json({status: true})
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false});
    }
}

exports.verifyJWT = async (jwtToken) => {
    return await new Promise((resolve, reject) => {
        jwt.verify(jwtToken, 'Yua Mikami', {audience: 'hms-user', issuer: 'hms'}, function (err, decoded) {
            if (err) reject(err)
            resolve(decoded);
        })
    });
}

exports.getAccount = async (req, res) => {
    try {
        const query =
            `SELECT A.avatar,
                    A.email,
                    A.gender,
                    A.name,
                    A.phone
                FROM accounts A
                WHERE A.id = $1`
        const arr = [req.session.userID];
        const qRes = await db.query(query, arr)
        return res.status(200).json(qRes.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false});
    }
}

exports.updateAccount = async (req, res) => {
    let i = 0;
    const keys = Object.keys(req.body);
    console.log(keys);
    try {
        let query = `UPDATE accounts SET `;
        keys.forEach(k => {
            query += `${keys[i]} = $${i + 1}`;
            i++;
            if (i !== keys.length)
                query += `, `;
        })
        query += ` WHERE id = $${i + 1}`;
        console.log(query);
        const arr = Object.values(req.body).concat(req.session.userID);
        const qRes = await db.query(query, arr)
        return res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json();
    }
}
