const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

exports.transporter = nodemailer.createTransport({
    // host: 'smtp-relay.sendinblue.com',
    // auth: {
    //     user: 'tidu.nguyen.2000@gmail.com',
    //     pass: 'xsmtpsib-762738c1b17df7a91ee73cc890c39cdd139a8cf57e96d2eeefded33190f0a603-gUXGEbvk9QjDdxOm'
    // }
    host: 'smtp.gmail.com',
    auth: {
        type: 'OAuth2',
        user: 'projects.assets@gmail.com',
        clientId: '225683130333-mfks6en4345rpp73kfblj8dr53cqnlvt.apps.googleusercontent.com',
        clientSecret: 'ab7L4ASy9tTcapUCRog6Z5ub',
        refreshToken: '1//047XKtyDF_AleCgYIARAAGAQSNwF-L9IrFD_sEvCf1_lJW-kTgl4SQGvSQHV1S7DbyMsukOEeXBLkbPeUn7ojpB0cQjCHdPbVvuU'
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




