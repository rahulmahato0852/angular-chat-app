const nodemailer = require('nodemailer')


const sendEmail = ({ to, subject, message }) => new Promise((resolve, reject) => {

    const send = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })

    send.sendMail({ to, subject, text: message, from: process.env.FROM_EMAIL }, (err) => {
        if (err) {
            console.log(err);
            return reject(err)
        } else {
            console.log("email send Successfully ");
            return resolve("Email send success")
        }
    })



})

module.exports = sendEmail