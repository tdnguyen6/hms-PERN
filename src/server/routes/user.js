const { Hash } = require('crypto');
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const db = require('../db');
const crypto = require('crypto');
const Mailer = require('../modules/mailer')
const port = process.env.PORT || 3001;
const cors = require('cors');

app.use(cors({ origin: true }));

// functions
do_hash = (s) => crypto.createHash('md5').update(s).digest('hex');

app.use(express.json());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'ShigeoTokuda',
	cookie: { maxAge: 31536000000 }
}));
app.use(express.static(path.join(__dirname, '../../root')));

// api
app.post("/user/register", registerAccount);
app.post("/user/login", loginAccount);
app.post("/user/forget", forgetPassword);
app.post("/user/reset", resetPassword);
app.post("/user/checkEmailExist", checkEmailExist);

app.post("/apointment/create", createAppointment);


async function checkEmailExist(req, res) {
	res.setHeader('content-type', 'application/json')
	
	let user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
	if (user.rows.length == 1) res.status(200).json({emailStatus: true})
	else res.status(404).json({emailStatus: false})
}

async function registerAccount(req, res) {
	try {
		res.setHeader('content-type', 'application/json')
		const result = await db.query(`INSERT INTO accounts (name, email, password, phone) VALUES($1,$2,$3,$4)`, [req.body.name, req.body.email, do_hash(req.body.password), req.body.phone]);
		res.status(200).json({registerStatus: true});
	} catch (error) {
		res.status(500).json({registerStatus: false});
		console.log(error);
	}
}

async function loginAccount(req, res) {
	try {
		res.setHeader('content-type', 'application/json')
		const result = await db.query(`SELECT * FROM accounts where email = $1 and password = $2`, [req.body.email, do_hash(req.body.password)]);
		if (result.rows.length == 1) {
			res.status(200).json({loginStatus: true});
			console.log(req.body);
		}
		else res.status(401).json({loginStatus: false});
	} catch (error) {
		console.log(error);
	}

}

async function forgetPassword(req, res) {
	let user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
	if (user.rows.length < 1) return res.status(401).json({userExist: false})

	const token = jwt.sign(
		{ data : {email: req.body.email}},
		"Secret credential",
		{ expiresIn: 604800 }
	);

	console.log(token)

	let email = {
		body: {
			name: "TiDu Nguyen",
			intro: 'Welcome to Hospital it seems that you have alzheimer',
			action: {
				instructions: 'To reset password please click here:',
				button: {
					color: '#22bc66',
					text: 'Reset link',
					link: 'http://localhost:3001/user/reset?token=' + token
				}
			},
			outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
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

async function resetPassword(req, res) {
	const password = req.body.newPassword
	const email = jwtDecode(req.body.token).data.email

	let user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
	if (user.rows.length < 1) return res.status(401).send("User does not exist")

	try {
		res.setHeader('content-type', 'application/json')
		let result = await db.query(`UPDATE accounts SET password = $1 WHERE email = $2`, [password, email])
		res.status(200).json({resetPasswordSuccessful : true})
	} catch (err) {
		res.status(500).json({resetPasswordSuccessful : false})
	}
}

async function createAppointment(req, res) {
	try {
		let result = await db.query(`INSERT INTO appointments (practitioner_id, patient_id, room_id, at, status, log, prescription, next_appointment_period, next_appointment_service, last_appointment) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [req.body.practitioner_id, req.body.patient_id, req.body.room_id, req.body.at, req.body.status, req.body.log, req.body.prescription, req.body.next_appointment_period, req.body.next_appointment_service, req.body.last_appointment])
		res.status(200).json({createAppointmentSuccessful : true})
	} catch (err) {
		console.log(err)
		res.status(500).json({createAppointmentSuccessful : false})
	}
}

app.listen(port, () => {
	console.log(`Server started on port: ${port}`);
});

module.exports = app;
