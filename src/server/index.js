// const path = require('path');
const express = require('express');
const app = express();
// const session = require('express-session');
// const auth = require('./modules/authentication');
// const appointment = require('./modules/appointment');
const port = process.env.PORT || 3001;
//
// app.use(express.json());
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: 'ShigeoTokuda',
//     cookie: {maxAge: 31536000000}
// }));
// app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
    res.send('Hello World!')
});
// app.use(function (req, res, next) {
//     res.set({
//         'content-type': 'application/json',
//         'access-control-allow-headers': 'origin, x-requested-with, content-type, accept',
//         'access-control-allow-origin': '*',
//         // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
//     });
//     next();
// });
//
// // api
// app.post("/user/register", auth.redirectHome, auth.registerAccount);
// app.post("/user/login", auth.redirectHome, auth.loginAccount);
// app.post("/user/logout", auth.logout);
// app.post("/user/forget", auth.forgetPassword);
// app.post("/user/reset/:userToken", auth.resetPassword);
// app.post("/user/checkEmailExist", auth.checkEmailExist);
//
// app.post("/appointment/create", appointment.createAppointment);


app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});