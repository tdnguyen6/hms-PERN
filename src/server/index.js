const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');
const db = require('./db');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../root')));

// api
app.post("/register", registerAccount);
app.post("/login", loginAccount);

// register account function
async function registerAccount(req, res) {
	try {
		const result = await db.query(`INSERT INTO accounts (name, email, password, phone) VALUES($1,$2,$3,$4)`, [req.body.name, req.body.email, req.body.password, req.body.phone]);
		res.status(200).send("Successfully create an account");
	} catch (error) {
		res.status(500).send("Errors in the server");
		console.log(error);
	}
}

// login account function
async function loginAccount(req, res) {
	try {
		const result = await db.query(`SELECT * FROM accounts where email = $1 and password = $2`, [req.body.email, req.body.password]);
		if (result.rows.length == 1) res.status(200).send("Account login successful");
		else res.status(401).send("Email or password is incorrect");
	} catch (error) {
		console.log(error);
	}

}

app.listen(port);