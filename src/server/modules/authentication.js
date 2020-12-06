const db = require('../db');
const jwt = require('jsonwebtoken');
const {do_hash} = require('./helper');
const Mailer = require('./mailer')

exports.checkEmailExist = async function (req, res) {
    let user = await db.query(`SELECT 1 FROM accounts where email = $1`, [req.body.email]);
    console.log(req.body.email);
    console.log(user);
    if (user.rows.length == 1) res.status(200).json({emailStatus: true})
    else res.status(500).json({emailStatus: false})
}
exports.registerAccount = async function (req, res) {
    try {
        const res = await db.query(`INSERT INTO accounts (name, email, password, phone, gender) VALUES($1,$2,$3,$4,$5)`, [req.body.name, req.body.email, do_hash(req.body.password), req.body.phone, req.body.gender]);
        res.status(200).json({registerStatus: true});
    } catch (error) {
        res.status(500).json({registerStatus: false});
        console.log(error);
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
            // console.log(req.session)

            // update user last_login
            // if system fail to update user last_login, server will response error in the server
            await db.query(`UPDATE accounts SET last_login = $1 WHERE id = $2`, [(new Date()), result.rows[0].id]);

            // console.log(req.session)
            res.status(200).json({
                loginStatus: true,
                role: position
            });
        } else res.status(401).json();
    } catch (error) {
        console.log(error);
    }

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

    console.log(token)

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
                name: req.body.email,
                intro: 'You received this email because you password has just changed',
                action: {
                    instructions: 'If you did not change your password, click on the link below to recover it within 10 minutes',
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

exports.verifyJWT = async (jwtToken) => {
    const decoded = await new Promise((resolve, reject) => {
        jwt.verify(jwtToken, 'Yua Mikami', {audience: 'hms-user', issuer: 'hms'}, function (err, decoded) {
            if (err) {
                console.log(err)
                reject(err)
            }
            resolve(decoded);
        })
    });
    if (decoded.exp < Date.now() * 10e-3) {
        return decoded.data;
    } else {
        return {"error": "JWT Token Expired"};
    }
}
