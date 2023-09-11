const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.host,
  port: process.env.emailPort,
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

const nodeMailer = async (name, email, description, subject) => {
  const info = await transporter.sendMail({
    from: ` ${name} <${email}>`, // sender address
    to: process.env.toEmail, // list of receivers
    subject: subject, // Subject line
    text: `${description}`, // plain text body
    html: `${description}`, // html body
  });
};

module.exports = nodeMailer;
