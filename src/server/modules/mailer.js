const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: 'projects.assets@gmail.com',
        pass: '93F81FCB084408C59639EA5E6C1CDB5A4BAC54CA'
    }
});

exports.mailGenerator = new Mailgen({
    theme: 'salted',
    product: {
        name: 'Hospital Management System',
        link: 'https://hms-pern.herokuapp.com/'
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
    }
});


