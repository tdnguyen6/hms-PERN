const { Hash } = require('crypto');
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const db = require('../db');
const crypto = require('crypto');
const nodeMailer = require('../modules/mailer')
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

async function registerAccount(req, res) {
	let user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
	if (user.rows.length > 0) return res.status(401).send("User already exist")

	try {
		const result = await db.query(`INSERT INTO accounts (name, email, password, phone) VALUES($1,$2,$3,$4)`, [req.body.name, req.body.email, do_hash(req.body.password), req.body.phone]);
		res.status(200).send("Successfully create an account");
	} catch (error) {
		res.status(500).send("Errors in the server");
		console.log(error);
	}
}

async function loginAccount(req, res) {
	try {
		const result = await db.query(`SELECT * FROM accounts where email = $1 and password = $2`, [req.body.email, do_hash(req.body.password)]);
		if (result.rows.length == 1) {
			res.status(200).send("Account login successful");
			console.log(req.body);
		}
		else res.status(401).send("Email or password is incorrect");
	} catch (error) {
		console.log(error);
	}

}

async function forgetPassword(req, res) {

	let user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
	if (user.rows.length < 1) return res.status(401).send("User does not exist")

	const token = jwt.sign(
		{ data : {email: req.body.email}},
		"Secret credential",
		{ expiresIn: 604800 }
	);

	console.log(token)
	const msg = '<p> Please click the link to reset password: <a href = "https://auth-with-react.herokuapp.com/reset?index=' + token + '">Click me!!</a></p>'
	console.log(msg)
	await nodeMailer.transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>',
		to: "bar@example.com, baz@example.com",
		subject: 'Reset password',
		text: 'Hello',
		html: msg
	});
}

async function resetPassword(req, res) {
	const password = req.body.newPassword
	const email = jwtDecode(req.body.token).data.email

	let user = await db.query(`SELECT * FROM accounts where email = $1`, [req.body.email])
	if (user.rows.length < 1) return res.status(401).send("User does not exist")

	try {
		let result = await db.query(`UPDATE accounts SET password = $1 WHERE email = $2`, [password, email])
		res.status(200).send("Password was reseted")
	} catch (err) {
		res.status(500).send("Some error in server")
	}


}

app.listen(port, () => {
	console.log(`Server started on port: ${port}`);
});

module.exports = app;
