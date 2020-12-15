const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

exports.transporter = nodemailer.createTransport({
    // host: 'smtp-relay.sendinblue.com',
    // auth: {
    //     user: 'noreply.tidu@gmail.com',
    //     pass: 'xsmtpsib-762738c1b17df7a91ee73cc890c39cdd139a8cf57e96d2eeefded33190f0a603-gUXGEbvk9QjDdxOm'
    // },
    host: 'smtp.gmail.com',
    auth: {
        type: 'OAuth2',
        user: 'noreply.tidu@gmail.com',
        clientId: '274057410947-12bad18d6db2p46dpvj1cge621usbg9e.apps.googleusercontent.com',
        clientSecret: 'f204H2NtkhUs9q06fZCROQjt',
        refreshToken: '1//04mOqN0FFDb-ICgYIARAAGAQSNwF-L9IrTXMNE5rFsPQh-wz8bvIOuYWRkOf97WE0xvMc987JqpYxatGAeqERnnAyyXQ6wHs1Pjg'
    },
    secure: true
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




