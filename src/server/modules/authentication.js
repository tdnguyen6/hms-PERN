const db = require('../db');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const {do_hash} = require('./helper');
const Mailer = require('./mailer')

exports.checkEmailExist = async function (req, res) {
    let user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
    if (user.rows.length == 1) res.status(200).json({emailStatus: true})
    else res.status(404).json({emailStatus: false})
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
    try {
        const result = await db.query(`SELECT * FROM accounts where email = $1 and password = $2`, [req.body.email, do_hash(req.body.password)]);
        if (result.rows.length == 1) {
            res.status(200).json({loginStatus: true});
            console.log(req.body);
        } else res.status(401).json({loginStatus: false});
    } catch (error) {
        console.log(error);
    }

}

exports.forgetPassword = async function (req, res) {
    let user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
    if (user.rows.length < 1) return res.status(401).json({userExist: false})

    const token = jwt.sign(
        {
            data: {
                email: req.body.email
            }
        },
        "YuaMikami",
        {
            expiresIn: 604800
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
                    link: 'http://localhost:3001/user/reset?token=' + token
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
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
}

exports.resetPassword = async function (req, res) {
    const password = req.body.newPassword
    const email = jwtDecode(req.body.token).data.email

    let user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
    if (user.rows.length < 1) return res.status(401).send("User does not exist")

    try {
        let result = await db.query(`UPDATE accounts SET password = $1 WHERE email = $2`, [password, email])
        res.status(200).json({resetPasswordSuccessful: true})
    } catch (err) {
        res.status(500).json({resetPasswordSuccessful: false})
    }
}

