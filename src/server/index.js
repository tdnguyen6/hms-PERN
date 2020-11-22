const express = require('express');
const app = express();
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const auth = require('./modules/authentication');
const appointment = require('./modules/appointment');
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(session({
    cookie: { maxAge: 86400000 },
    saveUninitialized: true,
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: true,
    secret: 'Shigeo Tokuda'
}))
app.use(express.static('../client/build'));
app.use(function (req, res, next) {
    res.set({
        'content-type': 'application/json',
        'access-control-allow-headers': 'origin, x-requested-with, content-type, accept',
        'access-control-allow-origin': '*',
        // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
    });
    next();
});

// api
app.post("/user/register", auth.redirectHome, auth.registerAccount);
app.post("/user/login", auth.redirectHome, auth.loginAccount);
app.post("/user/logout", auth.logout);
app.post("/user/forget", auth.forgetPassword);
app.post("/user/reset/:userToken", auth.resetPassword);
app.post("/user/checkEmailExist", auth.checkEmailExist);

app.post("/appointment/create", appointment.createAppointment);


app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});