const { Hash } = require('crypto');
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const db = require('./db');
const md5 = require('crypto').createHash('md5');
const port = process.env.PORT || 3000;

// functions
do_hash = (s) => md5.update(s).digest('hex');

app.use(express.json());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'ShigeoTokuda',
	cookie: { maxAge: 31536000000 }
}));
app.use(express.static(path.join(__dirname, '../../root')));

// api
app.post("/register", registerAccount);
app.post("/login", loginAccount);

// register account function
async function registerAccount(req, res) {
	try {
		const result = await db.query(`INSERT INTO accounts (name, email, password, phone) VALUES($1,$2,$3,$4)`, [req.body.name, req.body.email, do_hash(req.body.password), req.body.phone]);
		res.status(200).send("Successfully create an account");
	} catch (error) {
		res.status(500).send("Errors in the server");
		console.log(error);
	}
}

// login account function
async function loginAccount(req, res) {
	try {
		const result = await db.query(`SELECT * FROM accounts where email = $1 and password = $2`, [req.body.email, do_hash(req.body.password)]);
		if (result.rows.length == 1) res.status(200).send("Account login successful");
		else res.status(401).send("Email or password is incorrect");
	} catch (error) {
		console.log(error);
	}

}

app.listen(port, () => {
	console.log(`Server started on port: ${port}`);
});