const nodemailer = require('nodemailer')
const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST, EMAIL_PORT } = process.env

const transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    }
})

const SendEmail = () => {
    const options = {
        from: 'muchamadagusher@gmail.com',
        to: 'muchamadagush@gmail.com',
        subject: 'Tes subject email',
        html: '<b>bold</b>'
    }

    transport.sendMail(options, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Email sent successfully')
        }
    })
}

module.exports = { SendEmail }