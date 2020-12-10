const db = require('../db');
const jwt = require('jsonwebtoken');
const {do_hash} = require('./helper');
const Mailer = require('./mailer')

exports.checkEmailExist = async function (req, res) {
    const user = await db.query(`SELECT 1 FROM accounts where email = $1`, [req.body.email]);
    return res.status(200).json({emailStatus: !!user.rows.length});
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
        const result = await db.query(`SELECT * FROM accounts where email = $1 and password = $2`, [req.body.email, do_hash(req.body.password)]);
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
        userID: req.session.userID
    });
}

exports.logout = function (req, res, next) {
    req.session.destroy(err => console.log(err))
    res.status(200).json({logOutStatus: true})
}
exports.forgetPassword = async function (req, res) {
    let user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
    if (user.rows.length < 1) return res.status(500).json({userExist: false})

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
        to: req.body.email,
        subject: "Hospital Management System: Recover password",
        html: mail,
    };

    Mailer.transporter
        .sendMail(message, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json({mailSent: false})
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({mailSent: true})
            }
        });
}
exports.resetPassword = async function (req, res) {
    try {
        await db.query(`UPDATE accounts SET password = $1 WHERE email = $2`, [do_hash(req.body.password), req.body.email])
        let user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
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
            to: req.body.email,
            subject: "Hospital Management System: Recent password change",
            html: mail,
        };

        Mailer.transporter
            .sendMail(message, function (error, info) {
                if (error) {
                    console.log(error);
                    res.status(500).json({mailSent: false})
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json({mailSent: true})
                }
            });
        res.status(200).json({resetPasswordSuccessful: true})
    } catch (err) {
        res.status(500).json({resetPasswordSuccessful: false})
    }
}

exports.changePassword = async function (req, res) {
    try {
        const updateStatement = `update accounts set password = '${do_hash(req.body.newPassword)}' where id = ${req.session.userID}`
        await db.query(updateStatement)
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
