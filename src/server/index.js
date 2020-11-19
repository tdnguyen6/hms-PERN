const express = require('express');
const {Hash} = require('crypto');
const app = express();
const session = require('express-session');
const path = require('path');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const crypto = require('crypto');
const db = require('./db');
const Mailer = require('./modules/mailer')
const auth = require('./modules/authentication');
const appointment = require('./modules/appointment');
const port = process.env.PORT || 3001;

// functions
do_hash = (s) => crypto.createHash('md5').update(s).digest('hex');

app.use(express.json());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'ShigeoTokuda',
    cookie: {maxAge: 31536000000}
}));
app.use(express.static(path.join(__dirname, '../../root')));
app.use(function (req, res, next) {
    res.set({
        'content-type': 'application/json',
        'access-control-allow-origin:': '*'
    });
});

// api
app.post("/user/register", auth.registerAccount);
app.post("/user/login", auth.loginAccount);
app.post("/user/forget", auth.forgetPassword);
app.post("/user/reset", auth.resetPassword);
app.post("/user/checkEmailExist", auth.checkEmailExist);

app.post("/apointment/create", appointment.createAppointment);


app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});