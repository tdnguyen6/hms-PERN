const Mailer = require("../src/server/modules/mailer.js");

let email = {
    body: {
        name: "TiDu Nguyen",
        intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started with Mailgen, please click here:',
            button: {
                color: '#22bc66', // Optional action button color
                text: 'Confirm your account',
                link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
};

let mail = Mailer.mailGenerator.generate(email);

let message = {
    from: Mailer.transporter.options.auth,
    // change to your email to try
    to: 'tidu.nguyen.2000@gmail.com',
    subject: "Demo Node.js mail using nodemailer and mailgen",
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