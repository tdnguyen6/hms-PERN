const db = require('../db');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const {do_hash} = require('./helper');
const Mailer = require('./mailer')

exports.checkEmailExist = async function (req, res) {
    let user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
    if (user.rows.length == 1) res.status(200).json({emailStatus: true})
    else res.status(500).json({emailStatus: false})
}
exports.registerAccount = async function (req, res) {
    try {
        const result = await db.query(`INSERT INTO accounts (name, email, password, phone) VALUES($1,$2,$3,$4)`, [req.body.name, req.body.email, do_hash(req.body.password), req.body.phone]);
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
        role: Patient | Practitioner | Admin
    }
    */
    try {
        const result = await db.query(`SELECT * FROM accounts where email = $1 and password = $2`, [req.body.email, do_hash(req.body.password)]);
        if (result.rows.length == 1) {
            // identify users role
            let isPatient = Number.isInteger(result.rows[0].patient_id)
            let isPractitioner = Number.isInteger(result.rows[0].practitioner_id)
            let position
            if (isPatient) position = "Patient"
            else if (isPractitioner) position = "Practitioner"
            else position = "Admin"
            console.log(position)
            // assign session to user
            req.session.userID = result.rows[0].id
            req.session.isAdmin = (position === 'Admin')
            console.log(req.session)


            res.status(200).json({
                loginStatus: true,
                role: position
            });
        } else res.status(500).json({loginStatus: false});
    } catch (error) {
        console.log(error);
    }

}
// exports.redirectHome = function(req, res, next) {
//     if (!req.session.userID) {
//         res.redirect('/user/login')
//     } else res.redirect('/dashboard')
// }
// exports.redirectHomeForAdmin = function(req, res, next) {
//     req.session.userID = 1
//     req.session.isAdmin = true
//     console.log(req.session)
//     console.log(req.session.userID && req.session.isAdmin)
//     if (req.session.userID && req.session.isAdmin) {
//         console.log("req.session.userID && req.session.isAdmin is called")
//         next()
//     } else if (req.session.userID) res.redirect('/dashboard')
//     else res.redirect('/user/login')
// }
exports.logout = function(req, res, next) {
    req.session.destroy(err => console.log(err))
    res.status(200).json({logOutStatus: true}).redirect('/user/login')

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
            expiresIn: 604800,
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
                instructions: 'To reset password please click here',
                button: {
                    color: '#22bc66',
                    text: 'Click to reset password',
                    link: 'http://localhost:3001/user/reset/' + token
                }
            },
            outro: 'If you did not make this request, simply ignore this email.'
        }
    };

    let mail = Mailer.mailGenerator.generate(email);

    let message = {
        from: Mailer.transporter.options.auth.user,
        to: req.body.email,
        subject: "Forget password Hospital Management System",
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
    jwt.verify(req.params.userToken, 'Yua Mikami', {audience: 'hms-user', issuer: 'hms'}, function(err, decoded) {
        if (err) {
            console.log(err)
            res.status(500).json({resetPasswordSuccessful: false})
        }
    })


    const password = req.body.newPassword
    console.log(jwtDecode(req.params.userToken))
    const email = jwtDecode(req.params.userToken).data.email

    let user = await db.query(`SELECT * FROM accounts where email = $1`, [email])
    if (user.rows.length < 1) return res.status(401).send("User does not exist")

    try {
        let result = await db.query(`UPDATE accounts SET password = $1 WHERE email = $2`, [password, email])
        res.status(200).json({resetPasswordSuccessful: true})
    } catch (err) {
        res.status(500).json({resetPasswordSuccessful: false})
    }
}
